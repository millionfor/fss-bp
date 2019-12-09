A skeleton for project or component

### Install

- 安装node > 8的LTS版本，https://nodejs.org/en/

- 增加npm本地仓库host，npm config set registry http://npm.pt.hydee.cn

- 没安装yarn的，可以忽略以下yarn命令

```sh
# set registry
npm config set registry http://npm.pt.hydee.cn

# install
yarn global add @hydee/fss-bp | npm i @hydee/fss-bp -g
```

### Setup

```sh
# init project
fss-bp i

# version
fss-bp -v
```
