import { Physics } from "phaser"

export class Human extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "textures", "Human.png")
    // scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
  }

  update() {}
  changeColor() {}
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      human(): Human
    }
  }
}
