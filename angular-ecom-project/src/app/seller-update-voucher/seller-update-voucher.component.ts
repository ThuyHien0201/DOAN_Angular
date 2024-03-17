import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { voucher } from '../data-type';
import { VoucherService } from '../services/voucher.service';

@Component({
  selector: 'app-seller-update-voucher',
  templateUrl: './seller-update-voucher.component.html',
  styleUrls: ['./seller-update-voucher.component.css'],
})
export class SellerUpdateVoucherComponent implements OnInit {
  voucherData: voucher | undefined;
  voucherMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private voucherService: VoucherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const voucherId = this.route.snapshot.paramMap.get('id');

    if (voucherId) {
      this.voucherService.getVoucher(voucherId).subscribe((data: voucher) => {
        this.voucherData = data;
      });
    }
  }

  submit(data: voucher) {
    if (this.voucherData) {
      data.id = this.voucherData.id;
    }

    this.voucherService.updateVoucher(data).subscribe((result: any) => {
      if (result) {
        this.voucherMessage = 'Voucher đã được cập nhật';
        setTimeout(() => {
          this.voucherMessage = undefined;
        }, 3000);
        this.router.navigate(['/seller-voucher']); // Chuyển hướng đến trang quản lý voucher sau khi cập nhật.
      }
    });
  }
}
