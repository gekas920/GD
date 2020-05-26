export const mapDispatchToProps = (dispatch)=> ({
    SetID:(payload)=>{
        dispatch({
            type:'SET_ID',
            payload:payload
        })
    },
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});