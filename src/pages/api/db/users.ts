import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise  from "@/lib/mongodb"
import bcrypt from 'bcrypt';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if(req.method==="GET"){
      try {
          const client = await clientPromise;
          const db = client.db("disc-assessment");
          const documents : any = await db.collection("users").find({}).toArray();      
          res.status(200).json(documents);
      } catch (e:any) {          
          const _data :any = {error:e.message}
          res.status(200).json(_data)
      }
    }else if(req.method === "POST"){
      try {
        const client = await clientPromise;
        const db = client.db("disc-assessment");
        if(req.query?.action === "create"){

          const saltRounds = 10;
          try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = {
              ...req.body,
              created:formatDate(new Date()),
              updated:formatDate(new Date()),
              allow:false,
            }
            newUser.password = hashedPassword
            const usersCollection = db.collection('users');
            //const users = await usersCollection.find();
            const user = await usersCollection.findOne({ email:newUser.email });
            if(user){
              const responseData : any = {message:"Already registered user"}
              res.status(200).json(responseData);
            }else{
              const reponse : any = await usersCollection.insertOne(newUser);
              res.status(200).json(reponse.data);
            }
          } catch (error) {
          }
        }else{
          const documents : any = await db.collection("users").find(req.body).toArray();
          res.status(200).json(documents);
        }
      } catch (e:any) {
        const _data :any = {error:e.message}
        res.status(200).json(_data)
      }
    }else if(req.method === "PUT"){
      try {
        const client = await clientPromise;
        const db = client.db("disc-assessment");

        const saltRounds = 10;
        try {
          const usersCollection = db.collection('users');
          if(req.body.password){
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);          
            const data = {name:req.body.name, password:hashedPassword}
            const user = await usersCollection.updateOne(
              { email: req.body.email },
              { $set: data }
            );
            if(user){
              const responseData : any = {message:"Successful Update"}
              res.status(200).json(responseData);
            }else{
              const responseData : any = {error:"Update failed"}
              res.status(200).json(responseData);
            }
          }else{
            const data = {role:req.body.role}
            const user = await usersCollection.updateOne(
              { email: req.body.email },
              { $set: data }
            );
            if(user){
              const responseData : any = {message:"Successful Update"}
              res.status(200).json(responseData);
            }else{
              const responseData : any = {error:"Update failed"}
              res.status(200).json(responseData);
            }
          }
        } catch (error) {
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