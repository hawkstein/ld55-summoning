import { Physics } from "phaser"

export class Human extends Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "textures", "Human.png")
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
  }

  update() {}
  changeColor() {}
}

Phaser.GameObjects.GameObjectFactory.register(
  "human",
  function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const human = new Human(this.scene, x, y)
    this.displayList.add(human)
    this.updateList.add(human)
    return human
  }
)
