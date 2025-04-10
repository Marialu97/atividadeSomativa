document.addEventListener("DOMContentLoaded", function () {
  const mostrador = document.getElementById("mostrador");
  const timer = new Timer(1, mostrador, () => alert("O tempo acabou!"));

  document.getElementById("start-btn").addEventListener("click", () => timer.start());
  document.getElementById("stop-btn").addEventListener("click", () => timer.stop());
  document.getElementById("add-time-btn").addEventListener("click", () => timer.addTime(60));
  document.getElementById("reset-btn").addEventListener("click", () => timer.reset());
});

function Timer(mins, target, cb) {
  this.counter = mins * 60;
  this.target = target;
  this.callback = cb;
}

Timer.prototype = {
  pad: (s) => (s < 10 ? "0" + s : s),
  start() { if (!this.clock) this.count(); },
  stop() { clearInterval(this.clock); this.clock = null; },
  reset() { this.stop(); this.counter = 0; this.display(this.counter); },
  addTime(seconds) { this.counter += seconds; this.display(this.counter); },
  done() { if (this.callback) this.callback(); },
  display(s) { this.target.innerHTML = this.pad(Math.floor(s / 60)) + ":" + this.pad(s % 60); },
  count() {
    this.display(this.counter--);
    this.clock = setInterval(() => {
      this.display(this.counter--);
      if (this.counter < 0) { this.stop(); this.done(); }
    }, 1000);
  }
};
