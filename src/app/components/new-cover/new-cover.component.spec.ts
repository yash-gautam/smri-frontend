import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoverComponent } from './new-cover.component';

describe('NewCoverComponent', () => {
  let component: NewCoverComponent;
  let fixture: ComponentFixture<NewCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
