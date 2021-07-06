import { NextApiRequest, NextApiResponse } from 'next';
import {
  getValidSessionByToken,
  updateTherapistById,
} from '../../util/database';
import { ApplicationError, Therapist } from '../../util/types';

export type TherapistProfileResponse =
  | { therapist: Therapist }
  | { errors: ApplicationError[] };

// An API Route needs to define the response
// that is returned to the user
export default async function UpdateTherapist(
  req: NextApiRequest,
  res: NextApiResponse<TherapistProfileResponse>,
) {
  if (req.method === 'POST') {
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);
    // Destructure relevant information from the request body
    const {
      // find a way to get this id
      userId,
      companyName,
      costPerHour,
      websiteUrl,
      videoUrl,
      region,
      zipCode,
      streetAddress,
      streetNumber,
    } = req.body;

    // check if userId, etc. is not undefined
    if (!validSession) {
      return res
        .status(403)
        .json({ errors: [{ message: 'No valid session.' }] });
    }

    // calling the function that inserts the info in the database and I pass the parameters that I need inside this function, but that doesnt mean I am inserting all of these parameters into the database table
    const therapist = await updateTherapistById(
      userId,
      companyName,
      costPerHour,
      websiteUrl,
      videoUrl,
      region,
      zipCode,
      streetAddress,
      streetNumber,
    );

    console.log('therapist api response', updateTherapistById);
    return res.status(200).json({ therapist: therapist });
  }
}
