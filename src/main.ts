import { Enemy } from "./game/Enemy"
import { Human } from "./game/Human"
import { PaletteHash } from "./lib/Palette"
import { Summons } from "./plugins/Summons"
import { Boot } from "./scenes/Boot"
import { Game as MainGame } from "./scenes/Game"
import { GameOver } from "./scenes/GameOver"
import { LevelScore } from "./scenes/LevelScore"
import { MainMenu } from "./scenes/MainMenu"
import { Preloader } from "./scenes/Preloader"
import { SummonHud } from "./scenes/SummonHud"

import { Game, Types } from "phaser"

const config: Types.Core.GameConfig = {
  width: 150,
  height: 300,
  type: Phaser.AUTO,
  parent: "game-container",
  backgroundColor: PaletteHash.HotPanda.Background,
  scale: {
    min: {
      width: 150,
      height: 300,
    },
    max: {
      width: 800,
      height: 1200,
    },
    snap: {
      width: 150,
      height: 300,
    },
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  zoom: 2,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  plugins: {
    global: [{ key: Summons.PLUGIN_KEY, plugin: Summons, start: false }],
  },
  dom: {
    createContainer: true,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver, SummonHud, LevelScore],
}

export default new Game(config)

Phaser.GameObjects.GameObjectFactory.register(
  "enemy",
  function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const enemy = new Enemy(this.scene, x, y)
    this.displayList.add(enemy)
    this.updateList.add(enemy)
    return enemy
  }
)

Phaser.GameObjects.GameObjectFactory.register(
  "human",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    enemies: Phaser.GameObjects.Group
  ) {
    const human = new Human(this.scene, x, y, enemies)
    this.displayList.add(human)
    this.updateList.add(human)
    return human
  }
)
