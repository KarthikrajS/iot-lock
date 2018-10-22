import api from '../api';

export const getLocation = () =>() =>api.location.getLocation().then(res=> res.data)    ;