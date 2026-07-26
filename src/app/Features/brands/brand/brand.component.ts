import { Component, Input } from '@angular/core';
import { Brand } from '../../../core/Interfaces/brand.interface';

@Component({
  selector: 'app-brand',
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
})
export class BrandComponent {
  @Input({required: true}) BrandData!: Brand;
}
