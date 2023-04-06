const toToList = {
  success: true,
  data: [
    { value: "讀書一小時", toggle: false },
    { value: "買文具", toggle: true },
  ],
};

export const get = (url) => {
  if (url === "toToList.json") {
    return new Promise((resolve, reject) => {
      if (toToList.success) {
        resolve(toToList);
      } else {
        reject(new Error());
      }
    });
  }
};
