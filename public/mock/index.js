const Mock = require("mockjs");

const data = Mock.mock({
  list: require("./data/test.json"),
});
const todoListData = Mock.mock([
  {
    value: "Pay electric bill",
    toggle: false,
  },
  {
    value: "Walk the dog",
    toggle: false,
  },
]);
const result = {
  result: 0,
  status: 200,
  message: "",
};

// 格式： Mock.mock( url, 'post'|'get' , 返回的数据)
Mock.mock("/api/todoList", "get", todoListData);

Mock.mock("/api/login", "put", (options) => {
  let body = JSON.parse(options.body);
  const checkAccountList = data.list.filter((account) => {
    return (
      account.username === body.username && account.password === body.password
    );
  });

  if (checkAccountList.length) {
    result.result = 1;
    result.message = "登入成功";
  } else {
    result.message = "請確認帳號或密碼是否正確";
  }

  return result;
});

Mock.mock("/api/add/account", "post", (options) => {
  console.log("api:", options);
  let body = JSON.parse(options.body);

  data.list.push({
    username: body.username,
    password: body.password,
  });

  result.result = 1;
  result.message = "添加成功";

  return result;
});
