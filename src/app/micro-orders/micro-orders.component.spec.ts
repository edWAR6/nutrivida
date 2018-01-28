import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroOrdersComponent } from './micro-orders.component';

describe('MicroOrdersComponent', () => {
  let component: MicroOrdersComponent;
  let fixture: ComponentFixture<MicroOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
