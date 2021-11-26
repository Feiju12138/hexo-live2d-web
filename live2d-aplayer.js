/**
 * 请在创建APlayer的对象ap之后引入这个插件
 * APlayer的引入方法详情见说明文档：https://aplayer.js.org/#/home
 */

let messageTimer;
function showMessage(text, timeout, priority) {
  if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }
  sessionStorage.setItem("waifu-text", priority);
  const tips = document.getElementById("waifu-tips");
  tips.innerHTML = text;
  tips.classList.add("waifu-tips-active");
  messageTimer = setTimeout(() => {
    sessionStorage.removeItem("waifu-text");
    tips.classList.remove("waifu-tips-active");
  }, timeout);
}

if (ap) {
  let lrcTmp = "";
  ap.on("timeupdate", function() {
    let lrcCurrent = document.querySelector(".aplayer-lrc-contents .aplayer-lrc-current").innerHTML;
    if (lrcTmp !== lrcCurrent) {
      lrcTmp = lrcCurrent;
      console.log(lrcCurrent);
      showMessage(lrcCurrent, 2000, 1);
    }
  });
}
