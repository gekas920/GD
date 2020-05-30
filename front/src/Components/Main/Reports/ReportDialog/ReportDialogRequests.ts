import Requests from "../../../../Requests";


export const GetReportData = async (url)=>{
  const Result = await Requests.get(url);
  return Result.data
};

export const DeleteAction = async (url)=>{
  const Req = await Requests.delete(url);
  if(Req)
      window.location.href = '/main/polls'
};