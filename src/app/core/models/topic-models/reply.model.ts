export class ReplyModel {
    constructor(
        public topicTitle: string,
        public topicId: string,
        public author: string,
        public content: string,
        public forumId: string
    ){}
}