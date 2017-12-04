<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <div class="content">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {ursParse} from 'common/js/util';
    import Header from 'components/header/Header.vue';
    const ERR_OK = 0;

    export default {
        name: 'app',
        data () {
            return {
                seller: {               // 商家
                    id: (() => {
                        let queryParm = ursParse();
                        return queryParm.id;
                    })()
                },
            }
        },
        created () {
            var self = this;
            this.$http.get('/api/seller?id=' + this.seller.id).then(function (res) {
                var response = res.data;
                if (response.errno === ERR_OK) {
//                    self.seller = response.data;
                    self.seller = Object.assign({}, self.seller, response.data);
                }
            }, function (res) {
                console.log('error');
            });
        },
        components: {
            'v-header': Header,
        }
    }
</script>
<style>
    #app { max-width: 640px; margin: 0 auto; }
    #app .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    #app .tab .tab-item {
        flex: 1;
        text-align: center;
    }
    .tab .tab-item a {
        display: block;
        font-size: 1.4rem;
        color: rgb(77, 85, 93);
    }
    .tab .tab-item a.router-link-active {
        color: rgb(240, 20, 20);
    }

</style>

