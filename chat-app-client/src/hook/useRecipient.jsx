import { useEffect, useState } from "react"
import { baseUrl, getReq } from "../utility/untility";

export const useRecipient=(chat,user)=>{
    const [recipient,setRecipient]=useState(null);
    const recipientId=chat?.members.find((id)=>id!=user._id)
    useEffect(()=>{
        const getRecipient=async ()=>{
            if(!recipientId) return null;
            const response=await getReq(`${baseUrl}/user/get/${recipientId}`);
            if(!response.error){
                setRecipient(response);
            }
        }
        getRecipient()
    },[recipientId])
    return [recipient]
}