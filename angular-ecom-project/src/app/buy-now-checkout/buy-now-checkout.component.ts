import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service'; // Import the UserService
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-now-checkout',
  templateUrl: './buy-now-checkout.component.html',
  styleUrls: ['./buy-now-checkout.component.css']
})
export class BuyNowCheckoutComponent implements OnInit {
  orderMsg: string | undefined;
  selectedPaymentMethod: string = 'cash-on-delivery';
  user: any = {
    email: '',
    address: '',
    contact: ''
  };
  cartItem: any = {};
  priceSummary: any = {};
  isPaymentModalOpen: boolean = false;
  OrderNow: boolean = false;
  productQuantity: number = 1;

  constructor(
    private productService: ProductService,
    private userService: UserService, // Inject the UserService
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      const quantity = params.get('quantity');

      if (productId) {
        // Load the cart item using the obtained product ID
        this.loadCartItem(productId);

        // Set the product quantity
        this.productQuantity = quantity ? parseInt(quantity, 10) : 1;

        // Initialize priceSummary based on the loaded cart item
        this.calculateTotalPrice();
      }
    });

    const userId = this.userService.getLoggedInUserId();

    if (userId) {
      this.userService.getUserById(userId).subscribe((userData) => {
        this.user = userData;
      });
    }
  }

  loadCartItem(productId: string) {
    this.productService.getProduct(productId).subscribe((product: any) => {
      this.cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: this.productQuantity,
        image: product.image
      };


      // Initialize priceSummary based on the loaded cart item
      this.calculateTotalPrice();
    });
  }

  orderNow() {
    if (this.selectedPaymentMethod === 'cash-on-delivery') {
      this.OrderNow = true;
    }
    if (this.OrderNow) {
      // If it's cash-on-delivery, proceed with placing the order
      this.placeOrder();
      this.OrderNow = false;
    } else {
      // If it's not cash-on-delivery, open the payment modal
      this.openPaymentModal();
      this.OrderNow = true;
    }
  }

  openPaymentModal() {
    // Display the payment modal
    const modal = document.getElementById('QR-Modal');
    if (modal) {
        modal.style.display = 'block';
    }
  }

  closeQRModal() {
    // Close the payment modal
    const modal = document.getElementById('QR-Modal');
    if (modal) {
        modal.style.display = 'none';
    }
  }

  placeOrder() {
    const userId = this.userService.getLoggedInUserId(); // Use the UserService to get the user ID
    let paymentMethod = this.selectedPaymentMethod;

    if (this.priceSummary.total && this.cartItem && paymentMethod && userId) {
      const orderData = {
        email: this.user.email,
        address: this.user.address,
        contact: this.user.contact,
        status: 'Đang chờ xác nhận',
        totalPrice: this.priceSummary.total,
        userId: userId.toString(),
        paymentMethod: paymentMethod,
        id: 0,
        items: [{
          name: this.cartItem.name,
          price: this.cartItem.price,
          quantity: this.cartItem.quantity || 0,
          image: this.cartItem.image
        }]
      };

      this.productService.orderNow(orderData).subscribe((result: any) => {
        if (result) {
          this.orderMsg = 'Đặt hàng thành công';
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders']);
          }, 4200);
        }
      });
    }
  }

  calculateTotalPrice(): void {
    // Implement the logic to calculate total price
    this.priceSummary.price = this.cartItem.price * this.cartItem.quantity;

    // Assume there is no voucher or additional costs for Buy Now
    this.priceSummary.discountFromVoucher = 0;
    this.priceSummary.tax = 0;
    this.priceSummary.delivery = 0;

    // Calculate the total amount
    this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discountFromVoucher;
  }
}
