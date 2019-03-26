
<template>
  <form
    ref="form"
    class="card position-absolute bg-white p-3 rounded-1"
    style="height:600px;width:30%;top:200px;right:15px;z-index:400"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <b-tabs v-model="activeTab">
      <b-tab-item :visible="mode==='create'">
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
                <img :name="schema.name" :src="`/icons/${schema.name}.png`" style="height:40px">
              </button>
            </div>
          </div>
        </b-collapse>
      </b-tab-item>
      <b-tab-item label="Attributes" :disabled="mode =='create' && selectedType==''">
        <template slot="header">
          <b-icon pack="fas" icon="database"></b-icon>
          <span>Attributes</span>
        </template>
        <b-field v-for="(prop,i) in activeSchema.properties" :key="i" :label="i">
          <b-input :name="i" :type="prop" :value="newLayer.feature.properties[i]"></b-input>
        </b-field>
      </b-tab-item>
    </b-tabs>
    <footer class="card-footer bg-white">
      <button
        typ="submit"
        :class="['button', 'is-info', 'is-medium', 'card-footer-item',{'is-loading':isLoading}]"
        :disabled="mode=='create' && !selectedType"
      >
        Save
        <b-icon pack="fas" icon="cloud-upload-alt" class="ml-2" size="is-small"></b-icon>
      </button>
      <button type="reset" class="button is-danger is-outlined is-medium card-footer-item">
        Cancel
        <b-icon pack="fas" icon="times" class="ml-2" size="is-small"></b-icon>
      </button>
    </footer>
  </form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import * as icons from '~/assets/icons'

const host = process.env.NODE_ENV === 'development' ? 'localhost' : '10.1.1.24'

export default {
  data() {
    return {
      selectedType: '',
      activeTab: 0,
      isLoading: false
    }
  },
  props: ['newLayer', 'mode'],
  computed: {
    ...mapState({ schemas: state => state.schemas.schemas }),
    activeSchema() {
      return (
        this.schemas
          .filter(
            schema =>
              schema.name === this.selectedType || this.newLayer.featureType
          )
          .pop() || {}
      )
    },
    layerCopy() {
      return { ...this.newLayer.feature }
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
      const newProps = {}
      const newPosition = this.newLayer.toGeoJSON().geometry.coordinates
      const layerId = this.newLayer.feature._id

      this.isLoading = true

      for (const key in this.activeSchema.properties) {
        newProps[key] = formData.get(key)
      }

      if (this.mode === 'create') this.newLayer.feature.properties = newProps

      if (this.mode === 'edit')
        this.$store.commit('features/updateFeature', {
          layerId,
          newProps,
          newPosition
        })

      this.saveFeature()
    },
    onReset() {
      if (!this.newLayer.feature._id) this.$DrawLayer.removeLayer(this.newLayer)
      if (this.mode === 'edit') {
        this.$layerGroups[this.layerCopy.schema].removeLayer(this.newLayer)
        this.$layerGroups[this.layerCopy.schema].addData(this.layerCopy)
      }
      this.$emit('cancel')
    },
    saveFeature() {
      const method = this.mode === 'create' ? 'post' : 'put'
      const id = this.mode === 'edit' ? this.newLayer.feature._id : ''
      const layer = this.selectedType || this.newLayer.featureType

      axios({
        method,
        url: `http://${host}:3000/collections/${layer}/${id}`,
        data: this.newLayer.feature
      })
        .then(({ data: { _id } }) => {
          const schemaName = this.selectedType || this.newLayer.feature.schema

          this.newLayer.feature._id = _id
          this.isLoading = false
          this.$store.commit('features/add', this.newLayer.feature)

          this.$notification.success({
            message: 'Success!. Feature saved to database'
          })

          if (this.mode === 'create') {
            this.$DrawLayer.removeLayer(this.newLayer)
            this.$layerGroups[schemaName].addData(this.newLayer.feature)
          }
          if (this.mode === 'edit') {
            this.$layerGroups[this.newLayer.featureType].removeLayer(
              this.newLayer
            )
            this.$layerGroups[this.newLayer.featureType].addData(
              this.newLayer.feature
            )
          }

          this.newLayer
            .bindPopup(this.getPopup(this.newLayer.feature.properties))
            .openPopup()

          this.$emit('save')
        })
        .catch(error => {
          this.isLoading = false
          this.newLayer.disableEdit()
          this.$notification.error({
            message: `Error!`,
            description: error.message
          })
          this.$emit('save')
        })
    },
    getPopup(props) {
      let popup = ``

      for (const prop in props) {
        if (prop == 'image' || prop == '_id') continue
        if (prop == 'liaison_fo') {
          popup += `<h5><b>${prop}: </b></h5>`
          for (const el of props[prop]) {
            popup += `<h6><b>${el.trans || 'Tr'}: </b>${el.distanceKM ||
              null} km</h6>`
          }
          continue
        }
        popup += `<h5><b>${prop}</b>: ${props[prop]}</h5>`
      }
      return popup
    }
  },
  beforeMount() {
    if (this.mode === 'edit') this.activeTab = 1
  }
}
</script>

<style lang='scss'>
form {
  .tab-content {
    height: 425px;
    overflow: scroll !important;
  }
}

.card-header {
  height: 50px !important;
}

.schema-icon:not(:disabled) {
  cursor: pointer;
  &:hover {
    border: 1px solid #dbdbdb;
  }
}

.schema-icon:disabled {
  cursor: not-allowed !important;
}
</style>
