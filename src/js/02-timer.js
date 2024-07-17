import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerElements = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
};

let countdownInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
    const selectedDate = new Date(datetimePicker.value);
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    startCountdown(selectedDate);
});

function startCountdown(endDate) {
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = endDate.getTime() - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            updateTimer(0, 0, 0, 0);
            return;
        }

        const time = convertMs(timeRemaining);
        updateTimer(time.days, time.hours, time.minutes, time.seconds);
    }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
    timerElements.days.textContent = addLeadingZero(days);
    timerElements.hours.textContent = addLeadingZero(hours);
    timerElements.minutes.textContent = addLeadingZero(minutes);
    timerElements.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}