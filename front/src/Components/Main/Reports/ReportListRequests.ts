import Requests from "../../../Requests";


export const GetReports = async (url)=>{
  let List = await Requests.get(url);
  return List.data
};