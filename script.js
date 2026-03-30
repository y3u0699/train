let totalTime = 60;   // 總秒數
let elapsed = 0;      // 已經過幾秒
let progress = 0;

function updateStatus() {

    /* ===== 每秒時間前進 ===== */

    elapsed++;

    if (elapsed > totalTime) {
        elapsed = totalTime;
    }

    /* ===== 用秒數計算 % ===== */

    progress = (elapsed / totalTime) * 100;

    /* ===== 更新進度條 ===== */

    document.getElementById("progress").style.width =
        progress + "%";

    document.getElementById("percent").innerHTML =
        Math.floor(progress) + "%";

    document.getElementById("train").style.left =
        progress + "%";

    /* ===== 計算剩餘時間 ===== */

    let remaining = totalTime - elapsed;

    let minutes = Math.floor(remaining / 60);
    let seconds = remaining % 60;

    document.getElementById("timer").innerHTML =
        minutes + " 分鐘 " +
        (seconds < 10 ? "0" : "") +
        seconds + " 秒";

    /* ===== 90% 顯示提醒 ===== */

    if (progress >= 90) {

        let msg =
            document.getElementById("arrivalMessage");

        msg.style.display = "block";

    }

    /* ===== 98% 更緊急 ===== */

    if (progress >= 98) {

        let msg =
            document.getElementById("arrivalMessage");

        msg.classList.add("arrival-urgent");

        document.getElementById("train")
            .style.animation = "none";

    }

    /* ===== 100% 跳轉 ===== */

    if (progress >= 100) {

        /* 停止晃動 */

        document.getElementById("train")
            .style.animation = "none";

        /* 確保停在最右邊 */

        document.getElementById("train")
            .style.left = "100%";

        /* 1.5 秒後跳轉 */

        setTimeout(function () {

            window.location.href =
                "https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip121/query";

        }, 1500);

    }

}

/* 先初始化 */

updateStatus();

/* 再開始每秒更新 */

setInterval(updateStatus, 1000);

/* ===== 重新整理 ===== */

function resetSystem() {

    elapsed = 0;
    progress = 0;

    document.getElementById("progress").style.width = "0%";

    document.getElementById("percent").innerHTML = "0%";

    document.getElementById("train").style.left = "0%";

    document.getElementById("arrivalMessage")
        .style.display = "none";

    document.getElementById("train")
        .style.animation = "trainShake 0.35s infinite";

}

