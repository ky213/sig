<template>
  
</template>

<script>
export default {
  layout: 'dashboard',
  validate({ params, query, store }) {
    return store.state.user.authenticated
  }
}
</script>

<style>
</style>
