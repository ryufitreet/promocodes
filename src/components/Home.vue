<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="../assets/logo.png">
        </q-avatar>
        <q-toolbar-title>
          Promocode Creator
        </q-toolbar-title>
        <Settings />
      </q-toolbar>
      <q-tabs v-model="currentTab">
        <q-tab name="promocode" label="Add Promocode" />
        <q-tab name="history">
          <div class="text">
            History <q-badge color="purple">{{history.length}}</q-badge>
          </div>
        </q-tab>
      </q-tabs>
      </q-header>
      <q-page-container 
        :class="$style['q-page-container']"
      >
        <q-page class="q-pa-md">
          <AddPromocodeForm v-show="currentTab==='promocode'"/>
          <History v-show="currentTab==='history'"/>
        </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
import {
  mapState,
} from 'vuex';

import Settings from '@/components/Settings.vue';
import AddPromocodeForm from '@/components/AddPromocodeForm.vue';
import History from '@/components/History.vue';

export default {
  components: {
    Settings,
    AddPromocodeForm,
    History,
  },
  computed: {
    ...mapState([
      'history'
    ]),
  },
  data() {
    const currentTab = 'promocode';

    return {
      currentTab,
    };
  },
}
</script>

<style module>
  .q-page-container {
    width:500px;
    margin:auto;
  }
  @media only screen and (max-width: 520px) {
    .q-page-container {
      width: 100%;
    }    
  }
</style>
