import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, orderItem, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderMsg: string | undefined;
  selectedPaymentMethod: string = 'cash-on-delivery'; // Phương thức thanh toán mặc định
  user: any = {
    email: '',
    address: '',
    contact: ''
  };
  selectedVoucher: string = '';
  vouchers: any[] = [];

  // Lấy dữ liệu từ trang giỏ hàng (hoặc trang cart-page)
  cartData: cart[] = [];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
    discountFromVoucher: 0
  };
  qrImageUrl: string = '';
  qrMessage: string = '';
  isPaymentModalOpen: boolean = false;
  OrderNow: boolean = false; // Biến để kiểm tra có nên gọi placeOrder() hay không

  constructor(
    private product: ProductService,
    private userService: UserService,
    private router: Router,
  ) {
    const stateData = this.router.getCurrentNavigation()?.extras.state;
    if (stateData) {
      this.cartData = stateData['cartData'];
      this.priceSummary = stateData['priceSummary'];
      this.selectedVoucher = stateData['selectedVoucher'];
    }
  }

  ngOnInit(): void {
    this.loadVouchers();
    const userId = this.userService.getLoggedInUserId();

    if (userId) {
      this.userService.getUserById(userId).subscribe((userData) => {
        this.user = userData;
      });
    }
  }

  loadVouchers() {
    // Gọi phương thức để tải danh sách vouchers từ cơ sở dữ liệu
    this.product.getVouchersFromDatabase().subscribe((data: any[]) => {
      this.vouchers = data;
    });
  }

  orderNow() {
    if (this.selectedPaymentMethod === 'cash-on-delivery') {
      this.OrderNow = true;
    }
    if(this.OrderNow)
    {
      // Nếu là thanh toán khi nhận hàng, thực hiện đặt hàng ngay
      this.placeOrder();
      this.OrderNow = false;
    } else {
      // Nếu không phải thanh toán khi nhận hàng, mở modal
      this.openPaymentModal();
      this.OrderNow = true;
    }
  }
  openPaymentModal() {
    // Hiển thị modal
    const modal = document.getElementById('QR-Modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

closeQRModal() {
    // Tắt modal
    const modal = document.getElementById('QR-Modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

  // Hàm đặt hàng thực sự
placeOrder() {
  const userId = this.userService.getLoggedInUserId();
  let paymentMethod = this.selectedPaymentMethod;

  if (this.priceSummary.total && this.cartData.length && paymentMethod && userId) {
    let orderData: order = {
      email: this.user.email,
      address: this.user.address,
      contact: this.user.contact,
      status: 'Đang chờ xác nhận',
      totalPrice: this.priceSummary.total,
      userId: userId.toString(),
      paymentMethod: paymentMethod,
      id: 0,
      items: this.cartData.map((item: cart) => {
        const orderItem: orderItem = {
          name: item.name,
          price: item.price,
          quantity: item.quantity || 0,
          image: item.image
        };
        return orderItem;
      }
    )};

    this.cartData.forEach((item: cart) => {
      if (item.id) {
        this.product.removeToCart(item.id).subscribe(() => {
          this.loadCartDetails();
        });
      }
    });

    this.product.orderNow(orderData).subscribe((result: any) => {
      if (result) {
        this.orderMsg = "Đặt hàng thành công";
        setTimeout(() => {
          this.orderMsg = undefined;
          this.router.navigate(['/my-orders']);
        }, 4200);
      }
    });
  }
}
  loadCartDetails(): void {
    this.product.currentCart().subscribe((result: cart[] | undefined) => {
      this.cartData = result || [];
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.priceSummary.price = 0;

    this.cartData.forEach((item: cart) => {
      if (item.quantity) {
        this.priceSummary.price += +item.price * +item.quantity;
      }
    });

    // Tính tổng giảm giá theo voucher
    this.priceSummary.discountFromVoucher = 0; // Đảm bảo giá trị ban đầu là 0

    if (this.selectedVoucher) {
      const voucher = this.vouchers.find((v) => v.code === this.selectedVoucher);
      if (voucher) {
        if (voucher.discountType === 'percentage') {
          this.priceSummary.discountFromVoucher = (this.priceSummary.price * (voucher.discountValue / 100));
        } else if (voucher.discountType === 'fixed_amount') {
          this.priceSummary.discountFromVoucher = voucher.discountValue;
        }
      }
    }

    // Tính thuế VAT (ví dụ: 10%)
    this.priceSummary.tax = 0.1 * this.priceSummary.price;

    // Tính phí giao hàng (ví dụ: 100)
    this.priceSummary.delivery = 100;

    // Tính tổng cộng sau khi áp dụng giảm giá từ voucher
    this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discountFromVoucher;

    if (!this.cartData.length) {
      this.router.navigate(['/']);
    }
  }
}
