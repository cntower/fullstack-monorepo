import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, Field } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import * as swagger from 'swagger.json'
import { FormlyJsonschemaOptions } from '@ngx-formly/core/json-schema/formly-json-schema.service';
import { IUserDTO, UserDTO } from '@app/services/api.service';
import * as fromStore from '@app/auth/state/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { login } from '../state/actions/auth.actions';
import { selectAuthError, selectAuthPending } from '../state/selectors/auth.selectors';
import { map } from 'rxjs/operators';


@Component({
  selector: 'mono-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jsonschema = swagger.definitions.UserDTO;
  fields: FormlyFieldConfig[] = [];
  error$ = this.store.select(selectAuthError).pipe(
    map(res => {
      if (res && typeof res === 'object') {
        try {
          const response = JSON.parse(res.response);
          if (response.error) {
            return response.error
          }
        } catch (error) {
          return res.message || 'Unknown error'
        }
      } else {
        return res;
      }
    })
  );
  pending$ = this.store.select(selectAuthPending);

  form = new FormGroup({});
  model: IUserDTO = {
    username: '',
    password: '',
  };
  options: FormlyFormOptions = {};

  submit(model) {
    console.log(model);
    this.store.dispatch(login(new UserDTO(model)));
  }
  ngOnInit() {
  }
  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private store: Store<fromStore.State>
  ) {
    const formlyJsonschemaOptions: FormlyJsonschemaOptions = {
      map: (mappedField: FormlyFieldConfig, mapSource: any) => {
        mappedField.templateOptions.type = mapSource['format'];
        mappedField.templateOptions.label = mappedField.key && mappedField.key
          .replace(/([A-Z])/g, (match) => ` ${match}`)
          .replace(/^./, (match) => match.toUpperCase());
        return mappedField;
      }
    };
    this.fields = [this.formlyJsonschema.toFieldConfig(JSON.parse(JSON.stringify(this.jsonschema)), formlyJsonschemaOptions)];
  }
}
