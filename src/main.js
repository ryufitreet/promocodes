import Vue from 'vue';
import {
  Quasar,
  QLayout,
  QHeader,
  QBtn,
  QInput,
  QSelect,
  QIcon,
  QTooltip,
  QDialog,
  QCard,
  QCardSection,
  QToggle,
  QPageContainer,
  QPage,
  QAvatar,
  QToolbar,
  QToolbarTitle,
  QTabs,
  QTab,
  QBadge,
  QCardActions,
  CloseDialog,
} from 'quasar';
import iconSet from 'quasar/icon-set/eva-icons';
import VueClipboard from 'vue-clipboard2';

import './styles/quasar.styl';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/eva-icons/eva-icons.css';

import App from './App.vue';
import store from './store';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QBtn,
    QInput,
    QSelect,
    QIcon,
    QTooltip,
    QDialog,
    QCard,
    QCardSection,
    QToggle,
    QPageContainer,
    QPage,
    QAvatar,
    QToolbar,
    QToolbarTitle,
    QTabs,
    QTab,
    QBadge,
    QCardActions,
  },
  directives: {
    CloseDialog,
  },
  plugins: {
  },
  iconSet,
  extras: [
    'eva-icons',
  ],
});

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
