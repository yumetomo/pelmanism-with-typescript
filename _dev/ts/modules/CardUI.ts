import events from 'events';

export default class CardUI extends events {
  $cards: NodeList
  constructor() {
    super();
    this.$cards = document.querySelectorAll('li');

    [...this.$cards].forEach(($card: HTMLElement, index: number) => {
      console.log($card instanceof HTMLElement);
      $card.addEventListener('click', () => {
        this.verifyIsOpened($card, index);
      });
    })
  }

  /**
   * 既に開いているかどうかの確認
   */
  verifyIsOpened(
    $card: HTMLElement,
    index: number
  ) {
    // 開いていなければカードを開く
    const isOpened = $card.classList.contains('open') || $card.classList.contains('match');
    if (!isOpened) {
      this.emit('selected', index);
    }
  }

  /**
   * カードを開く
   */
  open(
    index: number,
    colors: Array<object>
  ) {
    return new Promise(resolve => {
      const className = colors[index]['class'];
      const text = colors[index]['text'];
      const $card: HTMLElement = <HTMLElement>this.$cards[index];

      velocity(
        $card,
        {
          rotateY: ['180deg', '0deg'],
          tween: 180
        },
        {
          duration: 400,
          progress: function (elements, complete, remaining, start, tweenValue) {
            // 半分までアニメーションしたらclassを付与して折り返す
            if (tweenValue >= 90) {
              const difference = tweenValue - 90;
              const rotateY = 90 - difference;
              $card.classList.add(className, 'open');
              $card.innerHTML = text;
              $card.style.transform = `rotateY(${rotateY}deg)`;
            }
          },
          complete: () => {
            resolve();
          }
        }
      );
    });
  }

  close($openCards: NodeList) {
    this.flip($openCards);
  }

  closeAllCards() {
    this.flip(this.$cards);
  }

  flip($cards: NodeList) {
    [...$cards].forEach(($card: HTMLElement) => {
      velocity(
        $card,
        {
          rotateY: ['180deg', '0deg'],
          tween: 180
        },
        {
          duration: 500,
          delay: 400,
          progress: function (elements, complete, remaining, start, tweenValue) {
            // 半分までアニメーションしたらclassを削除して折り返す
            if (tweenValue >= 90) {
              // リスタートする時は閉じた状態のカードもある
              if ($card.classList.contains('open') || $card.classList.contains('match')) {
                $card.classList.forEach(className => $card.classList.remove(className));
                $card.innerHTML = '?';
              }
              const difference = tweenValue - 90;
              const rotateY = 90 - difference;
              $card.style.transform = `rotateY(${rotateY}deg)`;
            }
          }
        }
      );
    })
  }
}
