import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu")
  }

  create() {
    setStoredSceneKey("MainMenu")
    const camera = this.cameras.main
    camera.setBackgroundColor(PaletteNum.HotPanda.Orange)

    this.input.once("pointerdown", () => {
      this.scene.start("Game")
    })
  }
}
