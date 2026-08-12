import { Pipe, PipeTransform } from '@angular/core';

export type AvailabilityFilterMode = 'all' | 'available' | 'unavailable' | boolean;

@Pipe({
  name: 'available',
  standalone: true,
})
export class AvailablePipe implements PipeTransform {
  /**
   * Transforms an array of items (filtering by availability status),
   * OR transforms a single quantity/boolean into an availability label ('Available' / 'Unavailable').
   *
   * @param value Single item/quantity/boolean OR array of items.
   * @param mode AvailabilityFilterMode when value is array ('all', 'available', 'unavailable' or boolean).
   */
  transform(
    value: any,
    mode: AvailabilityFilterMode = 'all'
  ): any {
    if (value == null) {
      return Array.isArray(value) ? [] : 'Unavailable';
    }

    // --- Array Filtering Mode ---
    if (Array.isArray(value)) {
      if (mode === 'all' || mode === false) {
        return value;
      }
      if (mode === 'available' || mode === true) {
        return value.filter((item) => item != null && (item.quantity ?? 0) > 0);
      }
      if (mode === 'unavailable') {
        return value.filter((item) => item == null || (item.quantity ?? 0) <= 0);
      }
      return value;
    }

    // --- Single Value Formatting Mode ---
    if (typeof value === 'boolean') {
      return value ? 'Available' : 'Unavailable';
    }

    if (typeof value === 'number') {
      return value > 0 ? 'Available' : 'Unavailable';
    }

    return 'Unavailable';
  }
}
