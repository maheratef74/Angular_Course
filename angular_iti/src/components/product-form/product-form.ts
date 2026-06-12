import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductForm implements OnInit {
  isEditMode = false;
  productId?: number;

  product: Omit<Product, 'id'> = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    thumbnail: '',
    category: '',
    brand: '',
    rating: 4.5
  };

  categories = ['smartphones', 'laptops', 'headphones', 'smartwatches', 'tablets'];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = Number(idParam);
      const existingProduct = this.productService.getProductById(this.productId);
      if (existingProduct) {
        this.product = { ...existingProduct };
      } else {
        this.router.navigate(['/error']);
      }
    }
  }

  onSubmit(): void {
    if (!this.product.thumbnail) {
      this.product.thumbnail = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';
    }

    if (this.isEditMode && this.productId !== undefined) {
      this.productService.updateProduct(this.productId, this.product);
    } else {
      this.productService.addProduct(this.product);
    }
    this.router.navigate(['/products']);
  }
}
