<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Hello World</p>
    <h3>Installed CLI Plugins</h3>
    <button data-test="button" @click="increment">Increment</button>
    <p data-test="count">{{ count }}</p>
    <div>
      password: <input data-test="password" v-model="password" />
      <p v-if="showError && isError" data-test="errorMsg">
        Password must be at least {{ minLength }} characters.
      </p>
    </div>

    <p id="visible" data-test="todo" style="display: none">Profile</p>
    <div>email: <input type="email" v-model="email" data-test="email" /></div>
    <Child @updateTest="updateTest" />
    test: {{ test }}
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Child from "./ChildComponent.vue";
export default {
  name: "HelloWorld",
  components: { Child },
  props: {
    msg: String,
    showError: Boolean,
  },
  setup(props, content) {
    const email = ref("test@123.com");
    const minLength = 6;
    const count = ref(0);
    const increment = () => {
      count.value = count.value + 1;
      content.emit("greet", count.value);
    };
    const password = ref("");
    const isError = computed(() => password.value.length < minLength);

    const test = ref("");
    const updateTest = (val) => {
      test.value = val;
    };

    return {
      count,
      increment,
      password,
      isError,
      minLength,
      email,
      updateTest,
      test,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
