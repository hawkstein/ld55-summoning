import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import TextButton from "../lib/TextButton"

export class SummonHud extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera

  constructor() {
    super({ key: "SummonHud", visible: false, active: false })
  }

  create() {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.Green)

    new TextButton(
      this,
      this.camera.centerX,
      this.camera.height - 40,
      "Resume",
      () => {
        this.scene.setVisible(false, "SummonHud")
        this.scene.setActive(false, "SummonHud")
        this.scene.resume("Game")
        this.scene.get("Game").events.emit("summoned")
      }
    ).setScale(0.5)

    this.events.on("check", ({ mistakes }: { mistakes: number }) => {
      console.log("mistakes", mistakes)
    })
  }
}
