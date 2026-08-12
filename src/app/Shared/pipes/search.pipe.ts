import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {

  transform<T>(
    items: T[] | null | undefined,
    searchTerm: string | null | undefined,
    searchKey: string = 'title'
  ): T[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    if (!searchTerm || !searchTerm.trim()) {
      return items;
    }

    const term = searchTerm.toLowerCase().trim();

    return items.filter((item) => {
      if (!item) return false;
      const value = this.getNestedPropertyValue(item, searchKey);
      if (value == null) return false;
      return String(value).toLowerCase().includes(term);
    });
  }

  private getNestedPropertyValue(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
  }
}
