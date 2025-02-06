import { ApiCall } from "../services/ApiCall"
import { financeapi, jobapi, quotationapi, truckapi, usersapi, vehicleTypeapi } from "../services/BaseUrls"

export const fetchQuatation = async(params)=> {
    const response = await ApiCall("GET",quotationapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchjob = async(params)=> {
    const response = await ApiCall("GET",jobapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchvehicle = async(params)=> {
    const response = await ApiCall("GET",vehicleTypeapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
export const fetchDriver = async(params)=> {
    params.role = "driver"
    const response = await ApiCall("GET",usersapi,null,params);
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
export const fetchFinance = async(params)=> {
    const response = await ApiCall("GET",financeapi,null,params);
    if(response?.status){
        return response.message
         }
        else {
        return []
         }
}
