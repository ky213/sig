<template>
  
</template>

<script>
export default {
  layout: 'dashboard',
  validate({ params, query, store }) {
    return store.state.user.roles.includes("ROLE_SIG_ADMIN")
  }
}
</script>

<style>
</style>
