class Snake {
  // 获取🐍的容器
  element: HTMLElement
  // 表示蛇头的元素
  head: HTMLElement
  // 蛇身（包括蛇头）
  bodies: HTMLCollectionOf<HTMLElement>

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake>div')!
    this.bodies = this.element.getElementsByTagName('div')
  }

  // 获取🐍的坐标（蛇头坐标）
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  // 设置🐍的坐标（蛇头）
  set X(value: number) {
    if (value === this.X) {
      return
    }

    // 修改X是在修改水平坐标，🐍在向左移动时不能向右掉头，反之亦然
    // 判断是否掉头须先于判断是否撞墙，否则会导致🐍穿墙
    if (this.bodies[1] && this.bodies[1].offsetLeft === value) {
      // console.log('水平方向发生调头了！')
      // 如果发生了掉头，让🐍向反方向继续移动
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }

    // X值的合法范围为0-290之间
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了!')
    }

    // 移动身体
    this.moveBody()

    this.head.style.left = value + 'px'

    // 检查是否撞到自己
    this.checkCollision()
  }
  set Y(value: number) {
    if (value === this.Y) {
      return
    }

    // 修改Y是在修改垂直坐标，🐍在向上移动时不能向下掉头，反之亦然
    if (this.bodies[1] && this.bodies[1].offsetTop === value) {
      // console.log('垂直方向发生调头了！')
      // 如果发生了掉头，让🐍向反方向继续移动
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    // Y值的合法范围为0-290之间
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！')
    }

    // 移动身体
    this.moveBody()

    this.head.style.top = value + 'px'

    // 检查是否撞到自己
    this.checkCollision()
  }

  // 🐍增加身体长度的方法
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div>')
  }

  // 蛇身体移动的方法
  moveBody() {
    /* 
    * 将后边身体的位置设置为前一个的位置
    * 第4节 -> 第3节的位置
    * 第3节 -> 第2节的位置
    * 第2节 -> 蛇头的位置
    * 蛇头 -> 新位置
    * 从后往前改
    */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一节的位置
      let frontX = this.bodies[i - 1].offsetLeft
      let frontY = this.bodies[i - 1].offsetTop
      // 将值设置到当前节
      this.bodies[i].style.left = frontX + 'px'
      this.bodies[i].style.top = frontY + 'px'
    }
  }

  // 检查蛇头与身体是否相撞
  checkCollision() {
    // 获取所有身体，检查其是否与蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      if (this.X === this.bodies[i].offsetLeft && this.Y === this.bodies[i].offsetTop) {
        throw new Error('撞到自己了！')
      }
    }
  }
}

export default Snake
