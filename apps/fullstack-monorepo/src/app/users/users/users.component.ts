import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/reducers/users.reducer';
import { loadUsers } from '../state/actions/users.actions';
import { errorFromSwaggerToStringMessage } from '@mono/utils';
import { selectUserError, selectUserPending, selectAllUsers } from '../state/selectors/users.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mono-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  error$ = this.store.select(selectUserError).pipe(
    map(res => errorFromSwaggerToStringMessage(res))
  );
  pending$ = this.store.select(selectUserPending);
  users$ = this.store.select(selectAllUsers);
  
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.dispatch(loadUsers({ page: 1 }));
  }

}
