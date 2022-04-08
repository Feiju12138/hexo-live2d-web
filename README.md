
# Live2D Web

Fork from `https://github.com/stevenjoezhang/live2d-widget`

## 傻瓜式一键引入最新版

- 无Aplayer联动的版本

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@latest/autoload.js"></script>
```

### 引入6.0

- 与APlayer联动的版本，需要在引入APlayer之后引入

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@6.0/autoload.js"></script>
```

### 引入7.0

- 无Aplayer联动的版本

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@7.0/autoload.js"></script>
```

## 新特性

- 在[stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)的基础上，新增如下功能

- 添加了对话功能，点击live2d，即可实现与live2d对话，可以与人工智能聊天
- 去除了live2d右侧的一排按钮，将所有按钮的执行内容整合到了对话中，对话时如果触发了特定指令，会实现原按钮的操作
- 去除了小飞机游戏，因为小飞机游戏属于别人开源的代码，本不属于live2d业务，live2d本应该只是展示模型
- 去除了模型仓库，因为模型本不属于live2d渲染的业务，live2d本应该只是模型的渲染，而不存储模型，模型是可以自己开发或者在互联网中对接开源的模型
- 将一言整合在了鼠标悬停live2d事件中
- 去除了控制台打印live2d的logo
- 添加了更为详细的注释方便个性化配置（例如自己编写触发事件所弹出的气泡，例如自己编写特定指令实现特定的效果）

### 6.0新特性

- 6.0是与Aplayer联动的版本

- 支持通过live2d操作Aplayer状态，例如切换歌曲、调整音量
- 支持live2d监视Aplayer的歌词，朗诵歌词
- 支持通过特定语法在互联网上搜索歌曲，自动添加到Aplayer进行播放

### 7.0新特性

- 7.0是纯净版，去除了Aplayer联动的相关代码

## 参考文献

<https://github.com/fghrsh/live2d_demo>

<https://github.com/fghrsh/live2d_api>

<https://github.com/stevenjoezhang/live2d-widget>

<https://aplayer.js.org/#/zh-Hans/?id=事件绑定>

<https://github.com/Binaryify/NeteaseCloudMusicApi>

## 版权声明

- 本仓库只包含live2d的web展示，live2d模型请在网络中查找，本项目默认使用<https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/>作为模型仓库

- 本项目查找到的歌曲均来源于网络，本项目不存储任何歌曲
