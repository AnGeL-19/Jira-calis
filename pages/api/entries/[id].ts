import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../db';
import { Entry, IEntry } from '../../../models';

type Data = 
    | {message: string}
    | IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if( !mongoose.isValidObjectId( id ) ){
        return res.status(400).json({ message: 'El id no es valido '+ id});
    }

    switch( req.method ){
        case 'GET':
            return getEntry(req, res);
        case 'PUT':
            return updateEntry(req, res); 
        case 'DELETE':
            return deleteEntry(req, res); 
        default:
            return res.status(400).json({ message: 'Metodo no existe'})
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    try{
        await db.connect();
        const entry = await Entry.findById(id);
        
        if(!entry){
            await db.disconnect();
            return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id });
        }
    
        res.status(200).json(entry!);
        await db.disconnect();
    }catch(err) {
        console.log(err);
        await db.disconnect();
        return res.status(400).json({ message: 'mala respuesta'})
    }

    
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    try{
        await db.connect();
        const entryToUpdate = await Entry.findById(id);
        
        if(!entryToUpdate){
            await db.disconnect();
            return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id });
        }
    
        const { 
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;
    
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
    
        res.status(200).json(updatedEntry!);
        await db.disconnect();
    }catch(err) {
        console.log(err);
        await db.disconnect();
        return res.status(400).json({ message: 'mala respuesta'})
    }

    
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    try{
        await db.connect();
        const entry = await Entry.findById(id);
        
        if(!entry){
            await db.disconnect();
            return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id });
        }
    
        const deleted = await Entry.findByIdAndDelete(id)
    
        res.status(200).json(
            {
                message: 'Eliminado'
            }
        );
        await db.disconnect();
    }catch(err) {
        console.log(err);
        await db.disconnect();
        return res.status(400).json({ message: 'mala respuesta'})
    }

    
}