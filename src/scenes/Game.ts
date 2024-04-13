import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

import { Creator } from "../../nonogram/src/index"
import TextButton from "../lib/TextButton"

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera

  constructor() {
    super("Game")
  }

  create() {
    setStoredSceneKey("Game")

    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)

    const creator = new Creator()
    const puzzle = creator.createRandom(5, 5, 0.7)
    console.log(puzzle)
    const grid = puzzle.grid as number[][]
    const rowHints = puzzle.rowHints as number[][]
    const columnHints = puzzle.columnHints as number[][]

    const map = this.make.tilemap({
      data: grid,
      tileWidth: 16,
      tileHeight: 16,
    })
    const tiles = map.addTilesetImage("nonogram-tileset")
    let xPos = 0
    if (tiles) {
      const layer = map.createLayer(0, tiles, 0, 100)
      if (layer) {
        xPos = layer.x = this.camera.centerX - layer.width / 2
      }
    }

    console.log(rowHints)

    rowHints.forEach((row, i) => {
      row.forEach((num, j) => {
        const pos = row.length - j
        this.add
          .bitmapText(
            xPos - pos * 16,
            104 + i * 16,
            "PressStart2P_Teal_16",
            num.toString()
          )
          .setScale(0.5)
      })
    })

    columnHints.forEach((column, i) => {
      column.forEach((num, j) => {
        const pos = column.length - j
        this.add
          .bitmapText(
            xPos + 4 + i * 16,
            100 - pos * 16,
            "PressStart2P_Teal_16",
            num.toString()
          )
          .setScale(0.5)
      })
    })

    this.scene.launch("SummonHud")
    this.scene.get("SummonHud").events.once("start", () => {
      this.scene.setVisible(false, "SummonHud")
    })

    new TextButton(this, this.camera.centerX, 270, "Summon", () => {
      console.log("Summon!")
      this.scene.pause("Game")
      this.scene.setVisible(true, "SummonHud")
      this.scene.setActive(true, "SummonHud")
    })
  }
}
