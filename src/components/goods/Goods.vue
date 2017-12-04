<template>
    <div>
        <div id="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li class="menu-item border-1px" v-for="(item,index) in goods" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
                        <span class="text"><span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li class="food-list food-list-hook" v-for="item in goods">
                        <h1 class="title">{{item.name}}</h1>
                        <ol>
                            <li class="food-item border-1px" v-for="food in item.foods" @click="selectFood(food, $event)">
                                <div class="icon"><img :src="food.icon" width="57" height="57" /></div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc" v-show="food.description">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cart-control-wrapper"><cart-control :food="food" @cart-add="cartAdd"></cart-control></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
            <shop-cart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
        </div>
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>
<script type="text/ecmascript-6">
    import ShopCart from 'components/shopcart/ShopCart.vue';                    // 底部foot
    import CartControl from 'components/cartcontrol/CartControl.vue';           // 增加减少购物车按钮组件
    import Food from 'components/food//Food.vue';                                // 选中商品的详情页组件

    const ERR_OK = 0;
    export default {
        name: 'goods',
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: [],              // 商品
                listHeight: [],         // 存放了右边食品区每一类以上的高度
                scrollY: 0,             // 右侧当前滚动条的位置
                selectedFood: {},
            };
        },
        created () {
            this.classMap = ['decrease','discount','guarantee','invoice','special'];
            var self = this;
            this.$http.get('/api/goods').then(function (res) {
                var response = res.data;
                if (response.errno === ERR_OK) {
                  self.goods = response.data;
                }
                self.$nextTick(function () {
                    self.initScroll();
                    self.calcHeight();
                });
            }, function (res) {

            });
        },
        methods: {
            /** 点击左侧，切换到相应的右侧 **/
            selectMenu (index) {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            /** 初始化scroll **/
            initScroll () {
                var self = this;
                this.menuScroll = new this.Iscroll(this.$refs.menuWrapper, {
                    click: true,                           // 否则pc端浏览器上事件无效
                });
                this.foodsScroll = new this.Iscroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                this.foodsScroll.on('scroll',function () {
                    self.scrollY = Math.abs(Math.round(this.y));
                });
            },
            /** 计算右侧食品高度 **/
            calcHeight () {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i=0; i<foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            cartAdd (childMsg) {
                this.$nextTick(() => {
                    this.$refs.shopCart.drop(childMsg);
                })
            },
            selectFood (food, event) {
                this.selectedFood = food;
                this.$refs.food.show();
            },
        },
        computed: {
            /** 左侧的index应该在哪 **/
            currentIndex () {
                for (let i=0; i<this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods () {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        components: {
            'shop-cart': ShopCart,
            'cart-control': CartControl,
            food: Food,
        }
    };
</script>
<style scoped>
    #goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        max-width: 640px;
        overflow: hidden;
    }
    #goods .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;                                /** 写width是为了兼容，不写会在安卓浏览器上有问题 **/
        background-color: #f3f5f7;
    }
    #goods .menu-wrapper .menu-item {
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
        cursor: pointer;
    }
    #goods .menu-wrapper .menu-item.current {
        font-weight: bold;
        background-color: #fff;
        z-index: 10;
    }
    #goods .menu-wrapper .menu-item.current:after { display: none; }

    .menu-wrapper .menu-item .text {
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        height: 54px;
        font-size: 12px;
    }
    .menu-item .text .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 2px;
        background-repeat: no-repeat;
        background-size: 12px 12px;
    }
    .menu-item .text .icon.decrease { background-image: url(decrease_3@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .menu-item .text .icon.decrease { background-image: url(decrease_3@3x.png); }
    }
    .menu-item .text .icon.discount { background-image: url(discount_3@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .menu-item .text .icon.discount { background-image: url(discount_3@3x.png); }
    }
    .menu-item .text .icon.guarantee { background-image: url(guarantee_3@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .menu-item .text .icon.guarantee { background-image: url(guarantee_3@3x.png); }
    }
    .menu-item .text .icon.invoice { background-image: url(invoice_3@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .menu-item .text .icon.invoice { background-image: url(invoice_3@3x.png); }
    }
    .menu-item .text .icon.special { background-image: url(special_3@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .menu-item .text .icon.special { background-image: url(special_3@3x.png); }
    }

    #goods .foods-wrapper { flex: 1; }
    #goods .foods-wrapper .food-list { }
    .foods-wrapper .food-list .title {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: rgb(147,153,159);
        border-left: 2px solid #d9dde1;
        padding-left: 14px;
        background-color: #f3f5f7;
    }
    .foods-wrapper .food-list .food-item {
        display: flex;
        padding-bottom: 18px;
        margin: 18px 18px 0 18px;
    }
    .foods-wrapper .food-list .food-item:last-child:after { display: none; }
    .food-list .food-item .icon {
        flex: 0 0 57px;
        margin-right: 10px;
    }
    .food-list .food-item .content { flex: 1; }
    .food-item .content .name {
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
        margin: 2px 0 8px 0;
    }
    .food-item .content .desc, .food-item .content .extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147,153,159);
    }
    .food-item .content .desc { line-height:12px; margin-bottom: 8px; }
    .food-item .content .extra { margin-bottom: 2px; }
    .content .extra .count { margin-right: 12px; }
    .food-item .content .price {
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
    .food-item .content .cart-control-wrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
    }
</style>

