import React,{useState,useRef} from 'react'
import {Switch,Route,Redirect,useLocation} from 'react-router-dom'
import { Modal } from 'bootstrap'
import SideNavBar from '../component/SideNavBar'
import SearchBar from '../component/SearchBar'
import DocContent from '../doc-content/DocContent'
import EditModal from '../edit-modal/EditModal'

export default function Management(props) {
    
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
            title:"分組",
            path:`${path}/grouping`
        },
        {
            title:"管理日誌",
            path:`${path}/managelog`
        }
        ,
        {
            title:"盈利榜",
            path:`${path}/redenvlope`
        }
        ,
        {
            title:"計畫",
            path:`${path}/plan`
        }
        ,
        {
            title:"公告",
            path:`${path}/announcement`
        }
        
    ]

    function getDocContent(){
        return [
            {
                title: "允許測試帳號卻無上榜",
                question: "宝马彩票(bmw)反馈盈利榜单设置本站，并允许测试帐号上榜，下列这边帮您查看下，请稍等哦个帐号都已达到可以上榜的数据，但是都无显示，请协助确认wangy0610， 21winner ，   shanshan9978 ，  xiaoxiao5222",
                answer: "沒上榜是因為這四個測試帳號都是用其它優惠增加盈利的，已經超過太多比例，所以盈利榜無法上榜，建議站長用投注的方式上榜"
            },
            {
                title: "分組成員無顯示",
                question: "创盈(cying) czb150866账号在V1 未分组，后台支付管理内银行转帐通道都有开放，前台无显示，请协助看下",
                answer: `這邊查看用戶都是使用PC端訪問，站長只有開MB端
                还有假如给的视频没有问题的话  让站长看下域名解析是否有问题  才导致我们这里判断是pc端的访问，上面logo沒顯示
                域名應該有問題喔
                `
            },
            {
                title: "查看修改時間",
                question: "宝马彩票(bmw)反馈盈利榜之前是设置的本站榜单(允许测试帐号上榜)，今日看已变为平台榜单，关键字60日内无查询到记录，请协助看下之前的变更时间",
                answer: "bmw88 已修改本站榜單，時間 2021-05-19 10:52:18"
            },
            {
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試"
            },
    
        ]
    }
    const {pathname}=useLocation()
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
        <div className="container-fluid" >
            <div className="row" style={{ minHeight: "100vh" }}>

                <SideNavBar style={sideBarStyle} navlist={navlist}/>
                <div className="col-lg-11 outer" style={{backgroundColor:"#e8e9eb"}}>
                    <SearchBar addNewContent={addNewContent} title={title} navName={navlist.find(i=>i.path===pathname)?navlist.find(i=>i.path===pathname).title:""}/>
                    <Switch>
                        {navlist.map(nav=><Route path={nav.path} render={props=><DocContent getDocContent={getDocContent} showDocDetail={showDocDetail} />}/>)}
                        <Redirect to={`${path}/grouping`} />
                    </Switch>

                    <EditModal docDetail={docDetail} modalref={modalref}/>

                </div>
            </div>
        </div>
    )
}
