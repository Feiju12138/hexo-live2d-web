
# Live2D Web

Fork from `https://github.com/stevenjoezhang/live2d-widget`

## 傻瓜式一键引入最新版

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@latest/autoload.js"></script>
```

## 2.x 引入

- 增加了聊天功能

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@2.8/autoload.js"></script>
```

## 3.x 引入

- 整合了前后端到一个项目，如果有自定义后端模型和皮肤的需求，请使用旧版

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@3.0/autoload.js"></script>
```

## 4.x 引入

- 与APlayer联动
- 添加了控制APlayer播放器状态和点歌的功能

``` html
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@4.4/autoload.js"></script>
```

## 4.x 新特性

- 整合了前后端的调用路径

- 整合了APlayer，实现演唱歌词
  - 如果想要实现APlayer扩展，只需要额外引入扩展即可
  - 如果**不需要扩展**或者项目中没有APlayer，只需要**不引入扩展**即可
  - APlayer的引入方法详情见说明文档：[https://aplayer.js.org/#/home](https://aplayer.js.org/#/home)

- 新增了使用Live2d控制播放器播放状态的功能

- 新增了使用Live2d搜歌的功能
  - 由于歌词是从网络获取的，所以APlayer在创建对象时需要指定歌词格式为JS字符串（`lrcType: 1`），否则无法渲染

## 参考文献

[https://github.com/fghrsh/demo](https://github.com/fghrsh/demo)

[https://github.com/fghrsh/live2d_api](https://github.com/fghrsh/live2d_api)

[https://github.com/stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

[https://aplayer.js.org/#/zh-Hans/?id=事件绑定](https://aplayer.js.org/#/zh-Hans/?id=事件绑定)

[https://github.com/Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 版权声明

API内所有模型版权均属于原作者，仅供研究学习，不得用于商业用途

歌曲均来源于网络，本项目不存储任何歌曲

