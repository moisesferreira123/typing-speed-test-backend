import prisma from '../../database/prisma.js'

export async function getLeaderboard(req, res) {
  try {
    const topScores = await prisma.leaderboard.findMany({
      take: 10,
      orderBy: [{wpm: 'desc'}, {accuracy: 'desc'}, {createdAt: 'asc'}]
    });
    res.status(200).json(topScores);
  } catch(err) {
    console.log(`Error when searching for leaderboard: ${err}`)
    res.status(500).json({error: "The leaderboard could not be loaded."})
  }
}

export async function addToRank(req, res) {
  const { username, accuracy, wpm } = req.body;

  try {
    await prisma.leaderboard.create({
      data: {
        username: username,
        accuracy: parseInt(accuracy),
        wpm: parseInt(wpm)
      }
    });

    await prisma.$executeRaw`
      DELETE FROM Leaderboard
      WHERE id NOT IN (
        SELECT id FROM (
          SELECT id
          FROM Leaderboard
          ORDER BY wpm DESC, accuracy DESC, createdAt ASC
          LIMIT 100
        ) ranked
      );
    `;

    res.status(201).json({message: "The user was successfully registered on the leaderboard."});
  } catch(err) {
    console.log(`Error adding user to leaderboard: ${err}`);
    res.status(500).json({error: 'It was not possible to add the user to the ranking.'});
  }
}

export async function getPosition(req, res) {
  const wpm = Number(req.body.wpm);
  const accuracy = Number(req.body.accuracy);
  const createdAt = new Date(req.body.createdAt);

  try {
    const position = await prisma.leaderboard.count({
      where: {
        OR: [
          {wpm: {gt: wpm}},
          {
            AND: [
              {wpm: wpm},
              {
                OR: [
                  {accuracy: {gt: accuracy}},
                  {
                    AND: [
                      {accuracy: accuracy},
                      {createdAt: {lt: createdAt}}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    });

    res.status(200).json({position: position+1});
  } catch(err) {
    console.log(`Error retrieving position by ID.: ${err}`);
    res.status(500).json({error: `It was not possible to obtain the user's position by ID.`});
  }
}
