import Food from './food';
import Feces from './feces';
import Clean from './clean';
import BorderOff from './border_off';
import Lessen from './lessen';
import Reset from './reset';
import Score1000 from './score_1000';
import Score_x2 from './score_x2';
import Score_x3 from './score_x3';
import SizeAdd from './size_add';
import SizeReduce from './size_reduce';
import SpeedAdd from './speed_add';
import SpeedReduce from './speed_reduce';
import SplitFood from './splitfood';
// import Wtf from './wtf';

const foods: FoodType[] = [
  Food, Feces, Lessen, Score_x2, Score1000, Clean, BorderOff,
  SizeAdd, SizeReduce, SpeedAdd, SpeedReduce, SplitFood, Score_x3
]

export default foods;