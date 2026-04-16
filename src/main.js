import { Game, Scale} from "phaser";

import MainScene from "./scenes/MainScene";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  backgroundColor: "#1a1a1a",
  scene: [MainScene],
  scale: {
    // Fit to window
    mode: Scale.FIT,
    // Center vertically and horizontally
    autoCenter: Scale.CENTER_BOTH
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  dom: {
        createContainer: true
  }
};

new Game(config);