import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import Requests from "../../../Requests";
import {connect} from "react-redux";
import {filter, mapDispatchToProps, mapStateToProps} from "../indexMain";
import {Dialog} from "@material-ui/core";
import CheckboxList from "./SetPrivateDialog/SetPrivateDialog";

const AddPoll = (props) =>{
  const { handleSubmit, register, reset} = useForm();
  const [list, setList] = useState([{ text: "" }]);
  const [disabled,setDisabled] = useState(false);
  const [draft,setDraft] = useState('');
  const [error,setError]= useState('');
  const [open,setOpen] = useState(false);
  const isAdmin = props.setAdmin.admin;
  const onSubmit = (values) => {
      let files = values.file;
      const formData = new FormData();
      for(let i = 0;i<files.length;i++){
          formData.append(files[i].name,files[i])
      }

      formData.append('draft',draft);
      formData.append('id',JSON.stringify(props.setId.ids));

      let filtered = filter(values,elem=>!!elem);
      for (let key in filtered){
          formData.append(key,filtered[key])
      }
      Requests.create('/poll',formData,{
          headers:{
              'Content-Type': 'multipart/form-data'
          }
      }).then(result=>{

          if (result && !draft)
              window.location.href = `/main/polls/${result.data.id}`;
          if(result && draft)
              props.ShowSnack();
          if(!result && !draft){
              setError('Already exist');
              setTimeout(()=>{
                  setError('')
              },2000);
              reset();
          }
      })
  };

  const addInput = () => {
    list.push({ text: "" });
    setList([...list]);
  };


  return(
      <div className='companies-info-box'>
          <Dialog open={open} onClose = {()=>setOpen(false)}><CheckboxList/></Dialog>
        <div className='main-form'>
          <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
            <input
                placeholder={'Enter title'}
                name='title'
                required={true}
                ref={register()}
            />
            {list.map((n, i) => (
                <div
                    key={i + '1'}
                    style={{
                  display:'flex',
                  justifyContent:'center'
                }}>
                  <input type='checkbox'
                         name={i.toString()+'c'}
                         style={{width:'18px'}}
                         ref={register()}
                         disabled={disabled}
                         onClick={()=>setDisabled(true)}
                  />
                  <input
                      style={{
                        width:'280px'
                      }}
                      placeholder={n.text || 'Enter variant'}
                      key={i}
                      name={i.toString()}
                      required={true}
                      ref={register()}
                  />
                </div>
            ))}
            <input
                placeholder={'Upload file'}
                style={{
                  marginBottom: '-5px',
                  paddingTop: '5px',
                  width: '130px',
                  border: 0,
                  margin:'0 auto'
                }}
                ref={register()}
                name='file'
                required={true}
                type='file'
                multiple
            />
              <button onClick={addInput}>Add</button>
              <button type="submit">Publish</button>
              {isAdmin &&
              <button type='button' onClick={()=>setOpen(true)}>Set Private</button>
              }
              <button type="submit" onClick={()=>setDraft('1')}>Save as draft</button>
          </form>
            <div className='errors'>
                {error}
            </div>
        </div>
      </div>
  )
};


export default connect(mapStateToProps,mapDispatchToProps)(AddPoll)