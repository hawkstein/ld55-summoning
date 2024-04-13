import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import TextButton from "../lib/TextButton"
import { RED_20 } from "../lib/BitmapFontKey"

export class SummonHud extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  message: Phaser.GameObjects.BitmapText

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
        this.scene.resume("Game")
        this.scene.get("Game").events.emit("summoned")
        this.scene.setActive(false, "SummonHud")
      }
    ).setScale(0.5)

    this.message = this.add
      .bitmapText(
        this.camera.centerX,
        this.camera.centerY,
        RED_20,
        "Summoning...",
        20
      )
      .setOrigin(0.5)
      .setScale(0.5)

    this.events.on(
      "check",
      ({ level, mistakes }: { level: number; mistakes: number }) => {
        this.message.setText(
          `Level ${level + 1}\n${Math.floor(mistakes * 100)}% mistakes`
        )
      }
    )
  }
}
