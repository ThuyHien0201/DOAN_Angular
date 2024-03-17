import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowCheckoutComponent } from './buy-now-checkout.component';

describe('BuyNowCheckoutComponent', () => {
  let component: BuyNowCheckoutComponent;
  let fixture: ComponentFixture<BuyNowCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNowCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyNowCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
