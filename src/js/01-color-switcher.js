const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector("body");

stopBtn.disabled = true;
startBtn.addEventListener("click", startDisco);

let intervalId = null;  

function startDisco() {
    if (!intervalId)
 intervalId = setInterval(() => {
     body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
        stopBtn.disabled = false;
        startBtn.disabled = true;
 }
     
stopBtn.addEventListener("click", stopDisco);
        
        function stopDisco() {
            clearInterval(intervalId);
            intervalId = null;
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

