import { Component, OnInit } from '@angular/core';
import { State } from '@app/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { selectRoutePost } from '../state/selectors/posts.selectors';

@Component({
  selector: 'mono-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  params$ = this.store.select(selectRoutePost)
    .pipe(
      tap(post => {
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
