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
          const documents : any = await db.collection("testResult").find({}).toArray();          
          res.status(200).json(documents);
      } catch (e:any) {          
          const _data :any = {error:e.message}
          res.status(200).json(_data)
      }
    }else if(req.method === "POST"){
      try {
        const client = await clientPromise;
        const db = client.db("disc-assessment");
        const collection = db.collection('testResult');
        const _result = await collection.findOne({ userID:req.body.userID });        
        if(_result){
          const response : any = await collection.updateOne({ userID:req.body.userID }, { $set: req.body })
        }else{
          const response : any = await collection.insertOne(req.body);
        }
        const _data :any = {message:"Successful addition"}
        res.status(200).json(_data)        
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
          const _id = new ObjectId(docId as string)
          const collection = db.collection('testResult');          
          const result : any = await collection.updateOne({ _id: _id }, { $set: req.body });
          if (!result.modifiedCount) {
            const responseData : any = {error:"Document not found"}
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
          const collection = db.collection('testResult');
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


function formatDate(date: Date) {
  // Add leading zeros if necessary
  function pad(number: number) {
      if (number < 10) {
          return '0' + number;
      }
      return number;
  }

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Month is zero-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}