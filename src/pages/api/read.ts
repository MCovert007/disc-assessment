import { NextApiRequest, NextApiResponse } from 'next';
// import { parseString } from 'xml2js';
// import fs from 'fs-extra';
import fs from 'fs';
import readline from 'readline';
import path from 'path';

export default async function handler(req: NextApiRequest,  res: NextApiResponse) {
  if(req.method === 'GET'){
    try{
        const fileStream = fs.createReadStream(process.cwd()+'/100questions.txt');
        const lines: string[] = [];
        // res.send(txtData)
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break.
        });
        const data :any = {}
        let item : any = {}
        let qu=1, index = 0        
        for await (const bugline of rl) {
            const line = bugline.replace('\t','')
            if(index % 5 === 0){
                const no = line.indexOf(`${qu}.`)
                const newline = line.substring(no + `${qu}.`.length);                
                item['title'] = newline.trim()
            }else if(index % 5 === 1){
                const no = line.indexOf("D:")
                const newline = line.substring(no + 2);
                item['D'] = newline.trim()
            }else if(index % 5 === 2){
                const no = line.indexOf("I:")
                const newline = line.substring(no + 2);
                item['I'] = newline.trim()
            }else if(index % 5 === 3){
                const no = line.indexOf("S:")
                const newline = line.substring(no + 2);
                item['S'] = newline.trim()
            }else{                
                const no = line.indexOf("C:")
                const newline = line.substring(no + 2);
                item['C'] = newline.trim()
                data[`${qu}`] = item
                item = {}
                qu++
            }
            index ++
        }
        rl.close();
    
        res.status(200).json(data);
    }catch(error){
        res.send(error)
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}



// function parseEntity(entity:any) {
//   const entityData : any = {
//       'entity-name': entity.$['entity-name'],
//       'package-name': entity.$['package-name'],
//       'title': entity.$.title,
//       fields: []
//   };

//   if (entity.field) {
//       entity.field.forEach((field: { $: { name: any; type: any; }; description: any[]; }) => {
//           const fieldData :any = {
//               name: field.$.name,
//               type: field.$.type
//           };

//           if (field.description) {
//               fieldData.description = field.description[0];
//           }

//           entityData.fields.push(fieldData);
//       });
//   }

//   return entityData;
// }

// // Function to parse the XML
// function parseXmlToJson(xmlData: any) {
//   return new Promise((resolve, reject) => {
//       parseString(xmlData, (err, result) => {
//           if (err) {
//               reject(err);
//           } else {
//               const entityModel = {
//                   title: result.entitymodel.title[0],
//                   description: result.entitymodel.description[0],
//                   version: result.entitymodel.version[0],
//                   entities: <any>[]
//               };

//               if (result.entitymodel.entity) {
//                   result.entitymodel.entity.forEach((entity: any) => {
//                       entityModel.entities.push(parseEntity(entity));
//                   });
//               }

//               resolve(entityModel);
//           }
//       });
//   });
// }
