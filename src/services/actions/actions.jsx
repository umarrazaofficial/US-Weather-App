import { ADD_TO_CARD, REMOVE_FROM_CARD } from '../constant';

export const addtoCart = (data) => {
    return {
        type: ADD_TO_CARD,
        data: data
    }
};
export const removefromCart = (data) => {
    return {
        type: REMOVE_FROM_CARD,
        data: data
    }
};
