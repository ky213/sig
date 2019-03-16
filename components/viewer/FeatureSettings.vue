
<template>
  <form
    ref="form"
    class="card position-absolute bg-white p-3 rounded-1"
    style="width:30%;top:200px;right:15px;z-index:400"
    @submit.prevent="onSubmit"
  >
    <b-tabs v-model="activeTab">
      <b-tab-item>
        <template slot="header">
          <b-icon pack="fas" icon="image"></b-icon>
          <span>Type</span>
        </template>
        <b-collapse class="card d-block" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">Algérie Télécom</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>#buefy</a>.
            </div>
          </div>
        </b-collapse>
        <b-collapse class="card d-block" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">Algérie Poste</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>#buefy</a>.
            </div>
          </div>
        </b-collapse>
        <b-collapse class="card d-block" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">Djezzy</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>#buefy</a>.
            </div>
          </div>
        </b-collapse>
        <b-collapse class="card d-block" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">ooredoo</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>#buefy</a>.
            </div>
          </div>
        </b-collapse>
      </b-tab-item>
      <b-tab-item label="Attributes">
        <template slot="header">
          <b-icon pack="fas" icon="database"></b-icon>
          <span>Attributes</span>
        </template>
      </b-tab-item>
    </b-tabs>
    <footer class="card-footer">
      <button typ="submit" href="#" class="button is-info is-large card-footer-item">Save
        <b-icon pack="fas" icon="cloud-upload-alt" class="ml-2" size="is-small"></b-icon>
      </button>
      <button href="#" class="button is-danger is-outlined is-large card-footer-item">Cancel
        <b-icon pack="fas" icon="times" class="ml-2" size="is-small"></b-icon>
      </button>
    </footer>
  </form>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    onSubmit(e) {
      console.log('submitted', e)
    }
  },
  mounted() {
    console.log('FORM!!!!', this.$refs.form)
  }
}
</script>

<style>
.card-header {
  height: 50px !important;
}
</style>
