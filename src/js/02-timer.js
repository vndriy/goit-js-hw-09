import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const start = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]')

let intervalId;

start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future') 
    } else {
      start.disabled = false;
    }
  },
};

start.addEventListener('click', onStart)

function onStart() {
  
  start.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {

      const currentDate = Date.now();
  const selectedDate = new Date(input.value);
  const difference = selectedDate - currentDate;
  
    const timer = convertMs(difference);

    days.textContent = timer.days.toString().padStart(2, 0);
    hours.textContent = timer.hours.toString().padStart(2, 0);
    minutes.textContent = timer.minutes.toString().padStart(2, 0);
    seconds.textContent = timer.seconds.toString().padStart(2, 0);

    if (difference < 1000) {
      clearInterval(intervalId);
    }

  }, 1000);
}

flatpickr(input, options);


function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}