import { GameObjects, Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import { RED_20 } from "../lib/BitmapFontKey"
import TextButton from "../lib/TextButton"
import { getScorePlugin } from "../plugins/Score"

export class MainMenu extends Scene {
  public static readonly KEY = "MainMenu"
  title: GameObjects.BitmapText
  fullscreen: boolean = false

  constructor() {
    super(MainMenu.KEY)
  }

  create() {
    setStoredSceneKey(MainMenu.KEY)
    const camera = this.cameras.main
    camera.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)

    this.title = this.add
      .bitmapText(camera.centerX, 80, RED_20, "LD55")
      .setCenterAlign()
      .setLineSpacing(10)
      .setOrigin(0.5)

    const scorePlugin = getScorePlugin(this.plugins)

    const menu = [
      this.title,
      new TextButton(this, camera.centerX, 0, "Start", () => {
        if (this.fullscreen) {
          this.scale.startFullscreen()
        }
        this.scene.start("Game", { level: 0 })
        scorePlugin.startRun()
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
