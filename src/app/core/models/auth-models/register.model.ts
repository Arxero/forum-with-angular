export class RegisterModel {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public repeatPassword: string,
        public postsCount: number,
        public image?: string,
    ) {}
}