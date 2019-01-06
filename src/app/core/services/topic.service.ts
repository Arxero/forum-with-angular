import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service';
import { AddTopicModel } from '../models/topic-models/add-topic.model';

const TOPICS_URL = 'https://baas.kinvey.com/appdata/kid_HkUANrtxV/topics'

@Injectable({
    providedIn: 'root'
})

export class TopicService {
    constructor(private http: HttpClient,
        private authService: AuthService) { }

        createTopic (body: AddTopicModel) {
            return this.http.post(TOPICS_URL, body)
        }

        getTopicsByForum (forumId: string) {
            return this.http.get<AddTopicModel[]>(TOPICS_URL + `?query={"forumId":"${forumId}"}&sort={"_kmd":-1}`)
        }

        getAllTopics() {
            return this.http.get<AddTopicModel[]>(TOPICS_URL)
        }

        getSingleTopic(id: string) {
            return this.http.get<AddTopicModel>(TOPICS_URL + '/' + id)
        }

        editTopic (id: string, body: AddTopicModel) {
            return this.http.put(TOPICS_URL + '/' + id, body)
        }
        deleteTopic (id: string) {
            return this.http.delete(TOPICS_URL + '/' + id)
        }

        searchTopic(searchInput: string) {
            return this.http.get(TOPICS_URL + `?query={"$or":[{"subject":{"$regex":"^.*(?i)${searchInput}"}}]}`)
            //?query={"$or":[{"name":{"$regex":"^SEARCHTERM"}},{"description":{"$regex":"^SEARCHTERM"}},{"tags":{"$regex":"^SEARCHTERM"}}]}
            
            //I achieved Search substring with case - insensitive with following regex.
            //"$regex" : "^.*(?i)_strSearchText.*"
        }

        getMyTopics(username: string) {
            return this.http.get<AddTopicModel[]>(TOPICS_URL + `?query={"author":"${username}"}`)
        }
        
}