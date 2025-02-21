import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  where,
  documentId
} from 'firebase/firestore';
import { insightModel, db } from './firebase';

const METAPROMPT = `This is data from a basketball video game. Given JSON data of a players stats, their last couple games, and the league average data, generate insights and suggestions on how they can improve.
Context on the game:
- These games are 5 on 5, and last 20 minutes. 
- Two team captains are picked for each team, and they draft 4 more players. pos is the players position 1-5, which matches with pg, sg, sf, pf, c. 
- oppPos is the matchup position, which is the same as pos. isAI is 0 for human players, and 1 for AI players (don't count this data). grd is the players teammate grade.
- Usual strategy includes the pg handling the entire offense, while each team has a single "lockdown defender" who guards the opposing team's PG. Plays often include a lot of ball screens, and a lot of pick and pop or pick and roll plays, and calling cuts to the basket.

What you should do:
- Compare their stats to the league average and suggest ways they can improve, including which areas they are strong in and which areas they are weak in relative to the league average.
- Check their last couple games, and analyze why they have been winning or losing. Where can they individually improve in those games, and where can their teammates improve?
- When analyzing the last games, use the uploadId from the games to create a link to the box score data. The link should be bread2basket.com/games/{uploadId}, the label for the lnk should be the readable data of the games createdAt

Keep the response concise, and analytical, and format it beautifully in markdown.
  `;

const LAST_GAMES_LIMIT = 5;

const buildPlayerDataPrompt = (playerData) =>
  `\nHere is the player data: ${JSON.stringify(playerData)}`;

const buildLeagueDataPrompt = (leagueData) =>
  `\nHere is the league average data: ${JSON.stringify(leagueData)}`;

const buildLastGamesPrompt = (lastGames, completeBoxScores) =>
  `\nHere are the last couple games from this player: ${JSON.stringify(lastGames)}
\nHere are the complete boxscores for these games: ${JSON.stringify(completeBoxScores)}`;

export const generateInsights = async (playerID) => {
  try {
    if (!playerID) {
      throw new Error('Player ID is required');
    }

    let prompt = METAPROMPT;

    const playerRef = doc(db, 'players', playerID);
    const playerDoc = await getDoc(playerRef);

    if (!playerDoc.exists()) {
      throw new Error('Player not found');
    }

    const playerData = playerDoc.data();
    const playerDataPrompt = buildPlayerDataPrompt(playerData);
    prompt += playerDataPrompt;

    const leagueAverageRef = collection(db, 'league');
    const q = query(leagueAverageRef, orderBy('createdAt', 'desc'), limit(1));
    const leagueAverageSnapshot = await getDocs(q);

    if (leagueAverageSnapshot.empty) {
      throw new Error('No league average data found');
    }

    const leagueAverageData = leagueAverageSnapshot.docs[0].data();
    const leagueDataPrompt = buildLeagueDataPrompt(leagueAverageData);
    prompt += leagueDataPrompt;

    const lastGamesRef = collection(db, 'games');
    const lastGamesQuery = query(
      lastGamesRef,
      where('playerID', '==', playerID),
      orderBy('_createdAt', 'desc'),
      limit(LAST_GAMES_LIMIT)
    );
    const lastGamesSnapshot = await getDocs(lastGamesQuery);

    const lastGamesData = lastGamesSnapshot.docs.map((lastGameDoc) => {
      const data = lastGameDoc.data();
      return data;
    });

    if (lastGamesData.length === 0) {
      throw new Error('No last games data found');
    }

    // Batch fetch all upload docs
    const uploadIds = lastGamesData.map((game) => game.uploadId);
    const uploadsQuery = query(collection(db, 'uploads'), where(documentId(), 'in', uploadIds));
    const uploadDocs = await getDocs(uploadsQuery);
    const completeBoxScores = uploadDocs.docs.map((uploadDoc) => uploadDoc.data());

    const lastGamesPrompt = buildLastGamesPrompt(lastGamesData, completeBoxScores);
    prompt += lastGamesPrompt;

    const result = await insightModel.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error('Failed to generate insights');
    }

    const analysis = result.response.text();

    const insightData = {
      playerID,
      createdAt: new Date(),
      analysis
    };

    const insightsRef = collection(db, 'insights');
    await addDoc(insightsRef, insightData);

    return analysis;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating insights:', error);
    throw error;
  }
};

export default generateInsights;
