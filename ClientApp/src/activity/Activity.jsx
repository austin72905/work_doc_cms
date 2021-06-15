import React, { useState, useEffect, createRef, useRef } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Modal } from 'bootstrap'
import SideNavBar from '../component/SideNavBar'
import SearchBar from '../component/SearchBar'
import DocContent from '../doc-content/DocContent'
import EditModal from '../edit-modal/EditModal'

export default function Activity(props) {
    const sideBarStyle = {
        theme: "dark",
        size: "1",
        bgcolor: "#212529"
    }

    const { title, path } = props
    const initDetail={title:"",question:"",answer:""}
    const [docDetail, setdocDetail] = useState(initDetail);
    const modalref = useRef()
    //用context 或許不錯
    let modal = null
    const navlist = [
        {
            title: "餘額寶",
            path: `${path}/bonus`
        },
        {
            title: "簽到",
            path: `${path}/signdaily`
        }
        ,
        {
            title: "紅包",
            path: `${path}/redenvlope`
        }

    ]

    useEffect(() => {
        //modal = new Modal(modalref.current)
    }, [])



    
    const { pathname } = useLocation()


    //文檔內容
    function getDocContent() {
        return [
            {
                title: "簽到無獎金",
                question: "星娱乐(czx) 反馈用户 15045338036 于5/19、5/20签到并且点击领取了但没有彩金，请协助确认用户是否都有点击签到、领取奖金按键，谢谢",
                answer: `这边查询该用户19, 20是没有领取记录的
                另外截图有打勾的日期就代表签到有成功
                `
            },
            {
                title: "余额宝没有派息",
                question: `彩票站(cpz)lf6999会员余额宝没有派息，请协助查看`,
                answer: "數據有誤。已申請數據更新，稍待數據更新再通知。可以請站長人工充值一下該用戶派息。"
            },
            {
                title: "沒有紀錄",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試"
            },
            {
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試"
            },

        ]
    }

    function showDocDetail(detailContent) {
        setdocDetail(docDetail => detailContent)
        new Modal(modalref.current, {
            backdrop: 'static'
        }).show()
    }

    function addNewContent() {
        setdocDetail(docDetail => initDetail)
        new Modal(modalref.current, {
            backdrop: 'static'
        }).show()
    }

    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: "100vh" }}>

                <SideNavBar style={sideBarStyle} navlist={navlist} />

                <div className="col-lg-11 outer">
                    <SearchBar addNewContent={addNewContent} title={title} navName={navlist.find(i => i.path === pathname) ? navlist.find(i => i.path === pathname).title : ""} />
                    <Switch>
                        {navlist.map(nav => <Route path={nav.path} render={props => <DocContent getDocContent={getDocContent} showDocDetail={showDocDetail} />} />)}
                        <Redirect to={`${path}/bonus`} />
                    </Switch>

                    <EditModal docDetail={docDetail} modalref={modalref}/>
                    
                    
                </div>
            </div>
        </div>
    )
}
