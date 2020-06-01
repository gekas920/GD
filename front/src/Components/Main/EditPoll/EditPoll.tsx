import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import ReplayIcon from '@material-ui/icons/Replay'
import {filter} from "../indexMain";
import Tooltip from "@material-ui/core/Tooltip";
import {PropsEditPoll} from "./indexEditPoll";
import {getData} from "./EditPollRequests";
import {GetCategories} from "../AddPoll/AddPollRequests";
import {Type} from "../Report/indexReport";
import MenuItem from "@material-ui/core/MenuItem";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import {FormHelperText, Input} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {green, orange} from "@material-ui/core/colors";
const theme = createMuiTheme({
    palette: {
        primary:orange,
        secondary: green,
    }
});
export const EditPoll:React.FC<PropsEditPoll> = (props) =>{
    const { handleSubmit, register} = useForm();
    const [list, setList] = useState([{ option: "" }]);
    const [disabled,setDisabled] = useState(false);
    const [error,setError]= useState('');
    const [title,setTitle] = useState('');
    const [types,setTypes] = useState([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [errorChange,setErrorChange]= useState(false);
    const [check,setCheckSelect] = useState('');


    const handleChangeSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelected(event.target.value as string[]);
    };
    const selectField = ()=>{
        if(types)
            return types.map((elem:Type,index:number)=>{
                return <MenuItem value={elem.type} key={index}>{elem.type}</MenuItem>
            })
    };
    const onSubmit = (values) => {
        if(!errorChange){
            let files = values.file;
            const formData = new FormData();
            for(let i = 0;i<files.length;i++){
                formData.append(files[i].name,files[i])
            }
            formData.append('draft','');
            formData.append('types',JSON.stringify(selected));

            let filtered = filter(values,elem=>!!elem);
            for (let key in filtered){
                formData.append(key,filtered[key])
            }
            props.EditPollReq(`/poll/update/${props.id}`,formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    };

    const addInput = () => {
        list.push({ option: "" });
        setList([...list]);
    };

    useEffect(()=>{
        getData(`/poll/${props.id}`)
            .then(result=>{
                setTitle(result.title);
                setList(result.fields);
            });
        GetCategories('/categories')
            .then(result=>{
                setTypes(result)
            });
    },[]);

    useEffect(()=>{
        if(props.exist){
            setError('Already exist');
            setTimeout(()=>{
                props.HideEx();
                setError('')
            },2000);
        }
    },[props.exist]);



    return(
        <div className='companies-info-box'>
            <Tooltip title="Back" aria-label="back">
                <button
                    onClick={()=>props.SetClicked(false)}
                    className='back-edit-button'>
                    <ReplayIcon/>
                </button>
            </Tooltip>
            <div className='main-form'>
                <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                    <input
                        placeholder={'Enter title'}
                        name='title'
                        defaultValue={title}
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
                                placeholder={'Enter variant'}
                                key={i}
                                name={i.toString()}
                                defaultValue={n.option}
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
                </form>
                <div className='errors'>
                    {error}
                </div>
            </div>
        </div>
    )
};


