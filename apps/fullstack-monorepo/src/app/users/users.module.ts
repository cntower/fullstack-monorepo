import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './state/reducers/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/effects/users.effects';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MaterialModule } from '@app/material/material.module';

@NgModule({
  declarations: [UsersComponent, UserCardComponent],
  imports: [
    MaterialModule,
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersModule { }
