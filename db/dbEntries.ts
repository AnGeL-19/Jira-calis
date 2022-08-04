import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry, IEntry } from '../models/';


export const getEntryById = async (entryId: string): Promise<IEntry | null> => {
    
    if( !isValidObjectId( entryId )) return null;

    await db.connect();
    const entry = await Entry.findById(entryId);
    await db.disconnect();

    return JSON.parse( JSON.stringify(entry))
}