export const baseUrl="https://chat-backend-8qk1.onrender.com";

export const postReq=async (url,body)=>{
    const res=await fetch(url,{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            "Content-type":"application/json"
        }
    })
    const data=await res.json();
    if(!res.ok){
        let message
        if(data?.message){
            message=data.message;
        }else{
            message=data;
        }
        return {error:true,message}
    }
    return data;
}
export const getReq=async (url)=>{
    const res=await fetch(url)
    const data=await res.json();
    if(!res.ok){
        let message
        if(data?.message){
            message=data.message;
        }else{
            message=data;
        }
        return {error:true,message}
    }
    return data;
}