let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

interface ObjectConstructor {
  copy(o: {}): any;
}

Object.copy = function (target) {
  let obj = {};

  Object.keys(target).forEach(key => {
    let value = target[key];
    if (typeof (value) == 'object') value = Object.copy(value);
    obj[key] = value;
  })

  return obj;
}