<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-card" style="width: 500px">
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input name="name" type="text" placeholder="schema name" required></b-input>
        </b-field>

        <b-field label="Type">
          <b-select name="topo" placeholder="Geometry Type" expanded>
            <option value="Point">Point</option>
            <option value="LineString">Line</option>
            <option value="Plolygon">Polygon</option>
          </b-select>
        </b-field>
        <b-field label="Properties"></b-field>
        <b-field v-for="(field) in fields" :key="field.id" :id="field.id">
          <b-input
            name="propName"
            class="w-100"
            type="text"
            placeholder="prop name"
          ></b-input>
          <b-select name="propType" type="text" placeholder="prop type">
            <option value="number">number</option>
            <option value="string">string</option>
          </b-select>
          <button type="button" class="button" @click="deleteField(field.id)">
            <b-icon pack="fas" icon="times-circle"></b-icon>
          </button>
        </b-field>
        <b-field>
          <button class="button is-fullwidth" type="button" @click="addField" title="add new prop">
            <b-icon pack="fas" icon="plus"/>
          </button>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button type="submit" :class="['button','is-primary' ,{'is-loading':isLoading}]">Save</button>
      </footer>
    </div>
  </form>
</template>
<script>
import uuidv1 from 'uuid'
import axios from 'axios'

export default {
  props: ['schemaToEdit'],
  data() {
    return {
      isLoading: false,
      fields: []
    }
  },
  methods: {
    onSubmit(e) {
      const formData = new FormData(e.target)
      const props = formData.getAll('propName')
      const types = formData.getAll('propType')
      const newSchema = { type: 'Feature', properties: {} }

      this.isLoading = true

      newSchema.name = formData.get('name')
      newSchema.topo = formData.get('topo')

      for (let i = 0; i < props.length; i++) {
        newSchema.properties[props[i]] = types[i]
      }

      this.saveSchema(newSchema)
    },
    saveSchema(schema) {
      axios({
        method: 'post',
        url: `http://${process.env.HOST}:3000/schemas`,
        data: schema
      })
        .then(({ data }) => {
          this.$notification.success({
            message: 'Success!',
            description: 'Saved to database'
          })
          schema._id = data._id
          this.$store.commit('schemas/addNewSchema', schema)
          this.isLoading = false
          this.$emit('saved')
        })
        .catch(error => {
          this.$notification.error({
            message: 'Error!',
            description: error.message
          })
          this.isLoading = false
        })
    },
    addField() {
      this.fields.push({ id: uuidv1() })
    },
    deleteField(id) {
      this.fields = this.fields.filter(field => field.id != id)
    }
  }
}
</script>

