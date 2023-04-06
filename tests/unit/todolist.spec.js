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

  it("輸入框有值，enter&click時，todoList列表將新增一條數據，同時清空輸入框", () => {
    const wrapper = shallowMount(ToDoList);
    const length = wrapper.vm.todoInput.length;
    const input = wrapper.find(".to-do-text");
    input.setValue("請完成任務1");
    input.trigger("keyup.enter");
    expect(wrapper.vm.todoList.length).toBe(length + 1);
    input.setValue("請完成任務2");
    wrapper.find(".btn_add").trigger("click");
    expect(wrapper.vm.todoList.length).toBe(length + 2);
    expect(wrapper.vm.todoInput.length).toBe(0);
  });
  // 建立第一筆資料
  const createToDOItem = async (wrapper) => {
    const input = wrapper.find(".to-do-text");
    input.setValue("每天跑步一小時");
    await input.trigger("keyup.enter");
  };
  it("todoList列表支持編輯功能，編輯後更新toDoList", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.find('[data-test="box_input"]').setValue("練習程式30分鐘");
    wrapper.find('[data-test="box_input"]').trigger("blur");
    expect(wrapper.vm.todoList[0].value).toBe("練習程式30分鐘");
  });

  it("todoList列表點擊刪除，同時更新toDoList數組", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.find(".btn_delete").trigger("click");
    expect(wrapper.vm.todoList.length).toBe(0);
  });
  it("點擊todoList列表中某項的已完成按鈕，數據對應更新", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.find('[type="checkbox"]').trigger("click");
    expect(wrapper.vm.todoList[0].toggle).toBe(true);
  });
  it("點擊todoList列表中某項的未完成按鈕，數據對應更新", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.vm.todoList[0].toggle = true;
    wrapper.find('[type="checkbox"]').trigger("click");
    expect(wrapper.vm.todoList[0].toggle).toBe(false);
  });
  it("當todoList列表為空的時候，不顯示待完成字樣", async () => {
    const wrapper = shallowMount(ToDoList);
    expect(wrapper.find(".todoList-box").isVisible()).toBeFalsy();
    await createToDOItem(wrapper);
    expect(wrapper.find(".todoList-box").isVisible()).toBeTruthy();
  });
  // tab change
  it("當todoList列表有已完成資料，按下未完成tab可搜尋已完成資料", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.find('[type="checkbox"]').trigger("click");
    await createToDOItem(wrapper);
    await createToDOItem(wrapper);
    expect(wrapper.vm.filterTodoLis.length).toBe(3);
    wrapper.find('[test-tab="done"]').trigger("click");
    expect(wrapper.vm.filterTodoLis.length).toBe(1);
  });
  it("當todoList列表有未完成資料，按下未完成tab可搜尋未完成資料", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.find('[type="checkbox"]').trigger("click");
    await createToDOItem(wrapper);
    await createToDOItem(wrapper);
    expect(wrapper.vm.filterTodoLis.length).toBe(3);
    wrapper.find('[test-tab="undone"]').trigger("click");
    expect(wrapper.vm.filterTodoLis.length).toBe(2);
  });
  it("當todoList列表有資料，按下全部tab可搜尋全部資料", async () => {
    const wrapper = shallowMount(ToDoList);
    await createToDOItem(wrapper);
    wrapper.find('[type="checkbox"]').trigger("click");
    await createToDOItem(wrapper);
    await createToDOItem(wrapper);
    wrapper.find('[test-tab="all"]').trigger("click");
    expect(wrapper.vm.filterTodoLis.length).toBe(3);
  });

  // it("當頁面掛載的時候去請求數據，請求成功後應該會返回2條數據", (done) => {
  //   const wrapper = shallowMount(ToDoList);
  //   wrapper.vm.$nextTick(() => {
  //     expect(wrapper.vm.todoList.length).toBe(2);
  //     wrapper.find(".btn_delete").trigger("click");
  //     expect(wrapper.vm.todoList.length).toBe(0);
  //     done();
  //   });
  // });
});
