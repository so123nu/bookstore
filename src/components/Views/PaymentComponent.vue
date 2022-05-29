<template>
  <div id="spinner_container_genreal" v-if="isLoading">
    <img src="./../../assets/images/spinner.jpg" alt="" id="spinner_general" />
  </div>

  <div class="container mt-4" v-if="!isLoading">
    <div class="row">
      <div class="col-md-3">
        <ProfileSidebarComponent> </ProfileSidebarComponent>
      </div>
      <div class="col-md-9">
        <div class="h3 mb-4 bg bg-dark text-light p-3">My Payments</div>
        <div class="card mb-4" v-for="payment in payments" :key="payment.id">
          <div class="d-flex">
            <div class="image-container">
              <img
                src="./../../assets/images/poet.webp"
                class="card-img-top"
                id="purchased-book"
              />
            </div>

            <div class="p-3">
              <h5 class="card-title">{{ payment.title }}</h5>
              <div class="d-flex mt-3">
                <p class="card-text price">
                  &#x20b9; {{ payment.total_amount }}
                </p>
                <div id="payment-status">{{ payment.status }}</div>
              </div>
              <a href="#" class="btn btn-secondary">View Details</a>
            </div>
          </div>
        </div>

        <div class="mt-3" v-if="payments.length > 5">
          <paginate
            :page-count="pagination.pageCount"
            :click-handler="clickHandler"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, inject, ref, reactive } from "vue";
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import ProfileSidebarComponent from "./ProfileSidebarComponent.vue";

export default {
  components: {
    paginate: Paginate,
    ProfileSidebarComponent: ProfileSidebarComponent,
  },
  setup() {
    const token = localStorage.getItem("token");
    const baseUrl = inject("baseUrl");

    let pagination = reactive({
      pageCount: 0,
    });

    let isLoading = ref(false);
    let payments = ref([]);

    onMounted(() => {
      myPayments();
    });

    const headers = {
      "Content-Type": "application/json",
      cors: true,
      Authorization: `Bearer ${token}`,
    };

    async function myPayments() {
      //show spinner
      isLoading.value = true;
      const url = `${baseUrl}/payments/transactions`;

      await axios
        .get(url, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            //store data
            payments.value = response.data.data.payments.data;
            pagination.pageCount = response.data.data.payments.last_page;
            console.log(response.data.data.payments.data);
          }
        });

      isLoading.value = false;
    }

    async function clickHandler(page) {
      await axios
        .get(`${baseUrl}/payments/transactions?page=${page}`, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            // collect pagination data
            payments.value = response.data.data.payments.data;
          }
        });
    }

    return {
      isLoading,
      payments,
      pagination,
      clickHandler,
    };
  },
};
</script>


<style scoped>


#payment-status {
  color: #fff;
  border-radius: 5px;
  font-weight: 600;
  font-size: 10px;
  background-color: #388e3c;
  margin-left: 20px;
  padding: 5px;
  display: inline-block;
  margin-bottom: 20px;
}
.image-container {
  height: 200px;
  width: 250px;
}
#purchased-book {
  height: 100%;
  width: 250px;
}
.price {
  font-weight: bold;
}
</style>