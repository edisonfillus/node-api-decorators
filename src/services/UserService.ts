import {Service} from "typedi";

@Service()
export class UserService {

    getAll(){
        return [{
            id: 1,
            name: "Edison"
        }];
    }

}