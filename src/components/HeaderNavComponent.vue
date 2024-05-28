<template>
  <nav id="navbar-header" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <h2>Invoices</h2>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-4 me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Total 4 invoices</a>
          </li>
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav mb-2 mb-lg-0 me-4">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter by Type
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Paid</a></li>
                <li><a class="dropdown-item" href="#">Pending</a></li>
                <li><a class="dropdown-item" href="#">Not Paid</a></li>
                <li><a class="dropdown-item" href="#">Newest</a></li>
              </ul>
            </li>
          </ul>
          <button class="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <DocumentPlusIcon class="document-plus me-2" /> Add New
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { DocumentPlusIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    DocumentPlusIcon
  }
}
</script>

<style scoped>
#navbar-header a {
  color: white !important;
}
#navbar-header h2 {
  color: white;
}
.dropdown-menu {
  background-color: #1e2139;
}
.document-plus {
  height: 18px;
  width: 18px;
  position: relative;
  bottom: 2px;
}
</style>