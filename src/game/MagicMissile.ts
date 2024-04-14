import { Physics } from "phaser"

export class MagicMissile extends Physics.Arcade.Sprite {
  private lastBoundsCheck: number = 0
  private initTime: number = 0
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "textures", "MagicMissile.png")
    scene.physics.add.existing(this)
    this.setOrigin(0.5)
    this.initTime = scene.time.now
  }

  protected preUpdate(time: number): void {
    if (this.active === false) {
      return
    }
    if (time - this.lastBoundsCheck < 1000) {
      return
    }
    if (time - this.initTime > 5000) {
      this.destroy()
      return
    }
    if (
      this.x < 0 ||
      this.x > this.scene.physics.world.bounds.width ||
      this.y < 0 ||
      this.y > this.scene.physics.world.bounds.height
    ) {
      this.destroy()
      return
    }
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      missile(x: number, y: number): MagicMissile
    }
  }
}
