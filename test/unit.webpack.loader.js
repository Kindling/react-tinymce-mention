/**
 * Adaptor for running TDD-based unit tests.  Looks through all directories
 * executes files with `-test` appended to filename.
 *
 * @author Christopher Pappas <christopher.pappas@kindlingapp.com>
 * @since  1.1.2015
 */

import 'babel/polyfill';

// Utilize Webpack's dynamic require to fetch only relevant files
var context = require.context('../src/', true, /\.spec\.(js|jsx)$/);

// Require matches
context.keys().forEach(context);
