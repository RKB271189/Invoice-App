<template>
  <ul id="navbar-left" class="nav flex-column">
    <ClipboardDocumentListIcon class="navbar-main-icon" />
  </ul>
</template>

<script>
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    ClipboardDocumentListIcon
  }
}
</script>

<style scoped>
#navbar-left {
  height: 100vh;
  background-color: #1e2139;
  padding-left: 0; 
}
.navbar-main-icon {
  color: white;
  width: 90px;
  height: 78px;
  position: relative;
  left: 8px;
  top: 10px;
}
</style>