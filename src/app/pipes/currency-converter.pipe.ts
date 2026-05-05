import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../service/currency.service';

@Pipe({
  name: 'eurToTnd',
  standalone: true
})
export class CurrencyConverterPipe implements PipeTransform {

  constructor(private currencyService: CurrencyService) {}

  transform(value: number | null | undefined, format: boolean = true): string | number {
    if (!value || value < 0) {
      return format ? '0.00 TND' : 0;
    }
    
    const tndValue = this.currencyService.convertEurToTnd(value);
    return format ? this.currencyService.formatTnd(tndValue) : tndValue;
  }

}