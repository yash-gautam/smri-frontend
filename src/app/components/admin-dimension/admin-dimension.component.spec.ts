import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDimensionComponent } from './admin-dimension.component';

describe('AdminDimensionComponent', () => {
  let component: AdminDimensionComponent;
  let fixture: ComponentFixture<AdminDimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDimensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
