declare interface IEnemy extends Phaser.GameObjects.Sprite {
  changeColor(): void
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    enemy(): IEnemy
  }
}
