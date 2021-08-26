import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellSpanComponent } from './cell-span.component';

describe('CellSpanComponent', () => {
  let component: CellSpanComponent;
  let fixture: ComponentFixture<CellSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
