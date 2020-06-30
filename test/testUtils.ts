import { createEmptyGameDummy } from "../src/db-connector/db-connector.service";
import { ProposeRating, CreateAsset } from "../src/asset/model/Asset";
import { CreateGame } from "../src/game/model/Game";


export const dummyGame = createEmptyGameDummy();

export const getDummyProposal = () => {
    const proposal = new ProposeRating();
    proposal.gameId = dummyGame.id;
    proposal.rating = 5;
    proposal.playerId = '42';
    return proposal;
}

export const getDummyNewAsset = (gameId?: string) => {
    const newAsset = new CreateAsset();
    newAsset.gameId = gameId ? gameId : dummyGame.id;
    newAsset.name = 'test asset'
    return newAsset;
}

export const getDummyNewGame = () => {
    const newGame = new CreateGame();
    newGame.name = 'dummy game';
    return newGame;
}