import axiosInstance from "../axios";

// export const get_associations = async () =>{
//     let data = await axiosInstance.get('/associations/').then(({data})=>data)
//     return data;
// }

export const get_activity = async (slug) =>{
    let data = await axiosInstance.get(`/activities/${slug}/`).then(({data})=>data)
    return data;
}


export const beVolunteer = async (slug) =>{
    const data = axiosInstance.patch(`activities/${slug}/volunteer/`,{
                    header:{
                        access_token : localStorage.getItem('access_token'),
                    },
                }).then(({data})=>data)
    return data;
}