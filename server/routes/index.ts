import { Router } from 'express';
import messageRouter from "./messages"
const router = Router();

router.use('/api/message', messageRouter);

export default router;