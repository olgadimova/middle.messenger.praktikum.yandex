import { use, expect } from 'chai';
import SinonChai from 'sinon-chai';
import { createSandbox } from 'sinon';

import { isEqual } from '../helpers/is_equal.ts';
import { Component, ComponentProps } from './component.ts';

describe('Component', () => {
  use(SinonChai);

  const sandbox = createSandbox();

  class TestComponent extends Component {
    render() {
      return this.compile(`<p>Test</p>{{{lists}}}`);
    }

    public componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): boolean {
      if (isEqual(oldProps, newProps)) return false;
      return true;
    }
  }

  afterEach(() => {
    sandbox.restore();
  });

  const createInstance = (tag: string, props?: ComponentProps) => new TestComponent(tag, props ?? {});

  describe('Component rendering and passing props', () => {
    it('renders component after initialization', () => {
      const page = createInstance('div');

      const content = page.getContent();

      expect(content?.innerHTML).to.eq('<p>Test</p>');
    });

    it('passes attr props to outer element', () => {
      const page = createInstance('div', { attr: { id: '123', class: 'testClass' } });

      const content = page.getContent();

      expect(content?.outerHTML).to.eq('<div id="123" class="testClass"><p>Test</p></div>');
    });

    it('renders components provided as props list', () => {
      const listItem1 = createInstance('li', { attr: { id: 'li1' } });
      const listItem2 = createInstance('li', { attr: { id: 'li2' } });
      const page = createInstance('ul', { lists: [listItem1, listItem2] });

      const content = page.getContent();

      expect(content?.outerHTML).to.eq(
        '<ul><p>Test</p><li id="li1"><p>Test</p></li><li id="li2"><p>Test</p></li></ul>',
      );
    });

    it('rerenders component with new attr props after they change', () => {
      const page = createInstance('div', { attr: { id: '123', class: 'testClass' } });
      page.setProps({ attr: { id: '345', class: 'testClass1' } });

      const content = page.getContent();

      expect(content?.outerHTML).to.eq('<div id="345" class="testClass1"><p>Test</p></div>');
    });

    it('rerenders component with new children lists after they change', () => {
      const listItem1 = createInstance('li', { attr: { id: 'li1' } });
      const page = createInstance('ul', { attr: { id: 'ul1' }, lists: [listItem1] });

      const listItem2 = createInstance('li', { attr: { id: 'li2' } });

      page.setProps({ attr: { id: 'ul2' }, lists: [listItem2] });

      const content = page.getContent();

      expect(content?.outerHTML).to.eq('<ul id="ul2"><p>Test</p><li id="li2"><p>Test</p></li></ul>');
    });

    it('removes component when hide mthod is called', () => {
      const listItem1 = createInstance('li', { attr: { id: 'li1' } });
      const page = createInstance('div', { attr: { id: 'test1' }, lists: [listItem1] });

      listItem1.hide();

      const content = page.getContent();

      expect(content?.outerHTML).to.eq('<div id="test1"><p>Test</p></div>');
    });
  });

  describe('Lifecycle methods', () => {
    it('calls ComponentDidUpdate method when setting props', () => {
      const page = createInstance('div', { testPropId: '1' });
      const componentDidUpdateMethod = sandbox.spy(page, 'componentDidUpdate');

      page.setProps({ testPropId: '2' });

      return expect(componentDidUpdateMethod.calledOnce).to.be.true;
    });

    it('calls Render method when props change', () => {
      const page = createInstance('div', { testPropId: '1' });
      const renderMethod = sandbox.spy(page, 'render');

      page.setProps({ testPropId: '2' });

      return expect(renderMethod.calledOnce).to.be.true;
    });

    it('does not call Render method when props did not change', () => {
      const page = createInstance('div', { testPropId: '1' });
      const renderMethod = sandbox.spy(page, 'render');

      page.setProps({ testPropId: '1' });

      return expect(renderMethod.calledOnce).to.be.false;
    });
  });

  describe('State', () => {
    it('passes user state prop to component', () => {
      const user = {
        id: 1,
        first_name: 'Иван',
        second_name: 'Петров',
        display_name: '',
        phone: '123',
        login: 'ivan1',
        avatar: null,
        email: 'email@email.com',
      };

      const page = createInstance('div');

      page.setProps({
        state: {
          user,
          chats: [],
          messages: [],
        },
      });

      const { state } = page.props;

      expect(state?.user).to.eq(user);
    });

    it('passes chats state prop to component', () => {
      const user = {
        id: 1,
        first_name: 'Иван',
        second_name: 'Петров',
        display_name: '',
        phone: '123',
        login: 'ivan1',
        avatar: null,
        email: 'email@email.com',
      };

      const chats = [
        {
          id: 1,
          title: 'title',
          avatar: '123',
          unread_count: 2,
          created_by: 123,
          last_message: {
            user,
            time: '123',
            content: 'hi',
          },
        },
      ];

      const page = createInstance('div');

      page.setProps({
        state: {
          user,
          chats,
          messages: [],
        },
      });

      const { state } = page.props;

      expect(state?.chats.length).to.eq(1);
    });

    it('passes chats state prop to component', () => {
      const user = {
        id: 1,
        first_name: 'Иван',
        second_name: 'Петров',
        display_name: '',
        phone: '123',
        login: 'ivan1',
        avatar: null,
        email: 'email@email.com',
      };

      const messages = [
        {
          content: 'hi',
          id: 1,
          time: '123',
          type: 'type',
          user_id: 1,
        },
        {
          content: 'hi',
          id: 2,
          time: '123',
          type: 'type',
          user_id: 2,
        },
      ];

      const page = createInstance('div');

      page.setProps({
        state: {
          user,
          chats: [],
          messages,
        },
      });

      const { state } = page.props;

      expect(state?.messages.length).to.eq(2);
    });
  });
});
