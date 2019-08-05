import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysdateComponent } from './todaysdate.component';

describe('TodaysdateComponent', () => {
  let component: TodaysdateComponent;
  let fixture: ComponentFixture<TodaysdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
