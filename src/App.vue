<template>
  <NavigateBar />
  <router-view />
</template>

<script>
import NavigateBar from "@/components/NavigateBar.vue";
export default {
  components: {
    NavigateBar,
  },
};
</script>

<style lang="scss">
@import "./assets/style/main";
</style>
