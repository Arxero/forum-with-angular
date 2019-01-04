export class UserModel {
    constructor(
        public email: string,
        public username: string,
        public password: string,
        public _id: string,
        public _acl: Object,
        public _kmd: Object,
        public postsCount?: number,
        public image?: string,
    ) { }
}