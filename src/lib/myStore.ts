import { create } from 'zustand'

interface MyStore {
  assessmentState : string;
  assessment: string[][];
  countOfQuery : number;
  userProfile:string,
  payment:{
    unit:number,
    show:boolean,
    to:string
  }
}

const useMyStore = create<MyStore>((set) => ({
  assessmentState : "Ready",
  assessment : [],
  countOfQuery : 24,
  userProfile:"",
  payment:{
    unit:0,
    show:false,
    to:""
  }
}))

export default useMyStore