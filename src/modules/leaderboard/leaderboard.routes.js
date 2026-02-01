import { Router } from "express";
import { addToRank, getLeaderboard, getPositionById, updateUsernameById } from "./leaderboard.controller.js";

const leaderboardRoutes = Router();

leaderboardRoutes.get('/', getLeaderboard);
leaderboardRoutes.get('/:id', getPositionById);
leaderboardRoutes.post('/', addToRank);
leaderboardRoutes.patch('/:id', updateUsernameById);

export default leaderboardRoutes;