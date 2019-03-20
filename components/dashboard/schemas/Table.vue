<template>
  <section class="p-5 w-100">
    <b-field grouped group-multiline>
      <button class="button mb-2" @click="$emit('newSchema')">
        <b-icon class="mr-1" pack="fas" icon="plus"></b-icon>New schema
      </button>
    </b-field>

    <b-table
      :data="tableData"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :default-sort-direction="defaultSortDirection"
      default-sort="user.first_name"
      :show-detail-icon="true"
      detailed
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Name" sortable>{{ props.row.name }}</b-table-column>
        <b-table-column field="topo" label="Type" sortable>{{ props.row.topo }}</b-table-column>
        <b-table-column field="edit" label="Edit" sortable>
          <!-- <button class="button is-info is-small" @click="$emit('editSchema', props.row._id)">
            <b-icon class="mr-1 p-1" pack="fas" icon="edit"/>Edit
          </button> -->
          <button class="button is-danger is-small" @click="$emit('deleteSchema', props.row._id)">
            <b-icon class="mr-1" pack="fas" icon="times"/>Delete
          </button>
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <div v-for="(prop, i) in props.row.properties" :key="i">
          <b>{{i}}</b>
          : {{prop}}
        </div>
      </template>
    </b-table>
  </section>
</template>


<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    ...mapState(['schemas']),
    tableData() {
      return this.schemas.schemas.map(
        ({ _id, name, slug, topo, type, properties }) => ({
          _id,
          name,
          slug,
          topo,
          type,
          properties
        })
      )
    }
  }
}
</script>
