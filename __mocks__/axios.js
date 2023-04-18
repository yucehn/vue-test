const toToList = {
  success: true,
  data: [
    { value: "Pay electric bill", toggle: false },
    { value: "Walk the dog", toggle: false },
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
