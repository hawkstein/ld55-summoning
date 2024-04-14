export class Score extends Phaser.Plugins.BasePlugin {
  static readonly KEY: string = "Score"
  currentScore: number = 0
  recentScores: number[] = []
  startTimestamp: number | null = null
  endTimestamp: number | null = null

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager)
  }
  getCurrentScore() {
    return this.currentScore
  }
  increase(amount: number) {
    this.currentScore += amount
  }
  finishScoring() {
    this.recentScores.push(this.currentScore)
    this.currentScore = 0
  }

  startRun() {
    this.startTimestamp = Date.now()
    this.endTimestamp = null
  }

  stopRun() {
    this.endTimestamp = Date.now()
  }

  getRunTime() {
    if (this.startTimestamp && this.endTimestamp) {
      return this.endTimestamp - this.startTimestamp
    }
    return 0
  }
}

// Util function for returning plugin with type
export const getScorePlugin = (manager: Phaser.Plugins.PluginManager) => {
  return manager.get(Score.KEY) as Score
}
