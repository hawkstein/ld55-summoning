export class Summons extends Phaser.Plugins.BasePlugin {
  static readonly PLUGIN_KEY: string = "Summons"
  humans: number = 0
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager)
  }
  getHumans() {
    return this.humans
  }
  addHuman(amount: number) {
    this.humans += amount
  }
}

// Util function for returning plugin with type
export const getSummonsPlugin = (manager: Phaser.Plugins.PluginManager) => {
  return manager.get(Summons.PLUGIN_KEY) as Summons
}
