import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from '../node_modules/react-redux/es/exports';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}> <App /> </Provider>);
