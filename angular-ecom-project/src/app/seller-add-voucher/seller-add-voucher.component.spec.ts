import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddVoucherComponent } from './seller-add-voucher.component';

describe('SellerAddVoucherComponent', () => {
  let component: SellerAddVoucherComponent;
  let fixture: ComponentFixture<SellerAddVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAddVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAddVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
