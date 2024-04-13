import { Physics } from "phaser"

export class Enemy extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    const camera = scene.cameras.main
    super(scene, camera.centerX, camera.height + 70, "textures", "Enemy.png")
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
  }

  update() {}
}
