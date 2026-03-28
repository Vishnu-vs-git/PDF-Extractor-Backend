import { AuthController } from "../controllers/authController.js";
import { UserFactory } from "../factories/implementation/userFactory.js";
import { UserMapper } from "../mapper/implementation/userMapper.js";
import { UserRepository } from "../repositories/implementations/userRepository.js";
import { UserService } from "../services/implementation/userService.js";

const userEntityFactory = new UserFactory();
const userRepository = new UserRepository(userEntityFactory);
const userMapper = new UserMapper();
const userService = new UserService(userRepository,userMapper);
export const authController = new AuthController(userService)



