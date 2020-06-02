import Requests from "../../../Requests";


export const GetCategories = async (url)=>{
    const Categories = await Requests.get(url);
    return Categories.data
};

export const AddCategory = async (url,body)=>{
  let res = await Requests.create(url,body);
  return res.data
};

export const DeleteCategory = async (url)=>{
    let Req = await Requests.delete(url);
    return Req.data
};