import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurveyPageComponent } from './new-survey-page.component';

describe('NewSurveyPageComponent', () => {
  let component: NewSurveyPageComponent;
  let fixture: ComponentFixture<NewSurveyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSurveyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
