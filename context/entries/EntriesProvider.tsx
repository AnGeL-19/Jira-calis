import React, { FC, ReactNode, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack';
import { EntriesContext } from './EntriesContext';
import { EntriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces/entry';
import { entriesApi } from '../../apis';


export interface EntriesState{
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props{
    children: ReactNode
}

export const EntriesProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        refreshEntries();
    }, [])


    const addNewEntry = async (description: string) => {

        try {
            const { data } = await entriesApi.post<Entry>('/entries', { description })
            dispatch({type: '[Entry] - Add-Entry', payload: data});
        } catch (error) {
            console.log(error);
        }


    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
        try{
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description,status })
            dispatch({type: '[Entry] - Entry-Update', payload: data})
            
            if ( showSnackbar )
            enqueueSnackbar('Entrada actualizada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

        }catch(err){
            console.log(err);
        }
        
    }

    const deleteEntry = async(id:string, showSnackbar = false) => {
        try{
            const { data } = await entriesApi.delete(`/entries/${id}`)
            dispatch({type: '[Entry] - Delete-Entry', payload: id})

            if ( showSnackbar )
            enqueueSnackbar('Tarea eliminada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

        }catch(err){
            console.log(err);
        }
    }

    const refreshEntries = async () => {
        try {
            const { data } = await entriesApi.get<Entry[]>('/entries')
            dispatch({type: '[Entry] - Refresh-Data', payload: data})  
        } catch (error) {
            console.log(error);      
        }
        
    }

    return (
    <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry
    }}>
        { children }
    </EntriesContext.Provider>
    )
}