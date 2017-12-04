<template>
    <div id="star" :class="starType">
        <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
    </div>
</template>
<script type="text/ecmascript-6">
    const LENGTH   = 5;           // 有几个星
    const CLS_ON   = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF  = 'off';
    export default {
        props: ['size','score'],
        computed: {
            starType () {
                return 'star-' + this.size;
            },
            itemClasses () {
                let result = [];
                let score  = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;           // 是否有小数，true有小数
                let integer = Math.floor(score);            // 整数部分
                for (let i=0; i<integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) result.push(CLS_HALF);
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    };
</script>
<style scoped>
    #star { font-size: 0; }
    #star .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }

    #star.star-24 {}
    #star.star-24 .star-item {
        width: 10px;
        height: 10px;
        background-size: 100% 100%;
        margin-right: 3px;
    }
    #star.star-24 .star-item:last-child { margin-right: 0; }
    #star.star-24 .star-item.on { background-image: url(star36_on@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-24 .star-item.on { background-image: url(star36_on@3x.png); }
    }
    #star.star-24 .star-item.half { background-image: url(star36_half@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-24 .star-item.half { background-image: url(star36_half@3x.png); }
    }
    #star.star-24 .star-item.off { background-image: url(star36_off@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-24 .star-item.of { background-image: url(star36_off@3x.png); }
    }

    #star.star-36 {}
    #star.star-36 .star-item {
        width: 15px;
        height: 15px;
        background-size: 100% 100%;
        margin-right: 6px;
    }
    #star.star-36 .star-item:last-child { margin-right: 0; }
    #star.star-36 .star-item.on { background-image: url(star36_on@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-36 .star-item.on { background-image: url(star36_on@3x.png); }
    }
    #star.star-36 .star-item.half { background-image: url(star36_half@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-36 .star-item.half { background-image: url(star36_half@3x.png); }
    }
    #star.star-36 .star-item.off { background-image: url(star36_off@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-36 .star-item.of { background-image: url(star36_off@3x.png); }
    }

    #star.star-48 {}
    #star.star-48 .star-item {
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
        margin-right: 22px;
    }
    #star.star-48 .star-item:last-child { margin-right: 0; }
    #star.star-48 .star-item.on { background-image: url(star48_on@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-48 .star-item.on { background-image: url(star48_on@3x.png); }
    }
    #star.star-48 .star-item.half { background-image: url(star48_half@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-48 .star-item.half { background-image: url(star48_half@3x.png); }
    }
    #star.star-48 .star-item.off { background-image: url(star48_off@2x.png); }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        #star.star-48 .star-item.of { background-image: url(star48_off@3x.png); }
    }

</style>