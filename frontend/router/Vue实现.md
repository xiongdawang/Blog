# 基于Hash 实现

使用方式和 vue-router 类似（vue-router 通过插件机制注入路由，但是这样隐藏了实现细节，为了保持代码直观，这里没有使用 Vue 插件封装）：
```html
<div>
    <ul>
        <li><router-link to="/home">home</router-link></li>
        <li><router-link to="/about">about</router-link></li>
    </ul>

    <router-view><router-view>
</div>
```

```js
const routes = {
    '/home': {
        template: '<h2>Home</h2>'
    },
    '/about': {
        template: '<h2>About</h2>'
    }
}
const app = new Vue({
    el: '.vue.hash',
    components: {
        'router-view': RouterView,
        'router-link': RouterLink
    }
})
```

router-view实现：
```vue
<template>
    <component :is="routeView" />
</template>

<script>
import utils from '~/utils.js'
export default {
    data () {
        return {
            routeView: null
        }
    },
    created () {
        this.boundHashChange = this.onHashChange.bind(this)
    },
    beforeMount () {
        window.addEventListener("hashchange", this.boundHashChange);
    },
    mounted () {
        this.onHashChange();
    },
    beforeDestroy () {
        window.removeEventListener("hashchange", this.boundHashChange);
    },
    methods: {
        onHashChange () {
            const path = utils.extractHashPath(window.location.href);
            this.routeView = this.$root.$routes[path] || null;
            console.log('vue:hashchange', path);
        }
    }
}
</script>
```

router-link实现：
```vue
<template>
    <a @click.prevent="onClick"><slot></slot></a>
</template>

<script>
export default {
    props: {
        to: String
    },
    methods: {
        onClick () {
            window.location.hash = '#' + this.to;
        }
    }
}
</script>
```

# 基于 History 实现

使用方式和 vue-router 类似：
```html
<div>
    <ul>
        <li><router-link to="/home">home</router-link></li>
        <li><router-link to="/about">about</router-link></li>
    </ul>

<router-view></router-view>
</div>
```

```js
const routes = {
    '/home': {
        template: '<h2>Home</h2>'
    },
    '/about': {
        template: '<h2>About</h2>'
    }
}

const app = new Vue({
    el: '.vue.history',
    components: {
        'router-view': RouterView,
        'router-link': RouterLink
    },
    create () {
        this.$routes = routes;
        this.boundPopState = this.onPopState.bind(this);
    },
    beforeMount () {
        window.addEventListener("popstate", this.boundPopState);
    },
    beforeDestroy () {
        window.removeEventListener("popstate", this.boundPopState);
    },
    methods: {
        onPopState (...args) {
            this.$emit("popstate", ...args);
        }
    }
})
```
router-view 实现：
```vue
<template>
  <component :is="routeView" />
</template>

<script>
import utils from '~/utils.js'
export default {
    data () {
        return {
            routeView: null
        }
    },
    created () {
        this.boundPopState = this.onPopState.bind(this)
    },
    beforeMount () {
        this.$root.$on('popstate', this.boundPopState)
    },
    beforeDestroy() {
        this.$root.$off('popstate', this.boundPopState)
    },
    methods: {
        onPopState (e) {
            const path = utils.extractUrlPath(window.location.href)
            this.routeView = this.$root.$routes[path] || null
            console.log('[Vue] popstate:', path)
        }
    }
}
</script>
```

router-link 实现
```vue
<template>
    <a @click.prevent="onClick" href=''><slot></slot></a>
</template>

<script>
export default {
    props: {
        to: String
    },
    methods: {
        onClick () {
            history.pushState(null, '', this.to)
            this.$root.$emit('popstate')
        }
    }
}
```
