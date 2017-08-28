---
title: HEXO+GitHub搭建博客 - 优化
date: 2017-01-25 21:37:01
tags: [Next+Hexo,博客搭建] 
categories: [博客搭建]
comments: false 
---
<div class="out-img-topic">![Markdown](http://p1.bqimg.com/583079/fc5b98d5c59a4660.jpg)</div>

本篇文章主要介绍基于NexT主题的一些第三方功能的实现。
基本功能的设置可以参考[Next官网文档](http://on5pjsxrv.bkt.clouddn.com/hexo1.jpg)

<!-- more -->

首先，我们需要明白：
<p id="div-border-left-yellow"> 在 Hexo 中有两份主要的配置文件，其名称都是 `_config.yml` 。其中，一份位于站点根目录下，主要包含 Hexo 本身的配置；另一份位于主题目录下，这份配置由主题作者提供，主要用于配置主题相关的选项。
我们约定，将前者称为<span id="inline-blue"> 站点配置文件 </span>，后者称为 <span id="inline-purple">主题配置文件</span>。</p>

### 背景
#### 动态背景
修改 `_layout.swig` 模板
模板位置：`themes\next\layout\_layout.swig`
在末尾前加上下面一句:（这里提供两种样式，当然你也可以自由更改）
``` html
<!-- 动态背景 -->
#默认灰色线条
<script type="text/javascript" src="/js/src/particle.js"></script>
#浅蓝色线条
<script type="text/javascript" src="/js/src/particle.js" count="50" zindex="-2" opacity="1" color="0,104,183"></script>
```
然后在 `themes\source\js\src\` 下新建文件 `particle.js` 写上以下代码:
``` js
!function(){function n(n,e,t){return n.getAttribute(e)||t}function e(n){return document.getElementsByTagName(n)}function t(){var t=e("script"),o=t.length,i=t[o-1];return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","0,0,0"),n:n(i,"count",99)}}function o(){c=u.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a=u.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){l.clearRect(0,0,c,a);var n,e,t,o,u,d,x=[w].concat(y);y.forEach(function(i){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>c||i.x<0?-1:1,i.ya*=i.y>a||i.y<0?-1:1,l.fillRect(i.x-.5,i.y-.5,1,1),e=0;e<x.length;e++)n=x[e],i!==n&&null!==n.x&&null!==n.y&&(o=i.x-n.x,u=i.y-n.y,d=o*o+u*u,d<n.max&&(n===w&&d>=n.max/2&&(i.x-=.03*o,i.y-=.03*u),t=(n.max-d)/n.max,l.beginPath(),l.lineWidth=t/2,l.strokeStyle="rgba("+m.c+","+(t+.2)+")",l.moveTo(i.x,i.y),l.lineTo(n.x,n.y),l.stroke()));x.splice(x.indexOf(i),1)}),r(i)}var c,a,u=document.createElement("canvas"),m=t(),d="c_n"+m.l,l=u.getContext("2d"),r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/45)},x=Math.random,w={x:null,y:null,max:2e4};u.id=d,u.style.cssText="position:fixed;top:0;left:0;z-index:"+m.z+";opacity:"+m.o,e("body")[0].appendChild(u),o(),window.onresize=o,window.onmousemove=function(n){n=n||window.event,w.x=n.clientX,w.y=n.clientY},window.onmouseout=function(){w.x=null,w.y=null};for(var y=[],s=0;m.n>s;s++){var f=x()*c,h=x()*a,g=2*x()-1,p=2*x()-1;y.push({x:f,y:h,xa:g,ya:p,max:6e3})}setTimeout(function(){i()},100)}();
```

#### 鼠标点击小红心
在 `\themes\next\source\js\src` 文件目录下添加 `love.js` 文件。内容为：
``` js
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```
找到 `\themes\next\layout\_layout.swing` 文件， 在文件的后面，</body> 标签之前 添加以下代码：
``` js
<!-- 小红心 -->
<script type="text/javascript" src="/js/src/love.js"></script>
```

### 头像圆形旋转
修改文件 `themes/next/source/css/_common/components/sidebar/sidebar-author.styl`
[我的样式文件](https://github.com/cwyaml/blog-backup/blob/master/themes/next-5.0.1/source/css/_common/components/sidebar/sidebar-author.styl)

### 文章结尾模板
在 `\themes\next\_macro` 文件目录下添加 `passage-end-tag.swig` 文件，内容为：(当然你也可以修改为自己喜欢的样式)
``` html
{% if theme.passage_end_tag.enabled %}
<blockquote class="blockquote-center">
    <p>如果您觉得本博客还不错，欢迎继续关注本博客，欢迎多提宝贵意见，非常感谢！</p>
</blockquote>
<span id="inline-green" style="border-radius:3px;">作者</span>：
<a class="link-blue" href="https://github.com/cwyaml" target="_blank">cwyaml</a>
有问题请 <a class="link-blue" href="https://cwyaml.github.io/about/">留言</a> 
或者私信我的 <a class="link-blue" href="http://weibo.com/u/5742789641?refer_flag=1001030102_&is_all=1" target="_blank">微博</a>。
<div style="text-align:center; color:#ccc; font-size:14px; ">
 ------本文结束
 &nbsp;<i class="fa fa-paw"></i>&nbsp; 
 感谢阅读------
</div>
{% endif %}
```
找到 `\themes\next\_macro\post.swig` 文件，使用查找功能找到 `reward.swig`，在这一个 `<div>` 的前面添加：
``` html
<div>
  {% if not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>
```

### 文章底部标签云锚点
在 `themes\next\layout\_macro\post.swig` 文件中找到以下代码：
``` html
<footer class="post-footer">
<!--这是文章底部标签云锚点，不喜欢就注释掉
  {% if post.tags and post.tags.length and not is_index %}
    <div class="post-tags">
      {% for tag in post.tags %}
        <a href="{{ url_for(tag.path) }}" rel="tag"># {{ tag.name }}</a>
      {% endfor %}
    </div>
  {% endif %}
-->
```

### 关于文章内文本样式
Markdown 毕竟是为了方便写作，在样式上就过于单调。我们自己来给文章加一些样式。。
<p id="div-border-left-red"> Next 作者提供了一个供用户自己定义样式的文件：`\themes\next\source\css\_custom\custom.stl` </p>  
#### 自己按需要写
在上述文件中写上自己的 class 类，然后在 Markdown 文档中使用。
[我的custom.styl](https://github.com/cwyaml/Useful-code/blob/master/custom.styl)
#### 引用前端框架
目前流行的前端框架，像 [bootstrap](http://www.bootcss.com/)、[React](http://reactjs.cn/react/index.html)、[Angular](http://www.apjs.net/) 等，提供给我们很好的前端方案，我们可以把喜欢的引入到上面说的那个文件里，然后就可以使用了。

### 设置动态title
- 在 `\themes\next\source\js\src` 目录下新建 `dytitle.js` 。添加以下内容：
```
<!--崩溃欺骗-->
var OriginTitile = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/TEP.ico");
         document.title = ' 页面崩溃啦 ~ | cwyaml！';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/favicon.ico");
         document.title = ' 噫又好了~ ' + OriginTitile;
         titleTime = setTimeout(function () {
             document.title = OriginTitile;
         }, 2000);
     }
 });
```
- 更改 `\themes\next\layout\_layout.swig` 。在 **&lt;/body&gt;** 之前添加：
```
<!--崩溃欺骗-->
<script type="text/javascript" src="/js/src/dytitle.js"></script>
```

### 首页动画
在 <span id="inline-purple">主题配置文件</span> 中，找到 Motion 字段。true 和 false 控制动画的开启与关闭。
```
# Motion
use_motion: true
```

### 内容宽度
现在一般的笔记本都在15寸以上，博客页面两侧留白太多就显得没有必要，并且不美观，所以有必要调整一下宽度。（*可以慢慢试着调整到最合适的状态*）
- 找到 `\themes\next\source\css\_common\components\post\post-expand.styl`，找到：
```
@media (max-width: 767px)
改为：
@media (max-width: 1060px)
```
- 找到：`\themes\next\source\css\ _variables\base.styl` ，找到：
```
$main-desktop                   = 960px
$main-desktop-large             = 1200px

$content-desktop                = 700px
改为：
$main-desktop                   = 1060px
$main-desktop-large             = 1200px

$content-desktop                = 800px
```
- 找到 `\themes\next\source\css\_schemes\Pisces\_layout.styl` ，将第 4 行的 **width** 改为 **1060px** ，修改后如下：
```
.header {
  position: relative;
  margin: 0 auto;
  width: 1060px;
```

### 统计功能
#### 文章阅读次数统计
参考： [LeanCloud](https://notes.wanghao.work/2015-10-21-%E4%B8%BANexT%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E6%96%87%E7%AB%A0%E9%98%85%E8%AF%BB%E9%87%8F%E7%BB%9F%E8%AE%A1%E5%8A%9F%E8%83%BD.html#%E9%85%8D%E7%BD%AELeanCloud)

#### 不蒜子统计站点访问
- **全局配置：**
编辑 <span id="inline-purple">主题配置文件</span> 中的 `busuanzi_count` 的配置项，配置以下内容：
当 **enable: true** 时，代表开启全局开关。若 <u>site_uv、site_pv、page_pv</u> 的值均为 **false** 时，不蒜子仅作记录而不会在页面上显示。
- **站点 UV/PV 配置：**
当 **site_uv: true** 时，代表在页面底部显示站点的 UV 值。
当 **site_pv: true** 时，代表在页面底部显示站点的 PV 值
**site_uv_header**(site_pv_header) 和 **site_uv_footer**(site_pv_footer) 为自定义样式配置，相关的值留空时将不显示，可以使用（带特效的）<u>font-awesome</u>。显示效果为 **[site_uv_header]UV值/PV值[site_uv_footer]**。
```
busuanzi_count:
  # count values only if the other configs are false
  enable: true
  # custom uv span for the whole site
  site_uv: true
  site_uv_header: 本站总访问量
  site_uv_footer: 
  # custom pv span for the whole site
  site_pv: true
  site_pv_header: 您是第 
  site_pv_footer:  位小伙伴
```
- **单页面 PV 值设置：**
```
  # custom pv span for one page only
  page_pv: false
  page_pv_header: <i class="fa fa-file-o"></i>
  page_pv_footer:
```

### 开启打赏功能
越来越多的平台（微信公众平台，新浪微博，简书等）支持打赏功能，付费阅读时代越来越近，特此增加了打赏功能。 只需要 <span id="inline-purple">主题配置文件</span> 中填入 微信 和 支付宝 收款二维码图片地址（放在博客根目录的source文件夹下即可） 即可开启该功能。
```
reward_comment: 坚持原创技术分享，您的支持将鼓励我继续创作！
wechatpay: /weixin.png
alipay: /zhifubao.png
```

### 设置RSS
- 需要安装 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) 插件。
```
$ npm install hexo-generator-feed --save
```
- 在 <span id="inline-blue"> 站点配置文件 </span> 中添加字段：
```
feed:
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content:
```

### 听音乐
- **下载js文件：**[high.swig](https://github.com/cwyaml/Useful-code/blob/master/high.swig)。放在 `\themes\next\layout\_macro` 目录下。
- **在侧边栏引用该文件：**修改 `\themes\next\layout\_macro\sidebar.swig` ，添加以下代码：
  ```
  {% include 'high.swig' %}
  ```
  ![Markdown](http://on5sixmz1.bkt.clouddn.com/hexo01.png)
- **样式修改：**使 **听音乐** 和 **RSS** 并排展示，修改 `\themes\next\source\css\_schemes\Pisces\_sidebar.styl`
  ``` css
  display: inline-block;
  ```
  ![Markdown](http://on5sixmz1.bkt.clouddn.com/hexo02.png)

- **添加自己喜欢的音乐：**修改其中的歌曲链接即可（[获取歌曲外链教程](https://cwyaml.github.io/2017/03/02/wangyimusic/)）
  ``` js
  var songs = [
        "http://m2.music.126.net/3uHnH7uQAeFwUfuvEB9lrg==/3265549619475054.mp3", 
        "http://m2.music.126.net/NnHwR2HV-1OoKZ6R5LVy4Q==/18502581673300023.mp3",
        "http://m2.music.126.net/qv3RI4K7ABKJ0TyAdb3taw==/3250156397064860.mp3",    
        "......"
    ];
  ```
- **首页听音乐摇晃：**需要加载css样式。在 `themes\next\layout\_layout.swig` 文件的 <u>body标签结束前</u> 添加以下代码：
  ``` css
  <!-- 听音乐摇晃 -->
  <link href="http://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css" rel="stylesheet" type="text/css">
  ```
  <span id="inline-red">注意：</span> 有时候使用 Firefox 、Chrome时会提示非法插件并禁止使用，遇到这种情况我们把样式代码引入到 `\themes\next\source\css\_custom\custom.stl` 文件即可解决。

### 添加 Forkme on GitHub 丝带
首先进入 [GitHub Ribbons](https://github.com/blog/273-github-ribbons) 选择自己喜欢的丝带样式。
找到 `\themes\next\layout\_layout.swig` 文件，在 `<header>` 标签前面添加：（记得把链接修改成自己的GitHub主页）
``` html
<a href="https://github.com/you"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>
```

### 给 Blog 添加 LICENSE
修改 <span id="inline-purple">主题配置文件</span> （使用查找功能）
``` html
# Creative Commons 4.0 International License.
# http://creativecommons.org/
# Available: by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero
creative_commons: by-nc-sa
#creative_commons:
```

### Local Search
- 安装 hexo-generator-searchdb
```
$ npm install hexo-generator-searchdb --save
```
- 编辑 <span id="inline-blue"> 站点配置文件 </span> ，添加以下字段：
```
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
- 编辑 <span id="inline-purple">主题配置文件</span> ，启用本地搜索
```
# Local search
local_search:
  enable: true
```

### 多说
#### 多说评论
使用多说前需要先在 [多说](http://duoshuo.com/) 创建一个站点。具体步骤如下：
- 登录后在首页选择“我要安装”。
- 创建站点，填写站点相关信息。**多说域名** 这一栏填写的就是你的 `duoshuo_shortname`,

![Markdown](http://on5sixmz1.bkt.clouddn.com/hexo03.png)

- 创建站点完成后在 <span id="inline-blue"> 站点配置文件 </span> 中新增 `duoshuo_shortname` 字段，值设置成上一步中的值即可。

**多说评论框自定义** : [我的样式代码](https://github.com/cwyaml/code-useful/blob/master/%E5%A4%9A%E8%AF%B4%E8%AF%84%E8%AE%BA%E6%A1%86%E6%A0%B7%E5%BC%8F/index.css)

#### 多说分享
在 <span id="inline-purple">主题配置文件</span> 中设置：
```
# Share
duoshuo_share: true
```
禁用鼠标经过时分享更多功能（有bug）:
找到 `\themes\next\layout\_partials\share\duoshuo_share.swig` 文件，替换内容为：
``` html
<div class="ds-share flat" data-thread-key="{{ page.path }}"
  data-title="{{ page.title }}"
  data-content=""
  data-url="{{ page.permalink }}">
  <div class="ds-share-inline">
    <ul  class="ds-share-icons-16">
      <li><span class="ds-more">分享到：</span></li>
      <li><a class="ds-weibo" href="javascript:void(0);" data-service="weibo">微博</a></li>
      <li><a class="ds-qzone" href="javascript:void(0);" data-service="qzone">QQ空间</a></li>
      <li><a class="ds-qqt" href="javascript:void(0);" data-service="qqt">腾讯微博</a></li>
      <li><a class="ds-wechat" href="javascript:void(0);" data-service="wechat">微信</a></li>
      <li><a class="ds-facebook" href="javascript:void(0);" data-service="facebook">Facebook</a></li>
      <li><a class="ds-google" href="javascript:void(0);" data-service="google">Google</a></li>
    </ul>
  <div class="ds-share-icons-more">
</div>
</div>
</div>
```

### 博文压缩
目前知道的有两个插件可以压缩博文，`hexo-all-minifier` 插件和 `gulp`插件。
**hexo-all-minifier** 虽然使用比较简单，而且也可以压缩图片，但是对文章缩进（输入法全拼模式下按 Tab）不支持，所以暂时使用 gulp 压缩手段。
#### hexo-all-minifier 使用方法
安装 hexo-all-minifier，在站点的根目录下执行以下命令：
```
$ npm install hexo-all-minifier --save
```
`hexo g` 编译的时候就会自动压缩 HTML、JS、图片。详情参考插件介绍 [hexo-all-minifier](https://github.com/chenzhutian/hexo-all-minifier)
#### glup 使用方法
hexo 依赖 gulp 插件安装，在站点的根目录下执行以下命令：
```
$ npm install gulp -g
$ npm install gulp-minify-css gulp-uglify gulp-htmlmin gulp-htmlclean gulp --save
```
在 `package.json` 同级目录下，新建 `gulpfile.js` 并填入以下内容：
```
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
// 压缩 public 目录 css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
         removeComments: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html','minify-css','minify-js'
]);
```
生成博文是执行 `hexo g &amp;&amp; gulp` 就会根据 **gulpfile.js** 中的配置，对 **public** 目录中的静态资源文件进行压缩。

### 博文置顶
- 修改 `hexo-generator-index` 插件。
  替换文件：node_modules/hexo-generator-index/lib/generator.js 为：[generator.js](https://github.com/cwyaml/Useful-code/blob/master/generator%E6%8F%92%E4%BB%B6%E4%BF%AE%E6%94%B9/generator.js)
- 设置文章置顶
  在文章 Front-matter 中添加 **top 值**，<u>数值越大文章越靠前</u>，如：
  ``` html
  ---
  title: cwyaml 图集
  categories: [图片]
  tags: [picture]
  date: 2015-04-02 14:36:04
  top: 10
  ---
  ```

### 博文部署 message
在 `\node_modules\hexo-deployer-git\lib\deployer.js` 文件末尾找到这一句：（记得个性一点）
```
Lucky Boy: {{ now(\'YYYY-MM-DD HH:mm:ss\') }}.
```

### 图片模式
  新建博文，设置 `type: "picture"`，使用 `{\% gp x-x \%} ... {\% endgp \%}` 标签引用要展示的图片地址，如下所示：(其中的 x-x 为图片展示效果，可以自己尝试一下)
  ``` html
  ---
  title: Naruto-Pictures
  categories: [图片]
  tags: [picture]
  date: 2014-06-02 10:36:02
  type: "picture"
  comments: false
  ---
  {% gp 5-3 %}
  ![](http://oapjp6spr.bkt.clouddn.com/18210.jpg)
  ![](http://oapjp6spr.bkt.clouddn.com/196232.jpg)
  ![](http://oapjp6spr.bkt.clouddn.com/224147.jpg)
  ![](http://oapjp6spr.bkt.clouddn.com/199301.jpg)
  ![](http://oapjp6spr.bkt.clouddn.com/213318.jpg)
  {% endgp %}
  ```




