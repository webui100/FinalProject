import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import links from './links';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'webui-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public isOpened = true;
  public linksSet = links;

  isHandset$: Observable<boolean>;

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        share()
      );

    this.isHandset$.subscribe(isHandset => this.isOpened = !isHandset);
  }

  constructor(public breakpointObserver: BreakpointObserver, private router:Router, private http: AuthService) {}

}
