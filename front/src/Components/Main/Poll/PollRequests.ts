import Requests from "../../../Requests";


export const CheckPrivate = async (url)=>{
    let Result = await Requests.get(url);
    if(Result.data === 'private')
        window.location.href = '/main/polls';
    if(Result.data === 'private_ok')
        return 'private_ok';
};

export const GetInfo = async (url)=>{
  let Result = await Requests.get(url);
  return Result.data
};

export const PollAction = async (url)=>{
  let Result= await Requests.update(url);
  if(Result)
      window.location.href='/main/polls'
};

export const PollDelete = async (url)=>{
    let Result= await Requests.delete(url);
    if(Result)
        window.location.href='/main/polls'
};

export const UpdatePoll = async (url,body)=>{
    await Requests.update(url,body)
};
