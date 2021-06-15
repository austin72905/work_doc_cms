import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNavBar(props) {

    //給樣式預設值
    function setDefaultStyle(...params) {
        params = params.map(i => {
            if (!i) {
                i = ""
            }
            return i
        })

        return params
    }
    const { style, navlist } = props

    //console.log("inpath", navlist[0].path)
    const { theme, size, bgcolor } = style
    const [Theme, Size, Bgcolor] = setDefaultStyle(theme, size, bgcolor)
    const barSize = `col-lg-${Size}`
    const className = `navbar navbar-${Theme}`

    // const [navbarlist, setnavbarlist] = useState(null);

    // useEffect(() => {
        
    //     setnavbarlist(navbarlist => navlist)
    //     console.log("給navbarlist 復職了")
    //     return () => {
    //         setnavbarlist(navbarlist => navlist)
    //     }
    // }, [navbarlist])


    //console.log("inaaa", navlist)
    //console.log("inbbb", navbarlist)

    return (
        <div className={barSize} style={{ backgroundColor: `${Bgcolor}` }}>
            
            <nav className={className} >
                <ul className="nav navbar-nav">
                    {navlist.map(nav => (
                        <li className="nav-item mx-2">
                            <NavLink className="nav-link" to={nav.path} activeClassName="active">{nav.title}</NavLink>
                            
                        </li>
                    ))}

                </ul>
            </nav>
        </div>
    )
}
