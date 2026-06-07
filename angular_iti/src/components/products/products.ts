import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, PRODUCTS_DATA } from '../../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  products = PRODUCTS_DATA;

  // Track purchased product IDs
  purchasedProductIds = signal<Set<number>>(new Set());

  // Track selected product IDs (checkboxes)
  selectedProductIds = signal<Set<number>>(new Set());

  // Calculate the total price based on purchased products
  totalPrice = signal<number>(0);

  // Compute selected count
  selectedCount = computed(() => this.selectedProductIds().size);

  onBuy(product: Product): void {
    const currentPurchased = this.purchasedProductIds();
    if (!currentPurchased.has(product.id)) {
      // Create new set to trigger signal change detection
      const nextPurchased = new Set(currentPurchased);
      nextPurchased.add(product.id);
      this.purchasedProductIds.set(nextPurchased);

      // Add product price to total price
      this.totalPrice.update(price => price + product.price);
    }
  }

  onSelect(event: { productId: number; selected: boolean }): void {
    const currentSelected = this.selectedProductIds();
    const nextSelected = new Set(currentSelected);

    if (event.selected) {
      nextSelected.add(event.productId);
    } else {
      nextSelected.delete(event.productId);
    }

    this.selectedProductIds.set(nextSelected);
  }

  resetCart(): void {
    this.purchasedProductIds.set(new Set());
    this.selectedProductIds.set(new Set());
    this.totalPrice.set(0);
  }
}
