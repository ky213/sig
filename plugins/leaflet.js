import Vue from "vue"
import L from "leaflet"
import "leaflet-draw";
import 'leaflet-contextmenu'
import './leaflet-editable'
import 'leaflet.markercluster'
import 'leaflet.markercluster.layersupport';
import 'leaflet-easyprint/dist/bundle.js'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

//styles
import 'leaflet/dist/leaflet.css'
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet-contextmenu/dist/leaflet.contextmenu.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet-geosearch/dist/style.css'
import 'leaflet-geosearch/assets/css/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl;
// fix: default layer icon doesn't show up
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
// layer filter button
L.Control.FilterButton = L.Control.extend({
    options: {
        position: 'topright'
    },
    container: null,
    onAdd(map) {
        this.container = L.DomUtil.create('button', 'btn btn-default bg-white text-secondary')
        this.container.innerHTML = '<i class="fas fa-filter"></i>'
        this.container.style.border = '2px solid rgba(0,0,0,0.2)'
        this.container.id = 'filter-button'
        this.container.title = 'filter layers'


        return this.container
    }
})

L.control.filterButton = function () {
    return new L.Control.FilterButton()
}
// use leaflet as a Vuejs plugin so it can be accessible as a global variable (this.$map)
const leaflet = {
    install(V, options) {
        V.component("leaflet", { /* create the map component */
            render(h) {
                return <div id="map" style="height:100%">{this.$slots.default}</div>
            },
            mounted() {
              // init map
                V.prototype.$map = L.map("map", { editable: true, maxZoom: 18 }).setView([31.5, 3], 5)

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.$map);
                // init draw layer for creating new layers
                V.prototype.$DrawLayer = L.geoJSON().addTo(this.$map)
                // search bar
                V.prototype.$searchControl = new GeoSearchControl({
                    provider: new OpenStreetMapProvider(),
                    style: "bar",
                    showPopup: true,
                    autoClose: true,
                    keepResult: true
                }).addTo(this.$map);
                // init marker cluster
                V.prototype.$cluster = L.markerClusterGroup.layerSupport().addTo(this.$map);
                // init base map
                V.prototype.$BaseMap = new L.control.layers({
                    "OpenStreetMap": L.tileLayer(
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        {
                            attribution:
                                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }
                    ).addTo(this.$map)
                    ,
                    "ESRI": L.tileLayer(
                        "https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}",
                        { variant: "World_Imagery" }
                    ),
                    "MapBox": L.tileLayer(
                        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}{r}.png?access_token={accessToken}",
                        {
                            id: "mapbox.streets",
                            accessToken:
                                "pk.eyJ1Ijoia3kyMTMiLCJhIjoiY2pxZTg4YzNwMW5oNjN4bW4wamlob280ciJ9.qpO_NOa2wR3aZruBFufNjA"
                        }
                    )
                }).addTo(this.$map)
                // init draw tool box
                V.prototype.$drawControl = new L.Control.Draw({
                    edit: false,
                    draw: {
                        circle: false,
                        circlemarker: false,
                        rectangle: false
                    }
                })
                // init print-map button
                V.prototype.$print = L.easyPrint({
                    title: 'print',
                    position: 'bottomleft',
                    sizeModes: ['A4Portrait', 'A4Landscape'],
                    exportOnly: true
                }).addTo(this.$map);
                // expose layer groups as a global variable so we can add layers to it from any component
                V.prototype.$layerGroups = {}

                V.prototype.$filterButton = L.control.filterButton().addTo(this.$map)
            },
        })
    }
}

Vue.use(leaflet)
