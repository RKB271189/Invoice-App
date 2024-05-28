<template>
  <LayoutComponent>
    <template v-slot:page-content>
      <InvoiceCreateComponent ref="invoiceCreateModal" />
      <div class="container position-relative" :style="{ top: '50px' }">
        <InvoicesComponent :invoiceList="invoiceList" @openModalInvoice="openModalInvoice" />
      </div>
    </template>
  </LayoutComponent>
</template>

<script>
import InvoicesComponent from '../components/InvoicesComponent.vue'
import LayoutComponent from '../components/LayoutComponent.vue'
import InvoiceCreateComponent from '../components/InvoiceCreateComponent.vue'
import { useStore } from 'vuex'
import useAPIRequest from '@/services/api-request'
import { ref, computed, onMounted } from 'vue'
export default {
  components: {
    LayoutComponent,
    InvoicesComponent,
    InvoiceCreateComponent
  },
  setup() {
    const store = useStore()
    const { hasError, message, loading, showToast, handleAPIRequest } = useAPIRequest()
    const invoiceList = computed(() => store.state.Home.invoiceList)
    onMounted(() => {
      getInvoiceList()
    })
    const invoiceCreateModal = ref(null)
    const openModalInvoice = (id) => {
      invoiceCreateModal.value.showModal(id)
    }
    const getInvoiceList = async () => {
      await handleAPIRequest('Home', 'Home/GET_INVOICE_LIST')
    }
    return {
      hasError,
      message,
      loading,
      handleAPIRequest,
      showToast,
      invoiceList,
      getInvoiceList,
      openModalInvoice,
      invoiceCreateModal
    }
  }
}
</script>

<style scoped>
</style>