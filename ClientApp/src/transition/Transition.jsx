import React,{useState,useRef} from 'react'
import {Switch,Route,Redirect,useLocation} from 'react-router-dom'
import { Modal } from 'bootstrap'
import SideNavBar from '../component/SideNavBar'
import SearchBar from '../component/SearchBar'
import DocContent from '../doc-content/DocContent'
import EditModal from '../edit-modal/EditModal'

export default function Transition(props) {
    const sideBarStyle={
        theme:"dark",
        size:"1",
        bgcolor:"#212529"
    }

    const {title,path}=props
    const initDetail={title:"",question:"",answer:""}
    const [docDetail, setdocDetail] = useState(initDetail);
    const modalref = useRef()

    const navlist=[
        {
            title:"數字貨幣",
            path:`${path}/digital`
        },
        {
            title:"DG錢包",
            path:`${path}/dgwallet`
        }
        ,
        {
            title:"流水",
            path:`${path}/redenvlope`
        }
        
    ]
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

    function getDocContent(){
        return [
            {
                title: "查詢操作人帳號",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試"
            },
            {
                title: "查看操作紀錄",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試"
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

    const {pathname}=useLocation()
    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: "100vh" }}>

                <SideNavBar style={sideBarStyle} navlist={navlist}/>
                <div className="col-lg-11 outer">
                    <SearchBar addNewContent={addNewContent} title={title} navName={navlist.find(i=>i.path===pathname)?navlist.find(i=>i.path===pathname).title:""}/>
                    <Switch>
                        {navlist.map(nav=><Route path={nav.path} render={props=><DocContent getDocContent={getDocContent} showDocDetail={showDocDetail} />}/>)}
                        <Redirect to={`${path}/digital`} />
                    </Switch>

                    <EditModal docDetail={docDetail} modalref={modalref}/>

                </div>
            </div>
        </div>
    )
}
