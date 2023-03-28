import { shallowMount } from "@vue/test-utils";
import ToDoList from "@/components/ToDoList";

describe("test ToDoList", () => {
  it("輸入框初始值為空字符串", () => {
    const wrapper = shallowMount(ToDoList);
    expect(wrapper.vm.todoInput).toBe("");
  });

  it("列表初始值應該為空數組", () => {
    const wrapper = shallowMount(ToDoList);
    expect(wrapper.vm.todoList.length).toBe(0);
  });

  it("輸入框值變化的時候，toDoText應該跟著變化", () => {
    const wrapper = shallowMount(ToDoList);
    wrapper.find(".to-do-text").setValue("完成todoList");
    expect(wrapper.vm.todoInput).toBe("完成todoList");
  });

  it("輸入框沒有值，enter的時候，無變化", () => {
    const wrapper = shallowMount(ToDoList);
    const length = wrapper.vm.todoInput.length;
    const input = wrapper.find(".to-do-text");
    input.setValue("");
    input.trigger("keyup.enter");
    expect(wrapper.vm.todoInput.length).toBe(length);
  });

  it("輸入框有值，enter的時候，待完成列表將新增一條數據，同時清空輸入框", () => {
    const wrapper = shallowMount(ToDoList);
    const length = wrapper.vm.todoInput.length;
    const input = wrapper.find(".to-do-text");
    input.setValue("請完成任務");
    input.trigger("keyup.enter");
    expect(wrapper.vm.todoList.length).toBe(length + 1);
    expect(wrapper.vm.todoInput.length).toBe(0);
  });

  // 待完成列表支持编辑功能，编辑后更新toDoList数组
});
