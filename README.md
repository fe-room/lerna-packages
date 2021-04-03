# lerna-packages
前端包管理工程
1. 全局安装lerna
```
 npm install lerna -g
 ```
2. 初始化项目
```
lerna init
```
3. 创建一个新的包
```
lerna create <name>
```
4. 给所有模块添加依赖包
```
lerna add <name>
```
5. 给指定包添加依赖包
```
lerna add A --scope=B
```
6.安装所有·依赖项并连接所有的交叉依赖
```
lerna bootstrap
```
7. 查看当前存在的包
```
lerna list / ls
```
8.从所有包中删除 node_modules 目录
```
lerna clean
```
9.在当前项目中发布包
```
lerna publish    package.json 中 "private": true 是不会被发布到npm
```
