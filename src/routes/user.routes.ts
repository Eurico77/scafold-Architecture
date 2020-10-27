import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
// import uploadConfig from '../config/upload';
// import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const userRouter = Router();

// userRouter.get('/', (req, res) => {
//   const userRepository = CreateUserService.;
//   const users = userRepository.find();

//   return res.json(users);
// })

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });

   delete user.password

    return res.json(user)
  } catch (err) {
    console.log(err)

    return res.status(400).json({ error: err.mesaage })
  }
})

// userRouter.patch(
//   '/avatar',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   async (request, response) => {
//     const updateUserAvatar = new UpdateUserAvatarService();

//     const user = await updateUserAvatar.execute({
//       user_id: request.user.id,
//       avatarFilename: request.file.filename,
//     });

//     delete user.password;

//     return response.json(user);
//   },
// );

export default userRouter;


