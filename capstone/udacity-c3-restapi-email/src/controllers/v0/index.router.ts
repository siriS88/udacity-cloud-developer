import { Router, Request, Response } from 'express';
import { EmailRouter } from './email/routes/email.router';

const router: Router = Router();

router.use('/email', EmailRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;