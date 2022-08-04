import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    ok: boolean,
    message: string | string[]
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { message = 'Bad Request' } = req.query;    

    res.status(400).json({ 
        ok: true,
        message
    })
}