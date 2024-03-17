// // zalopay.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// // import * as CryptoJS from 'crypto-js';

// @Injectable({
//   providedIn: 'root',
// })
// export class ZaloPayService {
//   private readonly appID = '2554';
//   private readonly key1 = 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn';
//   private readonly key2 = 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf';
//   private readonly endpoint = 'https://sandbox.zalopay.com.vn/v001/tpe/createorder';

//   constructor(private http: HttpClient) {}

//   generateMac(appTransID: string, appTime: number, amount: number, embedData: string): string {
//     const rawData = `${this.key1}|${appTransID}|${appTime}|${amount}|${embedData}`;
//     const mac = CryptoJS.HmacSHA256(rawData, this.key1).toString(CryptoJS.enc.Hex);
//     return mac;
//   }

//   createOrder(appTransID: string, appTime: number, amount: number, embedData: string) {
//     const mac = this.generateMac(appTransID, appTime, amount, embedData);
//     const data = {
//       appid: this.appID,
//       apptransid: appTransID,
//       appuser: 'userID', // replace with actual user ID
//       appusername: 'userName', // replace with actual username
//       amount: amount,
//       apptime: appTime,
//       item: 'Thanh toán đơn hàng',
//       embeddata: embedData,
//       description: 'Mô tả đơn hàng',
//       bankcode: 'zalopayapp',
//       isembed: '1',
//       mac: mac,
//     };

//     return this.http.post(this.endpoint, data);
//   }
// }
