import { v2 as cloudinary } from 'cloudinary';
import Formidable from 'formidable';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const data = await new Promise<{ file: Formidable.File }>(
    (resolve, reject) => {
      const form = new Formidable.IncomingForm({
        keepExtensions: true,
        multiples: false,
      });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ file: files.file as Formidable.File });
        console.log('err', err);
        console.log('fields', fields);
        console.log('files', files);
      });
    },
  );

  console.log('what is this data', data);
  console.log('formidable file', Formidable.File);

  try {
    const uploadedVideo = await cloudinary.uploader.upload(data.file.path);
    res.statusCode = 200;
    res.json({ videoUrl: uploadedVideo.secure_url });
    console.log('uploaded video', uploadedVideo);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ videoUrl: 'error' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default endpoint;
