<template>
    <div id="ratingSelect">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{'active':selectType===2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':selectType==0}" @click="select(0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" :class="{'active':selectType===1}" @click="select(1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{on:onlyContent===true}" @click="toggleContent">
            <i class="icon icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const ALL      = 2;     // 所有评价
    const POSITIVE = 0;     // 正面评价
    const NEGATIVE = 1;     // 负面评价

    export default {
        name: 'ratingSelect',
        props: {
            ratings: {
                type: Array,
                default () {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        computed: {
            positives () {
                return this.ratings.filter(function (rating) {
                   return rating.rateType === POSITIVE;
                });
            },
            negatives () {
                return this.ratings.filter(function (rating) {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            select (type) {
                this.$emit('rating-select-type', type)
            },
            toggleContent () {
                this.$emit('rating-only-content');
            }
        }
    }
</script>
<style>
    #ratingSelect {}
    #ratingSelect .rating-type { padding: 18px; margin: 0 18px; }
    #ratingSelect .rating-type .block {
        display: inline-block;
        line-height: 16px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        border-radius: 1px;
        padding: 8px 12px;
        margin-right: 8px;
    }
    #ratingSelect .rating-type .block.active { color: #fff; }
    #ratingSelect .rating-type .block.positive { background-color: rgba(0, 160, 220, .2); }
    #ratingSelect .rating-type .block.positive.active { background-color: rgb(0, 160, 220); }
    #ratingSelect .rating-type .block.negative { background-color: rgba(77, 85, 93, .2); }
    #ratingSelect .rating-type .block.negative.active { background-color: rgb(77, 85, 93); }
    .rating-type .block .count {
        font-size: 8px;
        margin-left: 2px;
    }
    #ratingSelect .switch {
        line-height: 24px;
        font-size: 0;
        color: rgb(147, 153, 159);
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        padding: 12px 18px;
    }
    #ratingSelect .switch.on .icon-check_circle { color: #00c850; }
    #ratingSelect .switch .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        margin-right: 4px;
    }
    #ratingSelect .switch .text { font-size: 12px; }

</style>
