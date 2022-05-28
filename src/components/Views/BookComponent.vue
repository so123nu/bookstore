<template>
  <div id="spinner_container_genreal" v-if="isLoading">
    <img src="./../../assets/images/spinner.jpg" alt="" id="spinner_general" />
  </div>
  <div class="container mt-4" v-if="!isLoading">
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <img
            src="./../../assets/images/poet.webp"
            class="card-img-top"
            alt="..."
            id="book_image"
          />
        </div>
        <button type="button" class="btn btn-primary btn-lg mt-3 form-control">
          Buy
        </button>
      </div>
      <div class="col-md-9">
        <div class="card p-3">
          <div class="book-title">{{ book.title }}</div>
          <div class="d-flex">
            <div class="rating">
              {{ book.rating }} <i class="fa-solid fa-star"></i>
            </div>
            <div class="rating-text">9 Ratings & 0 Reviews</div>
          </div>

          <div class="price-text">Special price</div>
          <div class="d-flex">
            <div class="price">&#x20b9; {{ book.price }}</div>
            <div class="price-off">60% off</div>
          </div>

          <div class="d-flex mt-3">
            <div class="mr_right">Publisher</div>
            <div>{{ book.publisher }}</div>
          </div>
          <div class="d-flex mt-3">
            <div class="mr_right"><div>Number of Pages</div></div>
            <div>
              <div>{{ book.pages }}</div>
            </div>
          </div>
          <div class="d-flex mt-3">
            <div class="mr_right">ISBN</div>
            <div>{{ book.isbn }}</div>
          </div>
          <div class="d-flex mt-3">
            <div class="mr_right">Description</div>
            <div>
              {{ book.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { onMounted, inject, ref, reactive } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const token = localStorage.getItem("token");
    const baseUrl = inject("baseUrl");
    const route = useRoute();

    let isLoading = ref(false);
    let book = reactive({
      book: {
        title: "",
        isbn: "",
        author: "",
        price: "",
        description: "",
        publisher: "",
        pages: "",
        rating: "",
      },
    });

    onMounted(() => {
      const id = route.params.id;
      bookDetails(id);
    });

    const headers = {
      "Content-Type": "application/json",
      cors: true,
      Authorization: `Bearer ${token}`,
    };

    async function bookDetails(id) {
      //show spinner
      isLoading.value = true;
      const url = `${baseUrl}/book/${id}`;

      await axios
        .get(url, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            //store data
            book.title = response.data.data.book.title;
            book.isbn = response.data.data.book.isbn;
            book.author = response.data.data.book.author;
            book.price = response.data.data.book.price;
            book.description = response.data.data.book.description;
            book.publisher = response.data.data.book.publisher.name;
            book.pages = response.data.data.book.total_pages;
            book.rating = response.data.data.book.rating;
          }
        });

      isLoading.value = false;
    }

    return {
      book,
      isLoading,
    };
  },
};
</script>

<style scoped>
.book-title {
  padding: 0;
  line-height: 1.4;
  font-size: 25px;
  font-weight: inherit;
  display: inline-block;
  margin-bottom: 10px;
}
.rating {
  display: inline-block;
  color: #fff;
  padding: 2px 6px 2px 8px;
  border-radius: 3px;
  font-weight: 500;
  font-size: 12px;
  vertical-align: middle;
  background-color: #388e3c;
}
.rating-text {
  padding-left: 8px;
  font-weight: 500;
  color: #878787;
}

.price-text {
  font-weight: 500;
  text-align: left;
  color: #388e3c;
  margin: 12px 0 -5px;
}
.price {
  font-size: 28px;
  font-weight: 600;
  vertical-align: sub;
}

.price-off {
  margin-left: 18px;
  font-size: 16px;
  font-weight: 500;
  color: #388e3c;
  vertical-align: baseline;
  margin-top: 12px;
}

.mr_right {
  margin-right: 20px;
  width: 100px;
}
</style>