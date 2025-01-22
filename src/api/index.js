import { ApiCall } from "../services/ApiCall"
import { jobapi, quotationapi, truckapi, usersapi, vehicleTypeapi } from "../services/BaseUrls"

export const fetchQuatation = async(page,limit)=> {
    const response = await ApiCall("GET",quotationapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchjob = async(page,limit)=> {
    const response = await ApiCall("GET",jobapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchvehicle = async(page,limit)=> {
    const response = await ApiCall("GET",vehicleTypeapi,null,{page,limit});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchDriver = async(page,limit)=> {
    const response = await ApiCall("GET",usersapi,null,{page,limit,role:"driver"});
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchTrucks = async(params)=> {
    const response = await ApiCall("GET",truckapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
