import { PaletteHash } from "./lib/Palette"
import { Boot } from "./scenes/Boot"
import { Game as MainGame } from "./scenes/Game"
import { GameOver } from "./scenes/GameOver"
import { MainMenu } from "./scenes/MainMenu"
import { Preloader } from "./scenes/Preloader"

import { Game, Types } from "phaser"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
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
  dom: {
    createContainer: true,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
}

export default new Game(config)
