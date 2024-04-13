import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

import { Creator } from "../../nonogram/src/index"
import TextButton from "../lib/TextButton"

const levels = [
  {
    gridSize: { rows: 4, columns: 4, density: 0.7 },
  },
  {
    gridSize: { rows: 5, columns: 5, density: 0.7 },
  },
  {
    gridSize: { rows: 6, columns: 6, density: 0.7 },
  },
  {
    gridSize: { rows: 6, columns: 6, density: 0.7 },
  },
  {
    gridSize: { rows: 7, columns: 7, density: 0.7 },
  },
  {
    gridSize: { rows: 8, columns: 8, density: 0.7 },
  },
  {
    gridSize: { rows: 8, columns: 9, density: 0.7 },
  },
  {
    gridSize: { rows: 9, columns: 9, density: 0.7 },
  },
  {
    gridSize: { rows: 10, columns: 10, density: 0.7 },
  },
]

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  grid: number[][] = []
  level: number = 0
  state: "summoning" | "summoned" = "summoning"
  summonButton: TextButton

  constructor() {
    super("Game")
  }

  init(data: { level: number }) {
    this.level = data.level
  }

  create() {
    setStoredSceneKey("Game")

    this.camera = this.cameras.main
    this.camera.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)
    const gridSize = levels[this.level].gridSize
    const creator = new Creator()
    const puzzle = creator.createRandom(
      gridSize.rows,
      gridSize.columns,
      gridSize.density
    )
    console.log(puzzle)
    this.grid = puzzle.grid as number[][]
    const rowHints = puzzle.rowHints as number[][]
    const columnHints = puzzle.columnHints as number[][]

    const map = this.make.tilemap({
      data: new Array(gridSize.rows).fill(new Array(gridSize.columns).fill(0)),
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

    this.input.on(
      "pointerup",
      function (pointer: Phaser.Input.Pointer) {
        const tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY)
        if (tile) {
          let updatedIndex = tile.index + 1
          tile.index = updatedIndex > 2 ? 0 : updatedIndex
        }
      },
      this
    )

    this.events.on("summoned", () => {
      this.state = "summoned"
      this.input.off("pointerup")
      this.summonButton.destroy()
      // this.time.delayedCall(1000, () => {
      //   this.scene.start("LevelScore", { level: this.level })
      // })
    })

    this.scene.launch("SummonHud")
    this.scene.get("SummonHud").events.on("start", () => {
      this.scene.setVisible(false, "SummonHud")
    })

    this.summonButton = new TextButton(
      this,
      this.camera.centerX,
      270,
      "Summon",
      () => {
        // Evaluate the grid
        let mistakes = 0
        this.grid.forEach((row, i) => {
          console.log(row)
          row.forEach((cell, j) => {
            console.log(cell)
            const tile = map.getTileAt(j, i)
            if (tile) {
              const value = tile.index === 1 ? 1 : 0
              if (tile && cell !== value) {
                mistakes++
              }
            }
          })
        })

        this.scene.pause("Game")
        this.scene.setVisible(true, "SummonHud")
        this.scene.setActive(true, "SummonHud")
        this.scene.get("SummonHud").events.emit("check", { mistakes })
      }
    )
  }
}
