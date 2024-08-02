let startTime = 0;
let elapsedTime = 0;
let lapStartTime = 0;
let isRunning = false;
let lapCount = 1;
let intervalId;

function startStopwatch() {
    if (isRunning) {
        stopStopwatch();
    } else {
        if (elapsedTime === 0) {
            startTime = Date.now();
        } else {
            startTime = Date.now() - elapsedTime;
        }
        lapStartTime = startTime;
        isRunning = true;
        updateDisplay();
        requestAnimationFrame(updateStopwatch);
    }
}

function stopStopwatch() {
    isRunning = false;
    cancelAnimationFrame(intervalId);
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    lapCount = 1;
    document.getElementById("time").textContent = "00:00:00";
    document.getElementById("milliseconds").textContent = "000";
    document.getElementById("laps").innerHTML = "";
}

function lapTime() {
    if (isRunning) {
        const lapElapsed = Date.now() - lapStartTime;
        const lapTime = formatTime(lapElapsed);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        document.getElementById("laps").appendChild(lapItem);
        lapCount++;
        lapStartTime = Date.now();
    }
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    intervalId = requestAnimationFrame(updateStopwatch);
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    document.getElementById("time").textContent = time.slice(0, -4);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000).toString().padStart(2, "0");
    const minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}