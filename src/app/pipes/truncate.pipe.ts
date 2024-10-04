import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    if (typeof value !== 'string') {
      return value;
    }

    // Check if the text is longer than the limit
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
