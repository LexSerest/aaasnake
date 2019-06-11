namespace SnakeFoods {
  export let foods: Food[] = [];
  export let foods_type: FoodTypes = {};

  export function rndColor(){
    let i = Math.random() * Vars.colors_food.length >> 0;
    return Vars.colors_food.splice(i, 1)[0];
  }

  export function clear() {
    foods = [];
  }

  export function foods_init(foods: FoodType[]) {
    foods.forEach(e => food_init(e))
  }

  export function food_init(food: FoodType, isRnd = false) {
    food = Object.copy(food);
    if(!food.color) food.color = rndColor();
    if(!food.repeatability) food.repeatability = 1;
    foods_type[food.name] = food;
    if (isRnd) rndFood(food.name)
  }

  export function eat_event(pos: Pos, onfood) {
    foods.forEach((e, i) => {
      const type_food: FoodType = foods_type[e.name];

      if (e.x == pos.x && e.y == pos.y) {
        if(!type_food.isNotEat) foods.splice(i, 1);
        if(type_food.isOne) disable_food(e.name);
        if(type_food.func) type_food.func(e);
        if(type_food.disable_time) {
          clearTimeout(type_food._timer)
          type_food._timer = setTimeout(() => type_food.disabled(), type_food.disable_time * 1000);
        }
        if (onfood) onfood(type_food)
      }
      if (e.timeout > 0) e.timeout--;
      if (e.timeout == 0) {
        foods.splice(i, 1);
        if (type_food.remove_func) type_food.remove_func();
        Canvas.drawBox(e.x, e.y, Vars.color_background)
      }
    })
  }

  export function remove_food(name){
    foods = foods.filter(e => e.name !== name);
    Canvas.first()
    Snake.draw()
  }

  export function disable_food(name){
    foods_type[name].isDisable = true;  
  }

  export function enable_food(name){
    foods_type[name].isDisable = false;
  }

  export function rndFood(name: string) {
    if(!foods_type[name] || foods_type[name].isDisable) return;
    let repeatability = foods_type[name].repeatability;
    let timeout = foods_type[name].timeout || -1;
    if (repeatability != 1 && Math.random() > repeatability) return;

    let x = Math.random() * Vars.defaultSizeMap >> 0;
    let y = Math.random() * Vars.defaultSizeMap >> 0;

    if(Player.pos.x == x && Player.pos.y == y) return rndFood(name);
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].x == x && foods[i].y == y) return rndFood(name);
    }
    for (let i = 0; i < Player.tail.length; i++) {
      if (Player.tail[i].x == x && Player.tail[i].y == y) return rndFood(name);
    }

    foods.unshift({ x, y, name, timeout });
    return true;
  }

  export function rndFoods() {
    Object.keys(foods_type).forEach(e => rndFood(e))
  }

  export function get_color(name: string) {
    return foods_type[name].color;
  }
}