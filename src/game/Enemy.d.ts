declare interface IHuman extends Phaser.GameObjects.Sprite {
  changeColor(): void
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    enemy(): IHuman
  }
}
