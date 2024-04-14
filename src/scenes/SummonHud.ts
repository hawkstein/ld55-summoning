import { Scene } from "phaser"
import { PaletteNum, PaletteRGB } from "../lib/Palette"
import TextButton from "../lib/TextButton"
import { RED_20, TEAL_16 } from "../lib/BitmapFontKey"
import { SCENE_TRANSITION_DURATION } from "../lib/Animations"
import PurchaseButton from "../game/PurchaseButton"

export class SummonHud extends Scene {
  public static readonly KEY = "SummonHud"
  camera: Phaser.Cameras.Scene2D.Camera
  message: Phaser.GameObjects.BitmapText
  purchases: number = 0
  mana: number = 0
  resumeButton: TextButton
  purchaseCount: Phaser.GameObjects.BitmapText

  constructor() {
    super({ key: SummonHud.KEY, visible: false, active: false })
  }

  create() {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)

    this.message = this.add
      .bitmapText(this.camera.centerX, 30, RED_20, "Summon\nyour\nhumans!", 20)
      .setOrigin(0.5)
      .setScale(0.5)

    this.message = this.add
      .bitmapText(
        this.camera.centerX,
        100,
        RED_20,
        "",
        20,
        Phaser.GameObjects.BitmapText.ALIGN_CENTER
      )
      .setOrigin(0.5)
      .setScale(0.5)

    new PurchaseButton(
      this,
      this.camera.centerX - 20,
      200,
      "Wizard\n(1 mana)",
      () => {
        this.makePurchase()
      },
      "Human.png"
    )

    this.resumeButton = new TextButton(
      this,
      this.camera.centerX,
      this.camera.height - 40,
      "Resume",
      () => {
        this.resumeGame()
      }
    ).setScale(0.5)
    this.resumeButton.setActive(false).setVisible(false)

    this.message = this.add
      .bitmapText(
        this.camera.centerX,
        100,
        RED_20,
        "",
        20,
        Phaser.GameObjects.BitmapText.ALIGN_CENTER
      )
      .setOrigin(0.5)
      .setScale(0.5)

    this.purchaseCount = this.add
      .bitmapText(this.camera.centerX + 50, 200, TEAL_16, "0")
      .setOrigin(0.5)
      .setScale(0.5)

    this.events.on(
      "check",
      ({ level, mistakes }: { level: number; mistakes: number }) => {
        this.resumeButton.setActive(true).setVisible(true)
        this.summonHumans(level, mistakes)
      }
    )
  }

  summonHumans(level: number, mistakes: number) {
    this.camera.fadeIn(
      SCENE_TRANSITION_DURATION,
      PaletteRGB.HotPanda.DarkBlue.r,
      PaletteRGB.HotPanda.DarkBlue.g,
      PaletteRGB.HotPanda.DarkBlue.b
    )
    this.scene.setVisible(true, SummonHud.KEY)
    this.message.setText(`Level ${level + 1}\n\n${mistakes} mistakes`)
    this.mana = 3
  }

  makePurchase() {
    if (this.mana > 0) {
      this.purchases++
      this.mana -= 1
      this.purchaseCount.setText(this.purchases.toString())
    }
  }

  resumeGame() {
    this.scene.resume("Game")
    this.scene.get("Game").events.emit("summoned", { humans: this.purchases })
    this.scene.setVisible(false, SummonHud.KEY)
    this.scene.setActive(false, SummonHud.KEY)
    this.reset()
  }

  reset() {
    this.purchases = 0
    this.mana = 0
  }
}
