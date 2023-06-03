import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cards5Component } from './cards5.component';

describe('Cards5Component', () => {
  let component: Cards5Component;
  let fixture: ComponentFixture<Cards5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cards5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cards5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
