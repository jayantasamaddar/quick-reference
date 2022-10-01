<template>
  <form class="add-form" @submit="onSubmit">
    <div class="form-control">
      <label>Add Task</label>
      <input type="text" name="text" placeholder="Add Task" v-model="text" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        name="day"
        placeholder="Add Day & Time"
        v-model="day"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" name="reminder" v-model="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddTaskForm",
  props: {},
  data() {
    return {
      text: "",
      day: "",
      reminder: false,
    };
  },
  methods: {
    onSubmit(e) {
      // Prevent default form submission behaviour
      e.preventDefault();

      if (!this.text) {
        alert("Please add a Task");
        return;
      }
      const newTask = {
        // id: Math.floor(Math.random() * 100000), // json-server automatically adds id
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };
      // Push (emit) task one level up
      this.$emit("add-task", newTask);

      // Reset after form submission
      this.text = "";
      this.day = "";
      this.reminder = false;
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
