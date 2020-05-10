import React from "react"
import {Link} from "react-router-dom"
import './NavigationBar.sass'

class NavBar extends React.Component
{

    handleClick = event=>{
        let arr = document.querySelectorAll<HTMLElement>('.navbar--elem');
        let elem = event.target;
        arr.forEach((elem:HTMLElement)=>{
            elem.style.backgroundColor = '';
            elem.style.borderBottom = '0'
        });
        elem.style.backgroundColor = 'whitesmoke';
        elem.style.borderBottom = '2px #ff48b1 solid'
    };

    render() {
        return(
            <div style={window.location.pathname === '/' ? {display:'none'} : {}}>
                <header>
                    <div className='navbar'>
                        <ul>
                            <li><Link to='/main/polls' className='navbar--elem'
                                      onClick={this.handleClick}>Main</Link></li>
                            <li><Link to='/main/my' className='navbar--elem'
                                      onClick={this.handleClick}>My Tasks</Link></li>
                            <li><Link to='/main/profile' className='navbar--elem'
                                      onClick={this.handleClick}>Profile</Link></li>
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}

export default NavBar