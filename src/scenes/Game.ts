import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera

  constructor() {
    super("Game")
  }

  create() {
    setStoredSceneKey("Game")

    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver")
    })
  }
}
