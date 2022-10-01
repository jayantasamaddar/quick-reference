<template>
  <div
    :class="['task', { reminder: task.reminder }]"
    @dblclick="toggleReminder(task.id)"
  >
    <h3>
      {{ task.text }}
      <i class="fa fa-times" @click="onDelete(task.id)"></i>
    </h3>
    <p class="day">{{ task.day }}</p>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-task", id);
    },
    toggleReminder(id) {
      this.$emit("toggle-reminder", id);
    },
  },
};
</script>

<style scoped>
.task {
  background-color: #f4f4f4;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
}

.fa-times {
  color: darkred;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
