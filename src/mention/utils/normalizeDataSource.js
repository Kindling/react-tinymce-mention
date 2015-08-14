import invariant from 'invariant';
import containsConsistantType from './containsConsistantType';

export default function validateDataSource(dataSource) {
  invariant(dataSource instanceof Array,
    'Error transforming response: `transformedDataSource` must be an array.'
  );

  // Array of ojects with a `searchKey`
  if (containsConsistantType(dataSource, 'object')) {

    // Validate that each object has `searchKey`
    invariant(dataSource.every(s => s.hasOwnProperty('searchKey') && typeof s.searchKey === 'string'),
      'Each object in the `transformedDataSource` should contain a `searchKey`'
    );

    return {
      dataSource
    };

  } else if (containsConsistantType(dataSource, 'string')) {
    const normalizedDataSource = dataSource.map(source => {
      return {
        searchKey: source,
        displayLabel: source
      }
    })
    return {
      dataSource: normalizedDataSource
    };
  } else {
    throw new Error(
      'Validation Error: `transformedDataSource` must be an array of strings ' +
      'or contain objects with a `searchKey` property.'
    );
  }
}
