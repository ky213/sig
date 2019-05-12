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
      // get icons for each schema by schema name
      const iconUrl = icons.default[`${schema.name}`]
      // create a geoJSON layer for each schema
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
          // right-click layer menu
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
      // add layer group to base-map selector menu
      this.$BaseMap.addOverlay(
        this.$layerGroups[`${schema.name}`],
        `${schema.name}`
      )
    },
    getPopUp(props) { /* generate popup content for each layer */
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
    editLayer({ relatedTarget }) { /* emit an edit event to the viewer edit menu click */
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
          if (relatedTarget.feature._id) this.deleteFeatureFromDB(relatedTarget)
        },
        onCancel: () => {}
      })
    },
    deleteFeatureFromDB({ feature, featureType }) {
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
    // create a layer group for each schema
    this.schemas.schemas.forEach(schema => this.createLayerGroup(schema))
    this.features.features.forEach(feature =>
      // add features to each layer group accordingly (by schema name)
      this.$layerGroups[`${feature.schema}`].addData(feature)
    )
    this.$map.on('draw:created', ({ layer }) => {
      // add feature type and GeoJSON data to each layer on the map for ease of access
      if (!('feature' in layer)) {
        layer.featureType = ''
        layer.feature = layer.toGeoJSON()
      }
      // then we add the layer to tha map
      this.$DrawLayer.addLayer(layer)
      // emit an event to the viewer so it can take th necessary actions.
      this.$emit('newLayer', layer)
    })

    this.$map.on(
      'contextmenu.show' /* on mouse right-click on the map*/,
      ({ contextmenu }) => {
        if (
          !this.user.authenticated ||
          contextmenu._items.length > 2 /* show only 2 menu items */
        )
          this.$map.contextmenu.hide()
      }
    )

    this.$map.on('click', () => {
      this.$map.contextmenu.hide()
    })
    // filter-layer button click
    document.getElementById('filter-button').addEventListener('click', e => {
      this.$emit('filterLayers')
    })

    if (
      this.user.roles.includes('ROLE_SIG_ADMIN') ||
      this.user.roles.includes('ROLE_SIG_EDIT')
    )
      this.$map.addControl(this.$drawControl)

    this.$store.subscribe((mutation, state) => {
      if (
        !this.user.roles.includes('ROLE_SIG_ADMIN') ||
        !this.user.roles.includes('ROLE_SIG_EDIT')
      )
        this.$map.removeControl(this.$drawControl)
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
