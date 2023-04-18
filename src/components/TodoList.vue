<template>
  <div class="todoList">
    <h2>Todo List</h2>
    <p>Get things done, one item at a time.</p>
    <div class="input-group mb-3">
      <input
        v-model="todoInput"
        class="to-do-text form-control"
        @keyup.enter="add"
        placeholder="Add to the todo list"
      />
      <button class="btn btn-secondary btn_add" @click="add()" type="submit">
        Add item <i class="bi bi-airplane"></i>
      </button>
    </div>
    <div v-show="todoList.length" class="card">
      <div class="card-body todoList-box">
        <div class="btn-group tab" role="group">
          <button
            class="btn"
            :class="{ active: tab === 0 }"
            test-tab="all"
            @click="tab = 0"
            type="button"
          >
            Total
          </button>
          <button
            class="btn"
            :class="{ active: tab === 1 }"
            test-tab="done"
            @click="tab = 1"
            type="button"
          >
            Completed
          </button>
          <button
            class="btn"
            :class="{ active: tab === 2 }"
            test-tab="undone"
            @click="tab = 2"
            type="button"
          >
            Pending
          </button>
        </div>
        <ul v-show="filterTodoLis.length" class="todo-list">
          <li v-for="(item, index) in filterTodoLis" :key="item">
            <input
              type="checkbox"
              name="item"
              v-model="item.toggle"
              @click="changeToggle(index, !item.toggle)"
              :value="item.value"
            />
            <div class="input-group">
              <input
                data-test="box_input"
                class="todoList-box_input form-control"
                v-model="item.value"
                @blur="editValue(index, $event)"
                type="text"
              />
            </div>
            <button class="btn btn_delete" @click="deleteItem(index)">
              <i class="bi bi-trash-fill"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import * as axios from "../../__mocks__/axios";

export default {
  setup() {
    const tab = ref(0);
    const todoInput = ref("");
    const todoList = ref([]);
    // 新增
    const add = () => {
      if (todoInput.value === "") return false;
      todoList.value.push({ value: todoInput.value, toggle: false });
      todoInput.value = "";
    };
    // 刪除
    const deleteItem = (index) => {
      todoList.value.splice(index, 1);
    };

    const editValue = (index, e) => {
      todoList.value.splice(index, 1, {
        value: e.target.value,
        toggle: todoList.value[index].toggle,
      });
    };

    const changeToggle = (index, toggle) => {
      todoList.value.splice(index, 1, {
        value: todoList.value[index].value,
        toggle: toggle,
      });
    };

    const filterTodoLis = computed(() => {
      switch (tab.value) {
        case 1:
          return todoList.value.filter((item) => {
            return item.toggle;
          });
        case 2:
          return todoList.value.filter((item) => {
            return !item.toggle;
          });
        default:
          return todoList.value;
      }
    });

    onMounted(() => {
      {
        axios
          .get("toToList.json")
          .then((res) => {
            todoList.value = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    return {
      tab,
      todoInput,
      filterTodoLis,
      todoList,
      add,
      deleteItem,
      editValue,
      changeToggle,
    };
  },
};
</script>
