import { Physics } from "phaser"

export class Enemy extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "textures", "Enemy.png")
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
  }

  update() {}
  changeColor() {}
}

Phaser.GameObjects.GameObjectFactory.register(
  "enemy",
  function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const enemy = new Enemy(this.scene, x, y)
    this.displayList.add(enemy)
    this.updateList.add(enemy)
    return enemy
  }
)
