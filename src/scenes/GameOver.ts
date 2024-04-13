import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera

  constructor() {
    super("GameOver")
  }

  create() {
    setStoredSceneKey("GameOver")
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.Red)

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu")
    })
  }
}
