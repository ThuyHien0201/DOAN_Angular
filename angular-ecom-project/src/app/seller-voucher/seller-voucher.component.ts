import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { voucher } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-voucher',
  templateUrl: './seller-voucher.component.html',
  styleUrls: ['./seller-voucher.component.css']
})
export class SellerVoucherComponent implements OnInit {
  voucherList: voucher[] = [];
  voucherMessage: string | undefined;
  icon = faTrash;
  iconEdit = faEdit;

  currentPage = 1;
  itemsPerPage = 5;
  totalVouchers = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchVouchers();
  }

  fetchVouchers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Gửi yêu cầu GET đến API endpoint của bạn để lấy danh sách voucher.
    // Đảm bảo rằng API endpoint trả về dữ liệu voucher dưới dạng JSON.
    this.http.get('http://localhost:3000/vouchers').subscribe((data: any) => {
      this.voucherList = data.slice(startIndex, endIndex);
      this.totalVouchers = data.length;
    });
  }

  deleteVoucher(id: string) {
    // Gửi yêu cầu DELETE đến API endpoint của bạn để xóa voucher với id tương ứng.
    this.http.delete(`http://localhost:3000/vouchers/${id}`).subscribe(
      () => {
        // Xóa thành công, cập nhật danh sách voucher bằng cách gọi this.fetchVouchers().
        this.voucherMessage = 'Đã xoá Voucher';
        this.fetchVouchers();
        setTimeout(() => {
          this.voucherMessage = undefined;
        }, 3000);
      },
      (error) => {
        // Xử lý lỗi xóa voucher nếu cần
        console.error('Lỗi khi xoá voucher:', error);
      }
    );
  }
  

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalVouchers / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchVouchers();
  }
}
