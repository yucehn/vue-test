<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="loginModal"
    ref="loginModalRef"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="loginModalLabel">
            {{ dialogText }}
          </h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form
            class="row g-3 needs-validation login-from"
            @submit.prevent="handleSubmit"
          >
            <div class="mb-3">
              <label for="username" class="form-label">Account</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <div class="input-group">
                <input
                  v-model="password"
                  :type="passwordShow ? 'text' : 'password'"
                  class="form-control"
                  id="password"
                  placeholder="password"
                  required
                />
                <span class="input-group-text">
                  <i
                    class="bi"
                    role="button"
                    :class="passwordShow ? 'bi-eye-slash' : 'bi-eye'"
                    @click="passwordShow = !passwordShow"
                  />
                </span>
              </div>
            </div>
            <button type="submit" class="btn btn-outline-success btn-submit">
              {{ dialogText }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import axios from "axios";
import { Modal } from "bootstrap";

import Index from "../stores/index";

export default {
  props: {
    openType: {
      type: String,
      default: "signIn",
    },
  },
  setup(props) {
    const { isLogin } = Index;

    const passwordShow = ref(false);
    const username = ref("");
    const password = ref("");

    const dialogText = computed(() => {
      return props.openType === "signIn" ? "Sign In" : "Sign Up";
    });

    const loginModalRef = ref(null);
    const closeModal = () => Modal.getInstance(loginModalRef.value)?.hide();

    const handleSubmit = async () => {
      if (username.value === "" && password.value === "") return;

      let apiResult = {};
      if (props.openType === "signUp") {
        apiResult = await axios.post("/api/add/account", {
          username: username.value,
          password: password.value,
        });
      } else {
        apiResult = await axios.put("/api/login", {
          username: username.value,
          password: password.value,
        });
      }

      if (apiResult.data.result) {
        localStorage.setItem("login", true);
        isLogin.value = true;
        username.value = "";
        password.value = "";
        closeModal();
      } else {
        localStorage.removeItem("login");
        alert(apiResult.data.message);
        isLogin.value = false;
      }
    };

    return {
      username,
      password,
      passwordShow,
      dialogText,
      handleSubmit,
      loginModalRef,
      isLogin,
    };
  },
};
</script>
