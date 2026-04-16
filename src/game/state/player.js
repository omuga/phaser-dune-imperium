function createPlayer(id, name, color) {
    return {
        id: id,
        leader: null,
        name: name,
        color: color,
        resources: {
            water: 0,
            solari: 0,
            spice: 0
        },
        agentsAvailable: 3,
        agentsPlaced: 0,
        hand: [],
        deck: [],
        discard: []
    }   
}

function modifyResources(player, resourceType, amount) {
    if (!player) {
        throw new Error("Player is required at modifyResources");
    }

    if (!(resourceType in player.resources)) {
        throw new Error(`Invalid resource type: ${resourceType} at ` + modifyResources.name);
    }

    return {
        ...player,
        resources: {
            ...player.resources,
            [resourceType]: player.resources[resourceType] + amount
        }
    }
}

function placeAgent(player) {
    if (!player) {
        throw new Error("Player is required at setAgent");
    }
    if (player.agentsAvailable <= 0) {
        throw new Error("No agents available to place at setAgent at " + setAgent.name);
    }
    return {
        ...player,
        agentsAvailable: player.agentsAvailable - 1,
        agentsPlaced: player.agentsPlaced + 1
    }
}

function updatePlayer(gameState, playerId, updateFn) {
    const updatedPlayers = gameState.players.map(player => {
        if (player.id === playerId) {
            return updateFn(player);
        }
        return player;
    });
    return {
        ...gameState,
        players: updatedPlayers 
    };
}

function resetPlayerForNewTurn(player) {
    return {
        ...player,
        agentsAvailable: player.agentsAvailable + player.agentsPlaced,
        agentsPlaced: 0
    }
}

export {
    createPlayer,
    modifyResources,
    placeAgent,
    updatePlayer,
    resetPlayerForNewTurn
}