import axiosInstance from "../axios";

export const get_associations = async () =>{
    let data = await axiosInstance.get('/associations/').then(({data})=>data)
    return data;
}

export const get_association = async (slug) =>{
    let data = await axiosInstance.get(`/associations/${slug}/`).then(({data})=>data)
    return data;
}
