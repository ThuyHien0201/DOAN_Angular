import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingPaymentGuideComponent } from './shopping-payment-guide.component';

describe('ShoppingPaymentGuideComponent', () => {
  let component: ShoppingPaymentGuideComponent;
  let fixture: ComponentFixture<ShoppingPaymentGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingPaymentGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingPaymentGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
