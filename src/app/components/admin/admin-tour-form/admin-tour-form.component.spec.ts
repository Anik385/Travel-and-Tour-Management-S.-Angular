import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTourFormComponent } from './admin-tour-form.component';

describe('AdminTourFormComponent', () => {
  let component: AdminTourFormComponent;
  let fixture: ComponentFixture<AdminTourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTourFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
