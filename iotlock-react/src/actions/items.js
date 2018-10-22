import api from '../api';

export const addItem = (data) =>() =>api.item.addItem(data).then(result=>{});
export const getItems =() =>()=>api.item.getItems().then(items=>items);