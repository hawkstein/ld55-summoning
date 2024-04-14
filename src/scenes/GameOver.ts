import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import { PURPLE_18 } from "../lib/BitmapFontKey"
import { getScorePlugin } from "../plugins/Score"
import TextButton from "../lib/TextButton"
import { MainMenu } from "./MainMenu"

export class GameOver extends Scene {
  static readonly KEY = "GameOver"

  constructor() {
    super(GameOver.KEY)
  }

  create() {
    setStoredSceneKey(GameOver.KEY)
    this.cameras.main.setBackgroundColor(PaletteNum.HotPanda.Red)
    const centerX = this.cameras.main.centerX
    this.add.bitmapText(centerX, 100, PURPLE_18, "Game Over").setOrigin(0.5)
    const scores = getScorePlugin(this.plugins)
    const latestScore = scores.getCurrentScore()
    this.add
      .bitmapText(centerX, 180, PURPLE_18, `Score\n${latestScore}`)
      .setOrigin(0.5)
    new TextButton(this, centerX, 280, "Back to Main Menu", () => {
      this.scene.start(MainMenu.KEY)
    })
  }
}
