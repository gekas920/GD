
export const mapStateToProps = (state) => state.snackReducer;
export const mapDispatchToProps = (dispatch)=> ({
    HideSnack:()=>{
        dispatch({
            type:'HIDE_SNACK',
        })
    }
});