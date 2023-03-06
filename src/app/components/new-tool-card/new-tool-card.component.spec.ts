import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToolCardComponent } from './new-tool-card.component';

describe('NewToolCardComponent', () => {
  let component: NewToolCardComponent;
  let fixture: ComponentFixture<NewToolCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewToolCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewToolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
