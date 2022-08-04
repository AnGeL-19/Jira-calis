import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../db';
import { seedData } from '../../db/seed-data';
import { Entry } from '../../models';

type Data = {
    message: string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({message: 'No tiene acceso a este servicio'});
    }

    await db.connect();

    await Entry.deleteMany(); // borra todo de la db
    await Entry.insertMany(seedData.entries);

    await db.disconnect()

    res.status(200).json({ message: 'Procesos realizado correctamente' })
}