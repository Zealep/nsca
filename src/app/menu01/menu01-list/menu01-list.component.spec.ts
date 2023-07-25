import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu01ListComponent } from './menu01-list.component';

describe('Menu01ListComponent', () => {
  let component: Menu01ListComponent;
  let fixture: ComponentFixture<Menu01ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Menu01ListComponent]
    });
    fixture = TestBed.createComponent(Menu01ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
