import Phaser from "phaser"
import { PaletteHash } from "./Palette"
import { RED_20 } from "./BitmapFontKey"
import TextButton from "./TextButton"
import { getScorePlugin } from "../plugins/Score"

export default class SubmitScore extends Phaser.GameObjects.Container {
  private text: Phaser.GameObjects.BitmapText

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.text = scene.make
      .bitmapText({
        text: "Upload your score",
        x: 0,
        y: 0,
        font: RED_20,
      })
      .setOrigin(0.5)
      .setScale(0.5)
      .setCenterAlign()

    this.add(this.text)

    const dom = scene.add
      .dom(this.scene.cameras.main.centerX, 160)
      .setOrigin(0.5)
      .setScale(0.5)
      .createFromHTML(
        `<input type="text" name="nameField" placeholder="Enter your name" style="font-size: 32px; color:${PaletteHash.HotPanda.Red}; background-color:${PaletteHash.HotPanda.DarkBlue}" ></input>`
      )
    const inputElement = dom.getChildByName("nameField") as
      | HTMLInputElement
      | undefined
    inputElement?.focus()

    const scorePlugin = getScorePlugin(scene.plugins)

    const submit = new TextButton(scene, 0, 30, "Submit score", () => {
      const name = inputElement?.value.trim().substring(0, 16)
      if (!name) return
      fetch("/highscore/", {
        method: "POST",
        body: JSON.stringify({
          name,
          score: scorePlugin.getLatestScore() || 0,
          seconds: scorePlugin.getRunTime() || 0,
        }),
      }).then(() => {
        scene.scene.start("MainMenu")
      })
    }).setScale(0.5)

    this.add(submit)

    scene.add.existing(this)
  }
}
