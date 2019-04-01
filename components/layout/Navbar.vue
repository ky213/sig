<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand align-items-center">
      <a class="navbar-item has-text-grey-darker" href="#">
        <b style="font-size:2em" class="is-danger">CARTADZZZ</b>
      </a>
      
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="isActive=!isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div :class="['navbar-menu', {'is-active':isActive}]">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" to="/">
          <b-icon pack="fas" icon="home" style="margin-right:5px"/>Home
        </nuxt-link>

        <nuxt-link class="navbar-item" to="/viewer">
          <b-icon pack="fas" icon="map-marked-alt" style="margin-right:5px"/>Viewer
        </nuxt-link>

        <nuxt-link class="navbar-item" to="/dashboard">
          <b-icon pack="fas" icon="cog" style="margin-right:5px"/>Administration
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- <a class="button is-primary">
              <strong>Sign up</strong>
            </a> -->
            <a class="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  }
}
</script>


<style scoped>
a:hover {
  text-decoration: none;
}
</style>

<style lang="scss">
@media (max-width: 1200px) {
  .navbar-brand {
    width: 100% !important;
    display: flex;
    align-items: center;
  }
  .navbar-menu {
    width: 100%;
  }
}
</style>
