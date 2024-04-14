import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import TextButton from "../lib/TextButton"
import { TEAL_16 } from "../lib/BitmapFontKey"
import { getScorePlugin } from "../plugins/Score"

export class LevelScore extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  level: number

  constructor() {
    super("LevelScore")
  }

  init(data: { level: number }) {
    this.level = data.level
  }

  create() {
    setStoredSceneKey("LevelScore")
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)

    const score = getScorePlugin(this.plugins).currentScore
    this.add
      .bitmapText(this.camera.centerX, 80, TEAL_16, `Score\n${score}`)
      .setLineSpacing(20)
      .setOrigin(0.5)

    new TextButton(
      this,
      this.camera.centerX,
      this.camera.height - 100,
      "Next\nLevel",
      () => {
        this.scene.start("Game", { level: this.level + 1 })
      }
    )
  }
}
