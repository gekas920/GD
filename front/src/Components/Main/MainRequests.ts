import Requests from "../../Requests";


export const MainGet = async (url:string)=>{
  let Polls = await Requests.get(url);
  return Polls.data
};