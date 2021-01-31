import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateNClockComponent } from './date-nclock.component';

describe('DateNClockComponent', () => {
  let component: DateNClockComponent;
  let fixture: ComponentFixture<DateNClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateNClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateNClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
