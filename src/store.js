import Vue from 'vue';
import Vuex from 'vuex';

import { SERVER_URL } from '@/const';

Vue.use(Vuex);

const SET_DEFAULT_SETTINGS = 'SET_DEFAULT_SETTINGS';
const SET_RESULT_URL = 'SET_RESULT_URL';
const SET_SETTINGS = 'SET_SETTINGS';
const ADD_RECORD_TO_HISTORY = 'ADD_RECORD_TO_HISTORY';
const REMOVE_RECORD_FROM_HISTORY = 'REMOVE_RECORD_FROM_HISTORY';
const SET_HISTORY = 'SET_HISTORY';
const CLEAR_HISTORY = 'CLEAR_HISTORY';

export const MUTATIONS_TYPES = {
  SET_DEFAULT_SETTINGS,
  SET_RESULT_URL,
  SET_SETTINGS,
  SET_HISTORY,
  REMOVE_RECORD_FROM_HISTORY,
  CLEAR_HISTORY,
};

const SEND_PROMOCODE = 'SEND_PROMOCODE';
const DELETE_HISTORY_RECORD = 'DELETE_HISTORY_RECORD';
export const ACTIONS_TYPES = {
  SEND_PROMOCODE,
  DELETE_HISTORY_RECORD,
};

const defaultSettings = {
  urlTemplate: 'https://mysite.org/signup?from={{PROMOCODE}}',
  alwaysUpperCase: true,
};

const store = new Vuex.Store({
  state: {
    settings: {
      urlTemplate: 'https://mysite.org/signup?from={{PROMOCODE}}',
      alwaysUpperCase: true,
    },
    history: [],
    urlResult: '',
  },
  mutations: {
    [SET_RESULT_URL](state, value) {
      state.urlResult = value;
    },
    [SET_DEFAULT_SETTINGS](state) {
      state.settings.urlTemplate = defaultSettings.urlTemplate;
      state.settings.alwaysUpperCase = defaultSettings.alwaysUpperCase;
    },
    [SET_SETTINGS](state, payload) {
      const {
        urlTemplate = state.settings.urlTemplate,
        alwaysUpperCase = state.settings.alwaysUpperCase,
      } = payload;

      state.settings.urlTemplate = urlTemplate;
      state.settings.alwaysUpperCase = alwaysUpperCase;
    },
    [SET_HISTORY](state, payload = []) {
      payload.forEach((record) => {
        state.history.push(record);
      });
    },
    [ADD_RECORD_TO_HISTORY](state, record) {
      state.history.push(record);
    },
    [REMOVE_RECORD_FROM_HISTORY](state, id) {
      const i = state.history.findIndex(record => record.id === id);
      state.history.splice(i, 1);
    },
    [CLEAR_HISTORY](state) {
      state.history = [];
    },
  },
  actions: {
    /**
     *
     * @param {promocode, trial_days, discount} payload
     */
    [SEND_PROMOCODE]({ state, commit }, payload) {
      const { promocode, trialDays, discount } = payload;
      const urlWithPromo = state.settings.urlTemplate.replace(/{{PROMOCODE}}/g, promocode);

      const fd = new FormData();
      fd.append('panel', 'promocodes');
      fd.append('action', 'add_promocode');
      fd.append('promocode', promocode);
      fd.append('trialDays', trialDays);
      fd.append('discount', discount);

      return fetch(SERVER_URL, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })
        .then(r => r.json())
        .then((data) => {
          const { status, id } = data;
          if (status === true) {
            commit(SET_RESULT_URL, urlWithPromo);
            if (id !== 'no_history') {
              const p = Object.assign({}, payload);
              p.url = urlWithPromo;
              p.id = String(id);
              commit(ADD_RECORD_TO_HISTORY, p);
            }
          } else {
            throw new Error('Incorrect answer');
          }
        })
        .catch(e => console.error(e));
    },
    [DELETE_HISTORY_RECORD]({ commit }, recordId) {
      //  TODO ЗАПРОС НА СЕРВЕР

      const fd = new FormData();
      fd.append('panel', 'promocodes');
      fd.append('action', 'delete_promocode');
      fd.append('id', recordId);

      return fetch(SERVER_URL, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })
        .then(r => r.json())
        .then((data) => {
          const { status } = data;
          if (status === true) {
            commit(REMOVE_RECORD_FROM_HISTORY, recordId);
          }
        })
        .catch(e => console.error(e));
    },
  },
  getters: {
    historyReversed(state) {
      const copy = state.history.slice();
      return copy.reverse();
    },
  },
});

// Sync with LocalStorage
if (localStorage.base) {
  const lcBase = JSON.parse(localStorage.base);
  if (lcBase.settings) {
    store.commit(SET_SETTINGS, lcBase.settings);
  }

  if (lcBase.history) {
    store.commit(SET_HISTORY, lcBase.history);
  }
}

store.subscribe((mutation, state) => {
  const { type } = mutation;
  const subscribedMutations = [
    SET_SETTINGS,
    SET_DEFAULT_SETTINGS,
    ADD_RECORD_TO_HISTORY,
    REMOVE_RECORD_FROM_HISTORY,
    CLEAR_HISTORY,
  ];

  if (subscribedMutations.includes(type)) {
    const { settings, history } = state;
    localStorage.setItem('base', JSON.stringify({ settings, history }));
  }
});

window.vmstore = store;

export default store;
