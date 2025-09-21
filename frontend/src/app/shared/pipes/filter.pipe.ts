import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field?: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    if (field) {
      return items.filter(item => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(searchText);
      });
    }

    return items.filter(item => {
      return Object.keys(item).some(key => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(searchText);
      });
    });
  }
}
