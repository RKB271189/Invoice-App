<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="invoiceCreateModal"
  ></div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import { Modal } from 'bootstrap'

const invoiceCreateModal = ref(null)
let modalInstance = null
const showModal = (id) => {
  console.log(id)
  invoiceCreateModal.value.classList.add('show')
  modalInstance.show()
  //console.log('It is working')
}
onMounted(() => {
  const modalEl = document.getElementById('staticBackdrop')
  modalInstance = new Modal(modalEl)
})
defineExpose({
  showModal
})
//return { showModal }
</script>

<style>
</style>