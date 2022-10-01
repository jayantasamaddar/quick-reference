<template>
  <footer>
    <p>Copyright &copy; 2021</p>
    <div class="links">
      <router-link to="/" title="Home">Home</router-link>
      <router-link to="/about" title="About">About</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
a {
  color: #333;
}

.links {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

footer {
  margin-top: 30px;
  text-align: center;
}
</style>
