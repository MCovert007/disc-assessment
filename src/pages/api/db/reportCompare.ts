import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise  from "@/lib/mongodb"
import { ObjectId } from 'mongodb';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
){
    if(req.method==="GET"){
      try {
          const client = await clientPromise;
          const db = client.db("disc-assessment");
          const documents : any = await db.collection("reportCompare").find({}).toArray();          
          res.status(200).json(documents);
      } catch (e:any) {          
          const _data :any = {error:e.message}
          res.status(200).json(_data)
      }
    }else if(req.method === "POST"){
      try {
        const client = await clientPromise;
        const db = client.db("disc-assessment");
        const collection = db.collection('reportCompare');
        const _result :any = await collection.findOne({ email:req.body.email });
        res.status(200).json(_result)        
      } catch (e:any) {
        const _data :any = {error:e.message}
        res.status(200).json(_data)
      }
    }else if(req.method === "PUT"){
      try {
        const client = await clientPromise;
        const db = client.db("disc-assessment");
        try {
          const docId = req.query.id
          const collection = db.collection('reportCompare');          
          const result : any = await collection.updateOne({ email:req.body.email }, { $set: req.body });
          if (!result.modifiedCount) {
            await collection.insertOne(req.body);
            const responseData : any = {message:"Successful Update"}
            return res.status(200).json(responseData);
          }else{
            const responseData : any = {message:"Successful Update"}
            return res.status(200).json(responseData);
          }
        } catch (error:any) {
          const responseData : any = {error:error.message}
          return res.status(200).json(responseData);
        }
      } catch (e:any) {
        const _data :any = {error:e.message}
        res.status(200).json(_data)
      }
    }else if(req.method === "DELETE"){
      try {
        const client = await clientPromise;
        const db = client.db("disc-assessment");
        try {
          const docId = req.query.id
          const _id = new ObjectId(docId as string)
          const collection = db.collection('reportCompare');
          const result : any = await collection.deleteOne({ _id: _id });          

          if (!result.deletedCount) {
            const responseData : any = {error:"Document not found"}
            return res.status(200).json(responseData);
          }else{
            const responseData : any = {message:"Successful Delete"}
            return res.status(200).json(responseData);
          }
        } catch (error:any) {
          const responseData : any = {error:error.message}
          return res.status(200).json(responseData);
        }
      } catch (e:any) {
        const _data :any = {error:e.message}
        res.status(200).json(_data)
      }
    }
}