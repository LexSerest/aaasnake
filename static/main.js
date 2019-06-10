var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
Object.copy = function (target) {
    var obj = {};
    Object.keys(target).forEach(function (key) {
        var value = target[key];
        if (typeof (value) == 'object')
            value = Object.copy(value);
        obj[key] = value;
    });
    return obj;
};
var DefaultVars;
(function (DefaultVars) {
    DefaultVars.blockSize = 15;
    DefaultVars.border = 3;
    DefaultVars.defaultSizeMap = 20;
    DefaultVars.color_border = '#343D46';
    DefaultVars.color_background = '#A7ADBA';
    DefaultVars.color_snake = '#4F5B66';
    DefaultVars.color_snake_head = '#47515a';
    DefaultVars.color_food = '#28b528';
    DefaultVars.colors_food = [
        '#b52828', '#b5289d', '#5828b5', '#288eb5', '#28b594', '#b5b128',
        '#ea9a9a', '#ea9ae4', '#337341', '#9aeaab', '#c4ea9a', '#ead59a'
    ];
})(DefaultVars || (DefaultVars = {}));
var Vars;
(function (Vars) {
    Vars.blockSize = DefaultVars.blockSize;
    Vars.border = DefaultVars.border;
    Vars.defaultSizeMap = DefaultVars.defaultSizeMap;
    Vars.color_border = DefaultVars.color_border;
    Vars.color_background = DefaultVars.color_background;
    Vars.color_snake = DefaultVars.color_snake;
    Vars.color_snake_head = DefaultVars.color_snake_head;
    Vars.color_food = DefaultVars.color_food;
    Vars.colors_food = DefaultVars.colors_food.slice(0);
    function set_default() {
        Object.keys(DefaultVars).forEach(function (e) { return Vars[e] = DefaultVars[e]; });
        Vars.colors_food = DefaultVars.colors_food.slice(0);
    }
    Vars.set_default = set_default;
})(Vars || (Vars = {}));
var SnakeFoodsTypes;
(function (SnakeFoodsTypes) {
    SnakeFoodsTypes.foods = [
        {
            name: 'eat',
            color: Vars.color_food,
            repeatability: 1,
            func: function () {
                Player.size++;
                Player.speed++;
                Snake.addScore((Player.size + Player.speed) / 2 >> 0);
                SnakeFoods.rndFood('eat');
                SnakeFoods.rndFood('wall');
                SnakeFoods.rndFood('border_off');
                SnakeFoods.rndFood('teleport');
                SnakeFoods.rndFood('speed_reduce');
                SnakeFoods.rndFood('size_reduce');
                SnakeFoods.rndFood('speed_add');
                SnakeFoods.rndFood('size_add');
                SnakeFoods.rndFood('speed_reduce');
                SnakeFoods.rndFood('bonus');
                SnakeFoods.rndFood('manyfood');
                SnakeFoods.rndFood('clearwall');
            }
        },
        {
            name: 'teleport_elem',
            color: '#000',
            isNotEat: true,
            func: function (info) {
                SnakeFoods.foods.forEach(function (e) {
                    if ((e.x == info.x && e.y == info.y) || e.name != 'teleport_elem')
                        return;
                    if (Player.direction == Direction.Down || Player.direction == Direction.Up) {
                        Player.pos.y = e.y + (Player.direction == Direction.Down ? 1 : -1);
                        Player.pos.x = e.x;
                    }
                    if (Player.direction == Direction.Left || Player.direction == Direction.Right) {
                        Player.pos.x = e.x + (Player.direction == Direction.Left ? 1 : -1);
                        Player.pos.y = e.y;
                    }
                });
            }
        },
        {
            name: 'teleport',
            repeatability: 0.05,
            timeout: 30,
            disable_time: 60,
            disabled: function () {
                SnakeFoods.remove_food('teleport_elem');
                SnakeFoods.enable_food('teleport');
            },
            func: function () {
                SnakeFoods.rndFood('teleport_elem');
                SnakeFoods.rndFood('teleport_elem');
                SnakeFoods.disable_food('teleport');
            }
        },
        {
            name: 'simple_food',
            color: Vars.color_food,
            repeatability: .8,
            func: function () {
                Player.size++;
                Player.speed++;
                Snake.addScore((Player.size + Player.speed) / 2 >> 0);
            }
        },
        {
            name: 'manyfood',
            repeatability: 0.05,
            timeout: 30,
            disable_time: 15,
            disabled: function () { return SnakeFoods.remove_food('simple_food'); },
            func: function () {
                for (var i = 0; i < 10; i++)
                    SnakeFoods.rndFood('simple_food');
            }
        },
        {
            name: 'clearwall',
            repeatability: 0.05,
            timeout: 30,
            func: function () { return SnakeFoods.remove_food('wall'); }
        },
        {
            name: 'border_off',
            repeatability: 0.05,
            timeout: 30,
            disable_time: 60,
            disabled: function () {
                Player.isWall = true;
                Vars.color_border = DefaultVars.color_border;
                Canvas.first();
                Snake.draw();
            },
            func: function () {
                Player.isWall = false;
                Vars.color_border = '#C0C5CE';
                Canvas.first();
                Snake.draw();
            }
        },
        {
            name: 'speed_reduce',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Player.speed -= 5;
                if (Player.speed < 0)
                    Player.speed = 0;
            }
        },
        {
            name: 'size_reduce',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Player.size -= 5;
                if (Player.size < 4)
                    Player.size = 4;
            }
        },
        {
            name: 'speed_add',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Player.speed += 5;
            }
        },
        {
            name: 'size_add',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Player.size += 5;
            }
        },
        {
            name: 'bonus',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Snake.addScore(Player.score);
            }
        },
        {
            name: 'wall',
            color: Vars.color_border,
            repeatability: 0.6,
            func: function () { return Snake.end(); }
        }
    ];
})(SnakeFoodsTypes || (SnakeFoodsTypes = {}));
var Canvas;
(function (Canvas) {
    var pixelRatio = window.devicePixelRatio;
    function init(canvas_selector) {
        Canvas.canvas = $(canvas_selector);
        Canvas.canvas.width = (Vars.defaultSizeMap * Vars.blockSize + Vars.border * 2) * pixelRatio;
        Canvas.canvas.height = Canvas.canvas.width;
        Canvas.canvas.style.width = (Canvas.canvas.width / pixelRatio) + 'px';
        Canvas.canvas.style.height = (Canvas.canvas.height / pixelRatio) + 'px';
        Canvas.context = Canvas.canvas.getContext("2d");
        Canvas.context.imageSmoothingEnabled = false;
        first();
    }
    Canvas.init = init;
    function fill(color, x1, y1, x2, y2) {
        if (x1 === void 0) { x1 = 0; }
        if (y1 === void 0) { y1 = 0; }
        if (x2 === void 0) { x2 = Canvas.canvas.width; }
        if (y2 === void 0) { y2 = Canvas.canvas.height; }
        Canvas.context.beginPath();
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect(x1, y1, x2, y2);
        Canvas.context.restore();
    }
    Canvas.fill = fill;
    function first() {
        fill(Vars.color_border);
        fill(Vars.color_background, Vars.border * pixelRatio, Vars.border * pixelRatio, Canvas.canvas.width - Vars.border * 2 * pixelRatio, Canvas.canvas.height - Vars.border * 2 * pixelRatio);
    }
    Canvas.first = first;
    function drawBox(x, y, color) {
        if (color === void 0) { color = "#000"; }
        Canvas.context.beginPath();
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect((Vars.border + x * Vars.blockSize) * pixelRatio, (Vars.border + y * Vars.blockSize) * pixelRatio, Vars.blockSize * pixelRatio, Vars.blockSize * pixelRatio);
        Canvas.context.restore();
    }
    Canvas.drawBox = drawBox;
})(Canvas || (Canvas = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
var Snake;
(function (Snake) {
    Snake.isStart = true;
    Snake.isPause = false;
    Snake.isLockKeyboard = false;
    Snake.onStart = null;
    Snake.onEnd = null;
    Snake.onEat = null;
    Snake.onPause = null;
    var _timer = null;
    var _lastKeysPress = [];
    function init(canvas_selector) {
        Canvas.init(canvas_selector);
        GUI.bestShow();
        Keyboard.bind_keydown($('body'), function (e) {
            if (Keyboard.Keys.Return == e)
                start();
            if (Keyboard.Keys.Space == e)
                pause();
            if (Keyboard.Keys.Up != e &&
                Keyboard.Keys.Down != e &&
                Keyboard.Keys.Left != e &&
                Keyboard.Keys.Right != e)
                return;
            var last = _lastKeysPress[_lastKeysPress.length - 1];
            if (last == e ||
                (Keyboard.Keys.Up == e && last == Direction.Down) ||
                (Keyboard.Keys.Down == e && last == Direction.Up) ||
                (Keyboard.Keys.Left == e && last == Direction.Right) ||
                (Keyboard.Keys.Right == e && last == Direction.Left))
                return;
            _lastKeysPress.splice(3);
            _lastKeysPress.push(e);
        });
    }
    Snake.init = init;
    function changeDirection(e) {
        if ((Keyboard.Keys.Up == e && Player.direction == Direction.Down) ||
            (Keyboard.Keys.Down == e && Player.direction == Direction.Up) ||
            (Keyboard.Keys.Left == e && Player.direction == Direction.Right) ||
            (Keyboard.Keys.Right == e && Player.direction == Direction.Left))
            return;
        Player.direction = Direction[Keyboard.Keys[e]];
    }
    Snake.changeDirection = changeDirection;
    function run() {
        clearTimeout(_timer);
        _timer = setTimeout(function () {
            var e = _lastKeysPress.shift();
            if (e)
                changeDirection(e);
            Snake.move();
            if (Snake.isStart)
                run();
        }, 300 - Player.speed * 5);
    }
    Snake.run = run;
    function addScore(score) {
        Player.score += score;
        GUI.updateScore();
    }
    Snake.addScore = addScore;
    function pause() {
        if (!Snake.isStart)
            return;
        GUI.window_open('hide');
        if (Snake.isPause)
            run();
        else
            clearTimeout(_timer);
        Snake.isPause = !Snake.isPause;
        if (Snake.onPause)
            Snake.onPause(Snake.isPause, Snake.isStart);
    }
    Snake.pause = pause;
    function draw() {
        Snake.isLockKeyboard = false;
        Player.draw();
        SnakeFoods.foods.forEach(function (e) { return Canvas.drawBox(e.x, e.y, SnakeFoods.get_color(e.name)); });
    }
    Snake.draw = draw;
    function end() {
        Snake.isStart = false;
        if (Snake.onEnd)
            Snake.onEnd();
        GUI.updateBest();
    }
    Snake.end = end;
    function start() {
        if (Snake.onPause && Snake.isPause) {
            Snake.isPause = false;
            Snake.onPause(false);
        }
        Vars.set_default();
        Player.set_default();
        SnakeFoods.foods_init(SnakeFoodsTypes.foods);
        Canvas.first();
        Snake.isStart = true;
        SnakeFoods.clear();
        SnakeFoods.rndFood('eat');
        run();
        GUI.window_open('hide');
        if (Snake.onStart)
            Snake.onStart();
    }
    Snake.start = start;
    function move() {
        Player.tail.unshift({ x: Player.pos.x, y: Player.pos.y });
        switch (Player.direction) {
            case Direction.Up:
                Player.pos.y--;
                break;
            case Direction.Right:
                Player.pos.x--;
                break;
            case Direction.Down:
                Player.pos.y++;
                break;
            case Direction.Left:
                Player.pos.x++;
                break;
        }
        if (!Player.isWall) {
            if (Player.pos.y < 0)
                Player.pos.y = Vars.defaultSizeMap - 1;
            if (Player.pos.x < 0)
                Player.pos.x = Vars.defaultSizeMap - 1;
            if (Player.pos.y > Vars.defaultSizeMap - 1)
                Player.pos.y = 0;
            if (Player.pos.x > Vars.defaultSizeMap - 1)
                Player.pos.x = 0;
        }
        if (!Player.collision())
            return end();
        SnakeFoods.eat_event(Player.pos, Snake.onEat);
        draw();
    }
    Snake.move = move;
})(Snake || (Snake = {}));
var Player;
(function (Player) {
    Player.size = 4;
    Player.pos = { x: 1, y: 3 };
    Player.tail = [];
    Player.speed = 0;
    Player.direction = Direction.Down;
    Player.isWall = true;
    Player.score = 0;
    Player.color_snake = Vars.color_snake;
    Player.color_snake_head = Vars.color_snake_head;
    function set_default() {
        Player.size = 3;
        Player.pos = { x: 1, y: 3 };
        Player.tail = [];
        Player.speed = 0;
        Player.direction = Direction.Down;
        Player.isWall = true;
        Player.score = 0;
        Player.color_snake = Vars.color_snake;
    }
    Player.set_default = set_default;
    function draw() {
        Canvas.drawBox(Player.pos.x, Player.pos.y, Player.color_snake_head);
        Player.tail.forEach(function (e) { return Canvas.drawBox(e.x, e.y, Player.color_snake); });
        if (Player.tail.length > Player.size) {
            var last = Player.tail.pop();
            Canvas.drawBox(last.x, last.y, Vars.color_background);
        }
    }
    Player.draw = draw;
    function collision() {
        var is_success = true;
        Player.tail.forEach(function (e, i) {
            if (i && e.x == Player.pos.x && e.y == Player.pos.y)
                is_success = false;
        });
        if (Player.isWall) {
            if (Player.pos.y < 0 ||
                Player.pos.x < 0 ||
                Player.pos.y > Vars.defaultSizeMap - 1 ||
                Player.pos.x > Vars.defaultSizeMap - 1)
                is_success = false;
        }
        return is_success;
    }
    Player.collision = collision;
})(Player || (Player = {}));
var GUI;
(function (GUI) {
    var timers = $('#timers');
    var _timers = {};
    function addTimer(color, duration) {
        if (_timers[color]) {
            clearTimeout(_timers[color]._timer);
            _timers[color].element.remove();
        }
        var element = document.createElement('div');
        element.setAttribute('class', 'timer');
        element.style.background = color;
        element.style.animationDuration = duration + 's';
        timers.append(element);
        var _timer = setTimeout(function () {
            element.remove();
            delete _timers[color];
        }, duration * 1000);
        _timers[color] = { _timer: _timer, element: element };
    }
    GUI.addTimer = addTimer;
    function clearTimer() {
        timers.innerHTML = '';
    }
    GUI.clearTimer = clearTimer;
    function legendOpen(name, color) {
        var el = $('.notopen.notopens[data-name="' + name + '"]');
        if (!el)
            return;
        el.classList.remove('notopen');
        el.style.background = color;
    }
    GUI.legendOpen = legendOpen;
    function legengReset() {
        $$('.notopens').forEach(function (e) {
            e.classList.add('notopen');
            e.style.background = 'transparent';
        });
    }
    GUI.legengReset = legengReset;
    function window_open(name) {
        $('#windows').setAttribute('data-show', name);
    }
    GUI.window_open = window_open;
    function updateScore() {
        $$('.score span').forEach(function (e) { return e.innerHTML = Player.score; });
    }
    GUI.updateScore = updateScore;
    function bestShow() {
        $$('.best span').forEach(function (e) { return e.innerHTML = (localStorage.getItem("best") || 0); });
    }
    GUI.bestShow = bestShow;
    function updateBest() {
        if (+localStorage.getItem("best") < Player.score) {
            localStorage.setItem("best", Player.score.toString());
            $$('.best span').forEach(function (e) { return e.innerHTML = Player.score; });
        }
    }
    GUI.updateBest = updateBest;
})(GUI || (GUI = {}));
var Swipe;
(function (Swipe) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 38] = "Up";
        Direction[Direction["Right"] = 37] = "Right";
        Direction[Direction["Left"] = 39] = "Left";
        Direction[Direction["Down"] = 40] = "Down";
    })(Direction || (Direction = {}));
    function swipebind(element, f) {
        var xDown = null;
        var yDown = null;
        element.addEventListener('touchstart', function (evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }, false);
        element.addEventListener('touchmove', function (evt) {
            if (!xDown || !yDown)
                return;
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                f(xDiff > 0 ? Direction.Right : Direction.Left);
            }
            else {
                f(yDiff > 0 ? Direction.Up : Direction.Down);
            }
            xDown = null;
            yDown = null;
        }, false);
    }
    Swipe.swipebind = swipebind;
})(Swipe || (Swipe = {}));
var Keyboard;
(function (Keyboard) {
    var Keys;
    (function (Keys) {
        Keys[Keys["Up"] = 38] = "Up";
        Keys[Keys["Right"] = 37] = "Right";
        Keys[Keys["Left"] = 39] = "Left";
        Keys[Keys["Down"] = 40] = "Down";
        Keys[Keys["Space"] = 32] = "Space";
        Keys[Keys["Return"] = 13] = "Return";
    })(Keys = Keyboard.Keys || (Keyboard.Keys = {}));
    function bind_keydown(selector, f) {
        selector.addEventListener('keydown', function (e) { return f(e.keyCode); });
        Swipe.swipebind(selector, function (e) { return f(e); });
    }
    Keyboard.bind_keydown = bind_keydown;
})(Keyboard || (Keyboard = {}));
var SnakeFoods;
(function (SnakeFoods) {
    SnakeFoods.foods = [];
    SnakeFoods.foods_type = {};
    function rndColor() {
        var i = Math.random() * Vars.colors_food.length >> 0;
        return Vars.colors_food.splice(i, 1)[0];
    }
    SnakeFoods.rndColor = rndColor;
    function clear() {
        SnakeFoods.foods = [];
    }
    SnakeFoods.clear = clear;
    function foods_init(foods) {
        foods.forEach(function (e) { return food_init(e); });
    }
    SnakeFoods.foods_init = foods_init;
    function food_init(food, isRnd) {
        if (isRnd === void 0) { isRnd = false; }
        food = Object.copy(food);
        if (!food.color)
            food.color = rndColor();
        if (!food.repeatability)
            food.repeatability = 1;
        SnakeFoods.foods_type[food.name] = food;
        if (isRnd)
            rndFood(food.name);
    }
    SnakeFoods.food_init = food_init;
    function eat_event(pos, onfood) {
        SnakeFoods.foods.forEach(function (e, i) {
            var type_food = SnakeFoods.foods_type[e.name];
            if (e.x == pos.x && e.y == pos.y) {
                if (!type_food.isNotEat)
                    SnakeFoods.foods.splice(i, 1);
                if (type_food.isOne)
                    disable_food(e.name);
                if (type_food.func)
                    type_food.func(e);
                if (type_food.disable_time) {
                    clearTimeout(type_food._timer);
                    type_food._timer = setTimeout(function () { return type_food.disabled(); }, type_food.disable_time * 1000);
                }
                if (onfood)
                    onfood(type_food);
            }
            if (e.timeout > 0)
                e.timeout--;
            if (e.timeout == 0) {
                SnakeFoods.foods.splice(i, 1);
                if (type_food.remove_func)
                    type_food.remove_func();
                Canvas.drawBox(e.x, e.y, Vars.color_background);
            }
        });
    }
    SnakeFoods.eat_event = eat_event;
    function remove_food(name) {
        SnakeFoods.foods = SnakeFoods.foods.filter(function (e) { return e.name !== name; });
        Canvas.first();
        Snake.draw();
    }
    SnakeFoods.remove_food = remove_food;
    function disable_food(name) {
        SnakeFoods.foods_type[name].isDisable = true;
    }
    SnakeFoods.disable_food = disable_food;
    function enable_food(name) {
        SnakeFoods.foods_type[name].isDisable = false;
    }
    SnakeFoods.enable_food = enable_food;
    function rndFood(name) {
        if (!SnakeFoods.foods_type[name] || SnakeFoods.foods_type[name].isDisable)
            return;
        var repeatability = SnakeFoods.foods_type[name].repeatability;
        var timeout = SnakeFoods.foods_type[name].timeout || -1;
        if (repeatability != 1 && Math.random() > repeatability)
            return;
        var x = Math.random() * Vars.defaultSizeMap >> 0;
        var y = Math.random() * Vars.defaultSizeMap >> 0;
        if (Player.pos.x == x && Player.pos.y == y)
            return rndFood(name);
        for (var i = 0; i < SnakeFoods.foods.length; i++) {
            if (SnakeFoods.foods[i].x == x && SnakeFoods.foods[i].y == y)
                return rndFood(name);
        }
        SnakeFoods.foods.unshift({ x: x, y: y, name: name, timeout: timeout });
        return true;
    }
    SnakeFoods.rndFood = rndFood;
    function rndFoods() {
        Object.keys(SnakeFoods.foods_type).forEach(function (e) { return rndFood(e); });
    }
    SnakeFoods.rndFoods = rndFoods;
    function get_color(name) {
        return SnakeFoods.foods_type[name].color;
    }
    SnakeFoods.get_color = get_color;
})(SnakeFoods || (SnakeFoods = {}));
Snake.onStart = function () {
    GUI.updateScore();
    GUI.legengReset();
    GUI.clearTimer();
};
Snake.onEnd = function () {
    GUI.window_open('endgame');
    GUI.clearTimer();
};
Snake.onEat = function (food) {
    if (food.disable_time)
        GUI.addTimer(food.color, food.disable_time);
    GUI.legendOpen(food.name, food.color);
};
Snake.onPause = function (isPause, isStart) {
    if (!isStart)
        return;
    if (isPause)
        GUI.window_open('pause');
    else
        GUI.window_open('hide');
};
function start() {
    GUI.window_open('hide');
    Snake.start();
}
function unpause() {
    Snake.isPause && Snake.pause();
}
Snake.init('#snake');
//# sourceMappingURL=main.js.map