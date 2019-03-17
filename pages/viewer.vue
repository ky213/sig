<template>
  <div class="h-100">
    <no-ssr>
      <Map @newLayer="onNewLayer" @edit="onEdit"/>
    </no-ssr>
    <FeatureSettings
      v-if="showFeatureSettings"
      @save="showFeatureSettings=false"
      @cancel="showFeatureSettings=false"
      :newLayer="newLayer"
      :editLayer="editLayer"
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
      editLayer: null
    }
  },
  components: { Map, FeatureSettings },
  methods: {
    onNewLayer(layer) {
      this.showFeatureSettings = true
      this.newLayer = layer
    },
    onEdit(layer) {
      this.newLayer = layer
      this.showFeatureSettings = true
    }
  }
}
</script>





