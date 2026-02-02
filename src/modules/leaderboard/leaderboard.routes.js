import { Router } from "express";
import { addToRank, getLeaderboard, getPosition } from "./leaderboard.controller.js";

const leaderboardRoutes = Router();

leaderboardRoutes.get('/', getLeaderboard);
leaderboardRoutes.post('/position', getPosition);
leaderboardRoutes.post('/', addToRank);

export default leaderboardRoutes;