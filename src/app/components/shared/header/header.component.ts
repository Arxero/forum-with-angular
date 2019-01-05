import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchModel } from 'src/app/core/models/auth-models/search.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    searchTerm: SearchModel

    constructor(
        private authService: AuthService,
        private router: Router) {
        this.searchTerm = new SearchModel('')
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logoutUser().subscribe()
    }

    search() {
        this.router.navigate([`search/${this.searchTerm.searchInput}`])
    }

}
