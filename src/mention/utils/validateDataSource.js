import invariant from 'invariant';
import containsType from './containsType';

export default function validateDataSource(source) {
  invariant(source instanceof Array,
    'Error transforming response: `transformedDataSource` must be an array.'
  );

  // Array of ojects with a `searchKey`
  if (containsType(source, 'object')) {

    // Validate that each object has `searchKey`
    invariant(source.every(s => s.hasOwnProperty('searchKey') && typeof s.searchKey === 'string'),
      'Each object in the `transformedDataSource` should contain a `searchKey`'
    );

    return source;

  } else if (containsType(source, 'string')) {
    return source;

  } else {
    throw new Error(
      'Validation Error: `transformedDataSource` must be an array of strings ' +
      'or contain objects with a `searchKey` property.'
    );
  }
}
