import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
    newEmail: string = '123'

    form = new FormGroup({
        'email': new FormControl('', [Validators.required]),
        'password': new FormControl(''),
    })
    

    log() {
        console.log(this.form.get('email').value);
        if (this.form.get('email').value != this.form.get('password').value) {
            alert('password do not match')
        } else {
            alert('success')
        }
        // if (this.form.get('email').value != this.newEmail) {
        //     alert('emails do not match')
        // }

    }

    constructor() { }

    ngOnInit() {
    }

}
