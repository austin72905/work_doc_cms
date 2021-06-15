import React from 'react'

export default function MsgModel(props) {

    const {delmodalref,deleteDoc}=props
    return (
        <div className="modal fade " tabIndex="-1" ref={delmodalref} >
            <div className="modal-dialog modal-md  modalpos">{/*modal-dialog-centered*/}
                <div className="modal-content border-0">
                    <div className="modal-header bg-secondary bg-gradient text-white">
                        <h5 className="modal-title">訊息提示</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-text">確定是否刪除?</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
                        <button type="button" className="btn btn-primary bg-gradient" data-bs-dismiss="modal" onClick={deleteDoc}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
