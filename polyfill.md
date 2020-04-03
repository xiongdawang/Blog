## ES5 Polyfill

### Object.assign()
ES5 中根本 symbol ，不做处理
```javascript
if (typeof Object.assign != 'function') {
    // writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1;index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    })
}


if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
        value: {
            if (target == null) {
                throw new Error();
            }
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var temp = arguments[i];
                if (temp != null) {
                    for (var key in temp) {
                        if (Object.prototype.hasOwnProperty.call(temp, key)) {
                            to[key] = temp[key];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
```

### Object.create()
```javascript
if (typeof Object.create != 'function') {
    Object.create = function(proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeErro('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {};
        F.prototype = proto;
        return new F();
    };
}

if (typeof Object.create != 'function') {
    Object.create = function(proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new Error('必须是对象');
        } else if (proto === null) {
            throw new Error('不能为空');
        }
        if (typeof propertiesObject != 'undefined') throw new Error('不能被模拟');
        function F() {};
        F.prototype = proto;
        return new F();
    }
}
```

### 深拷贝
```javascript
function realDeepClone(obj) {
    const objProto = Object.getPrototypeOf(obj); // 获取原型
    const copiedObj = Object.create(objProto); // 继承
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(name => {
        const isNameAnObject = Object.prototype.toString.call(obj[name]) === "[object Object]";
        const isNameAnArray = Object.prototype.toString.call(obj[name]) === "[object Array]";
        if (isNameAnObject || isNameAnArray) {
            copiedObj[name] = realDeepClone(obj[name]);
        } else {
            const propDesc = Object.getOwnPropertyDescriptor(obj, name);
            Object.defineProperty(copiedObj, name, propDesc);
        }
    });
    return copiedObj;
}


function deepClone(obj) {
    const objProto = Object.getPrototypeOf(obj);
    const cloneObj = Object.create(objProto);
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(name => {
        const isNameAnObject = Object.prototype.toString.call(obj[name]) === "[object Object]";
        const isNameAnArray = Object.prototype.toString.call(obj[name]) === "[object Array]";
        if (isNameAnObject || isNameAnArray) {
            cloneObj[name] = deepclone(obj[name]);
        } else {
            const propDesc = object.getOwnPropertyDescriptor(obj, name);
            Object.defineProperty(cloneObj, name, propDesc);
        }
    });
    return cloneObj;
}

// 该方法会忽略掉undefined与function。
var cloneObj = JSON.parse(JSON.stringify(obj));
```

// apply
```js
Function.prototype.myApply = function(obj) {
    obj = obj || window;
    obj.fn = this;
    let result;
    if (arguments[1]) {
        result = obj.fn(...arguments[i]);
    } else {
        result = obj.fn();
    }
    delete obj.fn;
    return result;
}
```

// call
```js
Function.prototype.myCall = function(obj) {
    obj = obj || window;
    obj.fn = this;
    let args = [...arguments].slice(1);
    let result = obj.fn(...args);
    delete obj.fn;
    return result;
}
```

// Object.create
```js
function create(proto) {
    function F() {};
    F.prototype = proto;
    return new F();
}
```
