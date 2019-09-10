export default class CountUI {
  $counter: HTMLElement
  constructor() {
    this.$counter = document.querySelector('#count');
  }

  countdown(count: number) {
    this.$counter.innerHTML = String(count);
  }
}
