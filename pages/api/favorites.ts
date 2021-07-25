import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByValidSessionToken,
  insertFavorite,
} from '../../util/database';

export default async function favoritesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  // if (req.method === 'GET') {
  //   const userFavourites = await getUserFavourites(user.id);

  //   return res.status(200).json({ userFavourites: userFavourites });
  // }

  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, therapistId } = req.body;

    // Insert into database
    const newFavorite = await insertFavorite(userId, therapistId);

    return res
      .status(200)
      .json({ message: 'Added to favorites', newFavorite: newFavorite });
  }

  res.status(400).json(null);
}
