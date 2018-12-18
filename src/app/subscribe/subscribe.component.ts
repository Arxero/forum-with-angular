import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../domain/game';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
    @Input('subGame') subGame: Game;
    @Output() notification = new EventEmitter<string>();
    isSubscribed: boolean = false;

  constructor() { }

    showId() {
        this.isSubscribed = !this.isSubscribed;
        this.notification.emit('Subscription Successful');
    }

  ngOnInit() {
      //console.log(this.subGame.id);
      
  }

}
