import { Component, OnInit } from '@angular/core';
import { Game } from '../domain/game';
import { GameService } from './game.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    games: Array<Game>;
    isClicked: boolean = false;
    name: string;

    constructor(
        private gameService : GameService,
        private router: Router
        ) {
        this.games = [
            { id: 1, title: 'Game 1', image: 'https://awesomecs.syntrwave.com/styles/quarto_asphalt/theme/images/logo_400width.png' },
            { id: 2, title: 'Game 2', image: 'https://awesomecs.syntrwave.com/styles/quarto_asphalt/theme/images/logo_400width.png' }
        ]

        
    }
    readMore() {
        this.isClicked = !this.isClicked;
    }
    showName(inputName) {
        console.log(inputName);
        this.name = inputName;
    }

    notifyMe(notification: string){
        console.log(notification);
        
    }


    ngOnInit() {
        this.gameService.getGitHubProfile('arxero').subscribe(data => {
            console.log(data);
            
            //this.router.navigateByUrl('/about');
            
        })
    }

}
