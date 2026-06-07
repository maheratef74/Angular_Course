import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords',
  standalone: true,
})
export class LimitWordsPipe implements PipeTransform {
  transform(value: string, limit: number = 3): string {
    if (!value) {
      return '';
    }
    const words = value.split(/\s+/);
    if (words.length <= limit) {
      return value;
    }
    return words.slice(0, limit).join(' ') + '...';
  }
}
