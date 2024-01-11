import { createApp } from 'vue';
import DashboardApp from './components/DashboardApp.vue';

const mount = (el) => {
  const app = createApp(DashboardApp);
  app.mount(el);
  // app.mount('#_dashboard-dev-root');
  // app.mount(document.querySelector('#_dashboard-dev-root'));
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// Otherwise, we are running through container
// and export mount function so container can use it wherever it wants
export { mount };
