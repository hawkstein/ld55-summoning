import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"

export class SummonHud extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera

  constructor() {
    super({ key: "SummonHud", visible: false, active: false })
  }

  create() {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.Green)

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.scene.setVisible(false, "SummonHud")
        this.scene.resume("Game")
      },
    })
  }
}
