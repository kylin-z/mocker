<template>
  <div class="home">
    <h1>Modules</h1>
    <modules-list />
  </div>
</template>

<script>
import ModulesList from '../components/ModulesList'
export default {
  name: 'modules',
  components: {
    ModulesList
  }
}
</script>
