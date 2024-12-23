import useMyStore from "@/lib/myStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Paypal from "@/components/global/payments/Paypal";
import Header from "@/components/DISC/header";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props{
    clientId: string;
}

export default function Home({clientId}:Props) {

  const payment : any = useMyStore((state)=>state.payment)
  const router = useRouter()

  const { data: session } = useSession()
  const user : any = session?.user
  
  const [plans, setData] = useState<any>({})
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

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <main className="min-h-screen">
      <Header/>
      <div className="w-full h-[60px] bg-[#666666]"></div>
      <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
        <div>
          <div className="text-center mb-6 text-[28px] leading-[34px] px-4 uppercase text-black font-semibold" style={{fontFamily:"Orbitron"}}>
            Payment
          </div>
          <div className="flex justify-around text-black text-[20px]">
            <div className="max-w-[344px] min-w-[334px] rounded-md bg-white p-8">
              <div className="text-center mb-6">Detailed Report</div>
              <p className="text-center text-[16px] mb-8">${plans["Detailed Report"]?plans["Detailed Report"].price:100}</p>
              {
                detailedReportFlag?
                <Link className="w-full text-center" href={""}>detailed Report</Link>
                :
                plans["Detailed Report"] &&
                <Paypal clientId={clientId} price = {plans["Detailed Report"].price} product ="Detailed Report"/>
              }
            </div>
            <div className="w-8"/>
            <div className="max-w-[344px] min-w-[334px] rounded-md bg-white p-8">
              <div className="text-center mb-6">One-on-One Comparison</div>
              <p className="text-center text-[16px] mb-8">${plans["One-on-One Comparison"]?plans["One-on-One Comparison"].price:50}</p>
              {
                plans["One-on-One Comparison"] &&
                <Paypal clientId={clientId} price = {plans["One-on-One Comparison"].price} product ="One-on-One Comparison"/>
              }
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href={"/"} className="text-[#4444ee] underline">
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const clientId = process.env.PAYPAL_CLIENT_ID || ""
  return { props: { clientId } }
}