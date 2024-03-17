import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  recruitmentInfo: any = {};
  constructor() { }

  ngOnInit(): void {
  }
  
  submitForm() {
    // Gửi thông tin tuyển dụng (recruitmentInfo) lên máy chủ hoặc xử lý theo nhu cầu của bạn
    // Điều này có thể bao gồm việc sử dụng một dịch vụ tương tác với máy chủ
  }

}


