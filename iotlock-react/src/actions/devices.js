import api from '../api';

export const addDevice = (data) =>() =>api.device.addDevice(data).then(success=>{
    console.log(success);
});