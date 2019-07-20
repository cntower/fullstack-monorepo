import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/auth/state/reducers/auth.reducer';
import { logout } from '@app/auth/state/actions/auth.actions';

@Component({
  selector: 'mono-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logout());
  }
}
