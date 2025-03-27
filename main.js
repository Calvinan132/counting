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

var dateButton = document.querySelector(".js-input-form #date-button");
// Khôi phục giá trị ngày đã lưu
var savedDate = localStorage.getItem("savedDate");
if (savedDate) {
  var dateInput = savedDate;
}
document
  .querySelector(".js-input-form #date-input")
  .setAttribute("max", new Date().toISOString().split("T")[0]);
dateButton.addEventListener("click", function () {
  var input = document.querySelector(".js-input-form #date-input").value;

  if (document.querySelector(".js-input-form #date-input").value == "") return;
  else dateInput = document.querySelector(".js-input-form #date-input").value;

  localStorage.setItem("savedDate", dateInput); // Lưu vào localStorage
  updateClock();
});

function updateClock() {
  if (!dateInput) {
    document.querySelector(".day-counting #day").textContent = "00";
    return;
  }

  var start = new Date(dateInput);
  var now = new Date();

  var totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
  document.querySelector(".day-counting #day").textContent = totalDays - 1;

  // Tính số năm, tháng, ngày chính xác
  var years = now.getFullYear() - start.getFullYear();
  var months = now.getMonth() - start.getMonth();
  var days = now.getDate() - start.getDate();

  // Điều chỉnh nếu ngày âm (vượt quá ngày trong tháng)
  if (days < 0) {
    months--;
    var prevMonthDays = daysInMonth(now.getFullYear(), now.getMonth());
    days += prevMonthDays;
  }

  // Điều chỉnh nếu tháng âm (vượt quá năm)
  if (months < 0) {
    years--;
    months += 12;
  }

  var weeks = Math.floor(days / 7);
  days = days % 7;

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

  document.querySelector("#start-date #date").textContent =
    formatDate(dateInput);
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
//
