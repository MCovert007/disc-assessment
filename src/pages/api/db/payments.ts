import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise  from "@/lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
){
  if(req.method==="GET"){
    try {
      const client = await clientPromise;
      const db = client.db("disc-assessment");
      const documents : any = await db.collection("payments").find({}).toArray();          
      res.status(200).json(documents);
    } catch (e:any) {          
      const _data :any = {error:e.message}
      res.status(200).json(_data)
    }
  }else if(req.method === "POST"){
    try {
      const { action } = req.query;
      
      const client = await clientPromise;
      const db = client.db("disc-assessment");

      if(action && action==="search"){
        const documents = await db.collection("payments").find(req.body).toArray()
        res.status(200).json(documents);
      }else{
        const collection = db.collection('payments');
        const response : any = await collection.insertOne(req.body);
        const _data :any = {success:true}
        res.status(200).json(_data)
      }
    } catch (e:any) {
      const _data :any = {error:e.message}
      res.status(200).json(_data)
    }
  }else if(req.method === "PUT")  {
    try {
      const { paymentOrderId } = req.query;
      const client = await clientPromise;
      const db = client.db("disc-assessment");
      const collection = db.collection('payments');
      const response : any = await collection.updateOne(
        { paymentOrderId: paymentOrderId },
        { $set: req.body }
      );
      const _data :any = {success:true}
      res.status(200).json(_data)        
    } catch (e:any) {
      const _data :any = {error:e.message}
      res.status(200).json(_data)
    }
  }
}