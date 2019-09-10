interface config {
  COLORS: Array<object>,
  COUNT: number
}

export const CONFIG: config = {
  COLORS: [
    { text: '赤', color: '#eb0d0d', class: 'red' },
    { text: '青', color: '#0879ff', class: 'blue' },
    { text: '黄', color: '#ccdd09', class: 'yellow' },
    { text: '緑', color: '#00c926', class: 'green' },
    { text: '橙', color: '#ee861a', class: 'orange' },
    { text: '紫', color: '#b514e6', class: 'purple' },
    { text: '茶', color: '#8c6604', class: 'brown' },
    { text: '黒', color: '#000', class: 'black' }
  ],
  COUNT: 15
};
