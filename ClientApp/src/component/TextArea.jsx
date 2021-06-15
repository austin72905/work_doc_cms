import React from 'react'

export default function TextArea(props) {

    const {docMode,labelName,value,rows,name,hdInput}=props

    function handleInput(name,e){
        const val=e.target.value
        //console.log("e =",e.target.value)
        hdInput(name,val)
    }
    //沒傳或是傳文檔的時候
    const isDisabled=!docMode ||docMode=="文檔"?false:true

    return (
        <div className="form-group my-4">
            <div className="row">
                <div className="col-lg-1">
                    <label>{labelName}</label>
                </div>
                <div className="col-lg-10">
                    <textarea className="form-control" disabled={isDisabled} name="" id="question-content" cols="20" rows={rows} value={value} onChange={e=>{handleInput(name,e)}}></textarea>
                </div>
            </div>
        </div>
    )
}
