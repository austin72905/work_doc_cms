import React, { useState, useEffect, createRef, useRef,useCallback } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Modal } from 'bootstrap'
import axios from 'axios'
import {reqGetContent,reqDelContent} from '../api/index'

import SideNavBar from '../component/SideNavBar'
import SearchBar from '../component/SearchBar'
import DocContent from '../doc-content/DocContent'
import EditModal from '../edit-modal/EditModal'
import MsgModel from '../component/MsgModel'


export default function MainPage(props) {

    const { title, path, routes } = props



    //文檔內容
    function getDocContent() {
        return [
            {
                id:"1",
                title: "簽到無獎金",
                question: "星娱乐(czx) 反馈用户 15045338036 于5/19、5/20签到并且点击领取了但没有彩金，请协助确认用户是否都有点击签到、领取奖金按键，谢谢",
                answer: `这边查询该用户19, 20是没有领取记录的另外截图有打勾的日期就代表签到有成功`,
                debug: ""
            },
            {
                id:"2",
                title: "余额宝没有派息",
                question: `彩票站(cpz)lf6999会员余额宝没有派息，请协助查看`,
                answer: "數據有誤。已申請數據更新，稍待數據更新再通知。可以請站長人工充值一下該用戶派息。",
                debug: ""
            },
            {
                id:"3",
                title: "沒有紀錄",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"4",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"5",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"6",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"7",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"8",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"9",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"10",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"11",
                title: "未修改卻改變",
                question: "VIP彩票(vip)前台馀额没有变更，退出再重新登陆还是显示不一致会员：lc56598514",
                answer: "用戶應該是掛著頁面沒有刷新，剛剛查看服務請求有回覆正確的餘額 ，請用戶再刷新試試",
                debug: ""
            },
            {
                id:"12",
                title: "小精靈",
                question: "",
                answer: "",
                debug: "你知道台灣是番薯形狀嗎"
            },

        ]
    }


    const modalref = useRef()
    const delmodalref=useRef()

    const { pathname } = useLocation()

    
    /**
     * 其他區域變數管理
     * 
     * sideBarStyle  側邊導覽列樣式
     * initDetail    初始化文黨詳細內容的數據
     * navlist       第二層路由
     * navName       頁面左上角顯示的名稱
     * 
     */

    const sideBarStyle = {
        theme: "dark",
        size: "1",
        bgcolor: "#212529"
    }


    const sheetParams=pathname.split('/');

    const initDetail = { id:"",sort:pathname.split('/')[2],title: "", question: "", answer: "", debug: "",isDelete:false }

    const navlist = routes.map(route => {
        return {
            title: route.title,
            path: `${path}${route.path}`
        }
    })

    const navName = navlist.find(i => i.path === pathname) ? navlist.find(i => i.path === pathname).title : ""

    /**
     * 狀態管理
     * 
     * docDetail   文檔詳細內容
     * docList     文檔列表
     * filter      搜尋字串
     * docMode     文檔模式 (一般文檔 or 小精靈)
     * sort        分類(二級路由)
     */
    const [docDetail, setdocDetail] = useState(initDetail);

    //之後改成在useEffect 時獲取
    //放在DocContent 裡面才能觸發
    const [docList, setdocList] = useState([initDetail]);

    const [filter, setfilter] = useState("");

    const [docMode, setDocMode] = useState("文檔");
   
    const [sort,setSort]=useState(sheetParams[2]);
    //console.log("docDetail=",docDetail)






    //明日目標

    //後端documenturl 放到setting.json?
    //google sheet 新增try catch?
    //google sheet 新發布一版

    //後端判斷resp.code 
    //圖片功能(之後再做也不影響) 


    //點某文章 (會抓到當前點選的內容)=> 傳上去修改上層的state => 上層的state改變=>傳到 editModal (會把上層的state 放一分到自己的state)=> 顯示是顯示自己的state
    //新增文章 => 因為editModal 的state 實際上是依賴上層的state，所以新增文章時，會先把上層的state 初始化
    //修改文章 => 把修改的內容用 editModal 的state 管理，沒毛病





    //用context 或許不錯
    let modal = null
    const tempnavlist = [
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

    //監控目前的pathname
    useEffect(() => {
        setSort(sort=>sheetParams[2])
    }, [pathname])
    



    /**
     * 函數管理區
     * 
     * 
     */
    //const handleShowdetail =useCallback(()=> setdocDetail(docDetail => detailContent),[docDetail])
    function showDocDetail(e, detailContent) {
        //console.log("detailContent",detailContent)
        
        setdocDetail(docDetail => detailContent)
        //handleShowdetail()
        //刪除
        if (e.target.nodeName == "A") {
            e.preventDefault()
            new Modal(delmodalref.current, {
                backdrop: 'static'
            }).show()

            return
        }

        //新增文檔
        new Modal(modalref.current, {
            backdrop: 'static'
        }).show()
    }


    


    function openNewModal() {
        //顯示在modal的標題
        const titleVal = docMode == "小精靈" ? "小精靈" : ""
        setdocDetail(docDetail => { return { ...initDetail, title: titleVal } })
        new Modal(modalref.current, {
            backdrop: 'static'
        }).show()
    }

    
    function search(searchKey, docOption) {
        //應該是做成過濾比較好
        setfilter(filter => searchKey)
        setDocMode(docMode => docOption)
    }

    async function deleteDoc() {
        
        //這邊可以成功
        const url = "https://localhost:44304/api/DocumentContent/DelContent"
        let data={...docDetail,isDelete:true,page:sheetParams[1]}
        console.log("del data=",data)
        console.log("delete success")
        //const resp = await axios.post(url,data)//型別不對(要int傳string)會返回400， //預設json
        const resp = await reqDelContent(data)
        console.log(resp)
        console.log(resp.data)
        
        //更新完請求一次頁面
        const params = { page: sheetParams[1], sort: sort }
        const resp2 = await reqGetContent(params)
        setdocList(list=>resp2.data.data)
    }





    /** 
     * 傳入下層的 props 管理
     * 
     *
     */

    const sideNavBarProps = {
        style: sideBarStyle,
        navlist: navlist
        //style={sideBarStyle} navlist={navlist}
    }


    const searchBarProps = {
        docMode: docMode,
        title: title,
        navName: navName,
        search: search,
        openNewModal: openNewModal,

        //docMode={docMode} search={search} openNewModal={openNewModal} title={title} navName={navlist.find(i => i.path === pathname) ? navlist.find(i => i.path === pathname).title : ""}
    }

    const editModalProps = {
        page:sheetParams[1],
        sort:sort,
        docMode: docMode,
        docDetail: docDetail,
        modalref: modalref,
        setdocList:setdocList,
        //docMode={docMode} docDetail={docDetail} modalref={modalref}
    }

    const DocContentProps = {
        page:sheetParams[1],
        sort:sheetParams[2],
        docMode: docMode,
        filter: filter,
        docList: docList,
        setdocList:setdocList,
        showDocDetail: showDocDetail,
        deleteDoc: deleteDoc
        //docMode={docMode} filter={filter} docList={docList} getDocContent={getDocContent} showDocDetail={showDocDetail}
    }

    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: "100vh" }}>
                <SideNavBar {...sideNavBarProps} />
                <div className="col-lg-11 outer">
                    <SearchBar {...searchBarProps} />

                    <Switch>
                        {navlist.map(nav => <Route path={nav.path} render={props => <DocContent {...DocContentProps} />} />)}
                        <Redirect to={`${path}${routes[0].path}`} />
                    </Switch>

                    <EditModal {...editModalProps} />
                    <MsgModel delmodalref={delmodalref} deleteDoc={deleteDoc}/>

                </div>
            </div>
        </div>
    )
}
