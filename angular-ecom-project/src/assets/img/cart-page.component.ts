import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnChanges {
    cartData: cart[] = [];
    priceSummary: priceSummary = {
        price: 0,
        discount: 0,
        tax: 0,
        delivery: 0,
        total: 0,
        discountFromVoucher: 0
    };
    vouchers: any[] = []; // Cập nhật dữ liệu của vouchers
    selectedVoucher: string = ''; // Thêm biến selectedVoucher để lưu trữ voucher được chọn
    constructor(private product: ProductService, private router: Router) {}

    ngOnInit(): void {
        this.loadDetails();
        this.loadVouchers();
    }

    loadVouchers() {
        // Gọi phương thức để tải danh sách vouchers từ cơ sở dữ liệu
        this.product.getVouchersFromDatabase().subscribe((data: any[]) => {
            this.vouchers = data;
        });
    }

    removeToCart(cartId: number | undefined) {
        if (cartId && this.cartData) {
            this.product.removeToCart(cartId).subscribe(() => {
                this.loadDetails();
            });
        }
    }

    increaseQuantity(cart: cart) {
        if (cart.quantity) {
            cart.quantity++;
            this.updateCartItem(cart);
        }
    }

    decreaseQuantity(cart: cart) {
        if (cart.quantity && cart.quantity > 1) {
            cart.quantity--;
            this.updateCartItem(cart);
        }
    }

    updateCartItem(cart: cart) {
        if (typeof cart.id === 'number') {
            // Gửi yêu cầu cập nhật cơ sở dữ liệu
            this.product.updateCartItem(cart).subscribe(() => {
                // Sau khi cập nhật thành công, cập nhật lại lưu trữ cục bộ và chi tiết giỏ hàng
                this.product.currentCart().subscribe((result) => {
                    this.cartData = result;
                    this.loadDetails();
                });
            });
        }
    }
  ngOnChanges(changes: SimpleChanges) {
      if ('selectedVoucher' in changes) {
        this.calculateDiscountFromVoucher();
      }
    }
      


  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
  
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
  
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
  
      // Gọi phương thức tính toán discountFromVoucher ở đây
      this.calculateDiscountFromVoucher();
  
      // Tính toán tổng cộng sau khi áp dụng giảm giá từ voucher
     this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discountFromVoucher;
  
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }
  onVoucherSelectionChange(voucherCode: string) {
    if (this.selectedVoucher === voucherCode) {
      this.selectedVoucher = ''; // Bỏ chọn voucher nếu nó đã được chọn
    } else {
      this.selectedVoucher = voucherCode; // Chọn voucher mới
    }
  
    // Cập nhật mảng vouchers với voucher đã chọn
    this.vouchers = this.vouchers.map((voucher) => {
      if (voucher.code === this.selectedVoucher) {
        return { ...voucher, selected: true };
      } else {
        return { ...voucher, selected: false };
      }
    });
  
    this.calculateDiscountFromVoucher(); // Tính toán lại giảm giá từ voucher đã chọn
    this.calculateTotal(); // Tính toán lại tổng cộng
  }
  

    // Thêm một phương thức để tính giá trị discountFromVoucher
  calculateDiscountFromVoucher() {
    const voucher = this.vouchers.find((v) => v.code === this.selectedVoucher);
    if (voucher) {
      let price = this.priceSummary.price;
  
      if (voucher.discountType === 'percentage') {
        this.priceSummary.discountFromVoucher = (price * (voucher.discountValue / 100));
      } else if (voucher.discountType === 'fixed_amount') {
        this.priceSummary.discountFromVoucher = voucher.discountValue;
      }
    } else {
      this.priceSummary.discountFromVoucher = 0; // Đảm bảo rằng giảm giá từ voucher bằng 0 nếu không có voucher nào được chọn.
    }
  }
  
  calculateTotal() {
    this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discountFromVoucher;
  }
  

  
 checkout() {
  // Tạo một đối tượng đơn hàng để gửi đến trang Thanh toán
  const orderData = {
    cartData: this.cartData, // Dữ liệu giỏ hàng
    priceSummary: this.priceSummary, // Tổng tiền và thông tin giảm giá đã tính toán
    selectedVoucher: this.selectedVoucher, // Voucher được chọn
    vouchers: this.vouchers, // Danh sách tất cả các voucher
  };
  
  // Chuyển đến trang Thanh toán và truyền dữ liệu đơn hàng
  this.router.navigate(['/checkout'], {
    state: orderData,
  });
}


  openVoucherListModal() {
    // Hiển thị modal
    const modal = document.getElementById('voucherListModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  closeVoucherListModal() {
    // Tắt modal
    const modal = document.getElementById('voucherListModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  clearSelectedVoucher() {
    this.selectedVoucher = '';
    this.calculateDiscountFromVoucher();
  }
    
}

