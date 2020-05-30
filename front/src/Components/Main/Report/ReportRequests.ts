import Requests from "../../../Requests";


export const GetTypes = async (url)=>{
  let Types = await Requests.get(url);
  return Types.data
};

export const CreateReportReq = (url,body)=>async dispatch=>{
  let Req = await Requests.create(url, body);
  if(Req.data)
    dispatch({
      type:'SHOW_SNACK'
    })
};