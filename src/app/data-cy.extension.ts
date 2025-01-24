import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

export const dataCyExtension: FormlyExtension = {
  prePopulate(field: FormlyFieldConfig) {
    field.props = {
      ...(field.props || {}),
      attributes: {
        'data-cy': <string | number>field.key
      }
    };
  }
};
