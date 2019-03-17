<template>
  <div class="h-100">
    <no-ssr>
      <Map @newLayer="onNewLayer"/>
    </no-ssr>
    <FeatureSettings
      v-if="showFeatureSettings"
      @save="showFeatureSettings=false"
      @cancel="showFeatureSettings=false"
      :newLayer="newLayer"
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
      newLayer: null
    }
  },
  components: { Map, FeatureSettings },
  methods: {
    onNewLayer(layer) {
      this.showFeatureSettings = true
      this.newLayer = layer
    }
  }
}
</script>





