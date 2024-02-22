import { ADD_TO_CARD, REMOVE_FROM_CARD } from '../constant';

const initialState = {
    cardData: []
}

export default function cardItems(state = [], action) {
    switch (action.type) {
        case ADD_TO_CARD:
            return [
                ...state,
                { cardData: action.data }
            ]
            break;
        case REMOVE_FROM_CARD:
            const indexToRemove = action.data;

            if (indexToRemove >= 0 && indexToRemove < state.length) {
                state.splice(indexToRemove, 1);
            }

            // Return the modified state
            return [...state];
        default:
            return state
    }
}
