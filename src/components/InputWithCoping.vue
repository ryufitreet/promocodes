<template>
  <div>
    <div :class="$style['container']">
      <div :class="$style['input']">
        <q-input
          v-model="value"
          readonly
          outlined
          dense
          :label="label"
          @input="onInput($event.target)"
        />
      </div>
      <q-btn
        @click="copyUrl"
        push
        round
        dense
        :color="copyButtonColorType"
        :icon="copyButtonIconType"
      >
        <q-tooltip>Copy to clipbard</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const copyButtonIconType = 'eva-copy-outline';
    const copyButtonColorType = 'primary';

    return {
      copyButtonIconType,
      copyButtonColorType,
    };
  },
  methods: {
    copyUrl() {
      this.$copyText(this.value)
        .then(() => {
          this.copyButtonIconType = 'eva-checkmark-outline';
          this.copyButtonColorType = 'green';
          setTimeout(() => {
              this.copyButtonIconType = 'eva-copy-outline';
              this.copyButtonColorType = 'primary';
          }, 1500);
        })
    },
    onInput(value) {
      this.$emit('input', value);
    },
  }
}
</script>

<style module>
.input {
  width: calc(100% - 40px);
  margin-right: 10px;
}
.container {
  display: flex;
  align-items: center;
}
</style>
