import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebbardComponent } from './debbard.component';

describe('DebbardComponent', () => {
  let component: DebbardComponent;
  let fixture: ComponentFixture<DebbardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebbardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebbardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
