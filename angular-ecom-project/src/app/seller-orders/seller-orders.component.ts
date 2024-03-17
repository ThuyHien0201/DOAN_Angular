import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {

  orderData: order[] | undefined;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    if (orderId) {
      this.product.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          this.getOrderList();
        }
      });
    }
  }

  getOrderList() {
    this.product.orderListSeller().subscribe((result) => {
      this.orderData = result;
      // Truy xuất thông tin người dùng (user name) cho mỗi đơn đặt hàng
      this.orderData?.forEach((order) => {
        this.product.getUserbyID(order.userId).subscribe((user) => {
          order.user = user; // Lưu thông tin người dùng vào đơn đặt hàng
        });
      });
    });
  }

  confirmOrder(orderId: number) {
    // Bước 1: Gửi yêu cầu PUT để xác nhận đơn hàng trên máy chủ
    this.product.updateOrderStatus(orderId, 'Đã xác nhận').subscribe(() => {
      // Bước 2: Lấy danh sách đơn hàng sau khi đã xác nhận
      this.getOrderList();
    });
  }
  
}
