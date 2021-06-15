import ajax from './ajax'

export const reqGetContent=(data)=>ajax(`${process.env.REACT_APP_URL}/api/DocumentContent/GetContent`,data)

export const reqAddContent=(data)=>ajax(`${process.env.REACT_APP_URL}/api/DocumentContent/AddContent`,data,'POST')

export const reqEditContent=(data)=>ajax(`${process.env.REACT_APP_URL}/api/DocumentContent/EditContent`,data,'POST')

export const reqDelContent=(data)=>ajax(`${process.env.REACT_APP_URL}/api/DocumentContent/DelContent`,data,'POST')