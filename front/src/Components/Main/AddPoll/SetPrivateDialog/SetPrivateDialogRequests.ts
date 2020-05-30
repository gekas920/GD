import Requests from "../../../../Requests";


export const AddUsers = async (url)=>{
    let Users = await Requests.get(url);
    return Users.data
};