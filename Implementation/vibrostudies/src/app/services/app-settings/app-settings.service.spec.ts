import { TestBed } from '@angular/core/testing';
import { AppSettingsService } from './app-settings.service';

describe('AppSettingsService', () => {
  let service: AppSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSettingsService);
  });

  it('AppSettingsService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('AppSettingsService_initializeBooleanProperties', () => {
    expect(service.hasAmplitude).toEqual(false);
    expect(service.hasVibrator).toEqual(false);
  });

  it('AppSettingsService_setBooleanProperties', () => {
    service.hasAmplitude = true;
    service.hasVibrator = true;
    expect(service.hasAmplitude).toEqual(true);
    expect(service.hasVibrator).toEqual(true);
  });

  it('AppSettingsService_setHasAmplitudeToNullOrUndefinedError', () => {
    expect(function () {service.hasAmplitude = null}).toThrowError('Setting hasAmplitude to null or undefined is not allowed.');
    expect(function () {service.hasAmplitude = undefined}).toThrowError('Setting hasAmplitude to null or undefined is not allowed.');
  });

  it('AppSettingsService_setHasVibratorToNullOrUndefinedError', () => {
    expect(function () {service.hasVibrator = null}).toThrowError('Setting hasVibrator to null or undefined is not allowed.');
    expect(function () {service.hasVibrator = undefined}).toThrowError('Setting hasVibrator to null or undefined is not allowed.');
  });
});

