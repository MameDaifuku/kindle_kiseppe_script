const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const roopCount = 60; //対象商品数にあわせて増減しましょう
const waitMSec = 1000; //通信状態にあわせて増減しましょう

async function run() {
	console.log("▼処理開始▼")
	let beforeLiCount = 0;
	for (let count = 0; count < roopCount; count++) {
		let ul = document.getElementById("g-items-grid");
		console.log("ループ回数 = " + count);
		console.log("li数 = " + ul.getElementsByTagName("li").length);
		
		if (beforeLiCount == ul.getElementsByTagName("li").length) {
			console.log("取得対象がなくなったので処理を終了する");
			break;
		} else {
			beforeLiCount = ul.getElementsByTagName("li").length;
		}
		
		for (const li of ul.getElementsByTagName("li")) {
		
			
			//無視したいDOMを除外（本当はgetElementByIdのタイミングでいい感じに絞り込みたい）
			if (li.getAttribute("id") && li.getAttribute("id").includes("itemEditLabel_")) {
				continue;
			}
			if (li.getAttribute("title") && li.getAttribute("title").includes("シェアする")) {
				continue;
			}
			if (li.getAttribute("class") && li.getAttribute("class").includes("a-spacing-base a-spacing-top-mini wl-menu-item")) {
				continue;
			}
			
			//価格条件に該当しない商品を非表示に変更
			if (li.getElementsByClassName("kiseppe-jsdr-badge").length == 0) {
				li.style.display = "none";
			}
		}
		
		//スクロールバーが動いたタイミングで続きの商品要素の再取得が実行される
		scrollBy(0, 10);
		await wait(waitMSec);
	}
	console.log("▲処理終了▲")
}

run();
