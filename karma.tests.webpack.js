import 'babel/polyfill';

const context = require.context('./src/', true, /\.spec\.(js|jsx)$/);

context.keys().forEach(context);
