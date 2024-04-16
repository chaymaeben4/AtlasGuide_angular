import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router : Router ) {
  }

  isHomepage : Boolean =false;

  ngOnInit(){
    this.isHomepage=this.router.url==='/';
  }
  public isLightTheme = true;

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
        'data-theme',
        this.isLightTheme ? 'light' : 'dark'
    );
  }

}
