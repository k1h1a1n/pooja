import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daterange1Component } from './daterange1.component';

describe('Daterange1Component', () => {
  let component: Daterange1Component;
  let fixture: ComponentFixture<Daterange1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Daterange1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Daterange1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
