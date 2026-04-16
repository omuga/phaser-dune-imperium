import PlayerPanel from "./PlayerPanel";

export default class OtherPlayerPanel extends PlayerPanel {

    static WIDTH = 170;
    static HEIGHT = 70;

    static AGENT_ICON_SIZE = 0.06;
    constructor(scene, player, x, y) {
        super(scene, player, x, y);
        this.width = OtherPlayerPanel.WIDTH;
        this.height = OtherPlayerPanel.HEIGHT;
        this.agent_icon_size = OtherPlayerPanel.AGENT_ICON_SIZE;
        this.createBackground();
        this.createAgents();
    }

    createBackground() {
        // Aquí puedes agregar la lógica para crear el fondo del panel del jugador
        this.bg = this.scene.rexUI.add.roundRectangle(
            0, 0,                    // posición relativa al container
            OtherPlayerPanel.WIDTH,
            OtherPlayerPanel.HEIGHT,
            16,                      // radio de las esquinas (puedes cambiarlo)
            0x1a1a1a,                // color de fondo (oscuro elegante)
            0.85                     // alpha (transparencia)
        )
        .setOrigin(0)
        .setStrokeStyle(2, 0xffffff, 0.3);  

        this.container.add(this.bg);
    }


    update() {
        this.icons.forEach((icon, i) => {
        icon.setVisible(true);
        icon.setAlpha(i < (this.player.agentsAvailable || 0) ? 1 : 0.3);
        });
    }
}