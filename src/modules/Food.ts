// 定义食物类
class Food {
  // 定义一个属性表示食物所对应的元素
  element: HTMLElement

  constructor() {
    // ! 为非空断言
    this.element = document.getElementById('food')!
  }

  // 获取食物的x与y轴坐标
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }

  // 修改食物位置的方法
  changePosition() {
    // 生成一个随机的位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一次就是一格，一格的大小为10，所以食物的坐标必须是10的倍数

    let left = Math.round(Math.random() * 29) * 10
    let top = Math.round(Math.random() * 29) * 10

    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}

export default Food
