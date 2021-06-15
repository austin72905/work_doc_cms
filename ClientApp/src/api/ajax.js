import axios from 'axios'


function ajax(url,data={},method='GET'){
    if(method=='GET'){
        const params=data;
        return axios.get(url,{params:params})
    }
    
    //如果要用application/x-www-form-urlencoded
    // let postBody=new FormData()
    // Object.keys(data).forEach(val=>{
    //     postBody.append(val,data[val])
    // })
    // const config={
    //     headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    // }

    return axios.post(url,data)
}

export default ajax;