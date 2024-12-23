import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const emailTemplate = (magicLink:string, path:string) =>{
  const template =`
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
      <tbody>
        <tr>
          <td width="100%" valign="top" bgcolor="#F4F5F8" style="padding:20px 1px 20px 0">
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center">                
                <tbody>                  
                  <tr>
                    <td bgcolor="#ffffff" style="padding:25px;font-size:15px;font-weight:normal;line-height:24px;border:1px solid #e5e5e5">
                      <div style="width:100%; display:flex;justify-content:center; padding-bottom:40px;">
                        <img src='${path}/logo.png'
                          alt="assessyourself.online" class="CToWUd" data-bit="iit" width='100%'>
                      </div>

                      Hi there!<br><br>

                      Thanks for signing up for an Account at assessyourself.online!
                      <br>
                      <a style="color:#0070e0;text-decoration:none" 
                        href='${magicLink}'>Click here</a> to activate your account and access our website.
                      <br><br>

                      <div style="text-align:center">
                          <u></u>
                          <a href='${magicLink}'>
                              Activate Your Account
                          </a>
                          <u></u>
                      </div>
                      <br>
                      
                      If clicking the activation link above doesn't seem to work, you can copy and paste the full link below into your browser's address bar or email
                      <a style="color:#0070e0;text-decoration:none" href="mailto:coach.randy@assessyourself.online" target="_blank">coach.randy@assessyourself.online</a> and we'll activate your account for you.<br><br>

                      <div style="word-break:break-all">
                        <a style="color:#0070e0;text-decoration:none" href='${magicLink}'>
                          ${magicLink}
                        </a>
                      </div>
                      <br>

                      Best Regards,<br>
                      Coach Randy Pipes                        
                      <br><br>
                      <a style="color:#0070e0;text-decoration:none;font-weight:normal" 
                        href=${path}>
                        <strong>${path}</strong>
                      </a>
                      <br>
                    </td>
                  </tr>
              </tbody>
            </table>
          </td>
      </tr>
  </tbody></table>
  `
  return template
}

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {    
  const host = String(req.headers.host)
  const protocol = String(req.headers['x-forwarded-proto'] || 'http')
  if(req.method==="GET"){
    const email = "funny.softdev@gmail.com" 
    await responseFunction(email, host, protocol, res)
  }else if(req.method==="POST"){
    const email = req.body.email
    await responseFunction(email, host, protocol, res)
  }else{
    res.status(200).json({ name: "John Doe" });
  }
}

const responseFunction = async (email:string, host:string, protocol:string, res:NextApiResponse) =>{
  try {
    const token = jwt.sign({ email }, String(process.env.NEXTAUTH_SECRET), { expiresIn: '24h' });
    const magicLink = `${protocol}://${host}/api/auth/verifyToken?token=${token}`
    const path = `${protocol}://${host}`
    let transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'coach.randy@assessyourself.online',
        pass: '%DISC_Assessment1960%',
      },
    });
    const html = String(emailTemplate(magicLink, path))
    const info = await transporter.sendMail({
      from: '"Coach Randy" <coach.randy@assessyourself.online>',
      to: email,
      subject: 'Your Email Verification',
      html: html,
    });
    res.status(200).json({success:'Email sent successfully', info:info, html:html});
  } catch (error:any) {
    res.status(200).json({error:error.message});
  }
}