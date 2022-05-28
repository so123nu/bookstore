<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#"
        ><img id="logo" src="./assets/logo/logo.png" />
      </a>
      <router-link class="navbar-brand" to="/" id="logo_text">
        BOOKSTORE</router-link
      >
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
      <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/register" v-if="!token"
              >Register</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!token"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/login"
              v-if="token"
              @click="logout"
              >Logout</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile" v-if="token"
              >Profile</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Adventure</a></li>
              <li><a class="dropdown-item" href="#">Fictional</a></li>
              <li><a class="dropdown-item" href="#">Comedy</a></li>
              <li><a class="dropdown-item" href="#">Education</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <router-view></router-view>
  <div id="spinner_container_genreal" v-if="isLoading">
    <img src="./assets/images/spinner.jpg" alt="" id="spinner_general" />
  </div>
</template>
<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { provide } from "vue";

export default {
  name: "App",
  components: {},

  setup() {
    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:8000/api";

    provide("baseUrl", baseUrl);
    provide("token", token);

    function logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return {
      token,
      logout,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#logo {
  height: 50px;
  width: 100%;
  background: none;
}
#logo_text {
  letter-spacing: 4px;
  font-size: 20px;
  font-weight: bolder;
  margin-right: 50px;
  margin-left: -10px;
  color: #3944f7;
}

#spinner_container {
  background-color: #e1a70a;
  text-align: center;
}
#spinner {
  height: 35px;
  padding: 5px;
}

#spinner_container_genreal {
  margin-left: 65%;
  margin-top: 20%;
  transform: translate(-50%, -50%);
}

#spinner_general {
  height: 50px;
}
</style>
