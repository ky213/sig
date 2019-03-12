<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-grey-darker" href="https://eadn.dz" target="_blank">
        <b style="font-size:2em" class="is-danger">SIGEADN</b>
      </a>
      
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" to="/">
          <b-icon pack="fas" icon="home" style="margin-right:5px"/>Home
        </nuxt-link>

        <nuxt-link class="navbar-item" to="/viewer">
          <b-icon pack="fas" icon="map-marked-alt" style="margin-right:5px"/>Viewer
        </nuxt-link>

        <nuxt-link class="navbar-item" to="/dashboard">
          <b-icon pack="fas" icon="cog" style="margin-right:5px"/>Dashboard
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>
