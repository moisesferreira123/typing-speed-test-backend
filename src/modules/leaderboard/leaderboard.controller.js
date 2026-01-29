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
    const newUser = await prisma.leaderboard.create({
      data: {
        username: username,
        accuracy: parseInt(accuracy),
        wpm: parseInt(wpm)
      }
    });

    const total = await prisma.leaderboard.count();

    if(total > 100) {
      const worst = await prisma.leaderboard.findFirst({
        orderBy: [{wpm: 'asc'}, {accuracy: 'asc'}, {createdAt: 'desc'}],
      }); 

      if(worst) {
        await prisma.leaderboard.delete({
          where: {id: worst.id}
        });
      }
    }

    res.status(201).json(newUser);
  } catch(err) {
    console.log(`Error adding user to leaderboard: ${err}`);
    res.status(500).json({error: 'It was not possible to add the user to the ranking.'});
  }
}

export async function getPositionById(req, res) {
  const id = Number(req.params.id);
  try {
    const user = await prisma.leaderboard.findUnique({
      where: {id: id}
    });

    if(!user) return res.status(200).json({position: null});

    const position = await prisma.leaderboard.count({
      where: {
        OR: [
          {wpm: {gt: user.wpm}},
          {
            AND: [
              {wpm: user.wpm},
              {
                OR: [
                  {accuracy: {gt: user.accuracy}},
                  {
                    AND: [
                      {accuracy: user.accuracy},
                      {createdAt: {lt: user.createdAt}}
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