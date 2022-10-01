<template>
  <AddTaskForm v-show="showAddTaskForm" @add-task="addTask" />
  <Tasks
    :tasks="tasks"
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
  />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTaskForm from "../components/AddTaskForm";

export default {
  name: "Home",
  props: {
    showAddTaskForm: Boolean,
  },
  components: {
    Tasks,
    AddTaskForm,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    /** Add a Task */
    async addTask(task) {
      const response = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();

      this.tasks = this.tasks.concat(data);
    },
    /** Delete a Task */
    async deleteTask(id) {
      if (
        confirm(
          `Delete task "${this.tasks.find((task) => task.id === id).text}"?`
        )
      ) {
        const response = await fetch(`api/tasks/${id}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        } else alert("Error Deleting Task!");
      }
    },
    /** Toggle Task reminder on/off */
    async toggleReminder(id) {
      /** Fetch and Modify Task to Update */
      const task = await this.fetchTask(id);
      const updatedTask = Object.assign(task, { reminder: !task.reminder });

      /** Update Database with Task Object */
      const response = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      /** Get back data */
      const data = await response.json();

      /** Update UI */
      if (response.status === 200) {
        this.tasks = this.tasks.map((task) =>
          task.id === id
            ? Object.assign(task, { reminder: data.reminder })
            : task
        );
      }
    },
    /** GET all Tasks */
    async fetchTasks() {
      const response = await fetch("api/tasks");
      const data = response.json();
      return data;
    },
    /** GET Task by ID */
    async fetchTask(id) {
      const response = await fetch(`api/tasks/${id}`);
      const data = response.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
