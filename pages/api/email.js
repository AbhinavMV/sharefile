import nodemailer from "nodemailer";
import { createEmailTemplate } from "../../helper/emailTemplate";
import File from "../../lib/models/File";
import connectDatabase from "../../lib/database";
connectDatabase();
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //validate req
      const { id, emailTo, senderName } = JSON.parse(req.body);
      const emailFrom = process.env.EMAIL_FROM;
      //check if the file exists
      const file = await File.findById(id);
      if (!file) return res.status(400).json({ error: "File does not exist!" });

      //create transporter
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      //prepare the email data
      const { filename, sizeInBytes } = file;
      const sizeInMb = `${(parseFloat(sizeInBytes) / (1024 * 1024)).toFixed(2)} MB`;
      const downloadPageLink = `${process.env.CLIENT_URL}/download/${id}`;

      const mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: "File share",
        text: `${emailFrom} shared a file with you.`,
        html: createEmailTemplate(senderName, downloadPageLink, filename, sizeInMb),
      };

      //send email using transporter
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Server Error" });
        }
        //save the data and send the response
        file.sender = emailFrom;
        file.receiver = emailTo;
        await file.save();
        return res.status(200).json({ message: "Email Sent" });
      });
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  } else {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};
