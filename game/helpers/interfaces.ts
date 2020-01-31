import { Direction } from './enum';

declare global { 
  interface Window {
    Game: any;
    Foods: any;
    Player: any;
  }
  interface Pos { x: number, y: number}
  interface FoodType {
    isDisable?: boolean;
    _timer?: any;
    isNotEat?: boolean;
    func?: Function;
    color?: string;
    name: string;
    repeatability?: number;
    timeout?: number;
    remove_func?: Function;
    isOne?: boolean;
    disabled?: Function;
    disable_time?: number;
    add_func?: Function;
    pseudo?: Array<string>;
    show_msg?: boolean;
    text: string;
    rndColor?: boolean;
    notLegend?: boolean;
  }
  interface Food {
    x: number;
    y: number;
    name: string;
    timeout?: number;
  }
  interface FoodTypes {
    [propName: string]: FoodType;
  }
  interface Player {
    size: number,
    pos: Pos,
    tail: Pos[],
    speed: number,
    direction: Direction,
    isWall: boolean,
    score: number,
    color_snake: string
  }
}

export default null;