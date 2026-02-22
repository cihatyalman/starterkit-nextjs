export class CustomTimer {
  private callback: (count: number) => void;
  private interval: number;

  constructor(callback: (count: number) => void, interval: number = 1000) {
    this.callback = callback;
    this.interval = interval;
  }

  private timerId: ReturnType<typeof setInterval> | null = null;
  private startTime: number | null = null;
  private count: number = 0;

  start() {
    if (this.timerId) return; // zaten çalışıyorsa tekrarlama
    this.startTime = Date.now() - this.count; // kaldığı yerden devam etsin

    this.timerId = setInterval(() => {
      const now = Date.now();
      this.count = now - (this.startTime ?? now);

      if (this.callback) this.callback(Math.floor(this.count / this.interval));
    }, this.interval);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset() {
    this.stop();
    this.count = 0;
    this.startTime = null;
  }
}
