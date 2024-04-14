import { Physics } from "phaser"
import { Enemy } from "./Enemy"

const decisionTime = 5000

export class Human extends Physics.Arcade.Sprite {
  private gameState: "idle" | "walking" | "attacking" = "idle"
  private lastDecisionTime: number = 0
  private lastAttackTime: number = 0
  private enemies: Phaser.GameObjects.Group
  targetX: number = 0
  targetY: number = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    enemies: Phaser.GameObjects.Group
  ) {
    super(scene, x, y, "textures", "Human.png")
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.setCollideWorldBounds()
    this.lastDecisionTime = this.scene.time.now
    this.enemies = enemies
  }

  preUpdate(time: number, delta: number) {
    // if enemies are in range, attack
    if (time - this.lastAttackTime > 4000) {
      this.lastAttackTime = time

      const enemies = this.enemies.getChildren() as Enemy[]
      const enemy = enemies.find(
        (enemy: Enemy) =>
          Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y) < 100
      )
      if (enemy) {
        // Attack
        this.gameState = "attacking"
        this.setVelocity(0, 0)
        this.scene.events.emit("missile", { x: this.x, y: this.y, enemy })
      } else if (this.gameState === "attacking") {
        this.gameState = "idle"
      }
    }
    // if idle, then start walking
    if (this.gameState === "idle") {
      if (time - this.lastDecisionTime > decisionTime) {
        this.lastDecisionTime = time
        this.gameState = "walking"
        this.targetX = Phaser.Math.Between(
          10,
          this.scene.cameras.main.width - 10
        )
        this.targetY = Phaser.Math.Between(230, 250)
        const angle = Phaser.Math.Angle.Between(
          this.x,
          this.y,
          this.targetX,
          this.targetY
        )
        const speed = 8
        this.setVelocityX(Math.cos(angle) * speed)
        this.setVelocityY(Math.sin(angle) * speed)
      }
      // if walking, and we are at the target position, then stop walking
    } else if (this.gameState === "walking") {
      if (
        Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.targetX,
          this.targetY
        ) < 10
      ) {
        this.gameState = "idle"
        this.setVelocity(0, 0)
        this.lastDecisionTime = time
      }
    }
    super.preUpdate(time, delta)
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      human(x: number, y: number, enemies: Phaser.GameObjects.Group): Human
    }
  }
}
