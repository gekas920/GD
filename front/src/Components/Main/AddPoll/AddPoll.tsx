import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {filter} from "../indexMain";
import {Dialog, FormHelperText, Input} from "@material-ui/core";
import {PropsAddPoll} from "./indexAddPoll";
import CheckboxList from "./SetPrivateDialog/SetPrivateDialog";
import {GetCategories} from "./AddPollRequests";
import {Type} from "../Report/indexReport";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createMuiTheme } from '@material-ui/core/styles';
import {green, orange, purple, yellow} from "@material-ui/core/colors";
import {ThemeProvider} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
const theme = createMuiTheme({
    palette: {
        primary:orange,
        secondary: green,
    }
});
export const AddPoll:React.FC<PropsAddPoll> = (props) =>{
  const { handleSubmit, register} = useForm();
  const [list, setList] = useState([{ text: "" }]);
  const [draft,setDraft] = useState('');
  const [error,setError]= useState('');
  const [errorChange,setErrorChange]= useState(false);
  const [open,setOpen] = useState(false);
  const [types,setTypes] = useState([]);
  const [check,setCheckSelect] = useState('');
  const isAdmin = props.admin;
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleChangeSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelected(event.target.value as string[]);
  };
  const onSubmit = (values) => {
      if(!errorChange){
          let files = values.file;
          const formData = new FormData();
          for(let i = 0;i<files.length;i++){
              formData.append(files[i].name,files[i])
          }

          formData.append('draft',draft);
          formData.append('id',JSON.stringify(props.ids));
          formData.append('types',JSON.stringify(selected));

          let filtered = filter(values,elem=>!!elem);
          for (let key in filtered){
              formData.append(key,filtered[key])
          }


          props.AddPollReq('/poll',formData,{
              headers:{
                  'Content-Type': 'multipart/form-data'
              }
          },draft);
      }
  };

    const selectField = ()=>{
        if(types)
            return types.map((elem:Type,index:number)=>{
                return <MenuItem value={elem.type} key={index}>{elem.type}</MenuItem>
            })
    };

  useEffect(()=>{
      GetCategories('/categories')
          .then(result=>{
              setTypes(result)
          });
      if(props.exist){
          setError('Already exist');
          setTimeout(()=>{
              props.HideEx();
              setError('')
          },2000);
      }
  },[props.exist]);

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
                         checked={check === i.toString()+'c'}
                         name={i.toString()+'c'}
                         style={{width:'18px'}}
                         ref={register()}
                         onChange={()=>setCheckSelect(i.toString()+'c')}
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
              <FormControl error={errorChange}>
                  <ThemeProvider theme={theme}>
                      <Select
                          value={selected}
                          required
                          multiple
                          color='primary'
                          style={{
                              width:'80%',
                              margin:'0 auto',
                          }}
                          placeholder={'Choose category'}
                          onChange={handleChangeSelected}
                          input={<Input id="name" required ref={register()}/>}
                      >
                          {selectField()}
                      </Select>
                  </ThemeProvider>
                  <FormHelperText style={{
                      margin:'0 auto',
                  }}>Select category</FormHelperText>
              </FormControl>
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
                type='file'
                multiple
            />
              <button onClick={addInput}>Add</button>
              <button type="submit" onClick={() => setErrorChange(selected.length === 0)}>Publish</button>
              {isAdmin &&
              <button type='button' onClick={()=>setOpen(true)}>Set Private</button>
              }
              <button type="submit" onClick={
                  ()=>{
                      setDraft('1');
                      setErrorChange(selected.length === 0);
                  }}>Save as draft</button>
          </form>
            <div className='errors'>
                {error}
            </div>
        </div>
      </div>
  )
};


