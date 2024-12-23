import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchBalance = async () => {
  try {
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
    const SECRET = process.env.PAYPAL_SECRET_KEY
    const token = CLIENT_ID + ":" + SECRET
    // Step 3: Authenticate and Retrieve Access Token    
    const authResponse = await axios.post(
      'https://api.paypal.com/v1/oauth2/token', 
      null, 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(token).toString('base64')}`, // Replace CLIENT_ID and SECRET
        },
        params: {
          grant_type: 'client_credentials',
        },
      }
    );
    const accessToken = authResponse.data.access_token;

    // Step 4: Make API Request to Retrieve Balance
    const balanceResponse = await axios.get('https://api.paypal.com/v1/reporting/balances', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return balanceResponse.data
  } catch (error:any) {
    return error.message
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method==="GET"){
    try {
      const _result :string = await fetchBalance()
      res.status(200).send(_result)
    } catch (e:any) {          
      const _data :any = {error:e.message}
      res.status(200).json(_data)
    }
  }
}