import { Router } from "express";

const leaderboardRoutes = Router();

leaderboardRoutes.get('/', getLeaderboard);
// leaderboardRoutes.post('/', addToRank);

export default leaderboardRoutes;