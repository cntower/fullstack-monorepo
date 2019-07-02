import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, Field } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import * as swagger from 'swagger.json'
import { FormlyJsonschemaOptions } from '@ngx-formly/core/json-schema/formly-json-schema.service';

@Component({
  selector: 'mono-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jsonschema = swagger.definitions.UserDTO;
  fields: FormlyFieldConfig[] = [];

  form = new FormGroup({});
  model: any = {
    username: '',
    password: '',
  };
  options: FormlyFormOptions = {};

  submit(model) {
    console.log(model);
  }
  ngOnInit() {
  }
  constructor(private formlyJsonschema: FormlyJsonschema) {
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
