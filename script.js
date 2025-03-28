document.addEventListener("DOMContentLoaded", function () {
  const mostrador = document.getElementById("mostrador");

  // Cria uma instância do Timer
  const timer = new Timer(1, mostrador, function () {
    alert("O tempo acabou!");
  });

  // Vincula os botões aos métodos do Timer
  document.getElementById("start-btn").addEventListener("click", () => timer.start());
  document.getElementById("stop-btn").addEventListener("click", () => timer.stop());
  document.getElementById("add-time-btn").addEventListener("click", () => timer.addTime(60)); // Adiciona 1 minuto
  document.getElementById("reset-btn").addEventListener("click", () => timer.reset());
});

function Timer(mins, target, cb) {
  this.counter = mins * 60;
  this.target = target;
  this.callback = cb;
}
Timer.prototype.pad = function (s) {
  return s < 10 ? "0" + s : s;
};
Timer.prototype.start = function () {
  if (this.clock) return; // Previne múltiplos intervalos
  this.count();
};
Timer.prototype.stop = function () {
  if (this.clock) {
    clearInterval(this.clock); // Para o intervalo
    this.clock = null; // Reseta a referência do clock
  }
};
Timer.prototype.reset = function () {
  this.stop(); // Para o timer
  this.counter = 0; // Reseta o contador
  this.display(this.counter); // Atualiza o display
};
Timer.prototype.addTime = function (seconds) {
  this.counter += seconds; // Adiciona tempo ao contador
  this.display(this.counter); // Atualiza o display imediatamente
};
Timer.prototype.done = function () {
  if (this.callback) this.callback(); // Executa o callback, se definido
};
Timer.prototype.display = function (s) {
  this.target.innerHTML = this.pad(Math.floor(s / 60)) + ":" + this.pad(s % 60); // Formata minutos e segundos
};
Timer.prototype.count = function () {
  var self = this;
  self.display(self.counter); // Exibe o contador inicial
  self.counter--;

  this.clock = setInterval(function () {
    self.display(self.counter); // Atualiza o display
    self.counter--;

    if (self.counter < 0) { // Verifica se o contador chegou a zero
      clearInterval(self.clock); // Para o intervalo
      self.clock = null; // Reseta a referência do clock
      self.done(); // Chama o callback
    }
  }, 1000); // Intervalo de 1 segundo
};
