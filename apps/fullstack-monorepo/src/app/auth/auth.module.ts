import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AppFormlyModule } from '@app/app-formly/app-formly.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  USER_FEATURE_KEY,
  initialState as userInitialState,
  userReducer
} from './auth-state/user.reducer';
import { UserEffects } from './auth-state/user.effects';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppFormlyModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, {
      initialState: userInitialState
    }),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [DataPersistence]
})
export class AuthModule { }
