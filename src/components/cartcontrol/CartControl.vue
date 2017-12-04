<template>
    <div id="cartControl">
        <transition name="move">
            <i class="icon-remove_circle_outline cart-decrease" v-show="food.count>0" @click.stop="decreaseCart"></i>
        </transition>
        <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
        <i class="icon-add_circle cart-add" @click.stop="addCart($event)"></i>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            food: {
                type: Object,
                default: 0
            }
        },
        methods: {
            addCart (event) {
                if (!this.food.count) {
                    this.VueAlais.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$emit('cart-add', event.target);
            },
            decreaseCart () {
                if (this.food.count) {
                    this.food.count--;
                }
            }
        },

    }
</script>
<style scoped>
    #cartControl {
        font-size: 0;
    }
    #cartControl .cart-decrease, #cartControl .cart-add {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
        padding: 6px;
        cursor: pointer;
    }
    #cartControl .cart-decrease.move-enter-active, #cartControl .cart-decrease.move-leave-active { transition: all .4s linear; }
    #cartControl .cart-decrease.move-enter-active { opacity: 1; transform: translate3d(0,0,0); }
    #cartControl .cart-decrease.move-leave-active { opacity: 0; transform: translate3d(24px,0,0); }
    #cartControl .cart-decrease.move-enter, #cartControl .cart-decrease.move-leave { opacity: 0; transform: translate3d(24px,0,0); }
    #cartControl .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        line-height: 24px;
        font-size: 10px;
        color: rgb(147,153,159);
        text-align: center;
        padding-top: 6px;
    }
    #cartControl .cart-add {

    }
</style>
