## 使用Node.js创建一个GraphQL服务

基于 Express webserver 服务器的一个 GraphQL API 服务端参考实现，你可以用它结合常规 Express webserver 来运行 GraphQL，也可以作为独立 GraphQL 服务器。

创建工程目录
```
mkdir graphql-demo && cd graphql-demo
```

初始化项目并全局安装nodemon
```
npm init -y
npm install -g nodemon
```
安装其他项目依赖包
```
npm install graphql express express-graphql --save
npm install babel-cli babel-preset-env --save-dev
```

由于各依赖包版本不同，可能有一些差异。提供一份package.json配置文件，内容如下：
```javascript
{
  "name": "graphal-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "nodemon --exec babel-node --presets=env server.js",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4",
    "express-graphql": "^0.7.1",
    "graphql": "^14.0.2"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0"
  }
}
```

在项目根目录下创建 data 目录，并在该目录下创建 data.json 文件，并输入以下内容：
```javascript
{
    "1": {
        "id": "1",
        "name": "GraphQL"
    },
    "2": {
        "id": "2",
        "name": "Nodejs"
    },
    "3": {
        "id": "3",
        "name": "Express"
    }
}
```

创建 server.js 文件，并输入以下内容：
```javascript
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello!');
});

let server = app.listen(port, function () {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});
```
命令行运行：nodemon --exec babel-node --presets=es2015 server.js，浏览器输入：[http://localhost:3000](http://localhost:3000) 。显示 Hello!，说明你的 express 服务已经 OK 了。

创建文件夹 /src/schema，并创建文件 index.js。并在 index.js 文件中编写GraphQL Schema。Schema 是 GraphQL 请求的入口，用户请求的
GraphQL 将会对应到具体的 Schema。
```javascript
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
} from 'graphql'

// 我们要用的模拟数据
const data = require('../../data/data.json')

const User = new GraphQLObjectType({
    name: 'User',
    description: 'User对象',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: User,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                return data[args.id];
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;
```

修改 server.js 文件，连接 schema。将 server.js 文件修改为以下内容：

```javascript
import express from 'express'
import Schema from './src/schema'
import graphqlHTTP from 'express-graphql'

const app = express()
const port = 3000

app.use('/', graphqlHTTP({
    schema: Schema,
    graphiql: true, // 启用GraphiQL
}));

let server = app.listen(port, function() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

```

这时，在浏览器中可以查看到如下界面：


在左边的空白处输入：
```javascript
{
  user(id: 1) {
    name
  }
}
```

点击“运行”按钮，右边会出现结果：
```javascript
{
  "data": {
    "user": {
      "name": "Dan"
    }
  }
}
```

### 参考
[http://graphql.cn/code/#javascript](http://graphql.cn/code/#javascript)

[GraphQL 初体验：GraphQL + Node.js](https://www.jianshu.com/p/0343b83e0cbb)
