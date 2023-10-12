import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdialogueComponent } from './matdialogue.component';

describe('MatdialogueComponent', () => {
  let component: MatdialogueComponent;
  let fixture: ComponentFixture<MatdialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatdialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
