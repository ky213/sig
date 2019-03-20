<template>
  <div class="h-100">
    <no-ssr>
      <Map @newLayer="onNewLayer" @edit="onEdit"/>
    </no-ssr>
    <FeatureSettings
      v-if="showFeatureSettings"
      @save="onSave"
      @cancel="showFeatureSettings=false"
      :newLayer="newLayer"
      :mode="mode"
    />
  </div>
</template>

<script>
import Map from '~/components/map'
import FeatureSettings from '~/components/viewer/FeatureSettings'

export default {
  data() {
    return {
      showFeatureSettings: false,
      newLayer: null,
      mode: 'create'
    }
  },
  components: { Map, FeatureSettings },
  methods: {
    onNewLayer(layer) {
      this.showFeatureSettings = true
      this.mode = 'create'
      this.newLayer = layer
    },
    onEdit(layer) {
      this.showFeatureSettings = true
      this.mode = 'edit'
      if (
        this.newLayer &&
        this.newLayer.options &&
        this.newLayer.options.contextmenu
      )
        this.newLayer.disableEdit()
      this.newLayer = layer
    },
    onSave() {
      this.showFeatureSettings = false
    }
  }
}
</script>





