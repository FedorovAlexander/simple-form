import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial isLoading value as false', () => {
    expect(service.isLoading.getValue()).toBeFalse();
  });

  it('should set isLoading to true when showLoader is called', () => {
    service.showLoader();
    expect(service.isLoading.getValue()).toBeTrue();
  });

  it('should set isLoading to false when hideLoader is called', () => {
    service.showLoader(); // Ensure we start from a true state
    service.hideLoader();
    expect(service.isLoading.getValue()).toBeFalse();
  });
});
