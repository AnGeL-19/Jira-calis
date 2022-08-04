import { Entry } from '../../interfaces';
import { EntriesState } from './EntriesProvider'

type EntriesActionType =
| { type: '[Entry] - Add-Entry', payload: Entry }
| { type: '[Entry] - Entry-Update', payload: Entry }
| { type: '[Entry] - Refresh-Data', payload: Entry[] }
| { type: '[Entry] - Delete-Entry', payload: string }

export const EntriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entry] - Add-Entry':
            return{
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] - Entry-Update':
            return{
                ...state,
                entries: state.entries.map(entry =>{
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        case '[Entry] - Refresh-Data':
            return {
                ...state,
                entries: [ ...action.payload ]
            }
        case '[Entry] - Delete-Entry':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload)
            }
        default:
            return state;

    }
}