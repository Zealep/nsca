import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu02ListComponent } from './menu02-list.component';

describe('Menu02ListComponent', () => {
  let component: Menu02ListComponent;
  let fixture: ComponentFixture<Menu02ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Menu02ListComponent]
    });
    fixture = TestBed.createComponent(Menu02ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
