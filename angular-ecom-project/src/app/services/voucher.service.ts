import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { voucher } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  constructor(private http: HttpClient) {}

  // Lấy danh sách các voucher từ cơ sở dữ liệu
  getVouchers(): Observable<voucher[]> {
    return this.http.get<voucher[]>('http://localhost:3000/vouchers');
  }

  // Lấy thông tin một voucher dựa trên ID
  getVoucher(id: string): Observable<voucher> {
    return this.http.get<voucher>(`http://localhost:3000/vouchers/${id}`);
  }

  // Thêm một voucher mới
  addVoucher(newVoucher: voucher): Observable<voucher> {
    return this.http.post<voucher>('http://localhost:3000/vouchers', newVoucher);
  }

  // Cập nhật thông tin một voucher dựa trên ID
  updateVoucher(updatedVoucher: voucher): Observable<voucher> {
    return this.http.put<voucher>(`http://localhost:3000/vouchers/${updatedVoucher.id}`, updatedVoucher);
  }

  // Xóa một voucher dựa trên ID
  deleteVoucher(id: string): Observable<voucher> {
    return this.http.delete<voucher>(`http://localhost:3000/vouchers/${id}`);
  }
}
