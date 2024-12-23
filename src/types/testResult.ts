export type TestResult = {
  ResultID : string;
  UserID: string;
  Score : {
    adapted:Adapted;
    natural:Natural;
  },
  Profile: string;
  AssessmentDate : string;
};


type Adapted = {
  D:number, 
  I:number,
  S:number,
  C:number
}

type Natural = {
  D:number, 
  I:number,
  S:number,
  C:number
}