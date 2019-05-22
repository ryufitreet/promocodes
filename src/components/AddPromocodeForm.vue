<template>
    <div>
        <div
            :class="[$style['container'], $style['container-form'], 'shadow-4']"
        >
            <div
                :class="$style['promocode']"
            >
                <q-input
                    :disable="!!urlRslt"
                    outlined
                    v-model="promocode"
                    @input="onPromocodeInput"
                    @keydown.enter="onMakeButtonClick"
                    label="PROMOCODE"
                />
            </div>
            <div
                :class="$style['trial']"
            >
                <q-select
                    v-model="trialDays"
                    :disable="!!urlRslt"
                    outlined
                    emit-value
                    :options="trialDaysOptions"
                    label="Trial Days"
                    map-options
                />
            </div>
            <div
                :class="$style['discount']"
            >
                <q-select
                    v-model="discount"
                    :disable="!!urlRslt"
                    outlined
                    emit-value
                    :options="discountOptions"
                    label="Discount"
                    map-options
                />
            </div>
            <q-btn
                v-if="!urlRslt"
                push
                color="primary"
                text-color="white"
                class="full-width"
                :loading="loadingAnimation"
                :disable="!makingPromocodeIsEnabled"
                @click="onMakeButtonClick"
            >
                Make Promocode
            </q-btn>
            <q-btn
                v-else
                @click="onClickNewPromocode"
                push
                color="primary"
                text-color="white"
            >
                New Promocode
            </q-btn>
        </div>

        <div
            v-if="urlRslt"
            :class="[$style['container'], 'shadow-4']"
        >
            <div
                class="text-h4"
                style="color: var(--q-color-primary);"
            >
                {{promocode}}
            </div>
            <InputWithCoping
                v-model="urlRslt"
                label="URL"
            />
            
        </div>
       
    </div>    
</template>

<script>
import {
    mapState,
    mapActions,
    mapMutations,
} from 'vuex';

import {
    MUTATIONS_TYPES,
    ACTIONS_TYPES,
} from '@/store';
const {
    CHANGE_URL_TEMPLATE,
    SET_RESULT_URL,
} = MUTATIONS_TYPES;
const {
    SEND_PROMOCODE,
} = ACTIONS_TYPES;

import Settings from './Settings.vue';
import InputWithCoping from './InputWithCoping.vue';

export default {
    components: {
        Settings,
        InputWithCoping,
    },
    data() {
        const loadingAnimation = false;
        const promocode = '';
        
        const trialDays = '';
        const trialDaysOptions = [
            {label: '14 Days', value: '14'},
            {label: '30 Days', value: '30'},
            {label: '31 Days', value: '31'},
        ];

        const discountOptions = [
            {label: '0%', value: '0'},
            {label: '30%', value: '30'},
            {label: '40%', value: '40'},
            {label: '50%', value: '50'},
            {label: '60%', value: '60'},
        ];
        const discount = '';

        const showedCopyTooltip = false;

        const promocodeFilterTimer = null;

        return {
            loadingAnimation,
            promocode,
            trialDays,
            discount,
            trialDaysOptions,
            discountOptions,
            showedCopyTooltip,
            promocodeFilterTimer,
        };
    },
    computed: {
        ...mapState({
            urlTmplt: state => state.settings.urlTemplate,
            urlRslt: state => state.urlResult,
            alwaysUpperCase: state => state.settings.alwaysUpperCase,
            settings: state => state.settings,
        }),
        urlTemplate: {
            get() { return this.urlTmplt; },
            set(v) { this.CHANGE_URL_TEMPLATE(v) },
        },
        makingPromocodeIsEnabled() {
            return !!this.promocode && !!this.trialDays && !!this.discount;
        },
    },
    methods: {
        ...mapMutations([
            CHANGE_URL_TEMPLATE,
            SET_RESULT_URL,
        ]),
        ...mapActions([
            SEND_PROMOCODE,
        ]),
        onMakeButtonClick() {
            if (!this.makingPromocodeIsEnabled) return;

            let { promocode } = this;
            if (this.settings.alwaysUpperCase) {
                promocode = promocode.toUpperCase();
            }

            this.loadingAnimation = true;
            this.SEND_PROMOCODE({
                promocode,
                trialDays: this.trialDays,
                discount: this.discount,
            })
                .then(() => {
                    this.loadingAnimation = false;
                })
        },
        copyResultLink() {
            this.$copyText(this.urlRslt)
                .then(() => {
                    this.showedCopyTooltip = true;
                    setTimeout(() => {
                        this.showedCopyTooltip = false;
                    }, 1500);
                })
                .catch((error) => {
                    // TODO показывать ошибку
                    console.log(error);
                })
        },
        onClickNewPromocode() {
            this.SET_RESULT_URL();
            this.promocode = '';
            this.trialDays = '';
            this.discount = '';
        },
        onPromocodeInput() {
            if (this.settings.alwaysUpperCase) {
                clearTimeout(this.promocodeFilterTimer);
                this.promocodeFilterTimer = setTimeout(() => {
                    this.promocode = this.promocode.toUpperCase();    
                }, 500);    
            }            
        },
    },
}
</script>

<style module>
.container {
    padding: 10px;
    margin: 10px;
}
.container-form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.promocode {
    flex-grow: 2;
    margin-bottom: 10px;
}
.trial {
    flex-grow: 1;
    margin-bottom: 10px;
}
.discount {
    flex-grow: 1;
    margin-bottom: 10px;
}
.result-url {
    width: calc(100% - 40px);

}
</style>
