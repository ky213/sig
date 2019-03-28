<template>
  <div class="h-100">
    <no-ssr>
      <Map @newLayer="onNewLayer" @edit="onEdit" @filterLayers="showFilterLayers=true"/>
    </no-ssr>
    <FeatureSettings
      v-if="showFeatureSettings"
      @save="onSave"
      @cancel="showFeatureSettings=false"
      :newLayer="newLayer"
      :mode="mode"
    />
    <keep-alive>
      <FilterLayers v-if="showFilterLayers" @hide="showFilterLayers=false"/>
    </keep-alive>
  </div>
</template>

<script>
import Map from '~/components/map'
import FeatureSettings from '~/components/viewer/FeatureSettings'
import FilterLayers from '~/components/viewer/FilterLayers'

export default {
  data() {
    return {
      showFeatureSettings: false,
      showFilterLayers: false,
      newLayer: null,
      mode: 'create'
    }
  },
  components: { Map, FeatureSettings, FilterLayers },
  methods: {
    onNewLayer(layer) {
      this.showFeatureSettings = true
      this.mode = 'create'
      this.newLayer = layer
    },
    onEdit(layer) {
      this.showFeatureSettings = true
      this.mode = 'edit'
      if (this.newLayer && this.newLayer.editEnabled())
        this.newLayer.disableEdit()

      this.newLayer = layer
      this.newLayer.enableEdit()
    },
    onSave() {
      this.showFeatureSettings = false
    }
  }
}
</script>





