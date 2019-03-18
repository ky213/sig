<template>
  <a-menu class="h-100" style="width: 256px" mode="vertical">
    <a-menu-item key="1">
      <nuxt-link to="/dashboard/schemas">
        <b-icon pack="fas" icon="database" style="margin-right:5px"/>Schemas
      </nuxt-link>
    </a-menu-item>
    <a-menu-item key="2">
      <a-icon type="calendar"/>Admin
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title">
        <a-icon type="appstore"/>
        <span>Profile</span>
      </span>
      <a-menu-item key="3">Option 3</a-menu-item>
      <a-menu-item key="4">Option 4</a-menu-item>
      <a-sub-menu key="sub1-2" title="Submenu">
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title">
        <a-icon type="setting"/>
        <span>Settings</span>
      </span>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {}
</script>

<style>
</style>
