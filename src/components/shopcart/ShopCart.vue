<template>
    <div id="shopCart">
        <div>
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}"><i class="icon icon-shopping_cart"></i></div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay"><div class="pay" :class="payClass">{{payDesc}}</div></div>
            </div>
            <div class="ball-container">
                <transition-group name="drop"
                                  @before-enter="beforeEnter"
                                  @enter="enter"
                                  @after-enter="afterEnter">
                    <div class="ball" v-for="(ball,index) in balls" v-if="ball.show" :key="index">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            </div>
            <transition name="fold" @enter="foldEnter" @leave="foldLeave">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food="food"></cart-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>

</template>
<script type="text/ecmascript-6">
    import CartControl from 'components/cartcontrol/CartControl.vue';           // 增加减少购物车按钮组件
    export default {
        name: 'shopCart',
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [
                        {price: 0, count: 0}
                    ];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                balls: [
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],
                dropBalls: [],
                fold: true                     // 购物车列表是否展开
            };
        },
        computed: {
            totalPrice () {
                let total = 0;
                this.selectFoods.forEach((food, index) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount () {
                let total = 0;
                this.selectFoods.forEach((food, index) => {
                    total += food.count;
                });
                return total;
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice <= this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass () {
                if (this.totalPrice <= this.minPrice) {
                   return 'not-enough';
                } else {
                   return 'enough';
                }
            },
            listShow () {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new this.Iscroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            },
        },
        methods: {
            drop (el) {
                for (let i=0; i<this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el
                        this.dropBalls.push(ball);
                        break;
                    }
                }
            },
            beforeEnter (el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                        el.style.transform = `translate3d(0, ${y}px, 0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                        inner.style.transform = `translate3d(${x}px, 0, 0)`;
                    }
                }
            },
            enter (el) {
                let rf = el.offsetHeight;           // 用于重绘，有点不理解
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0, 0, 0)';
                    el.style.transform = 'translate3d(0, 0, 0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                    inner.style.transform = 'translate3d(0, 0, 0)';
                });
            },
            afterEnter (el) {
                let ball = this.dropBalls.shift();
                ball.show = false;
                el.style.display = 'none';
            },
            foldEnter (el) {
                setTimeout(function () {
                    el.style.webkitTransform = 'translate3d(0,-100%,0)';
                    el.style.transform = 'translate3d(0,-100%,0)';
                }, 100);
            },
            foldLeave (el) {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
            },
            toggleList () {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty () {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            hideList () {
                this.fold = true;
            },
            pay () {
                if (this.totalPrice < this.minPrice ) return;
                alert(`支付${this.totalPrice}元`);
            }
        },
        components: {
            'cart-control': CartControl
        }
    };
</script>
<style scoped>
    #shopCart {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-width: 640px;
        margin: 0 auto;
        height: 48px;
        z-index: 50;
    }
    #shopCart .content {
        display: flex;
        font-size: 0;
        color: rgba(255,255,255,.4);
        background-color: #141d27;
    }
    #shopCart .content .content-left { flex: 1; }
    .content .content-left .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        padding: 6px;
        margin: 0 12px;
        background-color: rgba(0,0,0,.4);
    }
    .content-left .logo-wrapper .logo {
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 50%;
        background-color: #2b343c;
    }
    .content-left .logo-wrapper .logo.highlight { background-color: rgb(0,160,220); }
    .content-left .logo-wrapper .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        font-size: 9px;
        color: #fff;
        font-weight: 400;
        text-align: center;
        border-radius: 16px;
        background-color: rgb(240,20,20);
        box-shadow: 0 4px 8px rgba(0,0,0,.4);
    }
    .logo-wrapper .logo .icon-shopping_cart { line-height: 48px; font-size: 24px; }
    .logo-wrapper .logo.highlight .icon-shopping_cart { color: #fff; }
    .content .content-left .price {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        font-size: 16px;
        font-weight: bold;
        box-sizing: border-box;
        border-right: 1px solid rgba(255,255,255,.4);
        padding-right: 12px;
        margin-top: 12px;
    }
    .content .content-left .price.highlight { color: #fff; }
    .content .content-left .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        font-size: 10px;
        box-sizing: border-box;
        margin: 12px 0 0 12px;
    }
    #shopCart .content .content-right { flex: 0 0 105px; width: 105px; }
    .content .content-right .pay {
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        background-color: #2b333b;
    }
    .content .content-right .pay.not-enough { background-color: #2b333b; }
    .content .content-right .pay.enough { color: #fff; background-color: #00b43c; }

    .ball-container {

    }
    .ball-container .ball {
        position: absolute;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .ball-container .ball .inner {
        width: 16px;
        height: 16px;
        background-color: rgb(0,160,220);
        border-radius: 50%;
        transition: all .4s linear;
    }

    #shopCart .shopcart-list {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: -1;
        transition: all .5s linear;
    }
    #shopCart .shopcart-list .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        background-color: #f3f5f7;
    }
    .shopcart-list .list-header .title {
        float: left;
        font-size: 14px;
        color: rgb(7,17,27);
    }
    .shopcart-list .list-header .empty {
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
    }
    #shopCart .shopcart-list .list-content {
        padding: 0 18px;
        max-height: 217px;
        background-color: #fff;
        overflow: hidden;
    }
    .shopcart-list .list-content .food {
        position: relative;
        box-sizing: border-box;
        padding: 12px 0;
    }
    .list-content .food .name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7,17,27);
    }
    .list-content .food .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: bold;
        color: rgb(240, 20, 20);
    }
    .list-content .food .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    #shopCart .list-mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(7,17,27,.8);
        background-filter: blur(10px);
        z-index: -2;
    }
    .fade-enter-active, .fade-leave-active { transition: all 0.5s ease; }
    .fade-enter-active, .fade-leave {                /** 当元素出来，变化成什么样 **/
        opacity: 1;
        background-color: rgba(7,17,27,.8);
    }
    .fade-leave-active, .fade-enter {                /** 当元素离开或者消失，变化成什么样 **/
        opacity: 0;
        background-color: rgba(7,17,27,0);
    }
</style>
