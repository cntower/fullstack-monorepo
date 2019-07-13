import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsComponent } from './posts/posts.component';
import { MaterialModule } from '@app/material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/effects/posts.effects';
import * as fromPosts from './state/reducers/posts.reducer';
import { PostsApi } from '@app/services/api.service';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [
    PostCardComponent,
    PostsComponent,
    PostDetailComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature('posts', fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostsApi]
})
export class PostsModule { }
