import axios from 'axios';

export default {
    user:{
        login:credentials => axios.post('/api/auth',{credentials}).then(res=> res.data.user),
        signup: user =>
            axios.post("/api/users", { user }).then(res => res.data.user),
        confirm: token =>
            axios.post("/api/auth/confirmation",{token}).then(res => res.data.user),
        resetPasswordRequest : email =>
            axios.post("/api/auth/reset_password_request",{email}),
        validateToken : token =>
            axios.post("/api/auth/validate_token",{token}),
        resetPassword : data =>
            axios.post("/api/auth/reset_password",{data})
    },
    device:{
        addDevice:data =>
            axios.post("/api/devices/add_device",{data}).then(res=> res.data.success)
    },
    item:{
        addItem:data=>
            axios.post("/api/items/add_item", {data}).then(res => res.data.result),
        getItems:()=>
            axios.get("/api/items/get_items").then(res=>res.data.items)
    },
    location:{
        getLocation:() =>
        axios.get("/api/locations/get_location").then(res=> res)
    }
};
