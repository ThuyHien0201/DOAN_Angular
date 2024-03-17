import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerVoucherComponent } from './seller-voucher.component';

describe('SellerVoucherComponent', () => {
  let component: SellerVoucherComponent;
  let fixture: ComponentFixture<SellerVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
