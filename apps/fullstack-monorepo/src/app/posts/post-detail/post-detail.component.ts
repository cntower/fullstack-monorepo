import { Component, OnInit } from '@angular/core';
import { State } from '@app/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { selectRoutePostId } from '../state/selectors/posts.selectors';

@Component({
  selector: 'mono-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  params$ = this.store.select(selectRoutePostId)
    .pipe(
      tap(v=>console.log(v))
    )
    .subscribe(
      r => console.log(r)
    );

  constructor(
    private store: Store<State>
  ) {

  }

  ngOnInit() {
  }

}
