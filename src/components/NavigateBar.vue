<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><img src="../assets/images/logo.png" height="30"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">Home</a>
          </li> -->
        </ul>
        <div v-if="!isLogin">
          <button
            class="btn btn-secondary me-2 btn-signIn"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            @click="openType = 'signIn'"
          >
            Sign in
          </button>
          <button
            class="btn btn-outline-secondary btn-signUp"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            @click="openType = 'signUp'"
          >
            Sign up
          </button>
        </div>
        <button v-else class="btn btn-secondary btn-logout" @click="logout()">
          Logout
        </button>
      </div>
    </div>
  </nav>
  <DialogLogin :openType="openType" />
</template>

<script>
import { ref } from "vue";
import DialogLogin from "./DialogLogin.vue";
import Index from "../stores/index";

export default {
  components: { DialogLogin },
  setup() {
    const { isLogin } = Index;
    const passwordShow = ref(false);
    const openType = ref("");

    const logout = () => {
      localStorage.removeItem("login");
      isLogin.value = false;
    };

    return {
      passwordShow,
      openType,
      logout,
      isLogin,
    };
  },
};
</script>
