---
title: HEXO+GitHub,搭建博客 - 配置
date: 2016-12-24 22:23:58
tags: [Next+Hexo,博客搭建] 
categories: [博客搭建]
comments: false 
---
<div class="out-img-topic">![Markdown](http://on5pjsxrv.bkt.clouddn.com/hexo1.jpg)</div>

本篇文章主要介绍怎样利用 `Hexo + Next` 在 `GitHub` 上搭建个人博客。

## 简介
&nbsp;&nbsp;[Hexo](https://hexo.io/zh-cn/) 是一个快速、简洁且高效的静态站点生成框架，基于 [Node.js](https://nodejs.org/en/) 。 它有以下特点：

<!-- more -->

- <i class="fa fa-bolt"></i>  **超快速度**
<i>Node.js 所带来的超快生成速度，让上百个页面在几秒内瞬间完成渲染。</i>
- <i class="fa fa-pencil"></i>  **支持Markdown**
<i>Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。</i>
- <i class="fa fa-cloud-upload"></i>  **一件部署**
<i>只需一条指令即可部署到Github Pages，或其他网站</i>
- <i class="fa fa-cog"></i>  **丰富的插件**
<i>Hexo 拥有强大的插件系统，安装插件可以让 Hexo 支持 Jade, CoffeeScript。</i>
通过 Hexo 你可以轻松地使用 Markdown 编写文章，除了 Markdown 本身的语法之外，还可以使用 Hexo 提供的 [标签插件](https://hexo.io/zh-cn/docs/tag-plugins.html) 来快速的插入特定形式的内容。

基于 Hexo 这个优秀的博客框架，很多优秀的开发者奉献出了它们基于 Hexo 开发的[主题](https://hexo.io/themes/)。
[NexT](http://theme-next.iissnan.com/) 因其 &nbsp; <span id="yu-1">精于心，简于形</span> &nbsp; 的风格，一直被广大用户所喜爱。

## 准备工作

安装 Hexo 相当简单。然而在安装前，您必须检查电脑中是否已安装下列应用程序:

> [Node.js](https://nodejs.org/en/)
> [Git](http://git-scm.com/)

如果您的电脑中已经安装上述必备程序，跳过这一步。
如果你的电脑中尚未安装所需要的程序，请根据以下安装指示完成安装。

### 安装 Git
* Windows：下载安装 git 。<a id="download" href="https://git-scm.com/download/win"><i class="fa fa-download"></i><span> Download Now</span>
</a>
* Mac：使用 [Homebrew](http://mxcl.github.com/homebrew/)，[MacPorts](http://www.macports.org/) 或下载 [安装程序](http://sourceforge.net/projects/git-osx-installer/) 安装
* Linux（Ubuntu，Debian）：`sudo apt-get install git-core`
* Linux（Fedora，Red Hat，CentOS）：`sudo yum install git-core`

### 安装 Node.js
安装 Node.js 的最佳方式是使用 [nvm](https://github.com/creationix/nvm)。（nvm：Node Version Manager）
windows 下使用 nvm 请看这里： [nvm-windows](https://github.com/coreybutler/nvm-windows) ，首先需要下载安装 nvm 。<a id="download" href="https://github.com/coreybutler/nvm-windows/releases"><i class="fa fa-download"></i><span> Download Now</span>
</a> 

windows下安装完nvm以后，我们可以打开命令行中执行命令
``` bash
$ nvm
$ nvm install latest
```
执行完以后，重启命令行，执行命令 `node -v` ，如果出现版本号，那么 `Node.js` 就安装成功了。

<p id="div-border-left-red">如果没有安装成功，那可能就是墙的原因。建议下载 `Node.js` 直接安装。<a id="download" href="https://nodejs.org/en/download/"><i class="fa fa-download"></i><span> Download Now</span>
<p>

## 安装Hexo
有了 Node.js ，我们可以使用 npm 安装 Hexo。（执行完以后，我们同样可以执行命令 `hexo -v` 查看是否安装成功就安装成功了。）
``` bash
$ npm install -g hexo-cli
```
Hexo安装完成后，我们需要为我们的blog项目创建一个<span id="inline-green">指定文件夹</span>（例如我在 D 盘根目录下创建了一个文件夹 blog 。`D:\blog` ），在<span id="inline-red">该文件夹中</span>执行以下命令， Hexo 将会在指定文件夹中新建所需要的文件。
``` bash
$ hexo init
$ npm install
```
等待安装，安装完成后，<span id="inline-green">指定文件夹</span> 的目录如下：
``` 
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└──
```
继续执行命令
``` bash
$ hexo g            //编译
$ hexo s --debug    //开启本地服务
```
这个时候，我们在浏览器中访问 `http://localhost:4000/` ，就可以看到基于 Hexo 的默认主题的原型：

![Markdown](http://on5sixmz1.bkt.clouddn.com/hexo001.png)

到目前为止我们的本地博客已经部署完成。下面我们换上Next主题。

## 使用Next主题

### 下载 NexT 主题
依旧是在当前目录下，使用 Git checkout 代码：
``` bash
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
```
等待下载完成。

### 启用 NexT 主题
打开 <span id="inline-blue">站点配置文件</span> (Hexo文件夹下的<span id="inline-green">_config.yml</span>文件)，找到 `theme` 字段，并将其值更改为 `next` 。
到此， NexT 主题安装完成。下一步我们依次执行以下命令验证主题是否正确启用。

``` bash
$ hexo clean
$ hexo g
$ hexo s 
```
我们在浏览器中访问 `http://localhost:4000/` ，你将看到：
![Markdown](http://on5sixmz1.bkt.clouddn.com/hexo002.png)

## 总结
**本地调试三部曲：**
``` bash
$ hexo clean
$ hexo g
$ hexo s --debug
```
这种带debug的运行，如果出现错误，可以在命令行中看到错误提示信息。
