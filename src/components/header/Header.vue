<template>
    <div id="header">
        <div class="content-wrapper">
            <div class="avatar"><img :src="seller.avatar" alt="" width="64" height="64"/></div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon icon-keyboard_arrow_right"></i>
        </div>
        <div class="background"><img :src="seller.avatar" width="100%" height="100%" /></div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">                                      <!-- 内容区域 -->
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports" >
                            <li class="support-item" v-for="(item,index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>

                    </div>
                </div>
                <div class="detail-close" @click="hideDetail"><i class="icon icon-close"></i></div>     <!-- 关闭按钮 -->
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import Star from '../star/Star.vue';
    export default {
        props: ['seller'],
        data () {
            return {
                detailShow : false
            }
        },
        methods: {
            showDetail () {
                this.detailShow = true;
            },
            hideDetail () {
                this.detailShow = false;
            }
        },
        created () {
            this.classMap = ['decrease','discount','guarantee','invoice','special'];
        },
        components: {
            star : Star
        }
    };
</script>
<style scoped>
    #header { position: relative; color: #fff; background-color: rgba(7,17,27,.5); overflow: hidden; }
    #header .content-wrapper { position: relative; font-size: 0; padding: 24px 12px 18px 24px; }
    #header .content-wrapper .avatar { display: inline-block; vertical-align: top; }
    .content-wrapper .avatar img { border-radius: 2px; }
    #header .content-wrapper .content { display: inline-block; margin-left: 16px; }
    .content-wrapper .content .title { margin: 2px 0 8px 0; }
    .content .title .brand {
        display: inline-block;
        width: 30px;
        height: 18px;
        vertical-align: top;
        background: url(brand@2x.png) no-repeat left center;
        background-size: 100% 100%;
    }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .content .title .brand {
            background: url(brand@3x.png) no-repeat left center;
            background-size: 100% 100%;
        }
    }
    .content .title .name {
        line-height: 1;
        font-size: 16px;
        font-weight: bold;
        margin-left: 6px;
    }
    .content-wrapper .content .desc {
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
    }
    .content-wrapper .content .support {}
    .content .support .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .content .support .icon.decrease { background-image: url(decrease_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .content .support .icon.decrease { background-image: url(decrease_1@3x.png); }
    }
    .content .support .icon.discount { background-image: url(discount_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .content .support .icon.discount { background-image: url(discount_1@3x.png); }
    }
    .content .support .icon.guarantee { background-image: url(guarantee_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .content .support .icon.guarantee { background-image: url(guarantee_1@3x.png); }
    }
    .content .support .icon.invoice { background-image: url(invoice_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .content .support .icon.invoice { background-image: url(invoice_1@3x.png); }
    }
    .content .support .icon.special { background-image: url(special_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .content .support .icon.special { background-image: url(special_1@3x.png); }
    }
    .content .support .text {
        line-height: 12px;
        font-size: 10px;
        color: #fff;
    }
    .content-wrapper .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;

        text-align: center;
        background-color: rgba(0,0,0,.2);
        border-radius: 14px;
        padding: 6px 8px;
    }
    .content-wrapper .support-count .count {
        font-size: 10px;
    }
    .content-wrapper .support-count .icon-keyboard_arrow_right {
        vertical-align: -1px;
        font-size: 10px;
        margin-left: 2px;
    }

    #header .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        background-color: rgba(7,17,27,.2);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 22px 0 12px;
    }
    #header .bulletin-wrapper .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        vertical-align: -1px;
        background: url("bulletin@2x.png") no-repeat left center;
        background-size: 100% 100%;
    }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #header .bulletin-wrapper .bulletin-title { background: url("brand@3x.png") no-repeat left center; background-size: 100% 100%; }
    }
    #header .bulletin-wrapper .bulletin-text { font-size: 10px; margin: 0 4px; }
    #header .bulletin-wrapper .icon-keyboard_arrow_right {
        position: absolute;
        right: 12px;
        top: 10px;
        font-size: 10px;
    }
    #header .background {
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    #header .detail {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        overflow: auto;
        background-color: rgba(7,17,27,.8);
        -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);    /** IOS手机上背景模糊效果 **/
    }
    #header .detail .detail-wrapper { width:100%; min-height: 100%; }
    .detail .detail-wrapper .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
    }
    .detail-wrapper .detail-main .name {
        line-height: 16px;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
    }
    .detail-wrapper .detail-main .star-wrapper {
        text-align: center;
        padding: 2px 0;
        margin-top: 18px;
    }
    .detail-wrapper .detail-main .title {
        display: flex;
        width: 80%;
        margin: 28px auto 24px auto;
    }
    .detail-main .title .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255,255,255,.2);
    }
    .detail-main .title .text {
        font-size: 14px;
        font-weight: bold;
        padding: 0 12px;
    }
    .detail-wrapper .detail-main .supports { width: 80%; margin: 0 auto; }
    .detail-main .supports .support-item { font-size: 0; padding: 0 12px; margin-bottom: 12px; }
    .detail-main .supports .support-item:last-child { margin-bottom: 0; }
    .supports .support-item .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-repeat: no-repeat;
        background-size: 16px 16px;
    }
    .supports .support-item .icon.decrease { background-image: url(decrease_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.decrease { background-image: url(decrease_1@3x.png); }
    }
    .supports .support-item .icon.discount { background-image: url(discount_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.discount { background-image: url(discount_1@3x.png); }
    }
    .supports .support-item .icon.guarantee { background-image: url(guarantee_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.guarantee { background-image: url(guarantee_1@3x.png); }
    }
    .supports .support-item .icon.invoice { background-image: url(invoice_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.invoice { background-image: url(invoice_1@3x.png); }
    }
    .supports .support-item .icon.special { background-image: url(special_1@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .supports .support-item .icon.special { background-image: url(special_1@3x.png); }
    }
    .supports .support-item .text { line-height: 16px; font-size: 12px; }
    .detail-wrapper .detail-main .bulletin { width: 80%; margin: 0 auto; }
    .detail-main .bulletin .content { line-height: 24px; font-size: 12px; padding: 0 12px; margin-bottom: 16px; }



    #header .detail .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;                   /** 固定格式，必须有margin-top: -64px;  **/
        clear: both;                                 /** 固定格式 **/
        font-size: 32px;
        cursor: pointer;
    }
    .fade-enter-active, .fade-leave-active { transition: all 0.5s ease; }
    .fade-enter-active {                /** 当元素出来，变化成什么样 **/
        opacity: 1;
        background-color: rgba(7,17,27,.8);
    }
    .fade-leave-active {                /** 当元素离开或者消失，变化成什么样 **/
        opacity: 0;
        background-color: rgba(7,17,27,0);
    }
    /** fade-enter初始状态，.fade-leave离开状态，经测试：这两个class要放在fade-enter-active和fade-leave-active的后面 **/
    .fade-enter,.fade-leave { opacity: 0; background-color: rgba(7,17,27,0); }
</style>
