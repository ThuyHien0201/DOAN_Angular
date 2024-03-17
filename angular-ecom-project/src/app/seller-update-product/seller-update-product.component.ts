import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: product | undefined;
  productCategories: category[] | undefined;
  productMessage: string | undefined;
  imageUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        this.productData = data;
      });
    }

    this.categoryService.getCategoryList().subscribe((categories) => {
      this.productCategories = categories;
    });
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0];
    
    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };

      reader.readAsDataURL(selectedImage);
    }
  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    
    // If a new image is selected, update the image URL
    if (this.imageUrl) {
      data.image = this.imageUrl;
    }

    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has been updated';
        setTimeout(() => {
          this.productMessage = undefined;
        }, 3000);
        this.router.navigate(['/seller-home']);
      }
    });

    console.warn(data);
  }
}
