import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailsViewComponent } from './place-details-view.component';

describe('PlaceDetailsViewComponent', () => {
  let component: PlaceDetailsViewComponent;
  let fixture: ComponentFixture<PlaceDetailsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceDetailsViewComponent]
    });
    fixture = TestBed.createComponent(PlaceDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
