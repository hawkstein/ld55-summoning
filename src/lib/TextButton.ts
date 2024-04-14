import Phaser from "phaser"
import { PaletteNum } from "./Palette"
import { RED_20 } from "./BitmapFontKey"

export default class TextButton extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle
  private text: Phaser.GameObjects.BitmapText
  private callback: () => void

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    callback: () => void
  ) {
    super(scene, x, y)

    this.on("pointerup", this.onButtonUp, this)
    this.on("pointerover", this.onButtonOver, this)
    this.on("pointerout", this.onButtonOut, this)

    this.text = scene.make
      .bitmapText({
        text,
        x: 0,
        y: 0,
        font: RED_20,
      })
      .setOrigin(0.5)

    this.background = scene.add
      .rectangle(
        0,
        0,
        this.text.width + 20,
        this.text.height + 10,
        PaletteNum.HotPanda.DarkBlue
      )
      .setOrigin(0.5)
    this.setInteractive({
      hitArea: this.background.getBounds(),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
    })

    this.add(this.background)
    this.add(this.text)

    this.callback = callback

    scene.add.existing(this)
  }

  private onButtonOver() {
    this.background.fillColor = PaletteNum.HotPanda.Red
    this.text.setTintFill(PaletteNum.HotPanda.DarkBlue)
  }

  private onButtonOut() {
    this.background.fillColor = PaletteNum.HotPanda.DarkBlue
    this.text.setTintFill(PaletteNum.HotPanda.Red)
  }

  private onButtonUp() {
    this.background.fillColor = PaletteNum.HotPanda.DarkBlue
    this.text.setTintFill(PaletteNum.HotPanda.Red)
    this.callback()
  }
}
