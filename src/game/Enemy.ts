import { Physics } from "phaser"

export class Enemy extends Physics.Arcade.Sprite {
  private gameState: "descending" | "walking" = "descending"
  targetX: number = 0
  targetY: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "textures", "Enemy.png")
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
    this.targetX = this.x
    this.targetY = Phaser.Math.Between(this.y + 20, this.y + 50)
    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.targetX,
      this.targetY
    )
    const speed = 20
    this.setVelocityX(Math.cos(angle) * speed)
    this.setVelocityY(Math.sin(angle) * speed)
  }
  preUpdate(time: number, delta: number) {
    // if enemies are in range, attack

    // if descending or walking, then check if we've hit the target
    if (this.gameState === "descending" || this.gameState === "walking") {
      if (
        Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.targetX,
          this.targetY
        ) < 10
      ) {
        this.gameState =
          this.gameState === "descending" ? "walking" : "descending"
        if (this.gameState === "descending") {
          this.targetX = Phaser.Math.Between(this.x + 10, this.x + 10)
          this.targetY = Phaser.Math.Between(this.y + 20, this.y + 50)
        } else {
          this.targetX =
            this.x > this.scene.cameras.main.width / 2
              ? 20
              : this.scene.cameras.main.width - 20
          this.targetY = Phaser.Math.Between(this.y + 10, this.y + 20)
        }
        const angle = Phaser.Math.Angle.Between(
          this.x,
          this.y,
          this.targetX,
          this.targetY
        )
        const speed = 20
        this.setVelocityX(Math.cos(angle) * speed)
        this.setVelocityY(Math.sin(angle) * speed)
      }
    }

    super.preUpdate(time, delta)
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      enemy(x: number, y: number): Enemy
    }
  }
}
