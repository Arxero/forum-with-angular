import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class GameService {
    constructor (private httpClient: HttpClient) {}

    getGitHubProfile(profile: string) {
        return this.httpClient.get<Object>(`https://api.github.com/users/${profile}`);
    }
}