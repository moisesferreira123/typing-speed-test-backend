import { Router } from "express";

const leaderboardRoutes = Router();

leaderboardRoutes.get('/', getLeaderboard);
leaderboardRoutes.get('/:id', getPositionById);
leaderboardRoutes.post('/', addToRank);

export default leaderboardRoutes;