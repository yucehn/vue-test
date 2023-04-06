<template>
  <div class="home">
    <TodoList />
  </div>
</template>

<script>
import { ref } from "vue";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "HomeView",
  components: {
    TodoList,
  },
  setup() {
    const greet = ref(0);
    const greetUpdate = (val) => {
      greet.value = val;
    };
    return {
      greetUpdate,
      greet,
    };
  },
};
</script>
