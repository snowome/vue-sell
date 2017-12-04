<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star class="star" :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <i class="icon icon-favorite" :class="{'active':favorite}"></i>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul class="supports" v-if="seller.supports" >
                    <li class="support-item border-1px" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" />
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {saveToLocal, loadFromLocal} from 'common/js/store.js';
    import Star from 'components/star/Star.vue';
    import Split from 'components/split/Split.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false);
                })(),
            }
        },
        computed: {
            favoriteText () {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        created () {
            this.classMap = ['decrease','discount','guarantee','invoice','special'];
        },
        methods: {
            initScroll () {
                this.$nextTick(function () {
                    if (!this.myScroll) {
                        this.myScroll = new this.Iscroll(this.$refs.seller, {
                            click: true
                        });
                    } else {
                        this.myScroll.refresh();
                    }
                });
            },
            initPics () {
                if (this.seller.pics) {
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - margin;
                    this.$refs.picList.style.width = width + 'px';
                    this.$nextTick(function () {
                        if (!this.picScroll) {
                            this.picScroll = new this.Iscroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventpassthrough: 'vertical',           // 这个区域只影响横向滚动
                                click: true,
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    });
                }
            },
            toggleFavorite () {
                this.favorite = !this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);

            }
        },
        watch: {
            seller () {
                this.initScroll();
                this.initPics();
            }
        },
        mounted () {
            this.initScroll();
            this.initPics();
        },
        components: {
            star: Star,
            split: Split
        },
    };
</script>
<style scoped>
    .seller {
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
    .seller .overview { position:relative; padding: 18px; }
    .seller .overview .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .seller .overview .desc {
        padding-bottom: 18px;
        font-size: 0;
    }
    .overview .desc .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
    }
    .overview .desc .text {
        display: inline-block;
        margin-right: 12px;
        vertical-align: top;
        line-height: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
    }
    .seller .overview .remark { display: flex; }
    .overview .remark .block {
        flex: 1;
        padding-top: 18px;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, .1);
    }
    .overview .remark .block:last-child { border-right-width: 0; }
    .remark .block h2 {
        margin-right: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .remark .block .content {
        line-height: 24px;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }
    .block .content .stress { font-size: 24px; }
    .seller .overview .favorite {
        position: absolute;
        right: 11px;
        top: 18px;
        width: 50px;
        text-align: center;
        cursor: pointer;
    }
    .overview .favorite .icon-favorite {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
    }
    .overview .favorite .icon-favorite.active { color: rgb(240, 20, 20); }
    .overview .favorite .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
    }
    .seller .bulletin { padding: 18px 18px 0 18px; }
    .seller .bulletin .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .seller .bulletin .content-wrapper { padding: 0 12px 16px 12px; }
    .bulletin .content-wrapper .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
    }

    .seller .supports {

    }
    .seller .supports .support-item {
        padding: 16px 12px;
        font-size: 0;
    }
    .seller .supports .support-item:last-child::after { border-top-width: 0; }
    .supports .support-item .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .supports .support-item .icon.decrease { background-image: url(decrease_4@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.decrease { background-image: url(decrease_4@3x.png); }
    }
    .supports .support-item .icon.discount { background-image: url(discount_4@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.discount { background-image: url(discount_4@3x.png); }
    }
    .supports .support-item .icon.guarantee { background-image: url(guarantee_4@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.guarantee { background-image: url(guarantee_4@3x.png); }
    }
    .supports .support-item .icon.invoice { background-image: url(invoice_4@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.invoice { background-image: url(invoice_4@3x.png); }
    }
    .supports .support-item .icon.special { background-image: url(special_4@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.special { background-image: url(special_4@3x.png); }
    }
    .supports .support-item .text {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }

    .seller .pics { padding: 18px; }
    .seller .pics .title {
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .seller .pics .pic-wrapper {
        width: 100%;
        height: 90px;
        overflow: hidden;
        white-space: normal;
    }
    .pics .pic-wrapper .pic-list { font-size: 0; }
    .pic-wrapper .pic-list .pic-item {
        display: inline-block;
        width: 120px;
        height: 90px;
        margin-right: 6px;
    }
    .pic-wrapper .pic-list .pic-item:last-child { margin-right: 0; }

    .seller .info { padding: 18px 18px 0 18px; color: rgb(7, 17, 27); }
    .seller .info .title {
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
    }
    .seller .info .info-item {
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
    }
    .seller .info .info-item:last-child:after { border-top-width: 0; }
</style>

