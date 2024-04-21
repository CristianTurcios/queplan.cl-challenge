import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FilterComponent,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit input value changes', fakeAsync(() => {
    spyOn(component.filterData, 'emit');
    fixture.detectChanges();

    const inputElement = component.input.nativeElement;
    const mockValue = 'TestValue';

    inputElement.value = mockValue;
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    tick(1001);
    fixture.detectChanges();

    expect(component.filterData.emit).toHaveBeenCalledWith('testvalue');
  }));
});
