import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {reqGetContent,reqAddContent,reqEditContent} from '../api/index'
import {SUCCESS_CODE} from '../api/respCode'

import TextInput from '../component/TextInput'
import TextArea from '../component/TextArea'

export default function EditModal(props) {
    const { page,sort,docMode,docDetail, modalref,setdocList,setLastEdit } = props
    const inintContent={id:"",sort:sort,title:"",question:"",answer:"",debug:"",isDelete:false}
    const [content,setContent]=useState(inintContent)

    useEffect(() => {
        setContent(content=>docDetail)
    }, [docDetail])

   
    function hdInput(name,val){
        setContent(content=>{return {...content,[name]:val}})
    }

    function initInput(){
        setContent(content=>{return inintContent})
    }

    
    async function addNewContent(){
        console.log(content)
        // const url="https://script.google.com/macros/s/AKfycbytORQVJoXP0Ei5WpdcbScYudiJfQ288Hhrm9FvQCVlxNui3smInueH7QaANNrHeMUF/exec"
        // const resp=await axios.post(url,{data:content,headers:{'Access-Control-Allow-Origin': '*'}})//{'Access-Control-Allow-Origin': '*'}
        // console.log(resp.data)

        // const url2="https://script.google.com/macros/s/AKfycbxnW5958Al9upoQIT1460iWM4fuEOtBfI3v-Bl3f5HMbeYZAb2p2Cl2ZSSsFbE3NPM/exec"
        // const resp2 =await axios.get(url2)
        // console.log(resp2.data)
        // setdocList(list=>resp2.data)

        //這邊可以成功
        const url = "https://localhost:44304/api/DocumentContent/AddContent"
        //const resp = await axios.post(url,data)//型別不對(要int傳string)會返回400， //預設json
        const resp = await reqAddContent({...content,page:page})
        if(resp.data.code!=SUCCESS_CODE){
            console.log(resp.data.msg)
        }
        //console.log(resp)
        //console.log(resp.data)

        //更新完請求一次頁面
        const params = { page: page, sort: sort }
        const respGet = await reqGetContent(params)
        if(respGet.data.code == SUCCESS_CODE){
            setdocList(list=>respGet.data.data)
        }
        

        //新增完請求新的資料

        // var url="https://script.google.com/macros/s/AKfycbxnW5958Al9upoQIT1460iWM4fuEOtBfI3v-Bl3f5HMbeYZAb2p2Cl2ZSSsFbE3NPM/exec"
        // const resp=await axios.get(url)
          
        // console.log("我去請求了")
        // //文檔傳回來的id 是數字，要轉string
        // setdocList(list=>resp.data)

    }

    async function EditContent(){
        console.log("content =",content)
        const url = "https://localhost:44304/api/DocumentContent/EditContent"
        let data=content
        //const resp = await axios.post(url,data)//型別不對(要int傳string)會返回400， //預設json
        const resp = await reqEditContent({...content,page:page})
        if(resp.data.code!=SUCCESS_CODE){
            console.log(resp.data.msg)
            console.log(resp.data.error)
        }
        //console.log(resp)
        //console.log(resp.data)

        //更新完請求一次頁面
        const params = { page: page, sort: sort }
        const respGet = await reqGetContent(params)
        if(respGet.data.code == SUCCESS_CODE){
            setdocList(list=>respGet.data.data)
        }
    }

    // console.log(content)
    // console.log("eqals?",content=={...inintContent})

    return (
        <div className="modal fade " tabIndex="-1" ref={modalref} >
            <div className="modal-dialog modal-lg  modalpos">{/*modal-dialog-centered*/}
                <div className="modal-content border-0">
                    <div className="modal-header bg-secondary bg-gradient text-white">
                        <h5 className="modal-title">新增文檔</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={initInput}></button>
                    </div>
                    <div className="modal-body">

                        <TextInput docMode={docMode} labelName="標題" value={content.title} name="title" hdInput={hdInput}/>
                        <TextArea docMode={docMode} labelName="問題" value={content.question} rows="3" name="question" hdInput={hdInput}/>
                        <TextArea docMode={docMode} labelName="答" value={content.answer} rows="3" name="answer" hdInput={hdInput}/>
                        <TextArea  labelName="排查" value={content.debug} rows="4" name="debug" hdInput={hdInput}/>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={initInput}>Close</button>
                        {!content.id?
                        <button type="button" className="btn btn-primary bg-gradient" data-bs-dismiss="modal" onClick={addNewContent}>Add</button>
                        :
                        <button type="button" className="btn btn-primary bg-gradient" data-bs-dismiss="modal" onClick={EditContent}>Update</button>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

