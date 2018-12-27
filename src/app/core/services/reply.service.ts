import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service';
import { ReplyModel } from '../models/topic-models/reply.model';


const REPLY_URL = 'https://baas.kinvey.com/appdata/kid_HkUANrtxV/replies'

@Injectable({
    providedIn: 'root'
})

export class ReplyService {
    constructor(private http: HttpClient,
        private authService: AuthService) { }

        addReply (body: ReplyModel) {
            return this.http.post(REPLY_URL, body)
        }
        getCommentsByTopicId (id: string) {
            return this.http.get<ReplyModel[]>(REPLY_URL + `?query={"topicId":"${id}"}`)
        }

        getReplyById (id: string) {
            return this.http.get<ReplyModel>(REPLY_URL + '/' + id)
        }
        editReply (id: string, body: ReplyModel) {
            return this.http.put(REPLY_URL + '/' + id, body)
        }

}