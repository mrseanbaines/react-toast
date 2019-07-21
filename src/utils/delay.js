export default (fn, timeout) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(fn());
  }, timeout);
});
