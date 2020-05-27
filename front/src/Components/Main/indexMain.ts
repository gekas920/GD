import {Main as MainComponent} from "./Main";
import {connect} from "react-redux";


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
    },
    SetClicked:(payload)=>{
        dispatch({
            type:'SET_CLICK',
            payload:payload
        })
    }
});

export const mapStateToProps = (state) =>{
    return{
        admin:state.setAdmin.admin
    }
};

export interface MainProps {
    url?:string
    admin:boolean,
    ShowSnack:()=>void,
    SetClicked:(clicked:string)=>void,
    SetPoll:(clicked:string)=>void,
}



const Main = connect(mapStateToProps,mapDispatchToProps)(MainComponent);

export {
    Main
}


export interface Elem {
    description:string,
    count:number,
    id:number
}

export interface User {
    initials:string,
    id:string
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

export const filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );
