export function parseResponse(type) {
  return res => {
    switch(type) {
      case 'json':
        return res.json();
      case 'text':
        return res.text();
      default:
        return res.json();
    }
  }
}

export function checkStatus(response = {}) {
  // if our response is valid then simply return the response
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // throw an error here to be caught by our promise chain's catch
  // and add the error object details along with the error thrown
  throw new Error(response.status);
}

export function handleErrors(response) {
  // throw an error here to be caught by our promise chain's catch
  // and add the error object details along with the error thrown
  if (response.errorCode) {
    throw new Error(response.errorCode);
  }
  // otherwise handle the success
  return response;
}

export function get(endpoint = '/', req = {}, responseParseType = 'json') {
  if (!endpoint) {
    throw new Error('making an api request without an endpoint is not allowed');
  } else if (typeof endpoint !== 'string') {
    throw new Error(
      `making an api request requires an endpoint with the type of string but ${typeof endpoint} was provided`,
    );
  }
  // when the response resolves we check the status as fetch won't
  // reject on HTTP error status even if the response is an HTTP 404 or 500
  //
  // then parse the response from a successful response based on the responseParseType param
  // if not supplied then this method returns the promise itself
  return fetch(endpoint, req)
    .then(checkStatus)
    .then(responseParseType ? parseResponse(responseParseType) : r => r)
    .then(handleErrors);
}

export function classNames(obj) {
  return Object.keys(obj)
    .map(key => { if (obj[key]) return key; })
    .join(' ')
    .trim();
}

function binarySearch(items, value, property) {
  var start = 0;
  var end = items.length - 1;
  var middle = Math.floor((start + end) / 2);

  while(items[middle][property] !== value && start < end) {
    if(items[middle][property] > value) {
      // move end to be the new middle
      end = middle - 1;
    } else {
      // move start to be the new middle
      start = middle + 1;
    }

    middle = Math.floor((start + end) / 2);
  }

  return items[middle][property] === value ? middle : -1;
}

export function updateItem(array, id, key) {
  const index = binarySearch(array, id, key);

  if (index !== -1) {
    const titles = array.map((v, i) => (
      i === index ? 
        {...v, selected: true } : v.selected ? 
        {...v, selected: false } : v
      )
    );

    return {
      titles
    }
  }

  return { titles: array };
}

export function noop(){}