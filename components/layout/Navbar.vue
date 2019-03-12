<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <b src="https://eadn.dz" target="_blank" style="font-size:2em" class="is-danger">SIGEADN</b>
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
        <a class="navbar-item" href="/">
          <b-icon pack="fas" icon="home" style="margin-right:5px"/>Home
        </a>
        
        <a class="navbar-item" href="/viewer">
          <b-icon pack="fas" icon="map-marked-alt" style="margin-right:5px"/>Viewer
        </a>
        
        <a class="navbar-item" href="/dashboard">
          <b-icon pack="fas" icon="cog" style="margin-right:5px"/>Dashboard
        </a>
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

<script>
export default {}
</script>

<style>
</style>
