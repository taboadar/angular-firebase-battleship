import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLetter'
})
export class ToLetterPipe implements PipeTransform {

  transform(value: number): string {
    let letters = 'abcdefghijklmnopqrstuvwxyz'
    return letters[value%letters.length]
  }

}
