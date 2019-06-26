namespace SnakeFoods {
  export let foods: Food[] = [];
  export let foods_type: FoodTypes = {};

  export function rndColor() {
    let i = Math.random() * Vars.colors_food.length >> 0;
    return Vars.colors_food.splice(i, 1)[0];
  }

  export function draw() {
    for (let i = 0; i < foods.length; i++) {
      let e = foods[i];
      Canvas.drawBox(e.x, e.y, get_color(e.name))
    }
  }

  export function clear() {
    foods = [];
  }

  export function foods_init(foods: FoodType[]) {
    foods.forEach(e => food_init(e))
  }

  export function food_init(food: FoodType) {
    food = Object.copy(food);
    if (!food.color) food.color = rndColor();
    if (!food.repeatability) food.repeatability = 1;
    foods_type[food.name] = food;
  }

  function tick(food: Food) {
    const type_food: FoodType = foods_type[food.name];

    if (food.timeout > 0) food.timeout--;
    if (food.timeout == 0) {
      remove_food_type(food);
      if (type_food.remove_func) type_food.remove_func();
      Canvas.drawBox(food.x, food.y, Vars.color_background)
    }

  }

  export function eat_event() {
    let pos = Player.pos;

    for (let i = 0; i < foods.length; i++) {
      let e = foods[i];
      const type_food: FoodType = foods_type[e.name];

      if (e.x == pos.x && e.y == pos.y) {
        if (!type_food.isNotEat) remove_food_type(e)
        if (type_food.func) type_food.func(e);
        if (type_food.isOne) disable_food(e.name);
        if (type_food.disable_time) {
          clearTimeout(type_food._timer)
          type_food._timer = setTimeout(() => type_food.disabled(), type_food.disable_time * 1000);
        }
        if (Snake.onEat) Snake.onEat(type_food)
      }

      tick(e);
    }
  }

  export function remove_food(name) {
    foods = foods.filter(e => e.name !== name);
    Snake.snake()
  }

  export function remove_food_type(food: Food) {
    foods = foods.filter(e => e.x != food.x || e.y != food.y);
    Snake.snake()
  }

  export function disable_food(name) {
    foods_type[name].isDisable = true;
  }

  export function enable_food(name) {
    foods_type[name].isDisable = false;
  }

  export function rndPos(): Pos {
    let x = Math.random() * Vars.defaultSizeMap >> 0;
    let y = Math.random() * Vars.defaultSizeMap >> 0;

    if (Player.pos.x == x && Player.pos.y == y) return rndPos();
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].x == x && foods[i].y == y) return rndPos();
    }
    for (let i = 0; i < Player.tail.length; i++) {
      if (Player.tail[i].x == x && Player.tail[i].y == y) return rndPos();
    }
    return { x, y };
  }

  export function addFood(name: string, pos: Pos = null) {
    let food = foods_type[name];
    if (!food || food.isDisable) return;
    let repeatability = food.repeatability;
    let timeout = food.timeout || -1;
    if (repeatability != 1 && Math.random() > repeatability) return;

    pos = pos || rndPos();
    foods.unshift({ x: pos.x, y: pos.y, name, timeout });
    return true;
  }

  export function addFoodDev(name: string, pos: Pos = null) {
    pos = pos || rndPos();
    foods.unshift({ x: pos.x, y: pos.y, name, timeout: -1 });
    return true;
  }

  export function rndFoods() {
    Object.keys(foods_type).forEach(e => addFood(e))
  }

  export function get_color(name: string) {
    return foods_type[name].color;
  }
}

