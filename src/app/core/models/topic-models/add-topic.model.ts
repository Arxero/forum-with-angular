export class AddTopicModel {
    constructor(
        public subject : string,
        public description : string,
        public author: string,
        public forumId : number,
        public replies: number,
    ){}
}