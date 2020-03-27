# 基于Hash实现

使用方式与react-router类似：
```jsx
<BrowserRouter>
    <ul>
        <li><Link to="/home">home</Link></li>
        <li><Link to="/about">about</Link></li>
    </ul>

    <Ruter path="/home" render={() => <h2>Home</h2>}>
    <Ruter path="/about" render={() => <h2>About</h2>}>
</BrowserRouter>
```

BrowserRouter实现：
```js
export default class BrowserRouter extends React.Component {
    state = {
        currentPath: utils.extractHashPath(window.location.href)
    };

    onHashChange = e => {
        const currentPath = utils.extractHashPath(e.newURL);
        console.log("onHashChange: ", currentPath);
        this.setState({currentPath});
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.onHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onHashChange);
    }

    render() {
        return (
            <RouterContext.Provider value={{currentPath: this.state.currentPath}}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
```

Route实现
```js
export default ({ path, render }) => {
    <RouterContext.Consumer>
        {({currentPath}) => currentPath === path && render()}
    </RouterContext.Consumer>
}
```

Link实现
```js
export default ({to, ...props}) => <a {...props} href={"#" + to}>;
```

# 基于History实现

使用方式和react-router类似：
```js
<HistoryRouter>
    <ul>
        <li><Link to="/home">home</Link></li>
        <li><Link to="/about">about</Link></li>
    </ul>

    <Route path="/home" render={() => <h2>Home</h2>}>
    <Route path="/about" render={() => <h2>About</h2>}>
</HistoryRouter>
```

HistoryRouter实现：
```js
export default class HistoryRouter extends React.Component {
    state = {
        currentPath: utils.extractUrlPath(window.location.href)
    };

    onPopState = e => {
        const currentPath = utils.extractUrlPath(window.location.href);
        console.log("onPopState: ", currentPath);
        this.setState({ currentPath });
    }

    componentDidMount() {
        window.addEventListener("popstate", this.onPopState);
    }

    componentWillUnmount() {
        window.removeEventListener("popstate", this.onPopState);
    }

    render() {
        return (
            <RouterContext.Provider value={{currentPath: this.state.currentPath, onPopState: this.onPopState}}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
```
Route实现：
```js
export default ({ path, render}) => {
    <RouteContext.Consumer>
        {({ currentPath }) => currentPath === path && render()}
    </RouteContext.Consumer>
}
```

Link实现：
```js
export default ({ to, ...props }) => {
    <RouteContext.Consumer>
        {({onPopState}) => (
            <a 
                href=""
                {...props}
                onClick={e => {
                    e.preventDefault();
                    window.history.pushState(null, "", to);
                    onPopState();
                }} 
            />
        )}
    </RouteContext.Consumer>
}
```
