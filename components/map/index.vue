<template>
  <leaflet></leaflet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return { layerGroups: {} }
  },
  computed: mapState(['features', 'schemas']),
  methods: {
    createLayerGroup(schema) {
      this.$data.layerGroups[`${schema.name}`] = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => {
          //   const icon = L.icon({
          //     // iconUrl: icons.default.msan,
          //     iconSize: [48, 70],
          //     popupAnchor: [0, -32]
          //   })
          return L.marker(latlng, {
            // icon
          })
        },
        onEachFeature: (feature, layer) => {
          layer.featureType = 'msan'
          layer.bindPopup(this.setPopUp(feature.properties))
          layer.bindContextMenu({
            contextmenu: true,
            contextmenuWidth: 1000,
            contextmenuItems: [
              {
                index: 0,
                text: 'Edit',
                // icon: icons.default.edit,
                callback: this.editLayer
              },
              {
                index: 1,
                text: 'Delete',
                // icon: icons.default.del,
                callback: this.deleteLayer
              }
            ]
          })
        }
      }).addTo(this.$cluster)

      this.$BaseMap.addOverlay(
        this.layerGroups[`${schema.name}`],
        `${schema.name}`
      )
    },
    spawnLayers(feature) {},
    setPopUp(props) {
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
  mounted() {
    this.schemas.schemas.forEach(schema => this.createLayerGroup(schema))
    this.features.features.forEach(feature =>
      this.layerGroups[`${feature.schema}`].addData(feature)
    )
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
</style>
