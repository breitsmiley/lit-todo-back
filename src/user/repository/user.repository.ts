import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    test() {
        return 'UserRepository test';
    }
}