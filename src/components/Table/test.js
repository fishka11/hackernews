import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './index';

configure({ adapter: new Adapter() });

describe('Table', () => {
  const props = {
    list: [
      {
        title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'
      },
      {
        title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'
      }
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
    onDismiss: () => 'record is dismissing',
    onSort: () => 'sorted by Title'
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const tree = renderer.create(<Table {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('shows two items in list', () => {
    const element = shallow(<Table {...props} />);
    expect(element.find('.table-row').length).toBe(2);
  });
});
