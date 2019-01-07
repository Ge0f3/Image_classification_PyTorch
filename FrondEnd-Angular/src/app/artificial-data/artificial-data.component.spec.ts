import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtificialDataComponent } from './artificial-data.component';

describe('ArtificialDataComponent', () => {
  let component: ArtificialDataComponent;
  let fixture: ComponentFixture<ArtificialDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtificialDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtificialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
