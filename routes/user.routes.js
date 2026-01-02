import Router from 'express';
import { GetUser, GetUsers, CreateUser, UpdateUser, DeleteUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', GetUsers);

userRouter.get('/:id', authorize, GetUser);

userRouter.post('/', CreateUser);

userRouter.put('/:id', authorize, UpdateUser);

userRouter.delete('/:id', authorize, DeleteUser);

export default userRouter;