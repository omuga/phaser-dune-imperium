import PlayerPanel from "./PlayerPanel";

export default class LocalPlayerPanel extends PlayerPanel {
    static WIDTH = 200;
    static HEIGHT = 120;
    static AGENT_ICON_SIZE = 0.07;

    constructor(scene, player, x, y) {
        super(scene, player, x, y);
        this.width = LocalPlayerPanel.WIDTH;
        this.height = LocalPlayerPanel.HEIGHT;
        this.agent_icon_size = LocalPlayerPanel.AGENT_ICON_SIZE;
        this.createBackground();
        this.createAgents();
    }

    createBackground() {
        this.bg = this.scene.rexUI.add.roundRectangle(
            0, 0,
            this.width,
            this.height,
            0,
            0x1a1a1a,
            0.85
        )
        .setOrigin(0)
        .setStrokeStyle(2, 0xffffff, 1);

        const dividerY = this.height * 0.6;

        this.divider = this.scene.add.rectangle(
            0,
            dividerY,
            this.width,
            2,          // mismo grosor que el borde
            0xffffff,
            1
        ).setOrigin(0);

        this.container.add(this.divider);
const startX = this.width / 2 - 20;
const startY = this.height;

const endX = this.width / 2 + 20;
const endY = dividerY;

this.diagonal = this.scene.add.line(
    0, 0,
    startX, startY,
    endX, endY,
    0xffffff,
    0.3
)
.setOrigin(0)
.setLineWidth(2);

this.container.add(this.diagonal);

        this.container.add(this.bg);
    }



    update() {
        console.log('Updating LocalPlayerPanel for player:', this.player.name);
    }
}