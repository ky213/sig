  <template>
  <div class="h-100 position-relative">
    <img
      src="@/assets/map-hand.jpeg"
      class="position-absolute w-100 h-100"
      style="top:0;left:0;z-index:0"
    >
    <div
      class="home d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100"
      style="top:0;left:0;z-index:1"
    >
      <div>
        <h1 class="display-1 text-center">S I G</h1>
        <h1 class="display-4 text-center">system d'information géographique</h1>
      </div>
      <router-link to="/viewer" class="mt-5">
        <button type="button" class="btn btn-primary btn-lg">
          <b-icon pack="fas" icon="map-marked-alt" class="mr-2"/>Start Here
        </button>
      </router-link>
    </div>
  </div>
</template>
 
 <style scoped>
@import url('https://fonts.googleapis.com/css?family=Righteous');
.home {
  background: #e0eafc;
  background: linear-gradient(
    to bottom,
    rgb(86, 149, 236),
    rgba(255, 255, 255, 0.7)
  );
}
h1 {
  font-family: 'Righteous', cursive;
  color: #343c43;
}
</style>
 