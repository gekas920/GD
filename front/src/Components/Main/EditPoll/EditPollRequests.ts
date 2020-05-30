import Requests from "../../../Requests";


export const EditPollInfo = (url,body,options)=> async dispatch => {
    let Update = await Requests.update(url, body, options);
    if (Update) {
        window.location.href = `/main/polls/${Update.data.id}`;
        dispatch({
            type:'SET_CLICK',
            payload:false
        })
    } else {
        dispatch({
            type:'SET_EX'
        })
    }
};

export const getData = async (url)=>{
  let Poll = await Requests.get(url);
  return {
      title:Poll.data.title,
      fields:Poll.data.fields
  }
};