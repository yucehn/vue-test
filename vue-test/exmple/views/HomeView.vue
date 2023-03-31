<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" @greet="greetUpdate" /> -->
    greet: {{ greet }}
    <TodoList />
  </div>
</template>

<script>
import { ref } from "vue";
import TodoList from "@/components/TodoList.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
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
