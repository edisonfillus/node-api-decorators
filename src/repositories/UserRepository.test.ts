import { getConnection, getCustomRepository} from "typeorm";
import {UserRepository} from "./UserRepository";

beforeEach(() => {
    return getConnection().synchronize(true);
});

describe("UserRepository",()=>{
    it("Should create user and retrieve", async () => {
        const userRepository = await getCustomRepository(UserRepository);
        const toCreate = userRepository.create({
            name: "Test User",
            email: "test@mail.com",
            password: "123456"
        });

        await userRepository.save(toCreate);
        const onDatabase = await userRepository.findOne(toCreate.id||0);

        expect(toCreate).toStrictEqual(onDatabase);
    });
})
