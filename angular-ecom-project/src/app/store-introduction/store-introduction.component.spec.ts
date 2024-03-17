import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIntroductionComponent } from './store-introduction.component';

describe('StoreIntroductionComponent', () => {
  let component: StoreIntroductionComponent;
  let fixture: ComponentFixture<StoreIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreIntroductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
