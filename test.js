// call
Function.prototype.call2 = function (context) {
    context.fn = this;
    context.fn();
    delete context.fn;
}
// 处理context为null、代参数、有返回值
Function.prototype.call3 = function (context) {
    context = context || window;
    context.fn = this;

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval("context.fn(" + args + ")");

    delete context.fn;
    return result;
}

// apply
Function.prototype.apply2 = function (context, arr) {
    context = context || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + arr + ')');
    }

    delete context.fn;
    return result;
}

// bind
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
        return self.apply(context);
    }
}
// 传参、构造函数、
Function.prototype.bind3 = function (context) {
    if (typeof this !== "function") {
        throw Error("no function");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () { };

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
}

// new
function _new() {
    var obj = new Object(), Constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var result = Constructor.apply(obj, arguments);
    return typeof result === "object" ? result : obj;
}

// debounce
function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
}
// this、event对象
function debounce2(func, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    }
}
// 立即执行
function debounce3(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);

        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }

        return result;
    }
}

// throttle
function throttle(func, wait) {
    var timeout;

    return function () {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    }
}

// 去重
function unique(arr) { // 不能去除对象
    // return Array.from(new Set(arr));
    return [...new Set(arr)];
}
function unique1(arr) { // 完全去重
    var obj = {};
    return arr.filter(function (item, index, array) {
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
    });
}

// 类型判断
var class2type = {};
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ")
    .map(function (item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    });
function type(obj) {
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
}

// 拷贝
var new_arr = arr.slice();
var new_arr = arr.concat();
var new_arr = JSON.parse(JSON.stringify(obj)); 
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== "object") return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(ke)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
var deepCopy = function(obj) {
    if (typeof obj !== "object") return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === "object" ? deepCopy(obj) : obj[key];
        }
    }
    return newObj;
}

// each
function each(obj, callback) {
    var length, i = 0;
    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }
    return obj;
}

// curry
var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};

// 偏函数
function partial(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};

// 惰性函数
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
}

// 扁平化
function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}
