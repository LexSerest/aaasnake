const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


declare global {
  interface ObjectConstructor {
    copy(o: {}): any;
  }

  interface Array<T> {
    clone(): Array<T>;
    sample(count: number): Array<T>;
  }
}


Object.copy = function (target) {
  let obj = {};

  Object.keys(target).forEach(key => {
    let value = target[key];
    if (typeof (value) == 'object' && !(value instanceof Array)) value = Object.copy(value);
    if (value instanceof Array) value = value.slice(0);
    obj[key] = value;
  })

  return obj;
}

Array.prototype.clone = function(){
  return this.slice(0);
}

Array.prototype.sample = function(count = 1){
  let arr = [];
  while(count-- && this.length){
    let index = Math.random() * this.length >> 0;
    arr.push(this.splice(index, 1)[0])
  }
  return arr;
}

export { $, $$ };