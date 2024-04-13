import { GameObjects, Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import { RED_20 } from "../lib/BitmapFontKey"
import TextButton from "../lib/TextButton"

export class MainMenu extends Scene {
  title: GameObjects.BitmapText

  constructor() {
    super("MainMenu")
  }

  create() {
    setStoredSceneKey("MainMenu")
    const camera = this.cameras.main
    camera.setBackgroundColor(PaletteNum.HotPanda.Orange)

    this.title = this.add
      .bitmapText(camera.centerX, 80, RED_20, "LD55")
      .setCenterAlign()
      .setLineSpacing(10)
      .setOrigin(0.5)

    const menu = [
      this.title,
      new TextButton(this, camera.centerX, 0, "Start", () => {
        // this.scale.startFullscreen()
        this.scene.start("Game")
      }),

      new TextButton(this, camera.centerX, 0, "Options", () => {
        this.scene.start("Options")
      }),
      new TextButton(this, camera.centerX, 0, "Scores", () => {
        this.scene.start("Scores")
      }),
    ]

    Phaser.Actions.AlignTo(menu, Phaser.Display.Align.BOTTOM_CENTER, 0, 40)
  }
}
