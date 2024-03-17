import { Component } from '@angular/core';
import { VoucherService } from '../services/voucher.service';
import { voucher } from '../data-type';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-seller-add-voucher',
  templateUrl: './seller-add-voucher.component.html',
  styleUrls: ['./seller-add-voucher.component.css'],
})
export class SellerAddVoucherComponent {
  voucher: voucher = {
    id: uuidv4(), // Sử dụng uuid để tạo id ngẫu nhiên
    code: '',
    discountType: '',
    discountValue: 0,
    validUntil: new Date(),
    description: '',
    maxUses: 0,
  };

  constructor(private voucherService: VoucherService, private router: Router) {} // Inject Router

  submitVoucher() {
    // Gọi service để thêm voucher vào cơ sở dữ liệu
    this.voucherService.addVoucher(this.voucher).subscribe((result) => {
      // Xử lý kết quả sau khi thêm voucher
      console.log('Voucher đã được thêm:', result);

      // Chuyển hướng lại trang seller-voucher sau khi thêm thành công
      this.router.navigate(['/seller-voucher']);
    });
  }
}
