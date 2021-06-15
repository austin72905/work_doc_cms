import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import TopNavBar from './component/TopNavBar'
import SideNavBar from './component/SideNavBar'
import Management from './management/Management'
import User from './user/User'
import Transition from './transition/Transition'
import Activity from './activity/Activity'
import DgGame from './dg-game/DgGame'
import MainPage from './main-page/MainPage'
import DocContent from './doc-content/DocContent'
import './App.scss'

export default function App() {

    //navbar style
    const navStyle={
        theme:"dark",
        bgcolor:"dark",
        title:"值班問題文檔",
        size:"lg",
        justifyContnet:"me-auto"
        
    }
    //路由管理
    const navlist=[
        {
            path:"/management",
            routes:[
                {
                    title:"分組",
                    path:"/grouping"
                },
                {
                    title:"管理日誌",
                    path:"/managelog"
                },
                {
                    title:"盈利榜",
                    path:"/rank"
                },
                {
                    title:"計畫",
                    path:"/plan"
                },
                {
                    title:"公告",
                    path:"/announcement"
                }

            ],
            title:"系統管理",
            component:<Management title="系統管理" path="/management"/>,
        }
        ,
        {
            path:"/user",
            routes:[
                {
                    title:"密碼安全",
                    path:"/password"
                },
                {
                    title:"登入",
                    path:"/login"
                },
                {
                    title:"密聊",
                    path:"/meeline"
                },
                {
                    title:"聊天室",
                    path:"/chatroom"
                }
            ],
            title:"會員管理",
            component:<User title="會員管理" path="/user"/>,
        }
        ,
        {
            path:"/transition",
            routes:[
                {
                    title:"數字貨幣",
                    path:"/digital"
                },
                {
                    title:"DG錢包",
                    path:"/dgwallet"
                }
                ,
                {
                    title:"流水",
                    path:"/water"
                }
            ],
            title:"交易管理",
            component:<Transition title="交易管理" path="/transition"/>,
        }
        ,
        {
            path:"/activity",
            routes:[
                {
                    title: "餘額寶",
                    path: "/bonus"
                },
                {
                    title: "簽到",
                    path: "/signdaily"
                },
                {
                    title: "紅包",
                    path: "/redenvlope"
                }

            ],
            title:"活動管理",
            component:<Activity title="活動管理" path="/activity"/>,
        }
        ,
        {
            path:"/dg-game",
            routes:[
                {
                    title:"十三水",
                    path:"/ssz"
                },
                {
                    title:"鬥地主",
                    path:"/gdz"
                },
                {
                    title:"百人牛牛",
                    path:"/cow"
                },
                {
                    title:"大發捕魚",
                    path:"/fish"
                },
                {
                    title:"補金蟬",
                    path:"/goldfrog"
                },
                {
                    title:"紅黑大戰",
                    path:"/redblack"
                }
            ],
            title:"遊戲玩法",
            component:<DgGame title="遊戲玩法" path="/dg-game"/>,
        }
    ]

    return (
        <div >
            <div className="outer row">
                <TopNavBar style={navStyle} navlist={navlist}/>

                <Switch>
                    {navlist.map(nav=><Route path={nav.path} render={props=><MainPage title={nav.title} path={nav.path} routes={nav.routes}/>}/> )}
                    <Redirect to="/management"/>
                </Switch>
                
            </div>

        </div>
    )
}
