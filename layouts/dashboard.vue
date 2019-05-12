<template>
  <div style="height:100%; display:flex; flex-direction:column">
    <Navbar class="border-bottom"/>
    <Body style="flex:1" class="d-flex">
      <SideMenu/>
      <nuxt/>
    </Body>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '~/components/layout/Navbar'
import Body from '~/components/layout/Body'
import Footer from '~/components/layout/Footer'
import SideMenu from '~/components/dashboard/SideMenu'


export default {
  components: { Navbar, Body, Footer, SideMenu },
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
