<template>
  <div id="app">
        <div id="test">aaaaa</div>
        <mt-button type="primary" @click="add">add</mt-button>
        <mt-tabbar v-model="selected">
            <mt-tab-item :id="item.id" v-for="item in menuList" :key="item.id">
                <img slot="icon" src="/img/100x100.png">
                {{item.name}}
            </mt-tab-item>
            <!-- <mt-tab-item id="订单">
                <img slot="icon" src="/img/100x100.png">
                订单
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="/img/100x100.png">
                发现
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="/img/100x100.png">
                我的
            </mt-tab-item> -->
        </mt-tabbar>
  </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            selected: 1,
            menuList: [
                {id: 1, name: '打卡'},
                {id: 2, name: '排班'},
                {id: 3, name: '统计'}
            ]
        }
    },

    // 很少用
    beforeCreate() {
        console.log(1, '当组件创建时' , this.selected)
    },
    created() {
        this.load()
        console.log(2, '模型挂载完毕', this.selected)
    },

    // 很少用
    beforeMount() {
        console.log(3,'content', document.getElementById('test'))
        console.log(3, '组件创建完毕了')
    },
    mounted() {
        console.log(4,'content', document.getElementById('test'))
        console.log(4, '组件挂载完毕，并且dom元素已渲染')
    },

    // 很少用
    beforeUpdate() {
        // console.log(5, '模型更新前')
        // console.log(this.selected)
    },
    // 很少用
    updated() {
        // console.log(6, '模型更新后')
        // console.log(this.selected)
    },

    // 监听模型数据变化
    watch: {
        'selected'(newValue, oldValue) {
            console.log(newValue, oldValue)
        }
    },

    methods: {
        load() {
            // console.log("查询数据")
            // this.menuList.forEach(element => {
            //     console.log(element.name)
            // })

            // 回调函数原理
            // function ajax(callback) {
            //     callback('123','123')
            // }

            // ajax(function(data, data2) {
            //     console.log(data, data2)
            // })

            // 普通遍历
            this.menuList.forEach(item => {
                console.log(item)
            })

            // 允许有返回值的遍历
            let newList1 = this.menuList.map(item => {
                return {
                    menuId: item.id,
                    menuName: item.name
                }
            })
            console.log(newList1)

            // find 查找
            let item = this.menuList.find(item => item.name == '排班')
            console.log(item)

        },
        add() {
            this.menuList.push({
                id: 4, name: '设置'
            })
        },
        del() {

        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
