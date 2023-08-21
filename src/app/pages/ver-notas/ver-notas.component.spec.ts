import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotasComponent } from './ver-notas.component';

describe('VerNotasComponent', () => {
  let component: VerNotasComponent;
  let fixture: ComponentFixture<VerNotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerNotasComponent]
    });
    fixture = TestBed.createComponent(VerNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
