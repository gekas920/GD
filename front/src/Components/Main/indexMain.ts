import {AppState} from "../../Store/Types";

export const mapDispatchToProps = (dispatch)=> ({
    SetPoll:(payload)=>{
        dispatch({
            type:'SET_POLL',
            payload:payload
        })
    },
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});


export const mapStateToProps = (state : AppState) =>{
    return state
};

export interface Elem {
    description:string,
    count:number,
    id:number
}

export interface Picture {
    link:string,
    title:string
}

export const compareUnpopular = (a, b)=> {
    const A = parseInt(a.count);
    const B = parseInt(b.count);

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
};

export const comparePopular = (a, b)=> {
    const A = parseInt(a.count);
    const B = parseInt(b.count);

    let comparison = 0;
    if (A > B) {
        comparison = -1;
    } else if (A < B) {
        comparison = 1;
    }
    return comparison;
};

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );