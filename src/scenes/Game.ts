import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"

import { Creator } from "../../nonogram/src/index"
import TextButton from "../lib/TextButton"
import { TEAL_16 } from "../lib/BitmapFontKey"
import { Summons } from "../main"
import { levels } from "../game/levels"

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  grid: number[][] = []
  level: number = 0
  state: "summoning" | "summoned" = "summoning"
  summonButton: TextButton
  enemies: Phaser.GameObjects.Group

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
          .bitmapText(xPos - pos * 16, 104 + i * 16, TEAL_16, num.toString())
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
            TEAL_16,
            num.toString()
          )
          .setScale(0.5)
      })
    })

    this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      const tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY)
      if (tile) {
        let updatedIndex = tile.index + 1
        tile.index = updatedIndex > 2 ? 0 : updatedIndex
      }
    })

    this.events.on("summoned", this.handleSummoned, this)

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
          row.forEach((cell, j) => {
            const tile = map.getTileAt(j, i)
            if (tile) {
              const value = tile.index === 1 ? 1 : 0
              if (tile && cell !== value) {
                mistakes++
              }
            }
          })
        })
        mistakes = mistakes / puzzle.totalCells

        this.scene.pause("Game")
        this.scene.setVisible(true, "SummonHud")
        this.scene.setActive(true, "SummonHud")
        this.scene
          .get("SummonHud")
          .events.emit("check", { level: this.level, mistakes })
      }
    )

    this.add
      .rectangle(
        this.camera.centerX,
        this.summonButton.y - 40,
        16,
        32,
        PaletteNum.HotPanda.Red
      )
      .setOrigin(0.5)

    this.add
      .rectangle(
        this.camera.centerX,
        20,
        48,
        32,
        PaletteNum.HotPanda.Background
      )
      .setOrigin(0.5)

    const numberOfEnemies = levels[this.level].waves[0].enemies
    this.enemies = this.add.group()
    for (let i = 0; i < numberOfEnemies; i++) {
      const x = Phaser.Math.Between(0, this.camera.width)
      const y = Phaser.Math.Between(0, 20)
      this.enemies.add(this.add.enemy(x, y))
    }
    const summons = this.plugins.get("Summons") as Summons | null
    const previousHumans = summons?.getHumans()
    console.log({ previousHumans })
    this.addHumans(previousHumans || 0)
  }

  handleSummoned({ humans }: { humans: number }) {
    this.state = "summoned"
    this.input.off("pointerup")
    this.summonButton.destroy()
    if (this.enemies.getLength() === 0) {
      this.time.delayedCall(3000, () => {
        this.scene.start("LevelScore", { level: this.level })
      })
    }
    this.addHumans(humans)

    const summons = this.plugins.get("Summons") as Summons | null
    summons?.addHuman(3)
  }

  addHumans(amount: number) {
    const circle = new Phaser.Geom.Circle(
      this.camera.centerX,
      this.summonButton.y - 40,
      36
    )
    const humansList = []
    for (let i = 0; i < amount; i++) {
      const x = Phaser.Math.Between(0, this.camera.width)
      const y = Phaser.Math.Between(0, 20)
      humansList.push(this.add.human(x, y))
      Phaser.Actions.PlaceOnCircle(humansList, circle, 4, 6)
    }
  }
}
