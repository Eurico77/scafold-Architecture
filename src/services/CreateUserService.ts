import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User'
import AppError from '../erros/AppErros';


interface BodyDTO {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: BodyDTO): Promise<Partial<User>> {
    const userRepository = getRepository(User);

    const chekUserExists = await userRepository.findOne({
      where: { email, }
    })

    const hashedPassword = await hash(password, 8);

    if (chekUserExists) {
      throw new AppError('This e-mail is already registered. ');
    }

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })
    await userRepository.save(user);

    return user;
  }
}
export default CreateUserService;
