// APayer的音量变量
let volumeArr = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
let volumeIndex = 7;

// 加载live2d
function loadWidget(config) {
	let { waifuPath, apiPath, cdnPath } = config;
	let useCDN = false, modelList;
	if (typeof cdnPath === "string") {
		useCDN = true;
		if (!cdnPath.endsWith("/")) cdnPath += "/";
	} else if (typeof apiPath === "string") {
		if (!apiPath.endsWith("/")) apiPath += "/";
	} else {
		console.error("Invalid initWidget argument!");
		return;
	}
	localStorage.removeItem("waifu-display");
	sessionStorage.removeItem("waifu-text");
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment"></span>
				<span class="fa fa-lg fa-comments"></span>
				<span class="fa fa-lg fa-paper-plane"></span>
				<span class="fa fa-lg fa-user-circle"></span>
				<span class="fa fa-lg fa-street-view"></span>
				<span class="fa fa-lg fa-camera-retro"></span>
				<span class="fa fa-lg fa-info-circle"></span>
				<span class="fa fa-lg fa-times"></span>
			</div>
		</div>`);
	setTimeout(() => {
		document.getElementById("waifu").style.bottom = 0;
	}, 0);

	function randomSelection(obj) {
		return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
	}
	// 检测用户活动状态，并在空闲时显示消息
	let userAction = false,
		userActionTimer,
		messageTimer,
		messageArray = ["好久不见，日子过得好快呢……", "大坏蛋！你都多久没理人家了呀，嘤嘤嘤~", "嗨~快来逗我玩吧！", "拿小拳拳锤你胸口！", "记得把小家加入 Adblock 白名单哦！"];
	window.addEventListener("mousemove", () => userAction = true);
	window.addEventListener("keydown", () => userAction = true);
	setInterval(() => {
		if (userAction) {
			userAction = false;
			clearInterval(userActionTimer);
			userActionTimer = null;
		} else if (!userActionTimer) {
			userActionTimer = setInterval(() => {
				showMessage(randomSelection(messageArray), 6000, 9);
			}, 20000);
		}
	}, 1000);

	(function registerEventListener() {
		document.querySelector("#waifu-tool .fa-comment").addEventListener("click", showHitokoto);
		document.querySelector("#waifu-tool .fa-comments").addEventListener("click", chatTogether);
		document.querySelector("#waifu-tool .fa-paper-plane").addEventListener("click", () => {
			if (window.Asteroids) {
				if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
				window.ASTEROIDSPLAYERS.push(new Asteroids());
			} else {
				const script = document.createElement("script");
				script.src = live2d_path + "asteroids.js";
				document.head.appendChild(script);
			}
		});
		document.querySelector("#waifu-tool .fa-user-circle").addEventListener("click", loadOtherModel);
		document.querySelector("#waifu-tool .fa-street-view").addEventListener("click", loadRandModel);
		document.querySelector("#waifu-tool .fa-camera-retro").addEventListener("click", () => {
			showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
			Live2D.captureName = "photo.png";
			Live2D.captureFrame = true;
		});
		document.querySelector("#waifu-tool .fa-info-circle").addEventListener("click", () => {
			open("/about");
		});
		document.querySelector("#waifu-tool .fa-times").addEventListener("click", () => {
			localStorage.setItem("waifu-display", Date.now());
			showMessage("愿你有一天能与重要的人重逢。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			setTimeout(() => {
				document.getElementById("waifu").style.display = "none";
				document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
			}, 3000);
		});
		const devtools = () => {};
		console.log("%c", devtools);
		devtools.toString = () => {
			showMessage("哈哈，你打开了控制台，是想要看看我的小秘密吗？", 6000, 9);
		};
		window.addEventListener("copy", () => {
			showMessage("你都复制了些什么呀，转载要记得加上出处哦！", 6000, 9);
		});
		window.addEventListener("visibilitychange", () => {
			if (!document.hidden) showMessage("哇，你终于回来了~", 6000, 9);
		});
	})();

	(function welcomeMessage() {
		let text;
		if (location.pathname === "/") { // 如果是主页
			const now = new Date().getHours();
			if (now > 5 && now <= 7) text = "早上好！一日之计在于晨，美好的一天就要开始了。";
			else if (now > 7 && now <= 11) text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
			else if (now > 11 && now <= 13) text = "中午了，工作了一个上午，现在是午餐时间！";
			else if (now > 13 && now <= 17) text = "午后很容易犯困呢，今天的运动目标完成了吗？";
			else if (now > 17 && now <= 19) text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~";
			else if (now > 19 && now <= 21) text = "晚上好，今天过得怎么样？";
			else if (now > 21 && now <= 23) text = ["已经这么晚了呀，早点休息吧，晚安~", "深夜时要爱护眼睛呀！"];
			else text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
		} else if (document.referrer !== "") {
			const referrer = new URL(document.referrer),
				domain = referrer.hostname.split(".")[1];
			if (location.hostname === referrer.hostname) text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
			else if (domain === "baidu") text = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&wd=")[1].split("&")[0]}</span> 找到的我吗？`;
			else if (domain === "so") text = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&q=")[1].split("&")[0]}</span> 找到的我吗？`;
			else if (domain === "google") text = `Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
			else text = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`;
		} else {
			text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
		}
		if (ap) {
			text += " 检测到APlayer啦，开始联动！你可以对我说：来点音乐";
		}
		showMessage(text, 7000, 8);
	})();

	function showHitokoto() {
		// 增加 hitokoto.cn 的 API
		fetch("https://v1.hitokoto.cn")
			.then(response => response.json())
			.then(result => {
				showMessage(result.hitokoto, 6000, 9);
			});
	}
	
	function chatTogether() {
		// 获取气泡对象
		const tips = document.getElementById("waifu-tips");
		// 先清空上一次的气泡
		sessionStorage.removeItem("waifu-text");
		tips.classList.remove("waifu-tips-active");
		// 在气泡上添加文本域
		let text = "<textarea cols='29' rows='4' id='chatInput'>";
		showMessage(text, 60000, 8);
		// 获取输入框对象
		let chat = document.getElementById('chatInput');
		// 自动成为焦点
		chat.focus();
		// 添加键盘按下事件
		chat.onkeydown = function (e) {
			let {keyCode,target} = e;
			if(keyCode === 13) {
				// 输入回车后立即清空气泡
				sessionStorage.removeItem("waifu-text");
				tips.classList.remove("waifu-tips-active");
				
				// 站点的命令
				switch (target.value) {
					case "回到顶部":
						document.documentElement.scrollTop = 0;
						return;
					// 以下是我的自定义命令，可能不通用
					case "召唤雪花":
						document.write("<script type=\"text/javascript\" src=\"/snow/jquery-1.7.2.min.js\"></script>");
						document.write("<script type=\"text/javascript\" src=\"/snow/snow.js\"></script>");
						document.write("<style type=\"text/css\">.snow-container{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:100001;}</style>");
						document.write("<div class=\"snow-container\"></div>");
						return;
					case "召唤冰霜":
						document.write("<link rel=\"stylesheet\" href=\"/freeze/index.css\">");
						document.write("<div class=\"hp_special_experience\">");
						document.write("<div class=\"hol_frames_cont\">");
						document.write("<div class=\"frame fader frost show\">");
						document.write("<div class=\"frame_sprite frame_left\"></div>");
						document.write("<div class=\"frame_sprite frame_right\"></div>");
						document.write("<div class=\"frame_sprite frame_top\"></div>");
						document.write("<div class=\"frame_sprite frame_bottom\"></div>");
						document.write("</div>");
						document.write("</div>");
						document.write("</div>");
						return;
					case "捉住小猫":
						open("/egg/catch-the-cat/");
						return;
					case "小恐龙":
						open("/egg/chrome-dino/");
						return;
					// 更多自定义操作可以在此处追加case语句块，别忘了加return
				}
				
				// live2d的命令
				switch (target.value) {
					case "你都会什么":
						showMessage(`试试对我说：飞机大战`, 2000, 2);
						return;
					case "飞机大战":
						if (window.Asteroids) {
							if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
							window.ASTEROIDSPLAYERS.push(new Asteroids());
						} else {
							const script = document.createElement("script");
							script.src = live2d_path + "asteroids.js";
							document.head.appendChild(script);
						}
						return;
					case "来一碗鸡汤":
						showHitokoto()
						return;
					case "召唤妹妹":
						loadOtherModel();
						return;
					case "换个衣服吧":
						loadRandModel();
						return;
					case "关于":
						open("/about");
						return;
					case "拍个照吧":
						showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
						Live2D.captureName = "photo.png";
						Live2D.captureFrame = true;
						return;
					case "我生气了":
						localStorage.setItem("waifu-display", Date.now());
						showMessage("那人家呆一会再来找你玩吧~", 2000, 11);
						document.getElementById("waifu").style.bottom = "-500px";
						setTimeout(() => {
							document.getElementById("waifu").style.display = "none";
							document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
						}, 3000);
						return;
					/*
					更多自定义操作，在此处定义
					这里写你的命令
					case "":
						这里写你的自定义操作
						不要忘了加上返回
						return;
					*/
				}
				
				// APlayer的命令
				// 以下为与APlayer的联动命令，如果在加载live2d之前没有APlayer的对象ap，则以下命令无效
				if (ap) {
					// 判断是否点歌
					if (target.value.indexOf("放一首") === 0) {
						let keywords = target.value.substr(3);
						fetch("https://apimusic.postgraduate.top/search?offset=0&limit=30&keywords=" + keywords)
								.then(response => response.json())
								.then(result => {
									if (result.result.songs.length !== 0) {
										let songId = result.result.songs[0].id;
										let songName, songArtist, songCover, songUrl, songLrc;
										// 获取歌曲基本信息
										fetch("https://apimusic.postgraduate.top/song/detail?ids=" + songId)
												.then(response => response.json())
												.then(result => {
													songName = result.songs[0].name;
													songArtist = result.songs[0].ar[0].name;
													songCover = result.songs[0].al.picUrl;
													// 获取歌曲链接
													fetch("https://apimusic.postgraduate.top/song/url?id=" + songId)
															.then(response => response.json())
															.then(result => {
																songUrl = result.data[0].url;
																// 获取歌词
																fetch("https://apimusic.postgraduate.top/lyric?id=" + songId)
																		.then(response => response.json())
																		.then(result => {
																			songLrc = result.lrc.lyric;
																			
																			// 清空播放列表
																			ap.list.clear();
																			// 添加一首歌
																			ap.list.add({
																				name: songName,
																				artist: songArtist,
																				cover: songCover,
																				url: songUrl,
																				lrc: songLrc
																			});
																			// 开始播放
																			ap.play();
																			showMessage(`人家从互联网找到了这首 ${songName}，要不要奖励人家呢~`, 2000, 2);
																			return;
																		});
															});
												});
									}
								});
					}
					
					// 判断播放器控制操作
					switch (target.value) {
						case "播放":
						case "播放音乐":
						case "来点音乐":
							ap.play();
							showMessage("已经开始播放音乐啦~", 2000, 2);
							return;
						case "暂停":
						case "停止":
							ap.pause();
							showMessage("已经暂停播放音乐啦~", 2000, 2);
							return;
						case "上一首":
						case "上一曲":
							ap.skipBack();
							showMessage("已经切换到上一首音乐啦~", 2000, 2);
							return;
						case "下一首":
						case "下一曲":
							ap.skipForward();
							showMessage("已经切换到下一首音乐啦~", 2000, 2);
							return;
						case "单曲循环":
						case "循环":
							ap.options.loop = "one";
							showMessage("已经单曲循环啦~", 2000, 2);
							return;
						case "不循环":
							ap.options.loop = "none";
							showMessage("已经不循环啦~", 2000, 2);
							return;
						case "顺序播放":
						case "取消单曲循环":
						case "取消随机播放":
							ap.options.loop = "all";
							ap.options.order = "list";
							showMessage("已经顺序播放啦~", 2000, 2);
							return;
						case "随机播放":
							ap.options.loop = "all";
							ap.options.order = "random";
							showMessage("已经随机播放啦~", 2000, 2);
							return;
						case "音量高一点":
						case "大点声":
							if (volumeIndex <= 10) {
								volumeIndex += 1;
							}
							ap.volume(volumeArr[volumeIndex], true);
							return;
						case "音量低一点":
						case "小点声":
							if (volumeIndex >= 0) {
								volumeIndex -= 1;
							}
							ap.volume(volumeArr[volumeIndex], true);
							showMessage(`音量已调到${volumeArr[volumeIndex] * 100}%`, 2000, 2);
							return;
						case "音量调到最大":
						case "最大声":
							ap.volume(volumeArr[10], true);
							showMessage(`音量已调到最大`, 2000, 2);
							return;
						case "静音":
						case "别出声":
							ap.volume(volumeArr[0], true);
							showMessage(`已经静音啦~`, 2000, 2);
							return;
						case "取消静音":
							ap.volume(volumeArr[volumeIndex], true);
							showMessage(`音量已调到${volumeArr[volumeIndex] * 100}%`, 2000, 2);
							return;
					}
				}
				
				// 与人工智(zhi)能(zhang)对话
				fetch("https://api.ownthink.com/bot?appid=xiaosi&spoken="+target.value)
					.then(response => response.json())
					.then(result => {
						showMessage(result.data.info.text, 6000, 9);
					});
				return;
				
			}
		}
		
	}
	
	function showMessage(text, timeout, priority) {
		if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
		if (messageTimer) {
			clearTimeout(messageTimer);
			messageTimer = null;
		}
		text = randomSelection(text);
		sessionStorage.setItem("waifu-text", priority);
		const tips = document.getElementById("waifu-tips");
		tips.innerHTML = text;
		tips.classList.add("waifu-tips-active");
		messageTimer = setTimeout(() => {
			sessionStorage.removeItem("waifu-text");
			tips.classList.remove("waifu-tips-active");
		}, timeout);
	}
	
	(function initModel() {
		let modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (modelId === null) {
			// 首次访问加载 指定模型 的 指定材质
			modelId = 1; // 模型 ID
			modelTexturesId = 1; // 材质 ID
		}
		loadModel(modelId, modelTexturesId);
		fetch(waifuPath)
			.then(response => response.json())
			.then(result => {
				window.addEventListener("mouseover", event => {
					for (let { selector, text } of result.mouseover) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
						return;
					}
				});
				window.addEventListener("click", event => {
					for (let { selector, text } of result.click) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
						return;
					}
				});
				result.seasons.forEach(({ date, text }) => {
					const now = new Date(),
						after = date.split("-")[0],
						before = date.split("-")[1] || after;
					if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
						text = randomSelection(text);
						text = text.replace("{year}", now.getFullYear());
						//showMessage(text, 7000, true);
						messageArray.push(text);
					}
				});
			});
	})();

	async function loadModelList() {
		const response = await fetch(`${cdnPath}model_list.json`);
		modelList = await response.json();
	}

	async function loadModel(modelId, modelTexturesId, message) {
		localStorage.setItem("modelId", modelId);
		localStorage.setItem("modelTexturesId", modelTexturesId);
		showMessage(message, 4000, 10);
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
		} else {
			loadlive2d("live2d", `${apiPath}get/?id=${modelId}-${modelTexturesId}`);
			console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`);
		}
	}

	async function loadRandModel() {
		const modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
			showMessage("我的新衣服好看嘛？", 4000, 10);
		} else {
			// 可选 "rand"(随机), "switch"(顺序)
			fetch(`${apiPath}rand_textures/?id=${modelId}-${modelTexturesId}`)
				.then(response => response.json())
				.then(result => {
					if (result.textures.id === 1 && (modelTexturesId === 1 || modelTexturesId === 0)) showMessage("我还没有其他衣服呢！", 4000, 10);
					else loadModel(modelId, result.textures.id, "我的新衣服好看嘛？");
				});
		}
	}

	async function loadOtherModel() {
		let modelId = localStorage.getItem("modelId");
		if (useCDN) {
			if (!modelList) await loadModelList();
			const index = (++modelId >= modelList.models.length) ? 0 : modelId;
			loadModel(index, 0, modelList.messages[index]);
		} else {
			fetch(`${apiPath}switch/?id=${modelId}`)
				.then(response => response.json())
				.then(result => {
					loadModel(result.model.id, 0, result.model.message);
				});
		}
	}
}

// 初始化live2d
function initWidget(config, apiPath) {
	if (typeof config === "string") {
		config = {
			waifuPath: config,
			apiPath
		};
	}
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
			<span>看板娘</span>
		</div>`);
	const toggle = document.getElementById("waifu-toggle");
	toggle.addEventListener("click", () => {
		toggle.classList.remove("waifu-toggle-active");
		if (toggle.getAttribute("first-time")) {
			loadWidget(config);
			toggle.removeAttribute("first-time");
		} else {
			localStorage.removeItem("waifu-display");
			document.getElementById("waifu").style.display = "";
			setTimeout(() => {
				document.getElementById("waifu").style.bottom = 0;
			}, 0);
		}
	});
	if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
		toggle.setAttribute("first-time", true);
		setTimeout(() => {
			toggle.classList.add("waifu-toggle-active");
		}, 0);
	} else {
		loadWidget(config);
	}
}
