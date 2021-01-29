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
                </div>
                <div class="text-remark mar-top">
                    {{getPerInfo.unit}}/{{getPerInfo.dept}}/{{getPerInfo.post}}
                </div>
            </div>
        </div>
        <div>
            <div class="pad-all fs18" @click="openPicker"  style="background:#f6f6f6">
                {{yearMonthDay}} 
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
                {{item.cnt}} style="padding-left:15%;padding-right:15%" 
            </mt-cell> -->
            <mt-cell title="打卡时间" value="考勤设备"></mt-cell>
            <mt-cell :title="item.att_time"  :value="item.device_sn" v-for="(item, index) in list" :key="index"></mt-cell>
            
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
            yearMonthDay: null,
            list :[]
            // list: [{"time":"08:55","name":"ACXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"},
            //        {"time":"18:55","name":"ADXX"}]
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        
        // 加载数据
        load() {
            if(this.yearMonthDay == null) {
                this.yearMonthDay = this.$utils.date.format(new Date(), 'yyyy-MM-dd')
                this.pickerValue = this.$utils.date.format(new Date(), 'yyyy-MM-dd')
            }
            // Todo:查询后台后将值赋值给this.list显示到前台,后台返回数据格式如下，这里我写的静态数据.调用时传递this.yearMonth到后台
            this.$axios.post(`/hrwebservice_hj/hrweb/getDetail?jobno=${this.getPerInfo.jobno}&date=${this.yearMonthDay}`, {}).then(data => {
                console.log(data.data)
                this.list= data.data
                console.log(this.list)
            })
        },
        // 打开日期选择
        openPicker() {
            let picker = this.$refs.picker
            picker.open()
            // picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'  //隐藏日
        },
        // 确认选择日期并重新加载数据
        pickerConfirm(e) {
            this.yearMonthDay = this.$utils.date.format(e, 'yyyy-MM-dd')
            this.load()
        }
    }
}
</script>

<style>

</style>
