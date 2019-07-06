import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import * as swagger from 'swagger.json'
import * as fromStore from '@app/auth/state/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { login } from '../state/actions/auth.actions';
import { selectAuthError, selectAuthPending } from '../state/selectors/auth.selectors';
import { map } from 'rxjs/operators';
import { formlyJsonschemaOptions, errorFromSwaggerToStringMessage, jsonCopy } from '@mono/utils';
import { UserDTO } from '@app/services/api.service';

@Component({
  selector: 'mono-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fields: FormlyFieldConfig[] = [];
  error$ = this.store.select(selectAuthError).pipe(
    map(res => errorFromSwaggerToStringMessage(res))
  );
  pending$ = this.store.select(selectAuthPending);
  form = new FormGroup({});
  model;
  options: FormlyFormOptions = {};
  submit() {
    this.store.dispatch(login(new UserDTO(this.form.value)));
  }
  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private store: Store<fromStore.State>
  ) {
    const jsonschema = swagger.definitions.UserDTO;
    this.fields = [this.formlyJsonschema.toFieldConfig(jsonCopy(jsonschema), formlyJsonschemaOptions)];
  }
}
