import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

import { Creator } from "../../nonogram/src/index"

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

    const creator = new Creator()
    const puzzle = creator.createRandom(8, 8, 0.5)
    console.log(puzzle)
  }
}
