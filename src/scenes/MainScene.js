import { Scene } from "phaser";
import { createInitialGameState, nextRound, nextTurn } from "../game/state/gamestate";
import { updatePlayer } from "../game/state/player";
import OtherPlayerPanel from "./ui/panels/OtherPlayerPanel";
import LocalPlayerPanel from "./ui/panels/LocalPlayerPanel";

export default class MainScene extends Scene {
  constructor() {
    super("main");
  }

  preload() {
    // 👤 Agentes
    for (let i = 0; i < 4; i++) {
      this.load.image(`agent_${i + 1}`, `assets/agents/agent_p${i + 1}.png`);
    }

    // 📊 Recursos
    this.load.image("spice", "assets/resources/spice.png");
    this.load.image("water", "assets/resources/water.png");
    this.load.image("solari", "assets/resources/solari.png");
    this.load.image("spice_menu", "assets/resources/spice_menu.png");
    this.load.image("water_icon", "assets/resources/water_icon.png");
    this.load.image("solari_icon", "assets/resources/solari_icon.png");
    // 🃏 Cartas
    this.load.image("intrigue_card_back", "assets/cards/intrigue_card_back.png");
    this.load.image("player_panel_deck", "assets/cards/player_panel_deck.png");
  }

  create() {
    this.gameState = createInitialGameState(4);
    // 📝 Asegurar agentSprite en cada jugador
    this.gameState.players.forEach((p, i) => {
      p.agentSprite = `agent_${i + 1}`;
      p.maxAgents = p.maxAgents || 3;
    });

    this.currentPlayerPanel = new LocalPlayerPanel(
    this,
    this.gameState.players[this.gameState.currentPlayerIndex],
    20,
    this.scale.height - LocalPlayerPanel.HEIGHT - 20 // abajo
  );

    // 🔹 UI turno
    this.turnText = this.add.text(this.scale.width / 2, 20, "", {
      fontSize: "20px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.playerUI = [];

    this.createPlayerPanels();
    
    this.render();

    // 🖱️ Input
    this.input.on("pointerdown", () => {
      const currentPlayer =
        this.gameState.players[this.gameState.currentPlayerIndex];

      try {
        if (
          currentPlayer.agentsAvailable <= 0 &&
          this.gameState.currentPlayerIndex === this.gameState.players.length - 1
        ) {
          this.gameState = nextRound(this.gameState);
          this.render();
          return;
        } else if (currentPlayer.agentsAvailable <= 0) {
          this.gameState = nextTurn(this.gameState);
          this.render();
          return;
        }

        this.gameState = updatePlayer(
          this.gameState,
          currentPlayer.id,
          (player) => ({
            ...player,
            agentsAvailable: player.agentsAvailable - 1,
            agentsPlaced: player.agentsPlaced + 1,
          })
        );

        this.render();
      } catch (e) {
        console.error(e.message);
      }
    });
  }

  // 👈 Sidebar izquierda
  createPlayerPanels() {
    const START_X = 20;
    const START_Y = 60;
    const VERTICAL_SPACING = 120;

    this.gameState.players.forEach((player, index) => {
      if (index == 3) {
        // El primer jugador se muestra en el panel derecho
        return;
      }
      const panel = new OtherPlayerPanel(
        this,
        player,
        START_X,
        START_Y + index * VERTICAL_SPACING
      );
      this.playerUI.push(panel);
    });
  }

  render() {
    const currentPlayer =
      this.gameState.players[this.gameState.currentPlayerIndex];

    this.turnText.setText(
      `Ronda: ${this.gameState.round} | Turno: ${this.gameState.turn} | ${currentPlayer.name}`
    );

    this.playerUI.forEach((ui) => {
      const player = this.gameState.players.find(
        (p) => p.id === ui.player.id
      );

      ui.update(player, player.id === currentPlayer.id);
    });
  }
}