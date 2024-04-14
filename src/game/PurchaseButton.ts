import Phaser from "phaser"
import { TEAL_16 } from "../lib/BitmapFontKey"
import { PaletteNum } from "../lib/Palette"

export default class TextButton extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle
  private text: Phaser.GameObjects.BitmapText
  private callback: () => void
  private sprite: Phaser.GameObjects.Sprite
  private clickState: "ready" | "clickstart" = "ready"

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    callback: () => void,
    spriteFrame: string
  ) {
    super(scene, x, y)

    this.on("pointerdown", this.onButtonDown, this)
    this.on("pointerup", this.onButtonUp, this)
    this.on("pointerover", this.onButtonOver, this)
    this.on("pointerout", this.onButtonOut, this)

    this.text = scene.make
      .bitmapText({
        text,
        x: 12,
        y: 1,
        font: TEAL_16,
      })
      .setOrigin(0.5)
      .setScale(0.5)

    this.background = scene.add
      .rectangle(
        0,
        0,
        this.text.width + 36,
        this.text.height + 10,
        PaletteNum.HotPanda.DarkBlue
      )
      .setOrigin(0.5)
    this.setInteractive({
      hitArea: this.background.getBounds(),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
    })

    this.sprite = scene.make
      .sprite({ key: "textures", frame: spriteFrame, x: -30, y: 1 })
      .setOrigin(0.5)

    this.add(this.background)
    this.add(this.text)
    this.add(this.sprite)

    this.callback = callback

    scene.add.existing(this)
  }

  private onButtonDown() {
    this.clickState = "clickstart"
  }

  private onButtonOver() {
    this.background.fillColor = PaletteNum.HotPanda.Yellow
  }

  private onButtonOut() {
    this.background.fillColor = PaletteNum.HotPanda.DarkBlue
    this.clickState = "ready"
  }

  private onButtonUp() {
    // this.background.fillColor = PaletteNum.HotPanda.DarkBlue
    if (this.clickState === "clickstart") {
      this.clickState = "ready"
      this.callback()
    }
  }
}
