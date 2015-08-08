import 'babel/polyfill';

var context = require.context('../src/', true, /\.spec\.(js|jsx)$/);

context.keys().forEach(context);
