import express from 'express';
import estimator from '../estimator'
const router = express.Router();
router.get('/', (req, res) => {
    res.send({message:"hello olaoluwa"});
});
router.post('/', (req, res))
export default router;