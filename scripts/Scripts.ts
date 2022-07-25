import {MovieFactory} from "./factory/movie.factory";
import {UserFactory} from "./factory/user.factory";

export class Scripts {
    /**
     *
     * Call All Your Executable Scripts Here
     * @constructor
     */
    static async Execute () {
        await MovieFactory.Run()
        await UserFactory.Run()
    }
}