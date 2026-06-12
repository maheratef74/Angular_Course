import { Injectable, signal, computed } from '@angular/core';
import { Product, PRODUCTS_DATA } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsList = signal<Product[]>([...PRODUCTS_DATA]);

  // Read all
  getProducts = computed(() => this.productsList());

  // Read one
  getProductById(id: number): Product | undefined {
    return this.productsList().find(p => p.id === id);
  }

  // Create
  addProduct(product: Omit<Product, 'id'>): void {
    const nextId = this.productsList().length > 0 
      ? Math.max(...this.productsList().map(p => p.id)) + 1 
      : 1;
    const newProduct: Product = {
      ...product,
      id: nextId
    };
    this.productsList.update(list => [...list, newProduct]);
  }

  // Update
  updateProduct(id: number, updated: Omit<Product, 'id'>): void {
    this.productsList.update(list => 
      list.map(p => p.id === id ? { ...p, ...updated } : p)
    );
  }

  // Delete
  deleteProduct(id: number): void {
    this.productsList.update(list => list.filter(p => p.id !== id));
  }
}
