<template>
  <section>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <LoginForm />
    </b-modal>
  </section>
</template>

<script>
import LoginForm from './LoginForm'

export default {
  props: ['isComponentModalActive'],
  components: {
    LoginForm
  }
}
</script>
