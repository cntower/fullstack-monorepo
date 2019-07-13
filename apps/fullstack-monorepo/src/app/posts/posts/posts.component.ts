import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/reducers/posts.reducer';
import { loadPosts } from '../state/actions/posts.actions';
import { errorFromSwaggerToStringMessage } from '@mono/utils';
import { selectPostError, selectPostPending, selectAllPosts } from '../state/selectors/posts.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mono-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  error$ = this.store.select(selectPostError).pipe(
    map(res => errorFromSwaggerToStringMessage(res))
  );
  pending$ = this.store.select(selectPostPending);
  posts$ = this.store.select(selectAllPosts);
  
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.dispatch(loadPosts({ page: 1 }));
  }

}
