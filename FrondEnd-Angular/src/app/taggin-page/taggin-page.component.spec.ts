import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagginPageComponent } from './taggin-page.component';

describe('TagginPageComponent', () => {
  let component: TagginPageComponent;
  let fixture: ComponentFixture<TagginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
