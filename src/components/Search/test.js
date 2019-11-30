import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './index';

configure({ adapter: new Adapter() });

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search value="test value" onChange={() => 'input is changing now'} onSubmit={() => 'Form is submitting now...'}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const tree = renderer.create(<Search value="test value" onChange={() => 'input is changing now'} onSubmit={() => 'Form is submitting now...'}>Search</Search>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
