import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { testUtils } from 'src/utils/test-utils';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('View Test', () => {
    it('should render title', () => {
      const dataTestId = 'friends-title';
      const selectorString = testUtils.getTestIdSelectorString(dataTestId);
      const elements = fixture.debugElement.queryAll(By.css(selectorString));
      expect(elements.length).toBe(1);
    });
  });
});
