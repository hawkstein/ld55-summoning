import { Physics } from "phaser"

export class Enemy extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "textures", "Enemy.png")
    // scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    // this.setCollideWorldBounds()
    this.setVelocityY(4)
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      enemy(x: number, y: number): Enemy
    }
  }
}
