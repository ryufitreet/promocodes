<template>
  <div>
    <div
      v-if="history.length"
      :class="[$style['container'], 'shadow-4']"
    >
      <HistoryRecord
        v-for="record in historyReversed"
        :key="record.id"
        :url="record.url"
        :promocode="record.promocode"
        :trial-days="record.trialDays"
        :discount="record.discount"
        :id="record.id"
      />
    </div> 
  </div> 
</template>

<script>
import {
  mapState,
  mapGetters,
} from 'vuex';

import HistoryRecord from './HistoryRecord.vue';

export default {
  components: {
    HistoryRecord,
  },
  computed: {
    ...mapState([
      'history'
    ]),
    ...mapGetters(['historyReversed']),
  },
  methods: {
  },
}

</script>

<style module>
.container {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    border: 1px solid transparent;
    margin: 10px;
}
</style>
