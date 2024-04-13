import { Scene } from "phaser"

export class Boot extends Scene {
  constructor() {
    super("Boot")
  }

  preload() {
    this.load.image("preload_title", "assets/PreloadTitle.png")
  }

  create() {
    this.scene.start("Preloader")
  }
}
