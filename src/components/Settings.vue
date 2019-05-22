<template>
  <div>
    <q-btn
      flat
      round
      dense
      icon="eva-settings-2-outline"
      @click="openDialog"
    />
    
    <q-dialog
      v-model="dialogOpened"
    >
      <q-card style="width: 400px">
        <q-card-section align="center">
          <div class="text-h6">Settings</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="urlTemplate"
            dense
            outlined
            label="URL Template"
            style="margin-bottom:10px;"
            :rules="[
              val => ~val.indexOf('{{PROMOCODE}}') || `You must have {{PROMOCODE}} into template!`
            ]"
          >
          </q-input>
          <q-toggle
            v-model="alwaysUpperCase"
            label="Auto uppercase"
            left-label
          />
          <div v-if="history.length > 0">
            Clear History
            <q-btn
              push
              color="red"
              @click="onClearHistoryClick"
            >
              Clear
            </q-btn>
            <q-dialog v-model="deleteHistoryConfirmOpened">
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm">Are you sure to delete all history?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="primary"
                    v-close-dialog
                  />
                  <q-btn
                    flat
                    label="Clear"
                    color="red"
                    @click="clearHistory"
                    v-close-dialog
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-card-section>
        <q-card-section
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="default"
            @click="SET_DEFAULT_SETTINGS"
          />
          <q-btn
            flat
            label="Close"
            v-close-dialog
          />
        </q-card-section>
        
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';

import {
  MUTATIONS_TYPES
} from '@/store';

const {
  SET_SETTINGS,
  SET_DEFAULT_SETTINGS,
  CLEAR_HISTORY,
} = MUTATIONS_TYPES;

export default {
  data() {
    const dialogOpened = false;
    const deleteHistoryConfirmOpened = false;
    return {
      dialogOpened,
      deleteHistoryConfirmOpened,
    };
  },
  computed: {
    ...mapState([
        'settings',
        'history',
    ]),
    urlTemplate: {
      get() {return this.settings.urlTemplate;},
      set(urlTemplate) { this.SET_SETTINGS({urlTemplate}); },
    },
    alwaysUpperCase: {
      get() {return this.settings.alwaysUpperCase;},
      set(alwaysUpperCase) { this.SET_SETTINGS({alwaysUpperCase}); },
    },
  },

  methods: {
    ...mapMutations([
      SET_SETTINGS,
      SET_DEFAULT_SETTINGS,
      CLEAR_HISTORY,
    ]),
    openDialog() {
      this.dialogOpened = true;
    },
    closeDialog() {
      this.dialogOpened = false;
    },
    onClearHistoryClick() {
      this.deleteHistoryConfirmOpened = true;
    },
    clearHistory() {
      this.CLEAR_HISTORY();
    },
  },
}
</script>

<style>

</style>
