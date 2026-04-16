function createInitialBoard() {
    return {
        spaces: {
            sietch_tbr: { name: "Sietch Tabr", type: 'desert', occupiedBy: null },
            sietch_jacurutu: { name: "Sietch Jacurutu", type: 'desert', occupiedBy: null },
            sietch_gara_kulon: { name: "Sietch Gara Kulon", type: 'desert', occupiedBy: null }
        }
    }
}

function placeAgentOnBoard(board, spaceId, playerId) {
    if (!board) {
        throw new Error("Board is required at placeAgentOnBoard");
    }

    const space = board.spaces[spaceId];

    if (!space) {
        throw new Error(`Space ${spaceId} not found at placeAgentOnBoard`);
    }

    if (space.occupiedBy) {
        throw new Error(`Space ${spaceId} is already occupied at placeAgentOnBoard`);
    }

    return {
        ...board,
        spaces: {
            ...board.spaces,
            [spaceId]: {
                ...space,
                occupiedBy: playerId
            }
        }
    };
}
        

export {
    createInitialBoard,
    placeAgentOnBoard
}