import { Vars, DefaultVars } from '../vars';
import Canvas from './canvas';
import Player from './player';
import Snake from './snake';
import GUI from './gui';
import Foods from '../foods/index';


namespace SnakeFood {

  export let foods: Food[] = [];
  export let foods_type: FoodTypes = {};
  export let iteration = 0;
  export let _iterationArr = [];

  let foods_data = [];

  export function init() {
    foods = [];
    foods_type = {};
    iteration = 0;
    _iterationArr = [];
    foods_init();
  }

  export function rndColor() {
    let i = Math.random() * Vars.colors_food.length >> 0;
    return Vars.colors_food.splice(i, 1)[0];
  }

  export function rndColorReset() {
    Vars.colors_food = DefaultVars.colors_food.slice(0)
    return true;
  }

  export function draw() {
    for (let i = 0; i < foods.length; i++) {
      let e = foods[i];
      Canvas.drawBox(e.x, e.y, Snake.isPause ? Vars.color_border : get_color(e.name))
    }
  }

  export function clear() {
    foods = [];
  }

  export function foods_init(_foods?: FoodType[]) {
    (_foods || Foods).forEach(e => food_init(e))
  }

  export function food_init(food: FoodType) {
    food = Object.copy(food);
    if (!food.color) food.color = rndColor();
    if (!food.repeatability) food.repeatability = 1;
    foods_type[food.name] = food;
  }

  export function tick(food: Food) {
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
        if (type_food.func) type_food.func(e);
        if (type_food.show_msg) GUI.addMessage(type_food.text)
        if (!type_food.isNotEat) remove_food_type(e)
        if (type_food.isOne) disable_food(e.name);
        if (type_food.disable_time) {
          GUI.addTimer(type_food.color, type_food.disable_time, () => type_food.disabled());
        }

        GUI.legendOpen(type_food.name, type_food.color);
      }

      tick(e);
    }

    GUI.reduceTimerAll();
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

  export function addFood(name: string, pos: Pos = null, add_implicitly = false) {
    let food = foods_type[name];
    let repeatability = food.repeatability;
    if (!food || food.isDisable) return console.log('Food not exist/food disable', name);
    let timeout = food.timeout || -1;

    if(!add_implicitly){
      if (food.add_func && !food.add_func()) return;
      if (!food.add_func && (repeatability != 1 && Math.random() > repeatability)) return;
    }
    if (food.pseudo && food.pseudo.length) {
      let item = food.pseudo[Math.random() * food.pseudo.length >> 0];
      food.color = foods_type[item].color;
      console.log('set color', food.color)
    }
    if(food.rndColor){
      let i = Math.random() * Vars.colors_food.length >> 0;
      food.color = Vars.colors_food.slice(i, i+1)[0];
      console.log('set color', food.color)
    }

    pos = pos || rndPos();
    foods.unshift({ x: pos.x, y: pos.y, name, timeout });
    return true;
  }

  export function addFoodSmart(arrfoodname: any) {
    if (!_iterationArr.length) {
      _iterationArr = arrfoodname;
      iteration++;
    }
    _iterationArr
      .sample(Math.random() * 3 >> 0)
      .forEach(e => {
        if(Array.isArray(e)) e.forEach(i => addFood(i))
        else addFood(e)
      });
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

export default SnakeFood;