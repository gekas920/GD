export interface Type {
    type:string
}

export const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});