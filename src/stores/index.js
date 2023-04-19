import { ref } from "vue";

const isLogin = ref(localStorage.getItem("login") || false);

export default {
  isLogin,
};
