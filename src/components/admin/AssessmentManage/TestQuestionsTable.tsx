import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusSquare, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const TestQuestionsTable: React.FC = () => {  

  const [adapted, setAdapted] = useState<any[]>([])
  const [natural, setNatural] = useState<any[]>([])
  const [reload, setReload] = useState("")
  const [updateItem, setUpdateItem] = useState<any>(undefined)

  const getData = async (value:string) =>{
    const response = await axios.get(`/api/db/question-${value}`,{})
    if(response.data.error || response.data.message){
      alert(JSON.stringify(response.data))
      if(value==="adapted")
        setAdapted([])
      else
        setNatural([])
    }else{
      if(value==="adapted")
        setAdapted(response.data)
      else
        setNatural(response.data)
    }
  }

  useEffect(()=>{
    getData('adapted')
    getData('natural')
  },[])

  useEffect(()=>{
    if(reload === "adapted"){
      getData('adapted')
      setReload("")
    }
    if(reload === "natural"){
      getData('natural')
      setReload("")
    }
  },[reload])

  const deleteRow = async (value:string, item:any) =>{    
    const response = await axios.delete(`/api/db/question-${value}?id=${item._id}`)
    if(response.data.error){
      alert(response.data.error)
    }else{
      alert(response.data.message)
      if(value==="adapted")
        getData('adapted')
      else
        getData('natural')
    }
  }

  const updateRow = (value:string, item:any) =>{
    setUpdateItem(
      {
        action:"Update",
        style:value,
        item:item
      }
    )
  }

  const createRow = (value:string, item:any) =>{
    setUpdateItem(
      {
        action:"Add question",
        style:value,
        item:item
      }
    )
  }

  return (
    <div className="relative">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">      
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Adapted Questions
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-4 flex">
              <h5 className="text-sm font-medium xsm:text-base">
                No
              </h5>
              <div className="ml-4 text-[24px] cursor-pointer" onClick={()=>createRow('adapted', undefined)}><FaPlusSquare/></div>
            </div>
            <div className="p-2.5 text-center xl:p-4 col-span-4">
              <h5 className="text-sm font-medium xsm:text-base">
              Question
              </h5>
            </div>
          </div>

          {adapted.map((item:any, key:number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 leading-[20px] ${
                key === adapted.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {key+1}
                </p>
                <div className="ml-4 cursor-pointer text-[24px]" onClick={()=>updateRow('adapted', item)}>
                  <FaRegEdit/>
                </div>
                <div className="ml-4 cursor-pointer text-[24px] text-[#ef4444]" onClick={()=>deleteRow('adapted', item)}>
                  <FaRegTrashAlt/>
                </div>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5 col-span-4">
                <div>
                <p>{item?.question}</p>
                <p className="text-[#ef4444]">{item.D}</p>
                <p className="text-yellow-500">{item.I}</p>
                <p className="text-green-500">{item.S}</p>
                <p className="text-blue-500">{item.C}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-16">      
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Natural Questions
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-4 flex">
              <h5 className="text-sm font-medium xsm:text-base">
                No
              </h5>
              <div className="ml-4 text-[24px] cursor-pointer" onClick={()=>createRow('natural', undefined)}><FaPlusSquare/></div>
            </div>
            <div className="p-2.5 text-center xl:p-4 col-span-4">
              <h5 className="text-sm font-medium xsm:text-base">
              Question
              </h5>
            </div>
          </div>

          {natural.map((item:any, key:number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 leading-[20px] ${
                key === natural.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {key+1}
                </p>
                <div className="ml-4 cursor-pointer text-[24px]" onClick={()=>updateRow('natural', item)}>
                  <FaRegEdit/>
                </div>
                <div className="ml-4 cursor-pointer text-[24px] text-[#ef4444]" onClick={()=>deleteRow('natural', item)}>
                  <FaRegTrashAlt/>
                </div>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5 col-span-4">
                <div>
                <p>{item?.question}</p>
                <p className="text-[#ef4444]">{item.D}</p>
                <p className="text-yellow-500">{item.I}</p>
                <p className="text-green-500">{item.S}</p>
                <p className="text-blue-500">{item.C}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuestionDialog updateItem={updateItem} setUpdateItem={setUpdateItem} setReload={setReload}/>
    </div>
  );
};

export default TestQuestionsTable;

const QuestionDialog = ({updateItem, setUpdateItem, setReload}:any) =>{

  const questionAction = async () =>{
    const qq : any = document.getElementById("question-qq")
    const dd : any = document.getElementById("question-dd")
    const ii : any = document.getElementById("question-ii")
    const ss : any = document.getElementById("question-ss")
    const cc : any = document.getElementById("question-cc")
    const data = {
      question:qq.value,
      D:dd.value,
      I:ii.value,
      S:ss.value,
      C:cc.value
    }
    if(updateItem.action === "Update"){
      const response = await axios.put(`/api/db/question-${updateItem.style}?id=${updateItem.item._id}`, data)
      if(response.data.error){
        alert(response.data.error)
      }else{
        alert(response.data.message)
        setReload(updateItem.style)
      }
    }else{
      const response = await axios.post(`/api/db/question-${updateItem.style}`, data)
      if(response.data.error){
        alert(response.data.error)
      }else{
        alert(response.data.message)
        setReload(updateItem.style)
      }
    }
    setUpdateItem(undefined)
  }

  useEffect(()=>{
    const qq : any = document.getElementById("question-qq")
    const dd : any = document.getElementById("question-dd")
    const ii : any = document.getElementById("question-ii")
    const ss : any = document.getElementById("question-ss")
    const cc : any = document.getElementById("question-cc")
    qq.value=updateItem?.item?.question?updateItem?.item?.question:""
    dd.value=updateItem?.item?.D?updateItem?.item?.D:""
    ii.value=updateItem?.item?.I?updateItem?.item?.I:""
    ss.value=updateItem?.item?.S?updateItem?.item?.S:""
    cc.value=updateItem?.item?.C?updateItem?.item?.C:""
  },[updateItem])

  return (
    <div id="question-dialog" className={`fixed top-0 left-[290px] w-[calc(100%-290px)] h-full bg-black bg-opacity-40 ${updateItem?"block":"hidden"}`}>
      <div className="relative h-full flex justify-center items-center">
        <div className="rounded-md bg-white p-4 overflow-hidden min-w-[60%]">
            <div className="mb-4">
              <div className="relative flex text-black items-center mb-2">
                <div className="w-[20%]">Question : </div>
                <input type="text" id="question-qq" defaultValue={updateItem?.item?.question}
                  className="w-[80%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="relative flex text-[#ef4444] items-center mb-2">
                <div className="w-[20%]">D : </div>
                <input type="text" id="question-dd" defaultValue={updateItem?.item?.D}
                  className="w-[80%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="relative flex text-yellow-500 items-center mb-2">
                <div className="w-[20%]">I : </div>
                <input type="text" id="question-ii" defaultValue={updateItem?.item?.I}
                  className="w-[80%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="relative flex text-green-500 items-center mb-2">
                <div className="w-[20%]">S : </div>
                <input type="text" id="question-ss" defaultValue={updateItem?.item?.S}
                  className="w-[80%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="relative flex text-blue-500 items-center mb-2">
                <div className="w-[20%]">C : </div>
                <input type="text" id="question-cc" defaultValue={updateItem?.item?.C}
                  className="w-[80%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex justify-around">
                <div onClick={()=>questionAction()}
                  className="w-[150px] cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-opacity-90 text-center"
                >
                  {updateItem?.action}
                </div>
                <div onClick={()=>setUpdateItem(undefined)}
                  className="w-[150px] cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-opacity-90 text-center"
                >
                  Cancel
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}