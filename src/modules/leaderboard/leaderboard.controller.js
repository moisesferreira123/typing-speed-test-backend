import prisma from '../../database/prisma.js'

export async function getLeaderboard(req, res) {
  try {
    const topScores = await prisma.leaderboard.findMany({
      take: 10,
      orderBy: [{wpm: 'desc'}, {accuracy: 'desc'}]
    });
    res.status(200).json(topScores);
  } catch(err) {
    console.log(`Error when searching for leaderboard: ${err}`)
    res.status(500).json({error: "The leaderboard could not be loaded."})
  }
}