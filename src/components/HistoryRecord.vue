<template>
  <div :class="$style['container']">
    <div>
      <div>
        <q-badge color="purple" style="margin-right: 5px;">{{trialDays}} Days</q-badge>
        <q-badge color="green">{{discount}} %</q-badge>
      </div>
      <div class="text-h6" style="color: var(--q-color-primary)"> {{promocode}} </div>      
      <div :class="$style['delete-btn']" >
        <q-btn
          push
          round
          dense
          color="red"
          icon="eva-trash-outline"
          :loading="deleteButtonBusy"
          @click="onClickDeleteRecord"
        >
          <q-tooltip>DELETE PROMOCODE</q-tooltip>
        </q-btn>
        <q-dialog v-model="dialogOpened">
          <q-card>
            <q-card-section>
              Are you sure to delete this PROMOCODE???
            </q-card-section>
            <q-card-section align="right">
              <q-btn flat label="Cancel" color="primary" v-close-dialog />
              <q-btn 
                v-close-dialog
                @click="deleteRecord"
                flat
                label="Delete"
                color="red"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div>
      <InputWithCoping
        :value="url"
        label="Promo URL"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import InputWithCoping from './InputWithCoping.vue';

import {
  ACTIONS_TYPES
} from '@/store.js';
const { DELETE_HISTORY_RECORD } = ACTIONS_TYPES;

export default {
  components: {
    InputWithCoping,
  },
  props: {
    promocode: {
      type: String,
      required: true,
    },
    trialDays: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    const dialogOpened = false;
    const deleteButtonBusy = false;
    return {
        dialogOpened,
        deleteButtonBusy,
    };
  },
  methods: {
    ...mapActions([
      DELETE_HISTORY_RECORD,
    ]),
    onClickDeleteRecord() {
      this.dialogOpened = true;
    },
    deleteRecord() {
      if (this.deleteButtonBusy) return;

      this.deleteButtonBusy = true;
      this.DELETE_HISTORY_RECORD(this.id)
        .then(() => {
          this.deleteButtonBusy = false;
        })
    },
    onTransitionLeave() {
      console.log(`${this.promocode} onTransitionLeave`);
    },
  },
}
</script>

<style module>
.container {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--q-color-primary);
  position: relative;
}
.delete-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>


