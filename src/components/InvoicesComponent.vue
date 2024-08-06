<template>
  <div>
    <div class="alert alert-success" role="alert">
      <div class="row">
        <div class="col-md-2">Order No.</div>
        <div class="col-md-2">Date</div>
        <div class="col-md-3">Name</div>
        <div class="col-md-2">Price</div>
        <div class="col-md-2">Status</div>
        <div class="col-md-1">Action</div>
      </div>
    </div>
    <div class="alert bg-table-row" v-for="(invoice, index) in invoiceList" :key="index" role="alert">
      <div class="row">
        <div class="col-md-2">{{ index + 1 }}</div>
        <div class="col-md-2">{{ invoice.invoice_date }}</div>
        <div class="col-md-3">{{ invoice.name }}</div>
        <div class="col-md-2">$500</div>
        <div class="col-md-2">
          <span class="badge bg-paid" :style="{ width: '120px' }">Paid</span>
        </div>
        <div class="col-md-1">
          <ArrowRightIcon class="open-invoice-btn" @click="$emit('openModalInvoice', invoice.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    ArrowRightIcon
  },
  props: {
    invoiceList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.bg-table-row {
  background-color: #1e2139;
  color: white;
}
.bg-paid {
  background-color: #06c3442b;
}
.open-invoice-btn {
  width: 15px;
  height: 15px;
}
</style>