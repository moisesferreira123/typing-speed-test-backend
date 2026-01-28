import leaderboardRoutes from '../modules/leaderboard/leaderboard.routes.js'

export default function registerRoutes(app) {
  app.use('/leaderboard', leaderboardRoutes);
}
