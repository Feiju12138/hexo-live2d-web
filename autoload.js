// 这里定义所有live2d静态资源地址
// 如果没有将项目下载到本地，可以使用CDN地址
const live2d_path = "https://cdn.jsdelivr.net/gh/Feiju12138/hexo-live2d-web@latest/";
// 如果将项目下载到了本地，可以引入本地绝对路径
// const live2d_path = "/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;
		
		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource(live2d_path + "live2d.min.js", "js"),
		loadExternalResource(live2d_path + "waifu-tips.js", "js")
	]).then(() => {
		initWidget({
			waifuPath: live2d_path + "waifu-tips.json",
			// 在这里定义模型访问地址，自己搭建详见：https://github.com/fghrsh/live2d_api
			cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
		});
	});
}

// console.log(`
//   く__,.ヘヽ.        /  ,ー､ 〉
//            ＼ ', !-─‐-i  /  /´
//            ／｀ｰ'       L/／｀ヽ､
//          /   ／,   /|   ,   ,       ',
//        ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
//         ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
//           !,/7 '0'     ´0iソ|    |
//           |.从"    _     ,,,, / |./    |
//           ﾚ'| i＞.､,,__  _,.イ /   .i   |
//             ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
//               | |/i 〈|/   i  ,.ﾍ |  i  |
//              .|/ /  ｉ：    ﾍ!    ＼  |
//               kヽ>､ﾊ    _,.ﾍ､    /､!
//               !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
//               ﾚ'ヽL__|___i,___,ンﾚ|ノ
//                   ﾄ-,/  |___./
//                   'ｰ'    !_,.:
// `);
