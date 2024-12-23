import { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.OPENAI_API_KEY
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {  
  if(req.method==="POST"){
    const messages = req.body
    const body = JSON.stringify({
      messages,
      model: 'gpt-4-turbo-preview',
      stream: false
    })
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        body
      })
      const data = await response.json()
      
      res.status(200).json(data)
    } catch (error:any) {
      res.status(500).json({ error: error.message })
    }
  }else{
    const content = `What is the most logical algorithm for calculating the exact personality profile on a DISC assessment`
    
    const messages = [{
      role:'user',
      content:content
    }]
    const body = JSON.stringify({
      messages,
      model: 'gpt-4-turbo-preview',
      stream: false
    })
  
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        body
      })
      const data = await response.json()
      res.status(200).json({ data })
    } catch (error:any) {
      res.status(500).json({ error: error.message })
    }
  }
}