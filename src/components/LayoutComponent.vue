<template>
  <div class="container-fluid app">
    <div class="row">
      <div class="col-md-1 p-0 m-0">
        <SideNavComponent />
      </div>
      <div class="col-md-11">
        <HeaderNavComponent />        
        <slot name="page-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavComponent from './SideNavComponent.vue'
import HeaderNavComponent from './HeaderNavComponent.vue'
export default {
  components: {
    SideNavComponent,
    HeaderNavComponent
  }
}
</script>

<style scoped>
.app {
  background-color: #141625;
}
</style>