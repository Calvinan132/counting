function formatDate(dateStr) {
  let [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year, month) {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month - 1];
}

var dateInput = document.querySelector(".js-input-form #date-input");
// Khôi phục giá trị ngày đã lưu
var savedDate = localStorage.getItem("savedDate");
if (savedDate) {
  dateInput.value = savedDate;
}
function updateClock() {
  if (!dateInput.value) {
    document.querySelector(".day-counting #day").textContent = "00";
    return;
  }
  // Lưu ngày nhập vào localStorage
  localStorage.setItem("savedDate", dateInput.value);

  var start = new Date(dateInput.value);
  var now = new Date();

  var totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  document.querySelector(".day-counting #day").textContent = totalDays;

  var years = 0,
    months = 0;
  var tempDate = new Date(start);

  while (totalDays >= (isLeapYear(tempDate.getFullYear()) ? 366 : 365)) {
    totalDays -= isLeapYear(tempDate.getFullYear()) ? 366 : 365;
    tempDate.setFullYear(tempDate.getFullYear() + 1);
    years++;
  }

  while (
    totalDays >= daysInMonth(tempDate.getFullYear(), tempDate.getMonth() + 1)
  ) {
    totalDays -= daysInMonth(tempDate.getFullYear(), tempDate.getMonth() + 1);
    tempDate.setMonth(tempDate.getMonth() + 1);
    months++;
  }

  while (months >= 12) {
    months -= 12;
    years++;
  }

  var weeks = Math.floor(totalDays / 7);
  var days = totalDays % 7;

  document.querySelector(".date-counting #year").textContent = years
    .toString()
    .padStart(2, "0");
  document.querySelector(".date-counting #month").textContent = months
    .toString()
    .padStart(2, "0");
  document.querySelector(".date-counting #week").textContent = weeks
    .toString()
    .padStart(2, "0");
  document.querySelector(".date-counting #day").textContent = days
    .toString()
    .padStart(2, "0");

  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");

  document.querySelector("#now-time #hours").textContent = hours;
  document.querySelector("#now-time #minutes").textContent = minutes;
  document.querySelector("#now-time #seconds").textContent = seconds;

  document.querySelector("#start-date #date").textContent = formatDate(
    dateInput.value
  );
}

setInterval(updateClock, 1000);
updateClock();

// Xử lý modal
var modal = document.querySelector(".js-modal");
var oModal = document.querySelector(".js-day-counting");
var hModal = document.querySelector(".js-modal-close");
var modalWrapper = document.querySelector(".js-wrapper-modal");
function showModal() {
  modal.classList.add("open");
}
function hideModal() {
  modal.classList.remove("open");
}
oModal.addEventListener("click", showModal);
hModal.addEventListener("click", hideModal);
modal.addEventListener("click", hideModal);
modalWrapper.addEventListener("click", (e) => e.stopPropagation());
