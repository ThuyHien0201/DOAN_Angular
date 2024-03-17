import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateVoucherComponent } from './seller-update-voucher.component';

describe('SellerUpdateVoucherComponent', () => {
  let component: SellerUpdateVoucherComponent;
  let fixture: ComponentFixture<SellerUpdateVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpdateVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
