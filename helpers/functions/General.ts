export class GeneralFunction{

    static GenerateToken ( length : number) : string {
        const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        const b = [];
        for (let i=0; i<length; i++) {
            const j = Number((Math.random() * (a.length-1)).toFixed(0));
            b[i] = a[j];
        }
        return b.join("");
    }

    static CreateUserAvatar( ) : string {
        const diceBearUrl   =   process.env.DICE_BEAR_URL ?? "" + "/";
        return diceBearUrl + GeneralFunction.GenerateToken( 25 ) +  ".svg"
    }
}