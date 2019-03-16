<template>
  <div class="h-100">
    <no-ssr>
      <Map @newLayer="onNewLayer"/>
    </no-ssr>
    <FeatureSettings/>
  </div>
</template>

<script>
import Map from '~/components/map'
import FeatureSettings from '~/components/viewer/FeatureSettings'
export default {
  components: { Map, FeatureSettings },
  methods: {
    onNewLayer(layer) {
      console.log('newLayer', layer)
    }
  }
}
</script>





