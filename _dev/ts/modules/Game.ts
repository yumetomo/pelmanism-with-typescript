import _ from 'lodash';
import { CONFIG } from './CONFIG';
import CardUI from './CardUI';
import CountUI from './CountUI';

export default class Game {
  colors: Array<object>
  count: number
  totalCard: number
  cardUI: CardUI
  countUI: CountUI
  constructor() {
    // 配列宣言
    this.colors = [];
    this.count = CONFIG.COUNT;
    this.totalCard = CONFIG.COLORS.length * 2;
    this.cardUI = new CardUI();
    this.countUI = new CountUI();

    this.bind();
    this.init();
  }

  bind() {
    // カードが選択されたら色情報を渡してカードを開く処理を実行
    this.cardUI.on('selected', cardIndex => {
      this.cardUI.open(cardIndex, this.colors).then(() => this.judge());
    });
  }

  /**
   * 色情報の配列を2つ分格納してシャッフル
   */
  init() {
    this.colors = CONFIG.COLORS.concat(CONFIG.COLORS);
    this.colors = _.shuffle(this.colors);

    this.count = CONFIG.COUNT;
    this.countUI.countdown(this.count);

    this.totalCard = CONFIG.COLORS.length * 2;
  }

  /**
   * 開かれたカードが2枚なら判定を行う
   */
  judge() {
    const $openCards = document.querySelectorAll('li.open');
    const openCardsLength = $openCards.length;

    if (openCardsLength === 2) {
      this.count = this.count - 1;
      this.countUI.countdown(this.count);

      const $firstCard = $openCards[0];
      const $secondCard = $openCards[1];

      const firstCardColor = $firstCard.textContent;
      const secondCardColor = $secondCard.textContent;

      // 色が一致していれば開いたままに、していなければ閉じる
      if (firstCardColor === secondCardColor) {
        this.match($openCards);
      } else {
        this.count === 0 ? this.restart() : this.cardUI.close($openCards);
      }
    }
  }

  match($openCards: NodeList) {
    [...$openCards].forEach(($card: HTMLElement) => {
      $card.classList.remove('open');
      $card.classList.add('match');
    })

    const matchCardLength = document.querySelectorAll('li.match').length;
    if (matchCardLength === this.totalCard) {
      alert('success !');
      this.restart();
    }
  }

  restart() {
    this.init();
    this.cardUI.closeAllCards();
  }
}
