import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorHomeComponent } from './gerenciador-home.component';

describe('GerenciadorHomeComponent', () => {
  let component: GerenciadorHomeComponent;
  let fixture: ComponentFixture<GerenciadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerenciadorHomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GerenciadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
