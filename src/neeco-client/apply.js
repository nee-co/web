module.exports = (f, x) => 
    f instanceof Function ? f(x)
  : f instanceof Storage  ? f.getItem(x) && JSON.parse(f.getItem(x))
  : f instanceof Object   ? f[x]
  :                         (() => {throw Error()})()
