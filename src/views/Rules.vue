<template>
  <div class="home">
    <h1>Rules</h1>
    <rules-list />
  </div>
</template>

<script>
import RulesList from '../components/RulesList'
export default {
  name: 'rules',
  components: {
    RulesList
  }
}
</script>
