<template>
  <div id="map" style="height:100%"></div>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

export default {
  data() {
    return {
      map: {}
    }
  },
  computed: mapState({
    schemas: state => state.schemas.schemas,
    features: state => state.features.features
  }),
  methods: {
    initMap() {
      this.map = L.map('map', { editable: true, maxZoom: 18 }).setView(
        [31.5, 3],
        5
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)

      this.DrawLayer = L.geoJSON().addTo(this.map)

      this.searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        showPopup: true,
        autoClose: true,
        keepResult: true
      }).addTo(this.map)

      this.cluster = L.markerClusterGroup.layerSupport().addTo(this.map)

      this.BaseMap = new L.control.layers(
        {
          OpenStreetMap: L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          ).addTo(this.map),
          ESRI: L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}',
            { variant: 'World_Street_Map' }
          ),
          MapBox: L.tileLayer(
            'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}{r}.png?access_token={accessToken}',
            {
              id: 'mapbox.streets',
              accessToken:
                'pk.eyJ1Ijoia3kyMTMiLCJhIjoiY2pxZTg4YzNwMW5oNjN4bW4wamlob280ciJ9.qpO_NOa2wR3aZruBFufNjA'
            }
          )
        },
        {}
      ).addTo(this.map)

      this.drawControl = new L.Control.Draw({
        edit: false,
        draw: {
          circle: false,
          circlemarker: false,
          rectangle: false
        }
      }).addTo(this.map)

      this.print = L.easyPrint({
        title: 'print',
        position: 'topleft',
        sizeModes: ['A4Portrait', 'A4Landscape'],
        exportOnly: true
      }).addTo(this.map)

      this.map.on('draw:created', ({ layer }) => {
        if (!('feature' in layer)) {
          layer.featureType = ''
          layer.feature = layer.toGeoJSON()
        }
        this.DrawLayer.addLayer(layer)
      })
    },
    spawnLayers() {
      this.features.forEach(feature => {
        this.msan = L.geoJSON(null, {
          pointToLayer: (feature, latlng) => {
            const icon = L.icon({
              iconUrl: '@/assets/buefy.png',
              iconSize: [48, 70],
              popupAnchor: [0, -32]
            })
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
        })
          .addData(feature)
          .addTo(this.cluster)
      })
    },
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
    this.initMap()
    this.spawnLayers()
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

