import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-menu-list',
    imports: [RouterModule, RouterLink, CommonModule],
    templateUrl: './menu-list.component.html'
})
export class MenuListComponent implements OnInit {

    isAuthenticated = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();
    }
}
