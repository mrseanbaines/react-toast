export default (fn, timeout) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  });
};
