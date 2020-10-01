import {EntityRepository, Repository} from "typeorm";
import {User} from "../models/entities/User";
import {Service} from "typedi";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public findByEmail(email: string) {
        return this.findOne({ email });
    }

}