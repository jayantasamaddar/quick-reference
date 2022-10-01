<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="homePage"
      :name="showAddTaskForm ? 'Close' : 'Add Task'"
      :color="showAddTaskForm ? 'darkred' : 'green'"
      @onClick="$emit('toggle-add-task')"
    />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  props: {
    title: String,
    showAddTaskForm: {
      type: Boolean,
    },
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else return false;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
