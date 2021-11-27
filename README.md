
# Live2D Web 4.x

Fork from `https://github.com/stevenjoezhang/live2d-widget`

## CDN引用地址

``` html
// 引入APlayer扩展（请在创建APlayer的对象ap之后引入这个插件）
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@4.3/live2d-aplayer.js"></script>

// 如果需要引入APlayer扩展，请在引入APlayer扩展后引入Live2d
<script src="https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@4.3/autoload.js"></script>
```

## 4.x 新特性

- 整合了前后端的调用路径

- 整合了APlayer，实现演唱歌词
  - 如果想要实现APlayer扩展，只需要额外引入扩展即可
  - 如果__不需要扩展__或者项目中没有APlayer，只需要__不引入扩展__即可
  - APlayer的引入方法详情见说明文档：[https://aplayer.js.org/#/home](https://aplayer.js.org/#/home)

- 新增了使用Lived控制播放器播放状态的功能

## 参考文献

[https://github.com/fghrsh/demo](https://github.com/fghrsh/demo)

[https://github.com/fghrsh/live2d_api](https://github.com/fghrsh/live2d_api)

[https://github.com/stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

[https://aplayer.js.org/#/zh-Hans/?id=事件绑定](https://aplayer.js.org/#/zh-Hans/?id=事件绑定)

## 版权声明

API内所有模型版权均属于原作者，仅供研究学习，不得用于商业用途

