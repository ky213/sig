<template>
  <leaflet></leaflet>
</template>

<script>
import axios from 'axios'
import * as icons from '@/assets/icons'
import { mapState } from 'vuex'

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://box.eadn.dz/sig-backend'

export default {
  computed: mapState(['user', 'features', 'schemas']),
  methods: {
    createLayerGroup(schema) {
      const iconUrl = icons.default[`${schema.name}`]

      this.$layerGroups[`${schema.name}`] = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => {
          const icon = L.icon({
            iconUrl,
            iconSize: [48, 70],
            popupAnchor: [0, -32]
          })

          return L.marker(
            latlng,
            iconUrl
              ? {
                  icon
                }
              : null
          )
        },
        onEachFeature: (feature, layer) => {
          layer.featureType = schema.name
          layer.bindPopup(this.getPopUp(feature.properties))
          layer.bindContextMenu({
            contextmenu: true,
            contextmenuWidth: 1000,
            contextmenuItems: [
              {
                index: 0,
                text: 'Edit',
                icon: icons.default.edit,
                callback: this.editLayer
              },
              {
                index: 1,
                text: 'Delete',
                icon: icons.default.del,
                callback: this.deleteLayer
              }
            ]
          })
        }
      }).addTo(this.$cluster)

      this.$BaseMap.addOverlay(
        this.$layerGroups[`${schema.name}`],
        `${schema.name}`
      )
    },
    getPopUp(props) {
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
    },
    editLayer({ relatedTarget }) {
      this.$emit('edit', relatedTarget)
    },
    deleteLayer({ relatedTarget }) {
      this.$confirm({
        title: 'Are you sure delete this feature?',
        content:
          'this action will delete the feature locally and from the database if any',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.$layerGroups[relatedTarget.featureType].removeLayer(
            relatedTarget
          )
          if (relatedTarget.feature._id) this.deletFeatureFromDB(relatedTarget)
        },
        onCancel: () => {}
      })
    },
    deletFeatureFromDB({ feature, featureType }) {
      axios({
        method: 'delete',
        url: `${host}/collections/${featureType}/${feature._id}`
      })
        .then(() => {
          this.$notification.success({
            message: 'Success!',
            description: 'Deleted from database'
          })
        })
        .catch(e => {
          this.$notification.error({
            message: 'Error: deleting from database',
            description: e.message
          })
        })
    }
  },
  mounted() {
    this.schemas.schemas.forEach(schema => this.createLayerGroup(schema))
    this.features.features.forEach(feature =>
      this.$layerGroups[`${feature.schema}`].addData(feature)
    )
    this.$map.on('draw:created', ({ layer }) => {
      if (!('feature' in layer)) {
        layer.featureType = ''
        layer.feature = layer.toGeoJSON()
      }
      this.$DrawLayer.addLayer(layer)
      this.$emit('newLayer', layer)
    })

    this.$map.on('contextmenu.show', ({ contextmenu }) => {
      if (!this.user.authenticated || contextmenu._items.length > 2) this.$map.contextmenu.hide()
    })

    this.$map.on('click', () => {
      this.$map.contextmenu.hide()
    })

    document.getElementById('filter-button').addEventListener('click', e => {
      this.$emit('filterLayers')
    })

    if(this.user.authenticated)
      this.$map.addControl(this.$drawControl)

    this.$store.subscribe((mutation, state) => {
      if (!state.user.authenticated) this.$map.removeControl(this.$drawControl)
      else this.$map.addControl(this.$drawControl)
    })
  }
}
</script>

<style lang="scss">
.leaflet-control-geosearch.bar {
  display: flex;
  justify-content: center;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 500;
  form {
    width: 35%;
  }
}

.leaflet-marker-draggable {
  border: 4px dashed rgba(243, 66, 75, 0.89);
  border-radius: 5px;
  padding: 4px;
}
</style>
