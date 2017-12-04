<template>
    <div id="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="scroll-wrapper">
                        <span class="title">服务态度</span>
                        <star class="star" :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="scroll-wrapper">
                        <span class="title">商品评分</span>
                        <star class="star" :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <rating-select @rating-select-type="ratingSelectType" @rating-only-content="ratingOnlyContent" :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></rating-select>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar"><img width="28" height="28" :src="rating.avatar"></div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star class="star" :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <i class="icon icon-thumb_up"></i>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {formatDate} from 'common/js/date.js';               // 引入一个函数
    import Star from 'components/star/Star.vue';
    import Split from 'components/split/Split.vue';
    import RatingSelect from 'components/ratingselect/RatingSelect.vue';

    const ALL      = 2;     // 所有评价
    const POSITIVE = 0;     // 正面评价
    const NEGATIVE = 1;     // 负面评价
    const ERR_OK = 0;
    export default {
        name: 'ratings',
        props: {
            seller: {
                type: Object,
            }
        },
        data () {
            return {
                ratings: [],
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
        created () {
            var self = this;
            this.$http.get('/api/ratings').then(function (res) {
                var response = res.data;
                if (response.errno === ERR_OK) {
                    self.ratings = response.data;
                }
                self.$nextTick(function () {
                    if (!self.scroll) {
                        self.scroll = new self.Iscroll(self.$refs.ratings, {
                            click: true
                        });
                    } else {
                        self.scroll.refresh();
                    }
                });
            }, function (res) {
                alert(22);
            });
        },
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            star: Star,
            split: Split,
            ratingSelect: RatingSelect
        },
    };
</script>
<style scoped>
    #ratings {
        position: absolute;
        top: 174px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        display: block;
        width: 100%;
        max-width: 640px;
        overflow: hidden;
    }
    #ratings .overview {
        display: flex;
        padding: 18px 0;
    }
    #ratings .overview .overview-left {
        flex: 0 0 137px;
        width: 137px;
        padding: 6px 0;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, .1);
    }
    @media (max-device-width: 320px) {
        #ratings .overview .overview-left {
            flex: 0 0 120px;
            width: 120px;
        }
    }
    .overview .overview-left .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
    }
    .overview .overview-left .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .overview .overview-left .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    #ratings .overview .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
    }
    @media (max-device-width: 320px) {
        #ratings .overview .overview-right {
            padding: 6px 0 6px 6px;
        }
    }
    .overview .overview-right .scroll-wrapper {
        margin-bottom: 8px;
        font-size: 0;
    }
    .overview-right .scroll-wrapper .title {
        display: inline-block;
        line-height: 18px;
        vertical-align: top;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .overview-right .scroll-wrapper .star {
        display: inline-block;
        vertical-align: top;
        margin: 0 12px;
    }
    .overview-right .scroll-wrapper .score {
        display: inline-block;
        line-height: 18px;
        vertical-align: top;
        font-size: 12px;
        color: rgb(255, 153, 0);
    }
    .overview .overview-right .delivery-wrapper { font-size: 0; }
    .overview-right .delivery-wrapper .title {
        line-height: 18px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .overview-right .delivery-wrapper .delivery {
        margin-left: 12px;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }

    #ratings .rating-wrapper {
        padding: 0 18px;
    }
    #ratings .rating-wrapper .rating-item {
        display: flex;
        padding: 18px 0;
    }
    .rating-wrapper .rating-item .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
    }
    .rating-item .avatar img {
        border-radius: 50%;
    }
    .rating-wrapper .rating-item .content {
        flex: 1;
        position: relative;
    }
    .rating-item .content .name {
        margin-bottom: 4px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }
    .rating-item .content .star-wrapper {
        margin-bottom: 6px;
        font-size: 0;
    }
    .content .star-wrapper .star {
        display: inline-block;
        margin-right: 6px;
        vertical-align: top;
    }
    .content .star-wrapper .delivery {
        display: inline-block;
        vertical-align: top;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .rating-item .content .text {
        margin-bottom: 8px;
        line-height: 18px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .rating-item .content .recommend {
        line-height: 12px;
        font-size: 0;
    }
    .content .recommend .icon-thumb_up, .content .recommend .item {
        display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
    }
    .content .recommend .icon-thumb_up { color: rgb(0, 160, 220); }
    .content .recommend .item {
        padding: 1px 6px;
        color: rgb(147, 153, 159);
        background-color: #fff;
        border: 1px solid rgba(7, 17, 27, .1);
        border-radius: 1px;

    }
    .rating-item .content .time {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
</style>

