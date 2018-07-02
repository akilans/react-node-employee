import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';

// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';



class LocalStorageMock {
    constructor() {
      this.store = {}
    }
  
    clear() {
      this.store = {}
    }
  
    getItem(key) {
      return this.store[key] || null
    }
  
    setItem(key, value) {
      this.store[key] = value
    }
  
    removeItem(key) {
      delete this.store[key]
    }
  }

global.localStorage = new LocalStorageMock