import Requests from "../../../Requests";


export const GetUsers = async (url) => {
    let Result = await Requests.get(url);
    return Result.data
};