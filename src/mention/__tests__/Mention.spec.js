import React, { addons } from 'react/addons';
import Mention from '../Mention';

const shallowRenderer = addons.TestUtils.createRenderer();

fdescribe('Mention', () => {

  it('should render', () => {
    shallowRenderer.render(<Mention dataSource={[1, 2, 3]} />);
    const result = shallowRenderer.getRenderOutput();
  });
});
