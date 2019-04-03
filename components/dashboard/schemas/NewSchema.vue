<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-card" style="width: 500px">
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            name="name"
            type="text"
            :value="schemaToEdit ? schemaToEdit.name : ''"
            placeholder="schema name"
            required
          ></b-input>
        </b-field>

        <b-field label="Type">
          <div class="control is-expanded">
            <span class="select is-fullwidth is-empty">
              <select name="topo" required>
                <option
                  v-if="!schemaToEdit"
                  selected="selected"
                  disabled="disabled"
                  hidden="hidden"
                  required
                >Geometry Type</option>
                <option
                  value="Point"
                  :selected="schemaToEdit && schemaToEdit.topo === 'Point'"
                >Point</option>
                <option
                  value="LineString"
                  :selected="schemaToEdit && schemaToEdit.topo === 'LineString'"
                >Line</option>
                <option
                  value="Polygon"
                  :selected="schemaToEdit && schemaToEdit.topo === 'Polygon'"
                >Polygon</option>
              </select>
            </span>
          </div>
        </b-field>
        <b-field label="Properties"></b-field>
        <b-field v-for="(field) in fields" :key="field.key" :id="field.key">
          <b-input
            name="propName"
            :value="Object.keys(field)[2]"
            class="w-100"
            type="text"
            placeholder="prop name"
          ></b-input>
          <div class="control">
            <span class="select is-empty">
              <select name="propType" type="text">
                <option
                  v-if="Object.keys(field).length <= 1"
                  selected="selected"
                  disabled="disabled"
                  hidden="hidden"
                >prop type</option>
                <option value="number" :selected="Object.values(field)[2]==='Number'">number</option>
                <option value="string" :selected="Object.values(field)[2]==='String'">text</option>
              </select>
            </span>
            <!---->
          </div>
          <button
            v-if="field.isNewField"
            type="button"
            class="button"
            @click="deleteField(field.key)"
          >
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

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://box.eadn.dz/sig-backend'

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
      const method = this.schemaToEdit ? 'put' : 'post'
      const id = method === 'put' ? this.schemaToEdit._id : ''
      const commit =
        method === 'put' ? 'schemas/updateSchema' : 'schemas/addNewSchema'

      axios({
        method,
        url: `${host}/schemas/${id}`,
        data: schema
      })
        .then(({ data }) => {
          this.$notification.success({
            message: 'Success!',
            description: 'Saved to database'
          })
          console.log(data)

          schema._id = method === 'post' ? data._id : this.schemaToEdit._id
          this.$store.commit(commit, schema)
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
      this.fields.push({ key: uuidv1(), isNewField: true })
    },
    deleteField(key) {
      console.log('key!!!!', key)

      this.fields = this.fields.filter(field => field.key != key)
    }
  },
  beforeMount() {
    if (this.schemaToEdit)
      for (const prop in this.schemaToEdit.properties) {
        this.fields.push({
          key: uuidv1(),
          isNewField: false,
          [prop]: this.schemaToEdit.properties[prop]
        })
      }
  }
}
</script>

