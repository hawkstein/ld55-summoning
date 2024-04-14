import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import { RED_20 } from "../lib/BitmapFontKey"
import { getScorePlugin } from "../plugins/Score"
import TextButton from "../lib/TextButton"
import { MainMenu } from "./MainMenu"
import SubmitScore from "../lib/SubmitScore"

export class Success extends Scene {
  static readonly KEY = "Success"

  constructor() {
    super(Success.KEY)
  }

  create() {
    setStoredSceneKey(Success.KEY)
    this.cameras.main.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)
    const centerX = this.cameras.main.centerX
    this.add
      .bitmapText(centerX, 40, RED_20, "Well done!")
      .setOrigin(0.5)
      .setScale(0.5)
    const scores = getScorePlugin(this.plugins)
    const latestScore = scores.getLatestScore()
    const timeTaken = Math.ceil(scores.getRunTime() / 1000)
    const mins = Math.floor(timeTaken / 60)
    const secs = timeTaken % 60
    this.add
      .bitmapText(centerX, 76, RED_20, `Score\n\n${latestScore || 0} points`)
      .setOrigin(0.5)
      .setCenterAlign()
      .setScale(0.5)

    this.add
      .bitmapText(centerX, 120, RED_20, `Time\n\n${mins}m${secs}s`)
      .setOrigin(0.5)
      .setCenterAlign()
      .setScale(0.5)

    new SubmitScore(this, centerX, 200)

    new TextButton(this, centerX, 280, "Main Menu", () => {
      this.scene.start(MainMenu.KEY)
    }).setScale(0.5)
  }
}
