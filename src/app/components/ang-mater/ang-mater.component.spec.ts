import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngMaterComponent } from './ang-mater.component';

describe('AngMaterComponent', () => {
  let component: AngMaterComponent;
  let fixture: ComponentFixture<AngMaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngMaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngMaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
