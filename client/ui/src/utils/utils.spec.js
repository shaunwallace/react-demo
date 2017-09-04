import { groupBy, parseResponse, get, handleErrors, classNames } from './index';

describe('groupBy', () => {

  it('should group an array of objects by a specified key', () => {
    const data = [
      { name: 'foo' },
      { name: 'bar' },
      { name: 'foo' },
      { name: 'baz' }
    ];

    const expected = [
      { name: 'foo' },
      { name: 'foo' },
      { name: 'bar' },
      { name: 'baz' }
    ];

    const actual = groupBy(data, 'name');

    expect(actual).toEqual(expected);
  });
});

describe('parsing returned json from fetch api call', () => {
  it('should return the json representation of a provided response object', () => {
    const response = { json: () => ({ foo: 'bar' }) };
    const actual = parseResponse()(response);
    expect(actual).toEqual({ foo: 'bar' });
  });
});

describe('Getting data from api', () => {
  it('should throw and error when no endpoint is provided', () => {
    expect(() => get(null)).toThrow(
      new Error('making an api request without an endpoint is not allowed'),
    );
    expect(() => get(false)).toThrow(
      new Error('making an api request without an endpoint is not allowed'),
    );
    expect(() => get('')).toThrow(
      new Error('making an api request without an endpoint is not allowed'),
    );
  });

  it('should throw and error when the endpoint param is not a string', () => {
    expect(() => get({})).toThrow(
      new Error(
        'making an api request requires an endpoint with the type of string but object was provided',
      ),
    );
    expect(() => get(() => {})).toThrow(
      new Error(
        'making an api request requires an endpoint with the type of string but function was provided',
      ),
    );
    expect(() => get(1)).toThrow(
      new Error(
        'making an api request requires an endpoint with the type of string but number was provided',
      ),
    );
  });
});

describe('handle errors', () => {
  it('should throw an error when a response contains an error code', () => {
    expect(() => handleErrors({ errorCode: '10001' })).toThrow(
      new Error(10001),
    );
  });

  it('should return the response when no error code is found', () => {
    expect(handleErrors({ errorCode: null })).toEqual({ errorCode: null });
  });
});

describe('classNames', () => {
  it('should return a string corresponding to the keys that have a truthy value', () => {
    const data = {
      foo: true,
      bar: false
    };

    const actual = classNames(data);
    const expected = 'foo';

    expect(actual).toEqual(expected);
  });

  it('should return an empty string when all values are falsy', () => {
    const data = {
      foo: undefined,
      bar: false
    };

    const actual = classNames(data);
    const expected = '';

    expect(actual).toEqual(expected);
  });
});