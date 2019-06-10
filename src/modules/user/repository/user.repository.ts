import { EntityRepository, Repository } from 'typeorm';
import { User } from "../entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    test() {
        return 'UserRepository test';
    }

    async add(
      email: string,
      password: string
    ): Promise<User> {

        const user = new User();

        user.email = email;
        user.password = password;

        return this.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.findOne({email: email});
    }
}