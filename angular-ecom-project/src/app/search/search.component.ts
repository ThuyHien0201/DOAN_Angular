import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { product, category } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: product[] = [];
  listCategories: category[] | undefined;
  selectedCategory: string | null = null;
  visibleProducts: product[] = []; // Danh sách sản phẩm hiển thị
  itemsToShow = 4; // Số sản phẩm hiển thị ban đầu
  itemsToLoad = 4; // Số sản phẩm thêm khi bấm nút "Hiện thêm"

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories(); // Lấy danh sách các danh mục

    // Người dùng thực hiện tìm kiếm khi URL thay đổi
    this.activeRoute.params.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.searchProducts(query);
      }
    });
  }

  // Lấy danh sách danh mục
  fetchCategories() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.listCategories = categories;
    });
  }
  
  // Tìm kiếm sản phẩm theo chuỗi đầu vào và lọc theo danh mục nếu có
  searchProducts(query: string) {
    this.productService.searchProduct(query).subscribe(result => {
      if (this.selectedCategory) {
        result = result.filter(item => item.category === this.selectedCategory);
      }

      this.searchResult = result;
      this.loadMore(); // Hiển thị sản phẩm ban đầu
    });
  }

  // Lọc sản phẩm theo danh mục
  private applyCategoryFilter(products: product[]): product[] {
    if (this.selectedCategory) {
      return products.filter(item => item.category === this.selectedCategory);
    }
    return products;
  }

  onCategoryChange() {
    this.loadMore(); // Lọc danh sách sản phẩm và hiển thị lại
  }

  // Kiểm tra xem đã hiển thị hết tất cả sản phẩm chưa
  get isLoadMoreVisible(): boolean {
    return this.visibleProducts.length < this.searchResult.length;
  }

  // Hiển thị sản phẩm ban đầu và cập nhật danh sách sản phẩm hiển thị
  private loadMore() {
    this.visibleProducts = this.searchResult.slice(0, this.itemsToShow);
  }

  // Hiển thị thêm sản phẩm khi bấm nút "Hiện thêm"
  loadMoreItems() {
    if (this.isLoadMoreVisible) {
      const nextItems = this.searchResult.slice(this.visibleProducts.length, this.visibleProducts.length + this.itemsToLoad);
      this.visibleProducts = [...this.visibleProducts, ...nextItems];
    }
  }
  // Quay lại trang trước đó
  goBack() {
    window.history.back();
  }
}
