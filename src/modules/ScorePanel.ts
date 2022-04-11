// 定义表示记分牌的类
class ScorePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number
  scoresForLvlUp: number

  constructor(maxLevel: number = 10, scoresForLvlUp: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.scoresForLvlUp = scoresForLvlUp
  }

  // 设置一个加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    if (this.score % this.scoresForLvlUp === 0) {
      this.levelUp()
    }
  }

  // 提升等级的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel
