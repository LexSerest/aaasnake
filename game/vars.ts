export namespace DefaultVars {
  export const blockSize = 15;
  export const border = 3;
  export const defaultSizeMap = 20;
  export const color_border = '#343D46';
  export const color_background = '#A7ADBA';
  export const color_snake = '#4F5B66';
  export const color_snake_head = '#47515a';
  export const color_food = '#28b528';
  export const colors_food = [
    '#b52828', '#b5289d', '#5828b5', '#288eb5', '#28b594', '#b5b128',
    '#ea9a9a', '#ea9ae4', '#337341', '#9aeaab', '#c4ea9a', '#ead59a',
    '#0e0086', '#860038'
  ];
}

export namespace Vars {
  export let blockSize = DefaultVars.blockSize;
  export let border = DefaultVars.border
  export let defaultSizeMap = DefaultVars.defaultSizeMap;
  export let color_border = DefaultVars.color_border;
  export let color_background = DefaultVars.color_background;
  export let color_snake = DefaultVars.color_snake;
  export let color_snake_head = DefaultVars.color_snake_head;
  export let color_food = DefaultVars.color_food;
  export let colors_food = DefaultVars.colors_food.slice(0);

  export function set_default() {
    Object.keys(DefaultVars).forEach(e => Vars[e] = DefaultVars[e])
    colors_food = DefaultVars.colors_food.slice(0);
  }

}
