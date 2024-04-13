import { Physics } from "phaser"

export class Human extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    const camera = scene.cameras.main
    super(scene, camera.centerX, camera.height + 70, "textures", "Human.png")
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
  }

  update() {}
}
