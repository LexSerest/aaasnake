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
        '#ea9a9a', '#ea9ae4', '#337341', '#9aeaab', '#c4ea9a', '#ead59a',
        '#FFFFFF', '#0e0086', '#860038'
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
var old = null;
var SnakeFoodsTypes;
(function (SnakeFoodsTypes) {
    SnakeFoodsTypes.foods = [
        {
            name: 'eat',
            color: Vars.color_food,
            repeatability: 1,
            func: function () {
                Player.inc();
                Player.addScore();
                SnakeFoods.addFood('eat');
                setTimeout(function (e) { return SnakeFoods.addFood('feces', Player.pos); }, 100);
                SnakeFoods.addFood('border_off');
                SnakeFoods.addFood('speed_reduce');
                SnakeFoods.addFood('size_reduce');
                SnakeFoods.addFood('speed_add');
                SnakeFoods.addFood('size_add');
                SnakeFoods.addFood('bonus_x2');
                SnakeFoods.addFood('bonus_1000');
                SnakeFoods.addFood('manyfood');
                SnakeFoods.addFood('clearwall');
                SnakeFoods.addFood('hell');
                SnakeFoods.addFood('exithell');
            }
        },
        {
            name: 'manyfood',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                SnakeFoods.addFood('eat');
            }
        },
        {
            name: 'clearwall',
            repeatability: 0.05,
            timeout: 30,
            func: function () { return SnakeFoods.remove_food('feces'); }
        },
        {
            name: 'border_off',
            repeatability: 0.05,
            timeout: 30,
            disable_time: 60,
            disabled: function () {
                Player.isWall = true;
                Vars.color_border = DefaultVars.color_border;
            },
            func: function () {
                Player.isWall = false;
                Vars.color_border = '#C0C5CE';
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
            name: 'bonus_x2',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Player.addScore(Player.score);
            }
        },
        {
            name: 'bonus_1000',
            repeatability: 0.05,
            timeout: 30,
            func: function () {
                Player.addScore(1000);
            }
        },
        {
            name: 'feces',
            isNotEat: true,
            color: Vars.color_border,
            repeatability: 0.6,
            func: function () { return Snake.end(); }
        },
        {
            name: 'hell',
            repeatability: 0.05,
            timeout: 30,
            isOne: true,
            func: function () {
                Vars.set_default();
                SnakeFoods.foods_init(SnakeFoodsTypes.foods);
                GUI.clearTimer();
                setTimeout(function (e) { return GUI.legengReset(); }, 100);
                setTimeout(function (e) { return GUI.clearTimer(); }, 100);
                setTimeout(function (e) { return SnakeFoods.foods_type['hell'].isDisable = true; }, 100);
                setTimeout(function (e) { return SnakeFoods.foods_type['exithell'].isDisable = false; }, 100);
                Player.isWall = true;
                Vars.color_border = '#463434';
                Vars.color_background = '#baa7a7';
                Vars.color_snake = '#664f4f';
                Vars.color_snake_head = '#5a4747';
                SnakeFoods.foods_type['feces'].repeatability = 1;
                Canvas.first();
                SnakeFoods.clear();
                SnakeFoods.addFood('eat');
            }
        },
        {
            name: 'exithell',
            repeatability: 0.05,
            timeout: 30,
            isOne: true,
            isDisable: true,
            func: function () {
                Vars.set_default();
                setTimeout(function (e) { return GUI.clearTimer(); }, 100);
                setTimeout(function (e) { return SnakeFoods.foods_type['hell'].isDisable = false; }, 100);
                setTimeout(function (e) { return SnakeFoods.foods_type['exithell'].isDisable = true; }, 100);
                Player.isWall = true;
                SnakeFoods.foods_type['feces'].repeatability = 0.6;
            }
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
    Snake.isStart = false;
    Snake.isPause = false;
    Snake.isLockKeyboard = false;
    Snake.onStart = null;
    Snake.onEnd = null;
    Snake.onEat = null;
    Snake.onPause = null;
    var _timer = null;
    var _lastKeysPress = [];
    function testDirection(e) {
        if ((Keyboard.Keys.Up == e && Player.direction == Direction.Down) ||
            (Keyboard.Keys.Down == e && Player.direction == Direction.Up) ||
            (Keyboard.Keys.Left == e && Player.direction == Direction.Right) ||
            (Keyboard.Keys.Right == e && Player.direction == Direction.Left) ||
            (Keyboard.Keys.Up == e && Player.direction == Direction.Up) ||
            (Keyboard.Keys.Down == e && Player.direction == Direction.Down) ||
            (Keyboard.Keys.Left == e && Player.direction == Direction.Right) ||
            (Keyboard.Keys.Right == e && Player.direction == Direction.Left))
            return true;
    }
    function keyboardEvent(e) {
        if (Keyboard.Keys.Return == e)
            start();
        if (Keyboard.Keys.Space == e)
            pause();
        if (Keyboard.Keys.Up != e &&
            Keyboard.Keys.Down != e &&
            Keyboard.Keys.Left != e &&
            Keyboard.Keys.Right != e)
            return;
        if (!Snake.isStart || Snake.isPause)
            return;
        var last = _lastKeysPress[_lastKeysPress.length - 1] || Player.direction;
        if (last == e ||
            (Keyboard.Keys.Up == e && last == Direction.Down) ||
            (Keyboard.Keys.Down == e && last == Direction.Up) ||
            (Keyboard.Keys.Left == e && last == Direction.Right) ||
            (Keyboard.Keys.Right == e && last == Direction.Left) ||
            (Keyboard.Keys.Up == e && last == Direction.Up) ||
            (Keyboard.Keys.Down == e && last == Direction.Down) ||
            (Keyboard.Keys.Left == e && last == Direction.Left) ||
            (Keyboard.Keys.Right == e && last == Direction.Right))
            return;
        if (_lastKeysPress.length < 3)
            _lastKeysPress.push(e);
    }
    Snake.keyboardEvent = keyboardEvent;
    function init(canvas_selector) {
        Canvas.init(canvas_selector);
        GUI.bestShow();
        Keyboard.bind_keydown($('body'), function (e) { return keyboardEvent(e); });
    }
    Snake.init = init;
    function changeDirection(e) {
        if (testDirection(e))
            return;
        Player.direction = Direction[Keyboard.Keys[e]];
    }
    Snake.changeDirection = changeDirection;
    function run() {
        clearTimeout(_timer);
        _timer = setTimeout(function () {
            var e = _lastKeysPress.shift();
            if (e) {
                changeDirection(e);
            }
            if (Snake.isStart) {
                Snake.move();
                run();
            }
        }, 300 - Player.speed * 3);
    }
    Snake.run = run;
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
    function snake() {
        Canvas.first();
        Player.draw();
        SnakeFoods.draw();
    }
    Snake.snake = snake;
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
        SnakeFoods.addFood('eat');
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
        if (!Snake.isStart || !Player.collision())
            return end();
        SnakeFoods.eat_event();
        if (!Snake.isStart)
            Player.pos = Player.tail.shift();
        snake();
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
    }
    Player.set_default = set_default;
    function inc() {
        Player.speed++;
        Player.size++;
    }
    Player.inc = inc;
    function draw() {
        for (var i = 0; i < Player.tail.length; i++) {
            var e = Player.tail[i];
            Canvas.drawBox(e.x, e.y, Vars.color_snake);
        }
        if (Player.tail.length > Player.size) {
            var _a = Player.tail.pop(), x = _a.x, y = _a.y;
            Canvas.drawBox(x, y, Vars.color_background);
        }
        Canvas.drawBox(Player.pos.x, Player.pos.y, Vars.color_snake_head);
    }
    Player.draw = draw;
    function collision() {
        var is_success = true;
        for (var i = 0; i < Player.tail.length; i++) {
            var e = Player.tail[i];
            if (i && i != Player.tail.length - 1 && e.x == Player.pos.x && e.y == Player.pos.y)
                is_success = false;
        }
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
    function addScore(score) {
        if (score === void 0) { score = 0; }
        if (!score)
            score = (Player.size + Player.speed) / 2 >> 0;
        Player.score += score;
        GUI.updateScore();
    }
    Player.addScore = addScore;
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
        $$('.best span').forEach(function (e) { return e.innerHTML = (+localStorage.getItem("best") || 0); });
    }
    GUI.bestShow = bestShow;
    function updateBest() {
        if ((+localStorage.getItem("best") || 0) < Player.score) {
            localStorage.setItem("best", Player.score.toString());
            $$('.best span').forEach(function (e) { return e.innerHTML = Player.score; });
        }
    }
    GUI.updateBest = updateBest;
    function swipeToggle(setState) {
        if (setState === void 0) { setState = undefined; }
        var isset = typeof setState == 'undefined';
        if (isset) {
            setState = $('#mobile').getAttribute('data-type') == 'swipe';
        }
        Swipe.swipeEnabled = !setState;
        if (isset)
            localStorage.setItem('swipemode', (+setState).toString());
        $('#mobile').setAttribute('data-type', setState ? 'buttons' : 'swipe');
    }
    GUI.swipeToggle = swipeToggle;
})(GUI || (GUI = {}));
var Swipe;
(function (Swipe) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 38] = "Up";
        Direction[Direction["Right"] = 37] = "Right";
        Direction[Direction["Left"] = 39] = "Left";
        Direction[Direction["Down"] = 40] = "Down";
        Direction[Direction["Space"] = 32] = "Space";
    })(Direction || (Direction = {}));
    Swipe.swipeEnabled = true;
    function swipebind(element, f) {
        var xDown = null;
        var yDown = null;
        element.addEventListener('touchstart', function (evt) {
            if (!Swipe.swipeEnabled)
                return;
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
    function doubletap(element, f) {
        var lastTap = 0;
        var firstTap = 0;
        element.addEventListener('touchend', function (event) {
            var currentTime = new Date().getTime();
            var tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                event.preventDefault();
                f(Direction.Space);
            }
            lastTap = currentTime;
        });
    }
    Swipe.doubletap = doubletap;
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
        Swipe.doubletap($('canvas'), function (e) { return f(e); });
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
    function draw() {
        for (var i = 0; i < SnakeFoods.foods.length; i++) {
            var e = SnakeFoods.foods[i];
            Canvas.drawBox(e.x, e.y, get_color(e.name));
        }
    }
    SnakeFoods.draw = draw;
    function clear() {
        SnakeFoods.foods = [];
    }
    SnakeFoods.clear = clear;
    function foods_init(foods) {
        foods.forEach(function (e) { return food_init(e); });
    }
    SnakeFoods.foods_init = foods_init;
    function food_init(food) {
        food = Object.copy(food);
        if (!food.color)
            food.color = rndColor();
        if (!food.repeatability)
            food.repeatability = 1;
        SnakeFoods.foods_type[food.name] = food;
    }
    SnakeFoods.food_init = food_init;
    function tick(food) {
        var type_food = SnakeFoods.foods_type[food.name];
        if (food.timeout > 0)
            food.timeout--;
        if (food.timeout == 0) {
            remove_food_type(food);
            if (type_food.remove_func)
                type_food.remove_func();
            Canvas.drawBox(food.x, food.y, Vars.color_background);
        }
    }
    function eat_event() {
        var pos = Player.pos;
        var _loop_1 = function (i) {
            var e = SnakeFoods.foods[i];
            var type_food = SnakeFoods.foods_type[e.name];
            if (e.x == pos.x && e.y == pos.y) {
                if (!type_food.isNotEat)
                    remove_food_type(e);
                if (type_food.func)
                    type_food.func(e);
                if (type_food.isOne)
                    disable_food(e.name);
                if (type_food.disable_time) {
                    clearTimeout(type_food._timer);
                    type_food._timer = setTimeout(function () { return type_food.disabled(); }, type_food.disable_time * 1000);
                }
                if (Snake.onEat)
                    Snake.onEat(type_food);
            }
            tick(e);
        };
        for (var i = 0; i < SnakeFoods.foods.length; i++) {
            _loop_1(i);
        }
    }
    SnakeFoods.eat_event = eat_event;
    function remove_food(name) {
        SnakeFoods.foods = SnakeFoods.foods.filter(function (e) { return e.name !== name; });
        Snake.snake();
    }
    SnakeFoods.remove_food = remove_food;
    function remove_food_type(food) {
        SnakeFoods.foods = SnakeFoods.foods.filter(function (e) { return e.x != food.x || e.y != food.y; });
        Snake.snake();
    }
    SnakeFoods.remove_food_type = remove_food_type;
    function disable_food(name) {
        SnakeFoods.foods_type[name].isDisable = true;
    }
    SnakeFoods.disable_food = disable_food;
    function enable_food(name) {
        SnakeFoods.foods_type[name].isDisable = false;
    }
    SnakeFoods.enable_food = enable_food;
    function rndPos() {
        var x = Math.random() * Vars.defaultSizeMap >> 0;
        var y = Math.random() * Vars.defaultSizeMap >> 0;
        if (Player.pos.x == x && Player.pos.y == y)
            return rndPos();
        for (var i = 0; i < SnakeFoods.foods.length; i++) {
            if (SnakeFoods.foods[i].x == x && SnakeFoods.foods[i].y == y)
                return rndPos();
        }
        for (var i = 0; i < Player.tail.length; i++) {
            if (Player.tail[i].x == x && Player.tail[i].y == y)
                return rndPos();
        }
        return { x: x, y: y };
    }
    SnakeFoods.rndPos = rndPos;
    function addFood(name, pos) {
        if (pos === void 0) { pos = null; }
        var food = SnakeFoods.foods_type[name];
        if (!food || food.isDisable)
            return;
        var repeatability = food.repeatability;
        var timeout = food.timeout || -1;
        if (repeatability != 1 && Math.random() > repeatability)
            return;
        pos = pos || rndPos();
        SnakeFoods.foods.unshift({ x: pos.x, y: pos.y, name: name, timeout: timeout });
        return true;
    }
    SnakeFoods.addFood = addFood;
    function addFoodDev(name, pos) {
        if (pos === void 0) { pos = null; }
        pos = pos || rndPos();
        SnakeFoods.foods.unshift({ x: pos.x, y: pos.y, name: name, timeout: -1 });
        return true;
    }
    SnakeFoods.addFoodDev = addFoodDev;
    function rndFoods() {
        Object.keys(SnakeFoods.foods_type).forEach(function (e) { return addFood(e); });
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
function unpause() { Snake.isPause && Snake.pause(); }
function pauseToggle() { Snake.pause(); }
function setting() { GUI.window_open('setting'); }
function main() { GUI.window_open('start'); }
function swipeToggle() { GUI.swipeToggle(); }
function button_up() { Snake.keyboardEvent(Keyboard.Keys.Up); }
function button_left() { Snake.keyboardEvent(Keyboard.Keys.Right); }
function button_down() { Snake.keyboardEvent(Keyboard.Keys.Down); }
function button_right() { Snake.keyboardEvent(Keyboard.Keys.Left); }
GUI.swipeToggle(+localStorage.getItem('swipemode') || 0);
Snake.init('#snake');
//# sourceMappingURL=main.js.map