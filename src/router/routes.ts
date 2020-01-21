import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';
const router = Router();

/**
 * 
 */
router.get('/heroes', (req: Request, res: Response) => {

    const query = ` SELECT * 
                    FROM heroes`;

    MySQL.ejecutarQuery(query, (err: any, heroes: object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            heroes: heroes
        })

    })
})

/**
 * 
 */
router.get('/heroes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const escapeId = MySQL.instace.cnn.escape(id);

    const query = `SELECT * 
                    FROM heroes 
                    WHERE id = ${ escapeId}`;

    MySQL.ejecutarQuery(query, (err: any, heroes: object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            heroes: heroes
        })

    })
})


export default router;