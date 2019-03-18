<template>
  <form action>
    <div class="modal-card" style="width: 500px">
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input type="text" placeholder="schema name" required></b-input>
        </b-field>

        <b-field label="Type">
          <b-select placeholder="Select a character" expanded>
            <option value="Point">Point</option>
            <option value="LineString">LineString</option>
            <option value="Plolygon">Polygon</option>
          </b-select>
        </b-field>
        <b-field label="Properties">
          <button class="button is-fullwidth" type="button">
            <b-icon pack="fas" icon="plus"/>
          </button>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Save</button>
      </footer>
    </div>
  </form>
</template>
