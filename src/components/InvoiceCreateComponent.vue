<template>
  <div>
    <ToastComponent :hasError="hasError" :message="message" :showToast="showToast" />
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref="invoiceCreateModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Invoice</h5>
            <!-- <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> -->
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="name" class="form-label">Client's Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.name"
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="email" class="form-label">Client's Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="clientDetails.email"
                    id="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="address" class="form-label">Street Address</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.address"
                    id="address"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="city" class="form-label">City</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.city"
                    id="city"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="province" class="form-label">Province</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.province"
                    id="province"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="zip_code" class="form-label">ZIP Code</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.zip_code"
                    id="zip_code"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="country" class="form-label">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.country"
                    id="country"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="invoice_date" class="form-label">Invoice Date</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.invoice_date"
                    id="invoice_date"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="due_date" class="form-label">Due Date</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.due_date"
                    id="due_date"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label for="project_description" class="form-label">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="clientDetails.project_description"
                    id="project_description"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label for="project_description" class="form-label">Item List</label>
                </div>
              </div>
            </div>
            <div cslas="row">
              <ItemListComponent
                :itemList="itemList"
                @calculateTotal="calculateTotal"
                @addNewItem="addNewItem"
                @removeItem="removeItem"
                @setInvoiceTotal="setInvoiceTotal"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
              @click="resetInvoice()"
            >
              Close
            </button>
            <button type="button" class="btn btn-outline-primary" @click="submitInvoice()">
              {{ isUpdate ? 'Update' : 'Generate' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
//import { useStore } from 'vuex'
import ItemListComponent from './ItemListComponent.vue'
import ToastComponent from './ToastComponent.vue'
import useAPIRequest from '@/services/api-request'
import { uuid } from 'vue-uuid'
import { Modal } from 'bootstrap'
import { useStore } from 'vuex'
export default {
  components: {
    ItemListComponent,
    ToastComponent
  },
  setup(props, { expose }) {
    const store = useStore()
    const { hasError, message, loading, showToast, handleAPIRequest } = useAPIRequest()
    const clientDetails = ref({
      name: '',
      email: '',
      address: '',
      city: '',
      zip_code: '',
      country: '',
      province: '',
      invoice_date: '',
      due_date: '',
      status: 'pending',
      project_description: '',
      invoice_total: 0
    })
    const itemList = ref([
      {
        name: '',
        price: 0,
        qty: 0,
        total: 0
      }
    ])
    const invoiceId = ref(null)
    const invoiceCreateModal = ref(null)
    let invoiceModalInstance = null
    const isUpdate = ref(false)
    const showModal = async (id) => {
      isUpdate.value = true
      invoiceId.value = id
      invoiceCreateModal.value.classList.add('show')
      invoiceModalInstance.show()
      if (invoiceId.value) await getInvoiceDetail()
    }
    expose({ showModal })
    onMounted(async () => {
      const invoiceModalEl = document.getElementById('staticBackdrop')
      invoiceModalInstance = new Modal(invoiceModalEl)
    })
    const getInvoiceDetail = async () => {
      await handleAPIRequest('Home', 'Home/GET_SINGLE_INVOICE', invoiceId.value)
      const clientDetailsFromFrb = computed(() => store.state.Home.clientDetails)
      if (Object.keys(clientDetailsFromFrb.value).length > 0) {
        clientDetails.value = clientDetailsFromFrb.value
        itemList.value = clientDetailsFromFrb.value.itemList
      }
    }
    const addNewItem = () => {
      itemList.value.push({
        name: '',
        price: 0,
        qty: 0,
        total: 0
      })
    }
    const removeItem = (index) => {
      if (itemList.value.length > 1) {
        itemList.value.splice(index, 1)
      }
    }
    const calculateTotal = (item) => {
      let price = parseFloat(item.price)
      if (!isNaN(price) && !isNaN(item.qty) && price > 0 && item.qty > 0) {
        item.total = (price * item.qty).toFixed(2)
      }
    }
    const setInvoiceTotal = (invoice_value) => {
      clientDetails.value.invoice_total = invoice_value
    }
    const submitInvoice = async () => {
      if (
        !clientDetails.value.name ||
        !clientDetails.value.email ||
        !clientDetails.value.address ||
        !clientDetails.value.city ||
        !clientDetails.value.country ||
        !clientDetails.value.due_date ||
        !clientDetails.value.invoice_date ||
        !clientDetails.value.invoice_total ||
        !clientDetails.value.project_description ||
        !clientDetails.value.province ||
        !clientDetails.value.zip_code
      ) {
        showToast.value = true
        hasError.value = true
        message.value = 'All the fields are necessary to be filled'
      } else {
        clientDetails.value.id = uuid.v4()
        clientDetails.value.itemList = itemList.value
        await handleAPIRequest('Home', 'Home/SUBMIT_INVOICE_DETAILS', clientDetails.value)
      }
    }
    const resetInvoice = () => {
      clientDetails.value = {
        name: '',
        email: '',
        address: '',
        city: '',
        zip_code: '',
        country: '',
        province: '',
        invoice_date: '',
        due_date: '',
        status: 'pending',
        project_description: '',
        invoice_total: 0
      }
      itemList.value = [
        {
          name: '',
          price: 0,
          qty: 0,
          total: 0
        }
      ]
      isUpdate.value = false
    }
    return {
      hasError,
      message,
      loading,
      showToast,
      clientDetails,
      itemList,
      addNewItem,
      removeItem,
      setInvoiceTotal,
      calculateTotal,
      submitInvoice,
      showModal,
      isUpdate,
      invoiceCreateModal,
      resetInvoice
    }
  }
}
</script>

<style scoped>
.modal-content {
  background-color: #1e2139;
  color: white;
}
</style>