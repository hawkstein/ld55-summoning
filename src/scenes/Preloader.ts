import { Scene } from "phaser"
import { getStoredSceneKey } from "./storeSceneKey"
import { PaletteNum, PaletteRGB } from "../lib/Palette"
import { TEAL_16, RED_20 } from "../lib/BitmapFontKey"

const DEV_MODE = import.meta.env.MODE === "development"
const LOAD_STORED_SCENE =
  DEV_MODE && import.meta.env.VITE_LOAD_STORED_SCENE === "true"

export class Preloader extends Scene {
  private initTime = new Date().getTime()

  constructor() {
    super("Preloader")
  }

  init() {
    this.time.addEvent({
      delay: 200,
      callback: () => {
        const centerX = this.cameras.main.centerX
        this.add.image(centerX, 100, "preload_title").setOrigin(0.5)

        // Outline of progress bar
        const outerWidth = this.scale.width - 20
        const innerWidth = outerWidth - 8
        this.add
          .rectangle(centerX, 384, outerWidth, 32)
          .setStrokeStyle(4, PaletteNum.HotPanda.DarkGreen)
        const bar = this.add.rectangle(
          centerX - innerWidth,
          384,
          4,
          28,
          PaletteNum.HotPanda.Green
        )
        this.load.on("progress", (progress: number) => {
          bar.width = 4 + innerWidth * progress
        })
      },
    })
  }

  preload() {
    this.load.setPath("assets")
    this.load.bitmapFont(
      TEAL_16,
      "PressStart2P_Teal_16.png",
      "PressStart2P_Teal_16.xml"
    )
    this.load.bitmapFont(
      RED_20,
      "PressStart2P_Red_20.png",
      "PressStart2P_Red_20.xml"
    )
  }

  create() {
    const elapsed = new Date().getTime() - this.initTime
    const storedKey = getStoredSceneKey()
    this.cameras.main.fadeOut(
      (storedKey && LOAD_STORED_SCENE) || elapsed < 100 ? 0 : 500,
      PaletteRGB.HotPanda.DarkBlue.r,
      PaletteRGB.HotPanda.DarkBlue.g,
      PaletteRGB.HotPanda.DarkBlue.b
    )
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start((LOAD_STORED_SCENE && storedKey) || "MainMenu")
    })
  }
}
