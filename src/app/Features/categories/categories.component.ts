import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../core/Services/categories.service';
import { Category } from '../../core/Interfaces/category.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private categoriesService = inject(CategoriesService);
  categories = signal<Category[]>([]);

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((response: any) => {
      this.categories.set(response.data ?? []);
    });
  }

  ngOnInit() {
    this.getAllCategories();
  }
}
