import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManusComponent } from './manus.component';

describe('ManusComponent', () => {
  let component: ManusComponent;
  let fixture: ComponentFixture<ManusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
