import { Component, inject, signal } from '@angular/core';
import { Brand } from '../../Core/Interfaces/brand.interface';
import { BrandComponent } from './brand/brand.component';
import { BrandsService } from '../../Core/services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [BrandComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private _brandService = inject(BrandsService);
  brands = signal<Brand[]>([]);

  getAllBrands() {
    this._brandService.getAllBrands().subscribe((res: any) => {
      this.brands.set(res.data ?? []);
    });
  }

  ngOnInit() {
    this.getAllBrands();
  }
}
