import { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'; 
import jwt from 'jsonwebtoken';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const SES = new AWS.SES({ region: 'us-east-1' });

interface EmailParams {
    to: string[];
    from: string;
    subject: string;
    body: {
      text?: string;
      html?: string;
    };
  }

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {    
    if(req.method==="GET"){
      const token = jwt.sign({ email:"bolya1811@gmail.com" }, String(process.env.NEXTAUTH_SECRET), { expiresIn: '1m' });
      const url = `http://localhost:3000/api/verifyToken?token=${token}`;
      const decoded = jwt.verify(token, String(process.env.NEXTAUTH_SECRET));
        const params : EmailParams = {
            from: "funny.softdev@gmail.com",
            to: ["bolya1811@gmail.com"],
            subject: "Hello",
            body:{
                text: "This is a test email sent from Next.js using Amazon SES!",
                html: `<a href="${url}">${url}</a>`
            }
        }
        const { to, from, subject, body } = params;
        const paramsSES = {
            Destination: {
              ToAddresses: to,
            },
            Message: {
              Body: {
                ...(body.text && { Text: { Data: body.text } }),
                ...(body.html && { Html: { Data: body.html } }),
              },
              Subject: { Data: subject },
            },
            Source: from,
          };
        try {
            const data = await SES.sendEmail(paramsSES).promise();
            res.status(200).json({success:'Email sent successfully', url:url, decoded:decoded});
        } catch (error:any) {
            res.status(200).json({error:error.message});
        }
    }
    else{
        res.status(200).json({ name: "John Doe" });
    }
}