<template>
  <div id="spinner_container_genreal" v-if="isLoading">
    <img src="./../../assets/images/spinner.jpg" alt="" id="spinner_general" />
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-4 mt-5" v-for="book in books" :key="book.id">
        <div class="card" style="width: 18rem">
          <img
            src="./../../assets/images/poet.webp"
            class="card-img-top"
            alt="..."
            id="book_image"
          />
          <div class="card-body">
            <h5 class="card-title">
              <strong> &#8377; {{ book.price }} </strong>
            </h5>
            <p class="card-text">{{ book.title.slice(0, 60) }}..</p>
            <router-link
              :to="{ name: 'BookDetails', params: { id: book.id } }"
              class="btn btn-primary"
              >Buy Now</router-link
            >
          </div>
        </div>
      </div>

      <div class="mt-3" v-if="books.length > 0">
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
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { inject, onMounted, ref, reactive } from "vue";
import axios from "axios";
import Paginate from "vuejs-paginate-next";

export default {
  name: "HomeComponent",
  components: {
    paginate: Paginate,
  },

  setup() {
    const token = localStorage.getItem("token");
    const baseUrl = inject("baseUrl");

    let isLoading = ref(false);
    let books = ref([]);
    let pagination = reactive({
      pageCount: 0,
    });

    onMounted(() => {
      booksList();
    });

    function logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    const headers = {
      "Content-Type": "application/json",
      cors: true,
    };

    async function booksList() {
      //show spinner
      isLoading.value = true;
      const url = `${baseUrl}/books`;

      await axios
        .get(url, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            //throw success response
            books.value = response.data.data.books.data;
            pagination.pageCount = response.data.data.books.last_page;
          }
        });

      isLoading.value = false;
    }

    async function clickHandler(page) {
      isLoading.value = true;

      await axios
        .get(`${baseUrl}/books?page=${page}`, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            // //throw success response
            books.value = response.data.data.books.data;
          }
        });

      isLoading.value = false;
    }

    return {
      token,
      isLoading,
      books,
      pagination,
      logout,
      booksList,
      clickHandler,
    };
  },
};
</script>

<style scoped>
#book_image {
  height: 350px;
  width: 100%;
}
</style>