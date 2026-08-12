import { Pipe, PipeTransform } from '@angular/core';

export type StockFilterMode = 'all' | 'inStock' | 'lowStock' | 'highStock' | 'outOfStock' | 'sortAsc' | 'sortDesc';

@Pipe({
  name: 'stock',
  standalone: true,
})
export class StockPipe implements PipeTransform {
  /**
   * Transforms stock quantity number into a status string,
   * OR filters/sorts an array of products based on stock status.
   *
   * @param value Single quantity number OR array of items containing quantity.
   * @param filterOrShowCount StockFilterMode if array, or boolean showCount if single number.
   * @param lowThreshold Threshold for low stock classification (default 50).
   */
  transform(
    value: any,
    filterOrShowCount: StockFilterMode | boolean = true,
    lowThreshold: number = 50
  ): any {
    if (value == null) {
      return typeof filterOrShowCount === 'string' ? [] : 'Out of Stock';
    }

    // --- Array Filtering / Sorting Mode ---
    if (Array.isArray(value)) {
      const mode = typeof filterOrShowCount === 'string' ? filterOrShowCount : 'all';
      const items = [...value];

      switch (mode) {
        case 'inStock':
          return items.filter((item) => (item?.quantity ?? 0) > 0);
        case 'lowStock':
          return items.filter((item) => (item?.quantity ?? 0) > 0 && (item?.quantity ?? 0) <= lowThreshold);
        case 'highStock':
          return items.filter((item) => (item?.quantity ?? 0) > lowThreshold);
        case 'outOfStock':
          return items.filter((item) => (item?.quantity ?? 0) <= 0);
        case 'sortAsc':
          return items.sort((a, b) => (a?.quantity ?? 0) - (b?.quantity ?? 0));
        case 'sortDesc':
          return items.sort((a, b) => (b?.quantity ?? 0) - (a?.quantity ?? 0));
        case 'all':
        default:
          return items;
      }
    }

    // --- Single Quantity Number Formatting Mode ---
    const quantity = Number(value);
    const showCount = typeof filterOrShowCount === 'boolean' ? filterOrShowCount : true;

    if (isNaN(quantity) || quantity <= 0) {
      return 'Out of Stock';
    } else if (quantity <= lowThreshold) {
      return showCount ? `Low Stock (${quantity} left)` : 'Low Stock';
    } else {
      return showCount ? `In Stock (${quantity})` : 'In Stock';
    }
  }
}
