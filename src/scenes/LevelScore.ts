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
