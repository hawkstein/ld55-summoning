import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import TextButton from "../lib/TextButton"

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
    this.camera.setBackgroundColor(PaletteNum.HotPanda.Red)

    const nextLevel = this.level + 1
    const hasCompletedAllLevels = nextLevel >= 8
    const buttonText = hasCompletedAllLevels ? "Menu" : "Next\nLevel"
    const buttonHandler = hasCompletedAllLevels
      ? () => {
          this.scene.start("Menu")
        }
      : () => {
          this.scene.start("Game", { level: nextLevel })
        }

    new TextButton(
      this,
      this.camera.centerX,
      this.camera.height - 100,
      buttonText,
      buttonHandler
    )
  }
}
