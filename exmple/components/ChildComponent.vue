<template>
  <div>
    Child
    <button @click="sayHello('hello')">Child click</button>
  </div>
</template>

<script>
export default {
  setup(props, content) {
    const sayHello = (val) => {
      content.emit("updateTest", val);
    };
    return {
      sayHello,
    };
  },
};
</script>
