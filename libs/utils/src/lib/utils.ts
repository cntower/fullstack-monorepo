import { FormlyJsonschemaOptions } from '@ngx-formly/core/json-schema/formly-json-schema.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

export function camelcaseToTitle(key: string) {
  return key && key.replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase());
}

export function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

export const formlyJsonschemaOptions: FormlyJsonschemaOptions = {
  map: (mappedField: FormlyFieldConfig, mapSource: any) => {
    mappedField.templateOptions.type = mapSource['format'];
    mappedField.templateOptions.label = camelcaseToTitle(mappedField.key);
    return mappedField;
  }
};

export function errorFromSwaggerToStringMessage(swaggerError: any) {
  if (swaggerError && typeof swaggerError === 'object') {
    try {
      const response = JSON.parse(swaggerError.response);
      if (response.error) {
        return response.error
      }
    } catch (error) {
      return swaggerError.message || 'Unknown error'
    }
  } else {
    return swaggerError;
  }
}