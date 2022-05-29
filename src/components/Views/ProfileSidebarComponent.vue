<template>
  <ul class="list-group">
    <li class="list-group-item">
      <router-link class="profile_link" to="/profile">Profile</router-link>
    </li>
    <li class="list-group-item">
      <router-link class="profile_link" to="/my/payments">Payments</router-link>
    </li>
    <li class="list-group-item">
      <a class="profile_link" href="">Orders</a>
    </li>
    <li class="list-group-item">
      <a class="profile_link" href="">My Books</a>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
.profile_link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}
</style>