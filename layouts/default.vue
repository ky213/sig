<template>
  <div style="height:100%; display:flex; flex-direction:column">
    <Navbar/>
    <Body style="flex:1">
      <nuxt/>
    </Body>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '~/components/layout/Navbar'
import Body from '~/components/layout/Body'
import Footer from '~/components/layout/Footer'

export default {
  components: { Navbar, Body, Footer }
}
</script>


<style>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
}
</style>
