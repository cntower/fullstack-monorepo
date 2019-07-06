import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AppFormlyModule } from '@app/app-formly/app-formly.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './state/reducers/auth.reducer';
import { AuthEffects } from './state/effects/auth.effects';
import { UsersApi } from '@app/services/api.service';
import { RegisterComponent } from './register/register.component';
//ng generate @ngrx/schematics:feature auth/state/Auth --group --module \auth\auth.module.ts --spec false

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppFormlyModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [UsersApi]
})
export class AuthModule { }
