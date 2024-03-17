import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  productMessage: string | undefined;
  icon = faTrash;
  iconEdit = faEdit;

  currentPage = 1;
  itemsPerPage = 5;
  totalProducts = 0;
  currentProductId: number | undefined;
  showConfirmationModal = false; // Thêm biến cờ để kiểm soát việc hiển thị modal

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.productService.productList().subscribe((result) => {
      if (result) {
        this.productList = result.slice(startIndex, endIndex);
        this.totalProducts = result.length; // Lưu tổng số lượng sản phẩm
      }
    });
  }

  openConfirmationModal(id: number): void {
    this.currentProductId = id;
    this.showConfirmationModal = true;
  }

  onNoClick(): void {
    this.showConfirmationModal = false;
  }

  onYesClick(): void {
    if (this.currentProductId) {
      this.deleteProduct(this.currentProductId);
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.fetchProducts();
        this.showConfirmationModal = false;
      }
      
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchProducts();
  }
}
