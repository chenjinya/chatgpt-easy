# ChatGPT-Easy
ChatGPT OpenAI API fast startup
简单的 ChatGPT 服务 API 调用

## 使用国外的 VPS 服务

推荐使用 [DigitalOcean](https://m.do.co/c/28c8264f7e32) ，简单易用，[点击直达](https://m.do.co/c/28c8264f7e32)

注册送 10$, 使用 新加坡实例最小 size: 1u 512MB 4$/month。

![example](https://github.com/chenjinya/chatgpt-easy/blob/main/digitalocean.png)


## Prepare for env in CentOS 

```shell
yum install git nodejs vim -y
```

## Prepare for env in Ubuntu 

```shell
apt-get  git nodejs vim
```

## How to install ?

```shell
git clone https://github.com/chenjinya/chatgpt-easy
cd chatgpt-easy
npm install
```

## How to use ?

![example](https://github.com/chenjinya/chatgpt-easy/blob/main/example.png)

```shell
export OPENAI_KEY='OPENAI_KEY'
npm run chat
```


### Windows OS

```cmd
set OPENAI_KEY='xxxx' 
npm run chat
```

