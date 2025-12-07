import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Placeholder } from './placeholder';
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

describe('Placeholder Component', () => {
  let component: Placeholder;
  let fixture: ComponentFixture<Placeholder>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Placeholder]
    }).compileComponents();

    fixture = TestBed.createComponent(Placeholder);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });
});
