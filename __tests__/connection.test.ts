import { getCustomRepository } from "typeorm";
import connection from "../src/connection";
import { User } from "../src/entity/User";
import { UserRepository } from "../src/repository/UserRepository";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it("creates a user and findAllByName", async () => {
  const userRepository = getCustomRepository(UserRepository);
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 42;
  await userRepository.save(user);
  const users = await userRepository.findAllByName("Timber", "Saw");
  expect(users.length).toBe(1);
  expect(users[0].firstName).toBe("Timber");
});
