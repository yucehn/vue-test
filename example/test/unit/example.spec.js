// import { shallowMount, mount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
// import Child from "@/components/ChildComponent.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });

//   const wrapper = mount(HelloWorld);
//   it("renders a div", () => {
//     expect(wrapper.exists("div")).toBe(true);
//   });

//   it("has a button", () => {
//     expect(wrapper.exists("button")).toBe(true);
//   });

//   it("get data-test=todo Profile", () => {
//     // get: 查找，沒找到噴錯，通常用於必須存在時
//     // toBe: 檢查等於
//     expect(wrapper.get('[data-test="todo"]').text()).toBe("Profile");
//   });

//   it("admin not exists", () => {
//     // find: 查找，沒找到不噴錯，通常用於檢查是否存在時
//     // exists: 檢查存在
//     expect(wrapper.find("#admin").exists()).toBe(false);
//   });

//   it("Contain Text: Hello World ", () => {
//     // html: 獲取渲染的 html
//     // toContain: 檢查包含
//     expect(wrapper.html()).toContain("Hello World");
//   });

//   it("visible test", () => {
//     // isVisible: 檢查可視(display: none, opacity: 0, visibility: hidden)
//     expect(wrapper.get("#visible").isVisible()).toBe(false);
//   });

//   it("setValue test", async () => {
//     // setValue: 修改表單元素值
//     await wrapper.get('[data-test="password"]').setValue("123456");
//     expect(wrapper.find('[data-test="errorMsg"]').exists()).toBe(false);
//   });

//   // TODO setData: 修改狀態?

//   it("check email data value", async () => {
//     // vm: 取得 vue instance
//     expect(wrapper.vm.email).toBe("test@123.com");
//   });

//   it("not render error if prop showError is false", async () => {
//     await wrapper.get('[data-test="password"]').setValue("abcde1234");
//     // setProps: 修改 props 資料
//     await wrapper.setProps({ showError: true });
//     expect(wrapper.find('[data-test="errorMsg"]').exists()).toBe(false);
//   });

//   it("count became 1 after clicked once", async () => {
//     const wrapper = mount(HelloWorld);
//     // trigger: 觸發 DOM 事件
//     await wrapper.get('[data-test="button"]').trigger("click");
//     expect(wrapper.get('[data-test="count"]').text()).toBe("1");
//   });

//   it("check emit triggered", async () => {
//     const wrapper = mount(HelloWorld);
//     const button = wrapper.find('[data-test="button"]');
//     // 觸發事件
//     await button.trigger("click");
//     // 檢查觸發事件中包含 greet emit 事件
//     // emitted: 回傳一個紀錄元件發出的所有事件的物件，也可取得指定事件內容
//     // toHaveProperty: jest 檢查物件中是否存在某屬性
//     expect(wrapper.emitted()).toHaveProperty("greet");
//     const greetEvent = wrapper.emitted("greet");
//     // toEqual: 比較物件的所有屬性或陣列的所有元素是否相等
//     expect(greetEvent[0]).toEqual([1]);
//   });

//   it("uses shallowMount", async () => {
//     const wrapper = shallowMount(HelloWorld);
//     await wrapper.findComponent(Child).vm.$emit("update");
//   });
// });
