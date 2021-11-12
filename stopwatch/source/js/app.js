var circleMinute = document.querySelector(".circle-minute");
var circleSecond = document.querySelector(".circle-second");
var circleMiniSecond = document.querySelector(".circle-milisecond");
var btnRestart = document.querySelector("#btn-restart");
var btnStart = document.querySelector("#btn-start");
var btnStop = document.querySelector("#btn-stop");
var tableTime = document.querySelector(".table-time");

var intervalTime = null;
var isStart = false;

function TimeShow(minutes = 0, second = 0, miniSecond = 0) {
  this.miniSecond = miniSecond;
  this.second = second;
  this.minutes = minutes;
}

var timeCircle = new TimeShow();

var timeShow = {
  minutes: 0,
  second: 0,
  miniSecond: 0,
};

var tableData = [];

var app = {
  start: function () {
    this.renderTime();
    this.renderTableTime();
    this.handleEvent();
  },

  handleEvent: function () {
    var _this = this;
    btnStart.addEventListener("click", function () {
      if (!isStart) {
        intervalTime = setInterval(() => {
          _this.upDateTime();
          _this.renderTime();
        }, 10);
        isStart = true;
      }
    });

    btnRestart.addEventListener("click", function () {
      clearInterval(intervalTime);
      _this.resetTime();
      _this.resetTableTime();
      _this.renderTime();
      isStart = false;
    });

    btnStop.addEventListener("click", function () {
      var tickCurrentTime = new TimeShow(
        timeCircle.minutes,
        timeCircle.second,
        timeCircle.miniSecond
      );
      tableData.unshift(tickCurrentTime);
      _this.renderTableTime();
    });
  },

  upDateTime: function () {
    timeCircle.miniSecond += 1;
    if (timeCircle.miniSecond === 100) {
      timeCircle.miniSecond = 0;
      timeCircle.second += 1;
    }
    if (timeCircle.second === 60) {
      timeCircle.second = 0;
      timeCircle.minutes += 1;
    }
    if (timeCircle.minutes == 60) {
      this.resetTime();
    }
  },

  resetTime: function () {
    timeCircle.miniSecond = 0;
    timeCircle.second = 0;
    timeCircle.minutes = 0;
  },

  renderTime: function () {
    if (timeCircle.miniSecond < 10) {
      circleMiniSecond.innerText = "0" + timeCircle.miniSecond;
    } else {
      circleMiniSecond.innerText = timeCircle.miniSecond;
    }
    if (timeCircle.second < 10) {
      circleSecond.innerText = "0" + timeCircle.second;
    } else {
      circleSecond.innerText = timeCircle.second;
    }
    if (timeCircle.minutes < 10) {
      circleMinute.innerText = "0" + timeCircle.minutes;
    } else {
      circleMinute.innerText = "0" + timeCircle.minutes;
    }
  },

  renderTableTime: function () {
    var htmls = tableData.map((time, index) => {
      if (index == 0) {
        return `<li class="table-time-item table-time-item--active">
                  <span class="key">LAP${tableData.length}</span>
                  <span class="value">
                    ${time.minutes < 10 ? "0" + time.minutes : time.minutes}:
                    ${time.second < 10 ? "0" + time.second : time.second}:
                    ${
                      time.miniSecond < 10
                        ? "0" + time.miniSecond
                        : time.miniSecond
                    }
                  </span>
                </li>`;
      } else {
        return `<li class="table-time-item">
                  <span class="key">LAP${tableData.length - index}</span>
                  <span class="value">
                  ${time.minutes < 10 ? "0" + time.minutes : time.minutes}:
                  ${time.second < 10 ? "0" + time.second : time.second}:
                  ${
                    time.miniSecond < 10
                      ? "0" + time.miniSecond
                      : time.miniSecond
                  }
                  </span>
                </li>`;
      }
    });
    tableTime.innerHTML = htmls.join("");
  },

  resetTableTime: function () {
    tableData = [];
    tableTime.innerHTML = "";
  },
};

app.start();
