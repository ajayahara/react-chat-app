export const baseUrl="http://localhost:5050";

export const postReq=async (url,body)=>{
    console.log(body)
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