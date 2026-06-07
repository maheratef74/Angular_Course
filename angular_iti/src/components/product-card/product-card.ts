import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { LimitWordsPipe } from '../../pipes/limit-words';
import { ImageZoomDirective } from '../../directives/image-zoom';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, LimitWordsPipe, ImageZoomDirective],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;
  @Input() isPurchased = false;
  @Input() isSelected = false;

  @Output() buy = new EventEmitter<Product>();
  @Output() select = new EventEmitter<{ productId: number; selected: boolean }>();

  showFullDesc = signal(false);

  toggleDescription(): void {
    this.showFullDesc.update(val => !val);
  }

  onBuyClick(): void {
    if (this.product.stock > 0 && !this.isPurchased) {
      this.buy.emit(this.product);
    }
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.select.emit({
      productId: this.product.id,
      selected: checkbox.checked
    });
  }
}
