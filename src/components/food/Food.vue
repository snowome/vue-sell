<template>
    <transition name="move">
        <div id="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" />
                    <div class="back" @click="hide"><i class="icon icon-arrow_lift"></i></div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cart-control :food="food"></cart-control>
                    </div>
                    <transition name="fade">
                        <div class="buy" v-show="!food.count || food.count ===0" @click.stop="addFirst($event)">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品显示</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <rating-select @rating-select-type="ratingSelectType" @rating-only-content="ratingOnlyContent" :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></rating-select>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li class="rating-item border-1px" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar" />
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">{{rating.text}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length ">咱无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {formatDate} from 'common/js/date.js';               // 引入一个函数
    import CartControl from 'components/cartcontrol/CartControl.vue';
    import Split from 'components/split/Split.vue';
    import RatingSelect from 'components/ratingselect/RatingSelect.vue';

    const ALL      = 2;     // 所有评价
    const POSITIVE = 0;     // 正面评价
    const NEGATIVE = 1;     // 负面评价

    export default {
        name: 'food',
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        methods: {
            show () {
                this.showFlag = true;
                this.selectType = ALL,
                this.onlyContent = true,
                this.desc =  {
                        all: '全部',
                        positive: '推荐',
                        negative: '吐槽'
                }
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll =  new this.Iscroll(this.$refs.food, {
                            click: true,
                        });
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            hide () {
                this.showFlag = false;
            },
            addFirst (event) {
                this.$set(this.food, 'count', 1);
                this.$emit('add-cart', event.target);
            },
            ratingSelectType (type) {
                this.selectType = type;
                this.$nextTick(function () {
                    this.scroll.refresh();
                });
            },
            ratingOnlyContent () {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(function () {
                    this.scroll.refresh();
                });
            },
            needShow (type, text) {
                if (this.onlyContent && !text ) return false;
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return this.selectType === type;
                }
            }
        },
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            'cart-control': CartControl,
            'split': Split,
            'rating-select': RatingSelect
        }
    }
</script>
<style scoped>
    #food {
        position: fixed;
        left: 50%;
        top: 0;
        bottom: 48px;
        width: 100%;
        max-width: 640px;
        transform: translateX(-50%);
        background-color: #fff;
        z-index: 1;
    }
    .move-enter-active, .move-leave-active { transition: all .2s linear; }
    .move-enter-active, .move-leave { transform: translate3d(0,0,0); }
    .move-leave-active, .move-enter { transform: translate3d(100%,0,0); }
    #food .food-content {}
    #food .food-content .image-header {
        position: relative;
        width: 100%;
        max-width: 640px;
        height: 0;
        padding-top: 100%;
        margin: 0 auto;
    }
    .food-content .image-header img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
    }
    .food-content .image-header .back {
        position: absolute;
        top: 10px;
        left: 0;
    }
    .image-header .back .icon-arrow_lift {
        display: block;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        padding: 18px;
        cursor: pointer;
    }
    #food .food-content .content {
        position: relative;
        padding: 18px;
    }
    .food-content .content .title {
        line-height: 14px;
        font-size: 14px;
        font-weight: bold;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
    }
    .food-content .content .detail {
        height: 10px;
        line-height: 10px;
        font-size: 0;
        margin-bottom: 18px;
    }
    .content .detail .sell-count, .content .detail .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .content .detail .sell-count { margin-right: 12px; }
    .food-content .content .price {
        line-height: 24px;
        font-weight: bold;
    }
    .content .price .now {
        font-size: 14px;
        color: rgb(240,20,20);
        margin-right: 8px;
    }
    .content .price .old {
        font-size: 10px;
        color: rgb(147,153,159);
        text-decoration: line-through;
    }
    #food .food-content .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    #food .food-content .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        height: 24px;
        line-height: 24px;
        font-size: 10px;
        color: #fff;
        background-color: rgb(0, 160, 220);
        box-sizing: border-box;
        padding: 0 12px;
        border-radius: 10px;
        z-index: 10;
    }
    .fade-enter-active, .fade-leave-active { transition: all .2s linear; }
    .fade-enter-active, .fade-leave { opacity: 1; }
    .fade-leave-active, .fade-enter { opacity: 0; }

    #food .info { padding: 18px; }
    #food .info .title {
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 6px;
    }
    #food .info .text {
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        padding: 0 8px;
    }

    #food .food-content .rating { padding-top: 18px; }
    .food-content .rating .title {
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        margin-left: 18px;
    }

    .food-content .rating .rating-wrapper { padding: 0 18px; }
    .rating .rating-wrapper .rating-item {
        position: relative;
        padding: 16px 0;
    }
    .rating-wrapper .rating-item .user {
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
        font-size: 0;
    }
    .rating-item .user .name {
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .rating-item .user .avatar { border-radius: 50%; }
    .rating-wrapper .rating-item .time {
        margin-bottom: 6px;
        font-size: 10px;
        line-height: 12px;
        color: rgb(147, 153, 159);
    }
    .rating-wrapper .rating-item .text {
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
    }
    .rating-item .text .icon-thumb_up, .rating-item .text .icon-thumb_down {
        margin-right: 4px;
        font-size: 12px;
        line-height: 16px;
    }
    .rating-item .text .icon-thumb_up { color: rgb(0, 160, 220); }
    .rating-item .text .icon-thumb_down { color: rgb(0, 160, 220); }
    .rating .rating-wrapper .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }


</style>
