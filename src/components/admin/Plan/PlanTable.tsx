import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlusSquare, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const PlanTable: React.FC = () => {  

  const [adapted, setData] = useState<any[]>([])
  const [reload, setReload] = useState(true)
  const [updateItem, setUpdateItem] = useState<any>(undefined)

  const getData = async () =>{
    const response = await axios.get(`/api/db/price-plan`,{})
    if(response.data.error || response.data.message){
      alert(JSON.stringify(response.data))
      setData([])
    }else{
      setData(response.data)
    }
  }

  useEffect(()=>{
    if (reload){
      getData()
      setReload(false)
    }
  },[reload])

  const deleteRow = async (item:any) =>{    
    const response = await axios.delete(`/api/db/price-plan?id=${item._id}`)
    if(response.data.error){
      alert(response.data.error)
    }else{
      alert(response.data.message)
      getData()
    }
  }

  const updateRow = (item:any) =>{
    setUpdateItem(
      {
        action:"Update",
        item:item
      }
    )
  }

  const createRow = (item:any) =>{
    setUpdateItem(
      {
        action:"Add",
        item:item
      }
    )
  }

  return (
    <div className="relative">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-4 flex">
              <div className="ml-4 text-[24px] cursor-pointer" onClick={()=>createRow(undefined)}><FaPlusSquare/></div>
            </div>
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Type
              </h5>
            </div>
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Price
              </h5>
            </div>
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Discount
              </h5>
            </div>
          </div>

          {adapted.map((item:any, key:number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 leading-[20px] ${
                key === adapted.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="ml-4 cursor-pointer text-[24px]" onClick={()=>updateRow(item)}>
                  <FaRegEdit/>
                </div>
                <div className="ml-4 cursor-pointer text-[24px] text-[#ef4444]" onClick={()=>deleteRow(item)}>
                  <FaRegTrashAlt/>
                </div>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                {item.type}
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                ${item.price}
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                ${item.discount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PricePlanDialog updateItem={updateItem} setUpdateItem={setUpdateItem} setReload={setReload}/>
    </div>
  );
};

export default PlanTable;

const PricePlanDialog = ({updateItem, setUpdateItem, setReload}:any) =>{

  const questionAction = async () =>{
    const planType : any = document.getElementById("question-planType")
    const planPrice : any = document.getElementById("question-price")
    const planDiscount : any = document.getElementById("question-discount")
    const data = {
      type:planType.value,
      price:planPrice.value,
      discount:planDiscount.value,
    }
    if(updateItem.action === "Update"){
      const response = await axios.put(`/api/db/price-plan?id=${updateItem.item._id}`, data)
      if(response.data.error){
        alert(response.data.error)
      }else{
        alert(response.data.message)
        setReload(true)
      }
    }else{
      const response = await axios.post(`/api/db/price-plan`, data)
      if(response.data.error){
        alert(response.data.error)
      }else{
        alert(response.data.message)
        setReload(true)
      }
    }
    setUpdateItem(undefined)
  }

  useEffect(()=>{
    const planType : any = document.getElementById("question-planType")
    const planPrice : any = document.getElementById("question-price")
    const planDiscount : any = document.getElementById("question-discount")
    planType.value=updateItem?.item?.type?updateItem?.item?.type:""
    planPrice.value=updateItem?.item?.price?updateItem?.item?.price:""
    planDiscount.value=updateItem?.item?.discount?updateItem?.item?.discount:""
  },[updateItem])

  return (
    <div id="price-plan-dialog" className={`fixed top-0 left-[290px] w-[calc(100%-290px)] h-full bg-black bg-opacity-40 ${updateItem?"block":"hidden"}`}>
      <div className="relative h-full flex justify-center items-center">
        <div className="rounded-md bg-white p-4 overflow-hidden min-w-[60%]">
            <div className="mb-4">
              <div className="relative flex items-center mb-2">
                <div className="w-[50%]">Type : </div>
                <input type="text" id="question-planType" defaultValue={updateItem?.item?.question}
                  className="w-[50%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="relative flex items-center mb-2">
                <div className="w-[50%]">Price($) : </div>
                <input type="text" id="question-price" defaultValue={updateItem?.item?.D}
                  className="w-[50%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="relative flex items-center mb-2">
                <div className="w-[50%]">Discount($) : </div>
                <input type="text" id="question-discount" defaultValue={updateItem?.item?.I}
                  className="w-[50%] rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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