import React from 'react'

export default function TextInput(props) {

    const {docMode,labelName,value,name,hdInput}=props

    function handleInput(name,e){
        const val=e.target.value
        //console.log("e =",e.target.value)
        hdInput(name,val)
    }


    return (
        <div className="form-group my-4">
            <div className="row">
                <div className="col-lg-1">
                    <label>{labelName}</label>
                </div>
                <div className="col-lg-10">
                    <input className="form-control" disabled={docMode=="小精靈"?true:false} type="text" value={value} onChange={e=>{handleInput(name,e)}} />
                </div>
            </div>
        </div>
    )
}
