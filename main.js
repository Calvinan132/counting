function formatDate(dateStr) {
  let [year, month, day] = dateStr.split("/");
  return `${day}/${month}/${year}`;
}
function updateClock() {
  // Begin - Nhập ngày
  var dStart = "2023/12/24";
  // End - Nhập ngày
  var start = new Date(dStart);
  var now = new Date();
  var diff = now - start;
  var days, weeks, months, years;
  days = now.getDate() - start.getDate();
  day1 = Math.floor(diff / (1000 * 60 * 60 * 24));
  // Begin - day-counting
  document.querySelector(".day-counting #day").textContent = day1;
  //   Begin - Date
  weeks = Math.floor(days / 7);
  months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  years = now.getFullYear() - start.getFullYear() - 1;
  while (weeks >= 4) {
    weeks -= 4;
  }
  document.querySelector(".date-counting #day").textContent =
    days % 7 < 10 ? "0" + (days % 7) : days % 7;
  document.querySelector(".date-counting #week").textContent = "0" + weeks;
  document.querySelector(".date-counting #month").textContent =
    months % 12 < 10 ? "0" + (months % 12) : months % 12;
  document.querySelector(".date-counting #year").textContent =
    years < 10 ? "0" + years : years;
  // End - Date
  // Begin - now time
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  document.querySelector("#now-time #hours").textContent =
    hours < 10 ? "0" + hours : hours;
  document.querySelector("#now-time #minutes").textContent =
    minutes < 10 ? "0" + minutes : minutes;
  document.querySelector("#now-time #seconds").textContent =
    seconds < 10 ? "0" + seconds : seconds;
  // Begin - start-date
  document.querySelector("#start-date #date").textContent = formatDate(dStart);
}

setInterval(updateClock, 1000);
updateClock();
// Open modal
var modal = document.querySelector(".js-modal");
var oModal = document.querySelector(".js-day-counting");
var hModal = document.querySelector(".js-modal-close");
var modalwrapper = document.querySelector(".js-wrapper-modal");
function showModal() {
  modal.classList.add("open");
}
function hideModal() {
  modal.classList.remove("open");
}
oModal.addEventListener("click", showModal);
hModal.addEventListener("click", hideModal);
modal.addEventListener("click", hideModal);
modalwrapper.addEventListener("click", (e) => e.stopPropagation());
