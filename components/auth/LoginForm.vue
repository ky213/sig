<template>
  <form action="" @submit.prevent="login">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p v-if="!error" class="modal-card-title">Login</p>
        <b-message v-else type="is-danger" has-icon>
          {{error}}
        </b-message>
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input
            type="text"
            v-model="username"
            placeholder="Your username"
            required>
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Your password"
            required>
          </b-input>
        </b-field>
<!--        <b-checkbox>Remember me</b-checkbox>-->
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button :class="['button', 'is-primary', {'is-loading': isLoading}]">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    login() {
      this.isLoading = true
      axios({
        method: 'post',
        url: 'http://10.1.1.177:8080/admin/api/auth/login',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(({ data: { accessToken } }) => {
          localStorage.setItem('sigToken', accessToken)
          this.$store.commit(
            'user/login',
            jwt_decode(accessToken).auth.split(',')
          )
          this.$emit('close')
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          this.error = error.message
          console.log('Error!!', error.message)
        })
    }
  }
}
</script>
