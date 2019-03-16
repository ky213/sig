
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
        <b-collapse
          v-for="schema in schemas"
          :key="schema.name"
          class="card d-block"
          aria-id="contentIdForA11y3"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">{{schema.name}}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              <img
                :name="schema.name"
                :src="`/icons/${schema.name}.png`"
                class="schema-icon"
                @click="onTypeSelect"
              >
            </div>
          </div>
        </b-collapse>
      </b-tab-item>
      <b-tab-item label="Attributes">
        <template slot="header">
          <b-icon pack="fas" icon="database"></b-icon>
          <span>Attributes</span>
        </template>
        <b-field v-for="(prop,i) in activeSchema.properties" :key="i" :label="i">
          <b-input :name="i" :type="prop"></b-input>
        </b-field>
      </b-tab-item>
    </b-tabs>
    <footer class="card-footer bg-white">
      <button typ="submit" href="#" class="button is-info is-medium card-footer-item">Save
        <b-icon pack="fas" icon="cloud-upload-alt" class="ml-2" size="is-small"></b-icon>
      </button>
      <button href="#" class="button is-danger is-outlined is-medium card-footer-item">Cancel
        <b-icon pack="fas" icon="times" class="ml-2" size="is-small"></b-icon>
      </button>
    </footer>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedType: '',
      activeTab: 0
    }
  },
  computed: {
    ...mapState({ schemas: state => state.schemas.schemas }),
    activeSchema() {
      return (
        this.schemas
          .filter(schema => schema.name === this.selectedType)
          .pop() || {}
      )
    }
  },
  methods: {
    onTypeSelect(e) {
      this.selectedType = e.target.name
      this.activeTab = 1
    },
    onSubmit(e) {
      console.log('submitted', e)
    }
  }
}
</script>

<style scoped lang='scss'>
.card-header {
  height: 50px !important;
}

.schema-icon {
  height: 70px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border: 1px solid #dbdbdb;
  }
}
</style>
