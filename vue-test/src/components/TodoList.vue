<template>
  <div class="todoList">
    <div>
      ToDoList
      <input
        class="to-do-text"
        v-model="todoInput"
        @keyup.enter="add"
        placeholder="請輸入計畫要做的事情"
      />
      <button class="btn_add" @click="add()" type="submit">click</button>
    </div>
    <div v-show="todoList.length" class="todoList-box">
      <div class="tab">
        <button test-tab="all" @click="tab = 0" type="button">全部</button>
        <button test-tab="done" @click="tab = 1" type="button">已完成</button>
        <button test-tab="undone" @click="tab = 2" type="button">未完成</button>
      </div>
      <ul v-show="filterTodoLis.length">
        <li v-for="(item, index) in filterTodoLis" :key="item">
          <input
            type="checkbox"
            name="item"
            v-model="item.toggle"
            @click="changeToggle(index, !item.toggle)"
          />
          <div>
            <input
              data-test="box_input"
              class="todoList-box_input"
              v-model="item.value"
              @blur="editValue(index, $event)"
              type="text"
            />
          </div>
          <button class="btn_delete" @click="deleteItem(index)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const tab = ref(0);
    const todoInput = ref("");
    const todoList = ref([]);
    // 新增
    const add = () => {
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

<style scoped lang="scss">
.todoList {
  width: 360px;
  margin: 0 auto;
  &-box {
    ul {
      padding: 10px;
      margin: 10px auto;
      text-align: center;
      border: 1px solid gray;
    }
    li {
      display: flex;
      justify-content: space-between;
      text-align: left;
      padding: 10px;
    }
    &_input {
      border: none;
      &:focus {
        border: 1px solid gray;
      }
    }
  }
  .tab {
    margin-top: 10px;
  }
}
</style>
