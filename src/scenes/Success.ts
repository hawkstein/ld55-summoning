import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import { RED_20 } from "../lib/BitmapFontKey"
import { getScorePlugin } from "../plugins/Score"
import TextButton from "../lib/TextButton"
import { MainMenu } from "./MainMenu"

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
      .bitmapText(centerX, 100, RED_20, "Well done!")
      .setOrigin(0.5)
      .setScale(0.5)
    const scores = getScorePlugin(this.plugins)
    const latestScore = scores.getLatestScore()
    this.add
      .bitmapText(centerX, 180, RED_20, `Score\n\n${latestScore}`)
      .setOrigin(0.5)
      .setCenterAlign()
      .setScale(0.5)
    new TextButton(this, centerX, 280, "Main Menu", () => {
      this.scene.start(MainMenu.KEY)
    }).setScale(0.5)
  }
}
