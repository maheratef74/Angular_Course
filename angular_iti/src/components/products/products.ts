import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  constructor(private productService: ProductService) {}

  get products(): Product[] {
    return this.productService.getProducts();
  }

  purchasedProductIds = signal<Set<number>>(new Set());
  selectedProductIds = signal<Set<number>>(new Set());

  totalPrice = signal<number>(0);


  selectedCount = computed(() => this.selectedProductIds().size);

  onBuy(product: Product): void {
    const currentPurchased = this.purchasedProductIds();
    if (!currentPurchased.has(product.id)) {
      const nextPurchased = new Set(currentPurchased);
      nextPurchased.add(product.id);
      this.purchasedProductIds.set(nextPurchased);
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

  onDelete(productId: number): void {
    const product = this.productService.getProductById(productId);
    if (product && this.purchasedProductIds().has(productId)) {
      this.totalPrice.update(price => price - product.price);
    }
    const nextPurchased = new Set(this.purchasedProductIds());
    nextPurchased.delete(productId);
    this.purchasedProductIds.set(nextPurchased);

    const nextSelected = new Set(this.selectedProductIds());
    nextSelected.delete(productId);
    this.selectedProductIds.set(nextSelected);

    this.productService.deleteProduct(productId);
  }
}
