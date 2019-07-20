import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { selectLoadRoutePost } from '../state/selectors/posts.selectors';
import { Observable } from 'rxjs';
import { PostUserRO } from '@app/services/api.service';
import { State } from '../state/reducers/posts.reducer';

@Component({
  selector: 'mono-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: PostUserRO;
  post$:Observable<PostUserRO> = this.store.select(selectLoadRoutePost(this.store))
    .pipe(
      tap(post => {
        this.post = post;
        console.log(post)
      }
      )
    )

  constructor(
    private store: Store<State>
  ) {

  }

  ngOnInit() {
  }

}
