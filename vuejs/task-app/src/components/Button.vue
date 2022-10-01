<template>
  <button
    class="btn"
    :name="name.replaceAll(' ', '-').toLowerCase()"
    :style="{ backgroundColor: color }"
    @click="onClick()"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#000",
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>
