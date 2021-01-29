<template>
    <div>
        <div class="media pad-all bord-btm">
            <div class="media-left">
                <div class="circle-size head-name">
                   {{getPerInfo.firstname}}
                </div>
            </div>
           <div class="media-body">
               <div style="margin-top:2px">
                    {{getPerInfo.name}}
                    <!-- <router-link to="/statistics/checklog" >
                         <a class="btn-link pull-right mar-top fs16"><i class="ion-ios-calendar-outline fs18">
                        </i> 打卡记录</a>-->
                        <!-- <mt-button icon="back">back</mt-button>  -->
                 <!--    </router-link>   -->
                   
                </div>
                <div class="text-remark mar-top">
                    {{getPerInfo.unit}}/{{getPerInfo.dept}}/{{getPerInfo.post}}
                </div>
            </div>
        </div>
        <div>
            <div class="pad-all fs18" @click="openPicker"  style="background:#f6f6f6">
                {{yearMonth}} 
                <i class="ion-ios-search-strong fs18 pull-right text-remark"></i>
            </div>
            <mt-datetime-picker
                ref="picker"
                type="date"
                @confirm="pickerConfirm"
                v-model="pickerValue">
            </mt-datetime-picker>
        </div>
        <div>
            <!-- <mt-cell :title="item.name" is-link v-for="(item, index) in list" :key="index">
                {{item.cnt}}
            </mt-cell> -->
            <mt-cell title="应出勤" >
                {{obj.Q03Z1}} 天
            </mt-cell>
            <mt-cell title="实出勤" >
                {{obj.Q03Z2}} 天
            </mt-cell>
            <mt-cell title="迟到" >
                {{obj.Q0307}} 次
            </mt-cell>
            <mt-cell title="早退" >
                {{obj.Q0309}} 次
            </mt-cell>
            <mt-cell title="旷工" >
                <span class="text-danger">{{obj.Q0305}} 天</span>
            </mt-cell>
            <mt-cell title="事假" >
                {{obj.Q0317}} 天
            </mt-cell>
			<mt-cell title="病假" >
                {{obj.Q0319}} 天
            </mt-cell>
			<mt-cell title="年休假" >
                {{obj.Q0323}} 天
            </mt-cell>
			<mt-cell title="调休假" >
                {{obj.Q0337}} 天
            </mt-cell>
			<mt-cell title="其他" >
                <!-- {{obj.Q0335+obj.Q0321+obj.Q0327+obj.Q0325+obj.Q03Y9+obj.Q03AA+obj.Q03AB}} 天 -->
                {{obj.other}} 天
            </mt-cell>
			<mt-cell title="外出" >
                {{obj.Q0313}} 天
            </mt-cell>
			<mt-cell title="出差" >
                {{obj.Q0315}} 天
            </mt-cell>
            <mt-cell title="平时加班" >
                {{obj.Q0329}} 小时
            </mt-cell>
            <mt-cell title="公休加班" >
                {{obj.Q0331}} 小时
            </mt-cell>
            <mt-cell title="法定加班" >
                {{obj.Q0333}} 小时
            </mt-cell>
          
        </div>
         <div style="margin-left: 30px;margin-top: 80px;">

        </div>
       </div>
</template>

<script>
export default {
    data() {
        return {
            pickerValue: null,
            yearMonth: null,
            obj: []
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        // 加载数据
        load() {
            if(this.yearMonth == null) {
                this.yearMonth = this.$utils.date.format(new Date(), 'yyyy-MM')
                this.pickerValue = this.$utils.date.format(new Date(), 'yyyy-MM-dd')
            }
            // Todo:查询后台后将值赋值给this.list显示到前台,后台返回数据格式如下，这里我写的静态数据.调用时传递this.yearMonth到后台
            this.$axios.post(`/hrwebservice_hj/hrweb/getStatistic?jobno=${this.getPerInfo.jobno}&date=${this.yearMonth}`, {}).then(data => {
                this.obj= data.data[0]
                console.log(this.obj)
            })
        },
        // 打开日期选择
        openPicker() {
            let picker = this.$refs.picker
            picker.open()
            picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
        },
        // 确认选择日期并重新加载数据
        pickerConfirm(e) {
            this.yearMonth = this.$utils.date.format(e, 'yyyy-MM')
            this.load()
        }
    }
}
</script>

<style>

</style>
