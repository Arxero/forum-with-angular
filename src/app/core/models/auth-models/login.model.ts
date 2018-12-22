export class LoginModel {
    constructor(
        public username: string,
        public password: string,
        public isRemembered?: boolean
    ) { }
}