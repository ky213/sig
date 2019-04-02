
<template>
  <form
    class="card position-absolute bg-white p-3 rounded-1"
    style="height:600px;width:40%;top:160px;right:10px;z-index:1000"
    @submit.prevent="onSubmit"
  >
    <b-field class="text-right">
      <button type="button" class="button" @click="$emit('hide')">
        <b-icon pack="fas" icon="times"></b-icon>
      </button>
    </b-field>
    <b-field>
      <b-select placeholder="select layer" expanded @input="selectedSchema = $event" required>
        <option v-for="schema in schemas" :key="schema._id" :value="schema.slug">{{schema.slug}}</option>
      </b-select>
    </b-field>
    <b-field v-for="obj in searchObjects" :key="obj">
      <b-select name="field" placeholder="prop" expanded>
        <option v-for="(prop, key) in schemaTosearch.properties" :key="key" :value="key">{{key}}</option>
      </b-select>
      <b-select name="operator" placeholder="operetor" expanded>
        <option v-for="(operator,i) in operators" :key="i" :value="operator">{{operator}}</option>
      </b-select>
      <b-input name="value" placeholder="Search..." type="search"></b-input>
      <button class="button" @click="deleteField(obj)">
        <b-icon pack="fas" icon="times-circle"></b-icon>
      </button>
    </b-field>
    <b-field>
      <button type="button" class="button is-fullwidth" title="add operator" @click="addField">
        <b-icon pack="fas" icon="plus" class="mr-2"></b-icon>Add operator
      </button>
    </b-field>
    <b-field>
      <button type="submit" :class="['button', 'is-fullwidth',{'is-loading':isLoading}]">
        <b-icon pack="fas" icon="search" class="mr-2"></b-icon>Search
      </button>
    </b-field>

    <hr>

    <section style="overflow-y:scroll">
      <b-field v-for="r in result" :key="r._id">
        <button
          type="button"
          class="btn btn-light w-100 d-flex justify-content-around align-items-center"
        >
          <p class="w-100 text-left m-0">{{r.properties.name}}</p>
          <button type="button" class="button" @click="showLayer(r._id)">
            <b-icon pack="fas" icon="eye" class="text-secondary"></b-icon>
          </button>
        </button>
      </b-field>
    </section>
  </form>
</template>

<script>
import axios from 'axios'
import uuidv1 from 'uuid'

export default {
  data() {
    return {
      isLoading: false,
      selectedSchema: '',
      schemas: this.$store.state.schemas.schemas,
      operators: ['like', '=', '>', '<'],
      searchObjects: [],
      result: []
    }
  },
  computed: {
    schemaTosearch() {
      return this.schemas.find(({ slug }) => slug === this.selectedSchema)
    }
  },
  methods: {
    onSubmit(e) {
      const formData = new FormData(e.target)
      const formKeys = []
      const formValues = []
      let queryObject = {}

      let searchQuery = []
      this.isLoading = true

      for (const key of formData.keys()) {
        formKeys.push(key)
      }

      for (const value of formData.values()) {
        formValues.push(value)
      }

      searchQuery = formKeys
        .map((key, index) => {
          if (key === 'field') queryObject = {}
          queryObject[key] = formValues[index]
          if (key === 'value') return queryObject
        })
        .filter(v => v)

      this.search([{ operatorRoot: '&&' }, searchQuery])
    },
    search(query) {
      const host =
        process.env.NODE_ENV === 'production' ? 'https://box.eadn.dz/sig-backend' : 'localhost'
      axios({
        method: 'post',
        url: `${host}/searches/${this.selectedSchema}`,
        data: query
      })
        .then(({ data }) => {
          this.result = data[this.selectedSchema]
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
    },
    addField() {
      if (this.selectedSchema) this.searchObjects.push(uuidv1())
    },
    deleteField(id) {
      this.searchObjects = this.searchObjects.filter(obj => obj !== id)
    },
    showLayer(id) {
      const layer = this.$layerGroups[this.selectedSchema]
        .getLayers()
        .find(layer => layer.feature._id === id)

      if (layer._latlng) {
        if (this.$map.getZoom() < 18) this.$map.setZoom(18)
        this.$map.flyTo(layer._latlng)
      } else {
        this.$map.fitBounds(layer.getBounds())
      }
      layer.openPopup()
    }
  }
}
</script>