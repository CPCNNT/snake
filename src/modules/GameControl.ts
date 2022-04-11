import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

// 游戏控制器，控制其他类
class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  // 🐍的移动方向（也就是按键的方向）
  direction = ''
  readonly lawfulDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right']
  // 记录游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)

    this.init()
  }

  // 游戏初始化，调用后游戏即开始
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 调用move方法，使🐍移动
    this.move()
  }

  // 键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // console.log(this)
    // 修改direction属性，但需要先检查event.key是否合法（用户是否按了正确的按键）
    if (this.lawfulDirections.includes(event.key)) {
      this.direction = event.key
    }
    // 调用move方法，使🐍移动
    // this.move()
  }

  // 控制🐍移动的方法
  move() {
    /* 
    * 根据方向（this.direction）来改变🐍的位置
    * 向上 top减少，向下 top增加
    * 向左 left减少，向右 left增加
    */
    //  获取🐍现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
    }

    // 检查🐍是否吃到食物
    this.checkEat(X, Y)

    // 修改🐍的X和Y的值
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error: any) {
      alert(error.message + ' GAME OVER!')
      this.isLive = false
      // 刷新页面，重新开始游戏
      location.reload()
    }

    // 开启定时调用
    this.isLive && setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 检查🐍是否吃到食物的方法
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // console.log('吃到食物了！')
      // 增加分数
      this.scorePanel.addScore()
      // 🐍身长度加一
      this.snake.addBody()
      // 获取蛇身的坐标
      // console.log(this.snake.bodies)
      const coordinates = []
      for (let i = 0; i < this.snake.bodies.length; i++) {
        coordinates.push([this.snake.bodies[i].offsetLeft, this.snake.bodies[i].offsetTop])
      }
      // console.log(coordinates.toString())
      // 重置食物的位置，如果新位置与🐍有重叠则继续重置
      do {
        this.food.changePosition()
        // console.log(this.food.X, this.food.Y)
      } while (coordinates.some(item => this.food.X === item[0] && this.food.Y === item[1]))
      // coordinates.length = 0
    }
  }
}

export default GameControl
