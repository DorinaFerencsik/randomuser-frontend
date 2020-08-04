import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'enumToArray',
})
export class EnumToArray implements PipeTransform {
  transform(values) {
    return Object.keys(values).map(key => ({
      key,
      value: values[key]
    }));
  }
}
