import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"

export const registerAPI = async (reqBody) =>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI = async (reqBody) =>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

export const addProjectAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("POST",`${SERVER_URL}/addproject`,reqBody,reqHeader)
}

export const getallProjectsAPI = async (searchKey,reqHeader) =>{
    return await commonAPI("GET",`${SERVER_URL}/allprojects?search=${searchKey}`,"",reqHeader)
}

export const getuserProjectsAPI = async (reqHeader) =>{
    return await commonAPI("GET",`${SERVER_URL}/userprojects`,"",reqHeader)
}

export const gethomeProjectsAPI = async () =>{
    return await commonAPI("GET",`${SERVER_URL}/homeprojects`,"")
}

export const editProjectsAPI = async (projectId,reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/editproject/${projectId}`,reqBody,reqHeader)
}

export const removeProjectAPI = async (projectId,reqHeader) =>{
    return await commonAPI("DELETE",`${SERVER_URL}/removeproject/${projectId}`,{},reqHeader)
}

export const editProfileAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/edituser/`,reqBody,reqHeader)
}