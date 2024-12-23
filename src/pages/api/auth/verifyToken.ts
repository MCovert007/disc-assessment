import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server'
export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    const { token } = req.query;
    try {
        const decoded : any = jwt.verify(String(token), String(process.env.NEXTAUTH_SECRET));        
        const client = await clientPromise;
        const db = client.db("disc-assessment");
        try {
            const usersCollection = db.collection('users');
            const data = {allow:true}
            await usersCollection.updateOne(
                { email: decoded?.email },
                { $set: data }
            )
        } catch (error) {
            res.status(200).json({ message: `we can${"'"}t allow your account. please contact to coach.randy@assessyourself.online` });
        }
        const host = String(req.headers.host)
        res.status(200).send(resHTML(host));
    } catch (error) {
        res.status(200).json({ message: 'Invalid or expired token. please retry to verify your email' });
    }
}

const resHTML = (host:string) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email verification</title>
    </head>
    <body style="padding:40px 25px;font-size:15px;font-weight:normal;line-height:24px;border:1px solid #e5e5e5; display:flex; justify-content:center;">
        <div style="font-size:28px; text-align:center;">
            <h1 style="font-size:40px; margin-bottom:80px;">Your email has been successfully verified.</h1>
            Visit <a href="/">our website!</a>
        </div>
    </body>
    </html>
    `
}