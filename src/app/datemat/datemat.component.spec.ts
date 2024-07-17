import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatematComponent } from './datemat.component';

describe('DatematComponent', () => {
  let component: DatematComponent;
  let fixture: ComponentFixture<DatematComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatematComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatematComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
