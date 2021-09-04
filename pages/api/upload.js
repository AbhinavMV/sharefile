import nextConnect from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import File from "../../lib/models/File";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.diskStorage({}),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single("myFile"));

apiRoute.post(async (req, res) => {
  return res.status(200).json({
    downloadPageLink: "http://localhost:3000/download/6133b7c06092d5d45c6422e0",
    id: "6133b7c06092d5d45c6422e0",
  });
  try {
    if (!req.file) return res.status(400).json({ error: "Please provide a file to upload" });
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "ShareFiles",
        resource_type: "auto",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Cloudinary error" });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;
    const file = await File.create({
      filename: originalname,
      securedUrl: secure_url,
      sizeInBytes: bytes,
      format,
    });
    return res.status(200).json({
      data: {
        id: file._id,
        downloadPageLink: `${process.env.CLIENT_URL}/download/${file._id}`,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "File Upload Unsuccessful" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
