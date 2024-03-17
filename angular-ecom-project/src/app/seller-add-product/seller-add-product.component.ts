import { Component, OnInit } from '@angular/core';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CategoryService }from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  productCategories: category[] | undefined;
  productData: product | undefined;
  selectedImage: File | undefined;
  imageUrl: string | undefined;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    // Lấy danh sách các danh mục sản phẩm
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.productCategories = categories;
    });
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedImage = inputElement.files?.[0];
    
    if (this.selectedImage) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };
  
      reader.readAsDataURL(this.selectedImage);
    }
  }
  
  submit(data: product) {
    // Kiểm tra xem người dùng đã chọn một hình ảnh
    if (this.selectedImage) {
      // Gán đường dẫn hình ảnh vào data.image
      data.image = this.imageUrl || '';
      this.productService.addProduct(data).subscribe((result) => {
        console.warn(result);
        if (result) {
          this.addProductMessage = 'Sản phẩm đã được thêm thành công';
          setTimeout(() => {
            this.addProductMessage = undefined;
            this.router.navigate(['/seller-home']); // Chuyển hướng đến trang danh sách sản phẩm
          }, 3000);
        }
      });
    }
  }
}