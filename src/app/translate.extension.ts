import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class TranslateExtension {
  constructor(private translate: TranslateService) {}

  prePopulate(field: FormlyFieldConfig) {
    const to = field.props || {};

    if (!to.label || to['_translated']) {
      return;
    }

    to['_translated'] = true;
    field.expressions = {
      ...(field.expressions || {}),
      'templateOptions.label': this.translate.stream(
        field.props.label
      )
    };
  }
}

export function registerTranslateExtension(translate: TranslateService) {
  return {
    extensions: [
      {
        name: 'translate-extension',
        extension: new TranslateExtension(translate)
      }
    ]
  };
}
