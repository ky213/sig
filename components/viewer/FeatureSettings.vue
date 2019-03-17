
<template>
  <form
    ref="form"
    class="card position-absolute bg-white p-3 rounded-1"
    style="width:30%;top:200px;right:15px;z-index:400"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <b-tabs v-model="activeTab">
      <b-tab-item>
        <template slot="header">
          <b-icon pack="fas" icon="image"></b-icon>
          <span>Type</span>
        </template>
        <b-collapse
          v-for="schema in schemas"
          :key="schema.name"
          class="card d-block"
          aria-id="contentIdForA11y3"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">{{schema.name}}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              <button
                type="button"
                :name="schema.name"
                class="btn schema-icon"
                @click="onTypeSelect"
                :disabled="schema.topo !== newLayer.feature.geometry.type"
              >
                <img :src="`/icons/${schema.name}.png`" style="height:70px">
              </button>
            </div>
          </div>
        </b-collapse>
      </b-tab-item>
      <b-tab-item label="Attributes">
        <template slot="header">
          <b-icon pack="fas" icon="database"></b-icon>
          <span>Attributes</span>
        </template>
        <b-field v-for="(prop,i) in activeSchema.properties" :key="i" :label="i">
          <b-input :name="i" :type="prop"></b-input>
        </b-field>
      </b-tab-item>
    </b-tabs>
    <footer class="card-footer bg-white">
      <button
        typ="submit"
        :class="['button', 'is-info', 'is-medium', 'card-footer-item',{'is-loading':isLoading}]"
      >Save
        <b-icon pack="fas" icon="cloud-upload-alt" class="ml-2" size="is-small"></b-icon>
      </button>
      <button type="reset" class="button is-danger is-outlined is-medium card-footer-item">Cancel
        <b-icon pack="fas" icon="times" class="ml-2" size="is-small"></b-icon>
      </button>
    </footer>
  </form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import * as icons from '~/assets/icons'
export default {
  data() {
    return {
      selectedType: '',
      activeTab: 0,
      isLoading: false
    }
  },
  props: ['newLayer'],
  computed: {
    ...mapState({ schemas: state => state.schemas.schemas }),
    activeSchema() {
      return (
        this.schemas
          .filter(schema => schema.name === this.selectedType)
          .pop() || {}
      )
    }
  },
  methods: {
    onTypeSelect(e) {
      this.newLayer.featureType = e.target.name
      this.selectedType = e.target.name
      this.activeTab = 1
      if (this.newLayer.feature.geometry.type === 'Point')
        this.newLayer.setIcon(
          L.icon({
            iconUrl: icons.default[this.selectedType],
            iconSize: [48, 70],
            popupAnchor: [0, -32]
          })
        )
    },
    onSubmit(e) {
      const formData = new FormData(e.target)
      const newFeature = {}

      this.isLoading = true
      for (const key in this.activeSchema.properties) {
        newFeature[key] = formData.get(key)
      }

      this.newLayer.feature.properties = newFeature
      this.saveFeature()
    },
    onReset() {
      this.$emit('cancel')
      if (!this.newLayer.feature._id) this.$map.removeLayer(this.newLayer)
    },
    saveFeature() {
      axios({
        method: 'post',
        url: `http://localhost:3000/collections/${this.selectedType}`,
        data: this.newLayer.feature
      })
        .then(({ data: { _id } }) => {
          this.isLoading = false
          this.$emit('save')
          this.$toast.open({
            message: '<b>Success!. Feature saved to database</b>',
            type: 'is-success'
          })
          this.newLayer.feature._id = _id
          this.$DrawLayer.removeLayer(this.newLayer)
          this.$root.layerGroups[this.selectedType].addData(
            this.newLayer.feature
          )
        })
        .catch(error => {
          this.isLoading = false
          this.$toast.open({
            message: `Error! ${error.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style scoped lang='scss'>
.card-header {
  height: 50px !important;
}

.schema-icon:not(:disabled) {
  cursor: pointer;
  img {
    height: 70px;
  }
  &:hover {
    border: 1px solid #dbdbdb;
  }
}
.schema-icon:disabled {
  cursor: not-allowed !important;
}
</style>
