import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageServiceService', () => {
  let service: StorageService;
  const key = 'Schlüssel';
  const another_key = 'Schlüssel 2';
  const data = 'Hallo';
  const new_data = 'Hallo 2';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('StorageService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('StorageService_getData', () => {
    service.set(key, data);
    expect(service.get(key)).toEqual(data);
  });

  it('StorageService_setData', () => {
    service.set(key, data);
    service.set(key, new_data);
    expect(service.get(key)).toEqual(new_data);
  });

  it('StorageService_clearStorage', () => {
    service.set(key, data);
    service.set(another_key, new_data);
    service.clear();
    expect(function () {service.get(key)}).toThrowError('No such data with given key found in local storage.')
  });

  it('StorageService_removeItem', () => {
    service.set(key, data);
    service.remove(key);
    expect(function () {service.get(key)}).toThrowError('No such data with given key found in local storage.')
  });

  it('StorageService_setToNullOrUndefinedError', () => {
    expect(function () { service.set(null, data)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(key, null)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(null, null)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(null, undefined)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(undefined, null)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(undefined, data)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(key, undefined)}).toThrowError('Key or data is null or undefined.');
    expect(function () { service.set(undefined, undefined)}).toThrowError('Key or data is null or undefined.');
  });
});

