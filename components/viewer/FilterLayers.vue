
<template>
  <form
    ref="form"
    class="card position-absolute bg-white p-3 rounded-1"
    style="height:600px;width:50%;top:160px;right:10px;z-index:1000"
    @submit.prevent="onSubmit"
  >
    <b-field class="text-right">
      <button type="button" class="button" @click="$emit('hide')">
        <b-icon pack="fas" icon="times"></b-icon>
      </button>
    </b-field>
    <b-field>
      <b-select name="layer" placeholder="select layer" expanded @input="onSelectedLayer">
        <option v-for="schema in schemas" :key="schema._id" :value="schema.slug">{{schema.slug}}</option>
      </b-select>
    </b-field>
    <b-field>
      <b-select name="layer" placeholder="prop" expanded @input="onSelectedLayer">
        <option v-for="prop in selectedSchema.properties" :key="prop" :value="prop">{{prop}}</option>
      </b-select>
      <b-select name="layer" placeholder="operetor" expanded @input="onSelectedLayer">
        <option v-for="(operator,i) in operators" :key="i" :value="operator">{{operator}}</option>
      </b-select>
      <b-input name="filterString" placeholder="Search..." type="search"></b-input>
      <button class="button">
          <b-icon pack="fas" icon ="times-circle"></b-icon>
      </button>
    </b-field>
    <b-field>
      <button type="button" class="button is-fullwidth" title="add operator">
        <b-icon pack="fas" icon="plus"></b-icon>
      </button>
    </b-field>

    <hr>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      selectedSchema: '',
      schemas: this.$store.state.schemas.schemas,
      operators: ['like', '=', '>', '<']
    }
  },
  methods: {
    onSubmit(e) {
      const formData = new FormData(e.target)
      const layer = formData.get('layer')
      const filterString = formData.get('filterString')

      this.isLoading = true

      console.log(this.schemas)
    },
    onSelectedLayer(layer) {
      this.selectedLayer = layer
    }
  }
}
</script>
