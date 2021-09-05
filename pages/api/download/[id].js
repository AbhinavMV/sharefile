import https from "https";
import File from "../../../lib/models/File";
import connectDatabase from "../../../lib/database";
connectDatabase();
export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: "File does not exist" });
    https.get(file.securedUrl, (filestream) => filestream.pipe(res));
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};
