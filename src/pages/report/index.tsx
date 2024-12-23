import Header from "@/components/DISC/header";
import Paypal from "@/components/global/payments/Paypal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CardProps{
  title : string;
  clientId : string;
  content : string;
  price : string;
}

function Card({title, content, clientId, price}:CardProps) {
  return (
    <React.Fragment>
      <div className="relative w-[320px] m-4">
        <div className="w-full h-full bg-white rounded-md p-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="text-center text-black text-[18px]">
              {title}
            </div>
            <div className="text-blue-500">
              ${price}
            </div>
          </div>
          <div className="mt-4 h-[200px] overflow-hidden">
            {content}
          </div>

          <Paypal clientId={clientId} price = {price} product ={title}/>
        </div>
      </div>
    </React.Fragment>
  );
}

interface PurchasedCardProps{
  title : string;
  content : string;
}

function PurchasedCard({title, content}:PurchasedCardProps) {
  return (
    <React.Fragment>
      <div className="relative w-[320px] m-4">
        <div className="w-full h-full bg-white rounded-md p-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="text-center text-black text-[18px]">
              {title}
            </div>            
          </div>
          <div className="mt-4 h-[200px] overflow-hidden">
            {content}
          </div>
          
          <Link href={title==="Personal Behavioral Style"?"/report/individual":title==="One-on-One Comparison"?"/report/one-on-one":"/"}>
            <div className="w-full bg-[#0070ba] rounded-[4px] h-[30px] text-white text-center">
              Detailed Report
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

interface Props{
  clientId: string;
}

export default function Report({clientId}:Props) {

  const [plans, setData] = useState<any>(undefined)

  const { data: session } = useSession()
  const user : any = session?.user
  
  const [detailedReportFlag, setDetailedReport] = useState(false)
  const [oneOnOneFlag, setOneOnOne] = useState(false)

  const getProducts = async () =>{    
    const response = await axios.get(`/api/db/price-plan`,{})
    if(response.data.error || response.data.message){
      alert(JSON.stringify(response.data))
      setData({})
    }else{
      const _json : any = {}
      response.data.map((item:any)=>{
        _json[item.type] = {price:item.price, discount:item.discount}
      })
      setData(_json)
    }
    
    if(user.role ==="Admin" || user.role==="Tester"){
      setDetailedReport(true)
      setOneOnOne(true)      
    }else{
      const detailedReportresponse = await axios.post('/api/db/payments?action=search',{email:user?.email, productName:"Detailed Report"})
      if(detailedReportresponse.data.length>0)
        setDetailedReport(true)
      else
        setDetailedReport(false)
      const oneOnOneResponse = await axios.post('/api/db/payments?action=search',{email:user?.email, productName:"One-on-One Comparison"})
      if(oneOnOneResponse.data.length>0)
        setOneOnOne(true)
      else
        setOneOnOne(false)
    }
  }

  useEffect(()=>{
    if(user)
    getProducts()
  },[user])
  
  return (
    <main className="w-full min-h-screen bg-[#f3f6f9]">
      <div className="w-full h-[60px] bg-black"></div>
      <Header/>
      <div className="flex justify-center items-center min-h-[calc(100vh-60px)]">
        {
          plans &&
          <div className="flex flex-wrap justify-around">
            {
              detailedReportFlag?
              <PurchasedCard
                title="Personal Behavioral Style"
                content="This tool is a powerful ally in uncovering the unique aspects of your personality and behavioral style, setting the stage for meaningful development in both your personal and professional life"
              />
              :
              plans["Detailed Report"] &&
              <Card
                title="Personal Behavioral Style"
                clientId={clientId}
                content="This tool is a powerful ally in uncovering the unique aspects of your personality and behavioral style, setting the stage for meaningful development in both your personal and professional life"
                price={plans["Detailed Report"].price}
              />
            }

            {
              oneOnOneFlag?
              <PurchasedCard
                title="One-on-One Comparison"
                content="Analyze the DISC profiles of other team members and how they fit together within the team, highlighting potential synergies and areas of conflict."
              />
              :
              plans["Detailed Report"] &&
              <Card
                title="One-on-One Comparison"
                clientId={clientId}
                content="Analyze the DISC profiles of other team members and how they fit together within the team, highlighting potential synergies and areas of conflict."
                price={plans["One-on-One Comparison"].price}
              />
            }
          </div>
        }
      </div>
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const clientId = process.env.PAYPAL_CLIENT_ID || ""
  return { props: { clientId } }
}