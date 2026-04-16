export default class PlayerPanel {
  constructor(scene, player, x, y) {
    this.scene = scene;
    this.player = player;

    const WIDTH = 215;
    const HEIGHT = 90;

    this.container = scene.add.container(x, y);

    // 🔲 Fondo con bordes redondeados usando rexUI
    this.bg = this.scene.rexUI.add.roundRectangle(
      0, 0,                    // posición relativa al container
      WIDTH,
      HEIGHT,
      16,                      // radio de las esquinas (puedes cambiarlo)
      0x1a1a1a,                // color de fondo (oscuro elegante)
      0.85                     // alpha (transparencia)
    )
    .setOrigin(0)
    .setStrokeStyle(2, 0xffffff, 0.3);   // borde blanco sutil

    const LEFT_X = 10;
    const RIGHT_START_X = WIDTH - 20;
    const TOP_Y = 18;
    const BOTTOM_Y = 65;

    // 🧑 Nombre
    this.nameText = scene.add.text(LEFT_X, 6, player.name, {
      fontSize: "14px",
      color: "#ffffff",
      fontStyle: "bold"
    });

    // 👤 Agentes
    this.agentIcons = [];
    const maxAgents = player.maxAgents || 3;
    for (let i = 0; i < maxAgents; i++) {
      const icon = scene.add.image(
        LEFT_X + i * 18,
        BOTTOM_Y,
        player.agentSprite
      );
      icon.setScale(0.06).setOrigin(0.5);
      this.agentIcons.push(icon);
    }

    // 📊 Recursos y Cartas
    this.resourceUI = [];
    const resources = [
      { key: "spice",  getValue: (p) => p.resources.spice },
      { key: "water",  getValue: (p) => p.resources.water },
      { key: "solari", getValue: (p) => p.resources.solari }
    ];

    const cards = [
      {
        key: "intrigue_card_back",
        getValue: (p) => p.hand.length,
        scale: 0.07
      },
      {
        key: "player_panel_deck",
        getValue: (p) => p.deck.length,
        scale: 0.06
      }
    ];

    const spacing = 28;
    let index = 0;

    // Cartas
    cards.forEach((r) => {
      const xPos = RIGHT_START_X - index * spacing - 60;
      const icon = scene.add.image(xPos, TOP_Y, r.key);
      icon.setScale(r.scale);
      const text = scene.add.text(xPos, TOP_Y + 12, "", {
        fontSize: "13px",
        color: "#ffffff"
      }).setOrigin(0.5);

      this.resourceUI.push({ icon, text, getValue: r.getValue });
      index++;
    });

    // Recursos
    resources.forEach((r) => {
      const xPos = RIGHT_START_X - index * spacing;
      const icon = scene.add.image(xPos, BOTTOM_Y, r.key);
      icon.setScale(0.09);
      const text = scene.add.text(xPos, BOTTOM_Y + 12, "", {
        fontSize: "13px",
        color: "#ffffff"
      }).setOrigin(0.5);

      this.resourceUI.push({ icon, text, getValue: r.getValue });
      index++;
    });

    // Agregar todo al container
    this.container.add([
      this.bg,
      this.nameText,
      ...this.agentIcons,
      ...this.resourceUI.flatMap(r => [r.icon, r.text])
    ]);
  }

  update(player, isActive = false) {
    this.player = player;

    // ✨ Highlight del turno actual
    this.container.setAlpha(isActive ? 1 : 0.6);

    // 👤 Agentes (visible + fade)
    this.agentIcons.forEach((icon, i) => {
      icon.setVisible(true);
      icon.setAlpha(i < (player.agentsAvailable || 0) ? 1 : 0.3);
    });

    // 📊 Actualizar valores de recursos y cartas
    this.resourceUI.forEach((r) => {
      r.text.setText(String(r.getValue(player) || 0));
    });
  }
}