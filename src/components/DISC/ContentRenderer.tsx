import test from './test.json'
import React from 'react';

const TagBold = ({ content }:any) => {
  
  return (
    <React.Fragment>
      { 
        content.split("**").map((item:string, index:number)=>
          (index %2 ===0)?<React.Fragment key={index}>{item}</React.Fragment>:<b key={index}>{item}</b>
        )
      }
    </React.Fragment>
  );
};

const Tags = ({ content }:any) => {
  return (
    <React.Fragment>
      {
        content[0]==='-'?
        <li className='ml-8'>
          {
            content.indexOf("####")>-1?
            <h1 className='text-[32px] font-medium'>{content.substr(2).replace("####", "")}</h1>
            :
            content.indexOf("###")>-1?
            <h1 className='text-[28px] font-medium'>{content.substr(2).replace("###", "")}</h1>
            :
            content.indexOf("##")>-1?
            <h1 className='text-[24px] font-medium'>{content.substr(2).replace("###", "")}</h1>
            :
            content.indexOf("**")>-1?
            <TagBold content={content.substr(2)}/>
            :            
            <>{content.substr(2)}</>            
          }
        </li>
        :
        <>
          {
            content===""?
            <br/>
            :
            content.indexOf("####")>-1?
            <h1 className='text-[28px] font-medium'>{content.replace("####", "")}</h1>
            :
            content.indexOf("###")>-1?
            <h1 className='text-[24px] font-medium'>{content.replace("###", "")}</h1>
            :
            content.indexOf("##")>-1?
            <h1 className='text-[22px] font-semibold'>{content.replace("##", "")}</h1>
            :
            content.indexOf("**")>-1?
            <p><TagBold content={content}/></p>
            :
            <p>
              {content}
            </p>
          }
        </>
      }
    </React.Fragment>
  );
};

const ContentRenderer = ({ lines }:any) => {

  return (
    <>
      {
        lines.map((item:string, index:number)=><Tags key={index} content={item}></Tags>)
      }
    </>
  );
};

export default ContentRenderer;