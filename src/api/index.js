import { ApiCall } from "../services/ApiCall"
import { quotationapi } from "../services/BaseUrls"

export const fetchQuatation = async(page,limit)=> {
    const response = await ApiCall("GET",quotationapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}