import { React, Fragment, useState } from 'react'

export default function SearchBar(props) {

    const {docMode,title,navName,openNewModal,search}=props

    const [searchKey,setSearchKey]=useState("")

    const [docOption,setDocOption] =useState(docMode)

    function hdInput(e){
        var val=e.target.value
        setSearchKey(searchKey=>val);
    }

    function hdOption(e){
        const val =e.target.value
        setDocOption(docOption=>val)
    }

    return (
        <Fragment>
            <h5 className="mx-2 my-3" style={{ fontWeight: "bold" }}>{title}</h5>
            <h6 className="mx-2 my-3">{navName}</h6>
            <div className="my-4 d-md-flex justify-content-lg-between">
                <div className="input-group " style={{ width: "600px" }}>
                    <input type="text" className="form-control " onChange={hdInput}/>
                    <div className="mx-2">
                        <select className="form-select" name="" id="" value={docOption} onChange={hdOption}>
                            <option value="文檔" >文檔</option>
                            <option value="小精靈" >小精靈</option>
                        </select>
                    </div>
                    <button className="btn btn-outline-primary mx-2 searchbtn" onClick={()=>search(searchKey,docOption)}>搜尋</button>


                </div>

                <button className="btn btn-sm btn-success addbtn mx-5" onClick={openNewModal}>+新增</button>
            </div>
        </Fragment>
    )
}
