<template>
  <div class="w-100">
    <Table @newSchema="showModal = true"/>
    <b-modal :active.sync="showModal" has-modal-card>
      <NewSchema/>
    </b-modal>
  </div>
</template>

<script>
import Table from '~/components/dashboard/schemas/Table'
import NewSchema from '~/components/dashboard/schemas/NewSchema'

export default {
  data() {
    return {
      showModal: false
    }
  },
  layout: 'dashboard',
  components: { Table, NewSchema }
}
</script>

<style>
</style>
