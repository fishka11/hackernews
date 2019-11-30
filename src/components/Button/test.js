import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from './index';

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button type="button">Give Me More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const tree = renderer.create(<Button type="button">Give Me More</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
