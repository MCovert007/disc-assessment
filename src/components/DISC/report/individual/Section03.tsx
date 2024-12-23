import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void
}
export default function Section03({setSectionNum}:Props) {

  const { data: session }:any = useSession()
  const userDISC = session?.user?.discValue
  const [chartData, setChartData] = useState({
    'D':[0, 0],
    'I':[0, 0],
    'S':[0, 0],
    'C':[0, 0]
  })
  const getResultSection = async () =>{
    setChartData(userDISC)
    setTimeout(()=>setSectionNum(3), 1000)
  }
  useEffect(()=>{
    if(userDISC===undefined || userDISC===null)
      return
    getResultSection()
  },[])

  return (
    <div id="section03" className="min-h-[1330px] border-b p-16">
      <h1 className="text-[40px] mb-8">DISC Descriptors</h1>
      {
        <div>
          In this section, we delve into the heart of your DISC profile through an insightful exploration of descriptors tailored specifically to you. The graph presented below encapsulates a broad spectrum of characteristics, behaviors, and tendencies associated with your unique DISC composition. As you navigate through this visual representation, you&apos;ll discover a rich tapestry of words that not only define your professional and personal essence but also illuminate the path to leveraging your innate strengths. This graphical analysis is designed to provide you with a deeper understanding of your personality traits, offering a clear, at-a-glance insight into how you interact with the world around you.
        </div>
      }
      <div className="flex justify-center mt-8 mb-4">
        <ReportSample/>
      </div>
      <div className="w-[500px] mx-auto">
        <DiscRadarChart data={[chartData.D[0]+chartData.D[1], chartData.I[0]+chartData.I[1], chartData.S[0]+chartData.S[1], chartData.C[0]+chartData.C[1]]} />
      </div>
      <div>
        <ComparisonBarChart result={chartData} />
      </div>
      
    </div>
  );
}

import { Radar } from 'react-chartjs-2';
import { Chart, ChartOptions, registerables } from 'chart.js'; // Add this line

Chart.register(...registerables); // Add this line

interface DiscRadarChartProps {
  data: number[]; // Data for the radar chart, should be an array of numbers
}

const DiscRadarChart: React.FC<DiscRadarChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Dominance', 'Influence', 'Steadiness', 'Compliance'],
    datasets: [
      {
        label: 'DISC Assessment',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: data,
      },
    ],
  };

  const chartOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Radar data={chartData} options={chartOptions} />;
};

import category from '@/pages/query/category.json'
import useMyStore from "@/lib/myStore";

function ReportSample() {
  const _jsonData : any = category

  const { data: session }:any = useSession()
  const userDISC = session?.user?.discValue

  const [result, setResult] = useState({
    'D':0,
    'I':0,
    'S':0,
    'C':0
  })
  const countOfQuery = useMyStore((state)=>state.countOfQuery)
  useEffect(()=>{
    if(userDISC)
      setResult({
        'D':userDISC.D[0]+userDISC.D[1],
        'I':userDISC.I[0]+userDISC.I[1],
        'S':userDISC.S[0]+userDISC.S[1],
        'C':userDISC.C[0]+userDISC.C[1]
      })
  },[])

  return (
    <React.Fragment>
      <div className="relative w-[700px] text-[12px] border">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full">
            {
              (result.D-countOfQuery)/3>12 &&          
              <div className="absolute w-[25%] bg-red bg-opacity-50"
                style={{
                  height:`${Math.floor(((result.D-countOfQuery)/3-12)*100/12)}%`,
                  bottom:`0`
                }}
              />
            }
            {
              (result.I-countOfQuery)/3>12 &&
              <div className="absolute w-[25%] bg-yellow-500 bg-opacity-50 left-[25%]"
                style={{
                  height:`${Math.floor(((result.I-countOfQuery)/3-12)*100/12)}%`,
                  bottom:`0`
                }}
              />
            }
            {
              (result.S-countOfQuery)/3>12 &&
              <div className="absolute w-[25%] bg-green-500 bg-opacity-50 left-[50%]"
                style={{
                  height:`${Math.floor(((result.S-countOfQuery)/3-12)*100/12)}%`,
                  bottom:`0`
                }}
              />
            }
            {
              (result.C-countOfQuery)/3>12 &&
              <div className="absolute w-[25%] bg-blue-500 bg-opacity-50 left-[75%]"
                style={{
                  height:`${Math.floor(((result.C-countOfQuery)/3-12)*100/12)}%`,
                  bottom:`0`
                }}
              />
            }
          </div>
          <div className="relative z-10">
            {
              Object.keys(_jsonData.D).map((item:string, index:number)=>(index<12) &&
                <div key={item} className="grid grid-cols-4 z-50">
                  <div className="border flex justify-center items-center">
                    {_jsonData.D[String(24-index)].Title}
                  </div>
                  <div className="border flex justify-center items-center">
                    {_jsonData.I[String(24-index)].Title}
                  </div>
                  <div className="border flex justify-center items-center">
                    {_jsonData.S[String(24-index)].Title}
                  </div>
                  <div className="border flex justify-center items-center">
                    {_jsonData.C[String(24-index)].Title}
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-4 z-50">
            <div className="border border-black flex justify-center items-center text-white bg-red">
            Dominance
            </div>
            <div className="border border-black flex justify-center items-center text-white bg-yellow-500">
            Influence 
            </div>
            <div className="border border-black flex justify-center items-center text-white bg-green-500">
            Steadiness 
            </div>
            <div className="border border-black flex justify-center items-center text-white bg-blue-500">
            Conscientiousness 
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full">
            {
              (result.D-countOfQuery)/3<12 &&          
              <div className="absolute w-[25%] bg-red bg-opacity-50"
                style={{
                  height:`${Math.floor((12-(result.D-countOfQuery)/3)*100/12)}%`,
                  top:0
                }}
              />
            }
            {
              (result.I-countOfQuery)/3<12 &&
              <div className="absolute w-[25%] bg-yellow-500 bg-opacity-50 left-[25%]"
                style={{
                  height:`${Math.floor((12-(result.I-countOfQuery)/3)*100/12)}%`,
                  top:0
                }}
              />
            }
            {
              (result.S-countOfQuery)/3<12 &&
              <div className="absolute w-[25%] bg-green-500 bg-opacity-50 left-[50%]"
                style={{
                  height:`${Math.floor((12-(result.S-countOfQuery)/3)*100/12)}%`,
                  top:0
                }}
              />
            }
            {
              (result.C-countOfQuery)/3<12 &&
              <div className="absolute w-[25%] bg-blue-500 bg-opacity-50 left-[75%]"
                style={{
                  height:`${Math.floor((12-(result.C-countOfQuery)/3)*100/12)}%`,
                  top:0
                }}
              />
            }
          </div>
          <div className="relative z-10">
            {
              Object.keys(_jsonData.D).map((item:string, index:number)=>(index>=12) &&
                <div key={item} className="grid grid-cols-4 z-50">
                  <div className="border flex justify-center items-center">
                    {_jsonData.D[String(24-index)].Title}
                  </div>
                  <div className="border flex justify-center items-center">
                    {_jsonData.I[String(24-index)].Title}
                  </div>
                  <div className="border flex justify-center items-center">
                    {_jsonData.S[String(24-index)].Title}
                  </div>
                  <div className="border flex justify-center items-center">
                    {_jsonData.C[String(24-index)].Title}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      
    </React.Fragment>
  );
}

const ComparisonBarChart = ({result}:any) => {

  const countOfQuery = useMyStore((state)=>state.countOfQuery)

  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-center mb-4">Natural Score</div>
          <div className="flex justify-center">
            <div className="report-graphic relative">
              <div className="graph">
                <div className="cylinder">
                  <div className="cylinder cy1"
                    style={{
                      height:`${Math.floor((result.D[0]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.D[0])}
                  </div>
                </div>
                <div className="cylinder">
                  <div className="cylinder cy2"
                    style={{
                      height:`${Math.floor((result.I[0]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.I[0])}
                  </div>
                </div>
                <div className="cylinder">
                  <div className="cylinder cy3"
                    style={{
                      height:`${Math.floor((result.S[0]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.S[0])}
                  </div>
                </div>
                <div className="cylinder">
                  <div className="cylinder cy4"
                    style={{
                      height:`${Math.floor((result.C[0]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.C[0])}
                  </div>
                </div>
              </div>
              <div className="flex justify-around w-[202px] mx-auto">
                <p>D</p><p>I</p><p>S</p><p>C</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center mb-4">Adaptive Score</div>
          <div className="flex justify-center">
            <div className="report-graphic relative">
              <div className="graph">
                <div className="cylinder">
                  <div className="cylinder cy1"
                    style={{
                      height:`${Math.floor((result.D[1]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.D[1])}
                  </div>
                </div>
                <div className="cylinder">
                  <div className="cylinder cy2"
                    style={{
                      height:`${Math.floor((result.I[1]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.I[1])}
                  </div>
                </div>
                <div className="cylinder">
                  <div className="cylinder cy3"
                    style={{
                      height:`${Math.floor((result.S[1]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.S[1])}
                  </div>
                </div>
                <div className="cylinder">
                  <div className="cylinder cy4"
                    style={{
                      height:`${Math.floor((result.C[1]-countOfQuery/2)*100/(countOfQuery/2*3))}%`,
                      bottom:0
                    }}
                  >
                    {(result.C[1])}
                  </div>
                </div>
              </div>
              <div className="flex justify-around w-[202px] mx-auto">
                <p>D</p><p>I</p><p>S</p><p>C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
      In this graph, we&apos;re comparing two important aspects of behavior: natural and adaptive responses, specifically within the framework of DISC personality traits (Dominance, Influence, Steadiness, and Conscientiousness).<br/><br/>
      Natural Score: This reflects how you naturally tend to behave according to your personality traits without any conscious effort to adjust your behavior. It&apos;s like your default mode, showing how you typically approach situations.<br/><br/>
      Adaptive Score: This measures how you adjust or adapt your behavior in response to different circumstances, such as work environments, social settings, or personal interactions. It shows how flexible you are in tweaking your behavior to fit the needs of the situation.<br/><br/>
      Comparing the two bars for each personality trait (D, I, S, C), you can see the gap between how you naturally behave and how you tend to adjust your behavior. A taller adaptive bar compared to the natural one indicates a significant difference, suggesting that you can adapt well to various situations. On the other hand, if the adaptive bar is similar in height to the natural one, it implies that your behavior remains relatively consistent regardless of the context.<br/>
      Understanding this difference between natural and adaptive responses can be incredibly beneficial. It offers insights into how you tend to navigate different scenarios, communicate with others, and approach tasks. This tool can provide valuable self-awareness, helping you understand your strengths in adaptability and areas where you might struggle to adjust. In professional settings, it can guide team dynamics, communication strategies, and leadership approaches, ultimately fostering more effective collaboration and personal growth. It should be noted also that the greater the gap between natural and adapted styles, the more energy will be pulled from you in scenarios where you encounter Me/Me, Me/Them, and Me/Job (environment) conflicts.
      </div>
    </React.Fragment>
  )
};