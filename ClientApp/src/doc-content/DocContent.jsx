import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {reqGetContent} from '../api/index'
import {SUCCESS_CODE} from '../api/respCode'

function DocContent(props) {



    const { page,sort, docMode, filter ,docList, setdocList, showDocDetail, deleteDoc } = props
    const [searchKey, setSearchKey] = useState(filter);

    const [docModeVal, setDocModeVal] = useState(docMode)
 
    const tempData = [
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


    useEffect(async () => {
        //還不是最新版
        //var url = "https://script.google.com/macros/s/AKfycbxnW5958Al9upoQIT1460iWM4fuEOtBfI3v-Bl3f5HMbeYZAb2p2Cl2ZSSsFbE3NPM/exec"
        //querystring
        const params = { page: page, sort: sort }
        //const resp = await axios.get(url, { params: params })
        
        const resp = await reqGetContent(params)
        console.log("我去請求了", params)
        const result =resp.data //promise
        //文檔傳回來的id 是數字，要轉string
        if(result.code==SUCCESS_CODE){
            setdocList(list => result.data)
        }
        


    }, [])

    useEffect(() => {
        setSearchKey(searchKey => filter)
    }, [filter])

    useEffect(() => {
        setDocModeVal(docModeVal => docMode)

    }, [docMode])



    function switchMode(contentTitle, mode) {
        if (mode == "小精靈") {
            return contentTitle == "小精靈"
        }

        return contentTitle !== "小精靈"
    }


    //const datalist=getDocContent()
    //篩選出 符合 搜尋字searchKey、title 符合當前模式的、sort 符合的
    return (
        <div>
            <h5 className="mx-2 my-3" style={{ color: "#6c757d", fontWeight: "bold" }}>{docModeVal == "文檔" ? "文檔紀錄" : "小精靈"}</h5>
            <hr />
            {/*console.log("docList=", docList)*/}
            {docList.map(content => (

                Object.values(content).find(c => c.toString().indexOf(searchKey) != -1) && switchMode(content.title, docModeVal)&&content.sort===sort ?
                    <div className="card my-2 cardbackground " onClick={(e) => { showDocDetail(e, { id: content.id, sort: content.sort, title: content.title, question: content.question, answer: content.answer, debug: content.debug }) }}>
                        <div className="card-header">
                            <h5 style={{ color: "#6c757d", fontWeight: "bold" }}>{content.title}</h5>
                        </div>

                        <div className="row">
                            <div className="col-lg-10">
                                <div className="card-body">

                                    <p className="card-text">Q: {content.question}</p>
                                    <p className="card-text">A: {content.answer}</p>
                                    <p className="card-text">D: {content.debug}</p>
                                </div>
                            </div>

                            <div className="col-2 d-md-flex justify-content-lg-end">
                                <a className="mx-2" href="#" onClick={showDocDetail, null}>刪除</a>
                            </div>

                        </div>

                    </div>
                    : null
            ))}



        </div>

    )
}

function compareProps(prevProps, nextProps) {
    //console.log("prevProps",prevProps.docList.toString())
    //console.log("nextProps",nextProps.docList.toString())
    //arePropsEqual 返回 true 时，不会触发 render，如果返回 false，则会
    //console.log("nextProps.docList.toString()==prevProps.docList.toString()",nextProps.docList.toString()==prevProps.docList.toString())

    if (nextProps.docMode !== prevProps.docMode) {
        return false
    }

    if (nextProps.filter !== prevProps.filter) {
        return false
    }

    if (nextProps.sort !== prevProps.sort) {
        return false
        
    }

    //比較是否新增或刪除
    if(nextProps.docList.length!==prevProps.docList.length){
        return false;
    }

    //比較是否有改變值
    for(let i=0;i<nextProps.docList.length;i++){
        if(Object.values(nextProps.docList[i])!==Object.values(prevProps.docList[i])){
            return false;
        }
    }
    
    return nextProps.docList.toString() == prevProps.docList.toString()
}

export default React.memo(DocContent, compareProps) //避免父組件渲染，子組件每次都跟著渲染

