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
      // console.log(lrcCurrent);
      showMessage(lrcCurrent, 2000, 1);
    }
  });
}

let volumeArr = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
let volumeIndex = 7;
let CommandAPlayer =  {
  commandPlay: function() {
    ap.play();
    showMessage("已经开始播放音乐啦~", 2000, 2);
  },
  commandPause: function() {
    ap.pause();
    showMessage("已经暂停播放音乐啦~", 2000, 2);
  },
  commandSkipBack: function() {
    ap.skipBack();
    showMessage("已经切换到上一首音乐啦~", 2000, 2);
  },
  commandSkipForward: function() {
    ap.skipForward();
    showMessage("已经切换到下一首音乐啦~", 2000, 2);
  },
  commandLoopOne: function() {
    ap.options.loop = "one";
    showMessage("已经单曲循环啦~", 2000, 2);
  },
  commandLoopNone: function() {
    ap.options.loop = "none";
    showMessage("已经不循环啦~", 2000, 2);
  },
  commandLoopAllList: function() {
    ap.options.loop = "all";
    ap.options.order = "list";
    showMessage("已经顺序播放啦~", 2000, 2);
  },
  commandLoopAllRandom: function() {
    ap.options.loop = "all";
    ap.options.order = "random";
    showMessage("已经随机播放啦~", 2000, 2);
  },
  commandVolumeUp: function() {
    if (volumeIndex <= 10) {
      volumeIndex += 1;
    }
    ap.volume(volumeArr[volumeIndex], true);
    showMessage(`音量已调到${volumeArr[volumeIndex]*100}%`, 2000, 2);
  },
  commandVolumeDown: function() {
    if (volumeIndex >= 0) {
      volumeIndex -= 1;
    }
    ap.volume(volumeArr[volumeIndex], true);
    showMessage(`音量已调到${volumeArr[volumeIndex]*100}%`, 2000, 2);
  },
  commandVolumeZero: function() {
    ap.volume(volumeArr[0], true);
    showMessage(`已经静音啦~`, 2000, 2);
  },
  commandVolumeMax: function() {
    ap.volume(volumeArr[10], true);
    showMessage(`音量已调到最大`, 2000, 2);
  },
  commandUndoVolumeZero: function() {
    ap.volume(volumeArr[volumeIndex], true);
    showMessage(`音量已调到${volumeArr[volumeIndex]*100}%`, 2000, 2);
  }
}

