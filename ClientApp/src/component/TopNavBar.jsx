import React from 'react'
import {NavLink} from 'react-router-dom'

export default function TopNavBar(props) {

    //給樣式預設值
    function setDefaultStyle(...params){
        params=params.map(i=>{
            if(!i){
                i=""
            }
            return i
        })
        return params
    }
    //主題 light、dark
    //顏色可自訂 bg-{顏色}
    //標題可自訂
    //靠左還靠右
    //navbar 顯示文字可自訂
    const {style,navlist}=props

    const {theme,bgcolor,title,size,justifyContnet}=style
    const [Theme,Bgcolor,Title,Size,JustifyContnet]=setDefaultStyle(theme,bgcolor,title,size,justifyContnet)
   
    const className=`navbar navbar-${Theme} bg-${Bgcolor}  navbar-expand-${Size}`
    const navClassName=`nav navbar-nav  ${JustifyContnet}`

    

    return (
        <nav className={className}>
            <div className="container-fluid ">
                <div className="navbar-brand ">{Title}</div>

                <ul className={navClassName}>
                    {navlist.map(nav=>(
                        <li className="nav-item mx-2">
                        <NavLink className="nav-link" to={nav.path} activeClassName="active">{nav.title}</NavLink>
                        </li>
                    ))}
                </ul>

            </div>

        </nav>
    )
}
