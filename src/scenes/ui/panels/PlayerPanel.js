export default class PlayerPanel {

    constructor(scene, player, x, y) {
        this.scene = scene;
        this.player = player;

        this.container = scene.add.container(x, y);

        this.bg = null;
        this.nameText = null;
        this.icons = [];
        this.resourceUI = [];

        this.createBackground();
        this.createResources();
    }

    createBackground() {
    }

    createResources() {
        // Nombre del jugador
        this.nameText = this.scene.add.text(10, 10, this.player.name, {
            fontSize: "16px",
            color: "#ffffff",
            fontStyle: "bold"
        });
        this.container.add(this.nameText);

        // Especia
        this.spiceIcon = this.scene.add.image(10, 70, "spice_menu").setScale(0.05).setOrigin(0, 0);
        this.container.add(this.spiceIcon);

        // Agua
        this.waterIcon = this.scene.add.image(10, 100, "water_icon").setScale(0.05).setOrigin(0, 0);
        this.container.add(this.waterIcon);

                // Solari
        this.solariIcon = this.scene.add.image(10, 130, "solari_icon").setScale(0.05).setOrigin(0, 0);
        this.container.add(this.solariIcon);
    }

    createAgents() {
        const padding = 10;
        const spacing = 30;

        const maxAgents = this.player.maxAgents || 3;

        for (let i = 0; i < maxAgents; i++) {
        const icon = this.scene.add.image(0, 0, this.player.agentSprite);

        icon.setScale(this.agent_icon_size).setOrigin(0.5);

        // Posición: arriba derecha
        icon.x = this.width - padding - (i * spacing);
        icon.y = -icon.displayHeight / 2 + padding;
        this.container.add(icon);
        this.container.bringToTop(icon);
        this.icons.push(icon);
        }
    }


}