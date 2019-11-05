import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItemTag, MenuItem } from '../aside-menu.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { getMenuItems, getSelectedItemTag } from '../aside-menu.selectors';
import { selectItem } from '../aside-menu.actions';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.pug',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {

  private menuItems$: Observable<MenuItem[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.menuItems$ = this.store.pipe(select(getMenuItems));
  }

  select(tag: MenuItemTag): void {
    this.store.dispatch(selectItem({ tag }));
  }
}
