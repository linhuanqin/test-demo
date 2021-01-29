<template>
<div>
    <router-view></router-view>
    <mt-tabbar v-model="selected" style="position:fixed">
        <mt-tab-item :id="item.id" v-for="item in menuList" :key="item.id" @click.native="goPath(item)">
            <img slot="icon"  :src="item.imgUrl" > 
             <!-- src="/img/100x100.png" -->
            {{item.name}}
        </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
export default {
    data() {
        return {
            selected: 1,
            menuList: [
                {id: 1, name: '首页', link: 'check',imgUrl:'/img/home.png'},
                {id: 2, name: '日历', link: 'leave',imgUrl:'/img/detail.png'},
                {id: 3, name: '统计', link: 'statistics',imgUrl:'/img/stat.png'},
                {id: 4, name: '明细', link: 'detail',imgUrl:'/img/sche.png'},
            ]
        }
    },

    methods: {
        goPath(item) {
            this.$router.push({ path: item.link})
        }
    }
}
</script>

<style>

</style>
