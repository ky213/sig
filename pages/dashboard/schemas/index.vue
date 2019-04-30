<template>
  <div class="w-100" style="max-height:100%;overflow-y:scroll">
    <Table @newSchema="showModal = true" @deleteSchema="onDeleteSchema" @editSchema="onEditSchema"/>
    <b-modal :active.sync="showModal" has-modal-card @close="schemaToEdit=null">
      <NewSchema @saved="showModal = false" :schemaToEdit="schemaToEdit"/>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Table from '~/components/dashboard/schemas/Table'
import NewSchema from '~/components/dashboard/schemas/NewSchema'

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://box.eadn.dz/sig-backend'

export default {
  layout: 'dashboard',
  validate({ params, query, store }) {
    return store.state.user.authenticated
  },
  data() {
    return {
      showModal: false,
      schemaToEdit: null
    }
  },
  components: { Table, NewSchema },
  methods: {
    onEditSchema(id) {
      this.schemaToEdit = this.$store.state.schemas.schemas.find(
        ({ _id }) => _id === id
      )
      this.showModal = true
    },
    onDeleteSchema(id) {
      this.$confirm({
        title: 'Are you sure delete this schema?',
        content: 'this action will delete the schema from  database.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          axios
            .delete(`${host}/schemas/${id}`)
            .then(res => {
              this.$store.commit('schemas/deleteSchema', id)
              this.$notification.success({
                message: 'Success! deleted from database'
              })
            })
            .catch(error => {
              this.$notification.error({
                message: 'Error!',
                descroption: error.message
              })
            })
        },
        onCancel: () => {}
      })
    }
  }
}
</script>

<style>
</style>
