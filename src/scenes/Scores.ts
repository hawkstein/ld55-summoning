import { Scene } from "phaser"
import { PaletteNum } from "../lib/Palette"
import { setStoredSceneKey } from "./storeSceneKey"
import { RED_20, TEAL_16 } from "../lib/BitmapFontKey"
import { getScorePlugin } from "../plugins/Score"
import TextButton from "../lib/TextButton"
import { MainMenu } from "./MainMenu"

export class Scores extends Scene {
  static readonly KEY = "Scores"

  constructor() {
    super(Scores.KEY)
  }

  async create() {
    setStoredSceneKey(Scores.KEY)
    this.cameras.main.setBackgroundColor(PaletteNum.HotPanda.DarkBlue)
    const centerX = this.cameras.main.centerX
    this.add.bitmapText(centerX, 16, RED_20, "Scores").setOrigin(0.5)
    const scores = getScorePlugin(this.plugins)
    const latestScore = scores.getLatestScore() || 200
    if (latestScore) {
      const timeTaken = Math.ceil(scores.getRunTime() / 1000)
      const mins = Math.floor(timeTaken / 60)
      const secs = timeTaken % 60
      this.add
        .bitmapText(
          centerX,
          50,
          TEAL_16,
          `LATEST SCORE\n${latestScore} points\nin ${mins}m${secs}s`
        )
        .setOrigin(0.5)
        .setCenterAlign()
        .setLineSpacing(8)
        .setScale(0.5)
    }

    new TextButton(this, centerX, 300, "Menu", () => {
      this.scene.start(MainMenu.KEY)
    }).setScale(0.5)

    try {
      const response = await fetch("/highscore/")
      const data: {
        highscores: { name: string; score: number; seconds: number }[]
      } = await response.json()

      const highscores = data.highscores

      for (let i = 0; i < highscores.length; i++) {
        const { name, score, seconds = 0 } = highscores[i]
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        this.add
          .bitmapText(
            centerX - 70,
            70 + i * 22,
            TEAL_16,
            `${i + 1}. ${name}\n${score}pts in ${mins}m${secs}s`
          )
          .setScale(0.5)
          .setLineSpacing(4)
      }
    } catch (err) {
      console.error("Error fetching highscores", err)
    }
  }
}
