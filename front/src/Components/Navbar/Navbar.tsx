import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import './NavigationBar.sass'
import Requests from "../../Requests";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../Form/indexForm";

const NavBar = (props)=> {
    const handleClick = event=>{
        let arr = document.querySelectorAll<HTMLElement>('.navbar--elem');
        let elem = event.target;
        arr.forEach((elem:HTMLElement)=>{
            elem.style.backgroundColor = '';
            elem.style.borderBottom = '0'
        });
        elem.style.backgroundColor = 'whitesmoke';
        elem.style.borderBottom = '2px #ff48b1 solid'
    };

    useEffect(()=>{
       Requests.get('/admin').then(response=>{
           if(response.data){
               props.SetAdmin();
           }
       })
    },[]);

    return(
        <div>
            <header>
                <div className='navbar'>
                    <ul>
                        <li><Link to='/main/polls' className='navbar--elem'
                                  onClick={handleClick}>Main</Link></li>
                        <li><Link to='/main/my' className='navbar--elem'
                                  onClick={handleClick}>My Polls</Link></li>
                        <li><Link to='/main/profile' className='navbar--elem'
                                  onClick={handleClick}>Profile</Link></li>
                    </ul>
                </div>
            </header>
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)