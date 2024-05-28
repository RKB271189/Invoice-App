<template>
  <div>
    <div class="row g-0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Qty.</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in itemList" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <input type="text" v-model="item.name" class="form-control name-field" required />
            </td>
            <td>
              <input
                type="number"
                v-model="item.qty"
                class="form-control qty-field"
                @input="$emit('calculateTotal', item)"
                required
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.price"
                class="form-control price-field"
                @input="$emit('calculateTotal', item)"
                required
              />
            </td>
            <td>{{ item.total }}</td>
            <td>
              <TrashIcon
                class="action-icon"
                @click="$emit('removeItem', index)"
                :style="{ cursor: 'pointer' }"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row g-0">
      <div class="col-md-9">
        <button class="btn btn-outline-info" type="button" @click="$emit('addNewItem')">
          <PlusCircleIcon class="document-plus me-2" /> Add New Item
        </button>
      </div>
      <div class="col-md-3">
        <span class="btn btn-info float-end">Total : {{ calculateItemTotal.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { TrashIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
export default {
  components: { TrashIcon, PlusCircleIcon },
  props: {
    itemList: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {    
    const calculateItemTotal = computed(() => {      
      const invoice_total = props.itemList.reduce((sum, item) => sum + parseFloat(item.total), 0)
      context.emit('setInvoiceTotal', invoice_total)
      return invoice_total
    })

    return {
      calculateItemTotal
    }
  }
}
</script>

<style scoped>
.action-icon {
  width: 20px;
  height: 20px;
}
.name-field {
  width: 150px;
}
.price-field {
  width: 100px;
}
.qty-field {
  width: 80px;
}
.document-plus {
  height: 18px;
  width: 18px;
  position: relative;
  bottom: 2px;
}
</style>