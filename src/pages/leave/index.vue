<template>
    <div>
        <div class="media pad-all bord-btm">
            <div class="media-left">
                <div class="head-name">
                    {{getPerInfo.firstname}}
                </div>
            </div>
            <div class="media-body">
                <div style="margin-top:2px">
                    {{getPerInfo.name}}
                    <!-- <a class="btn-link pull-right mar-top fs16"><i class="ion-ios-calendar-outline fs18"></i> 休假明细</a> -->
                </div>
                <div class="text-remark mar-top">
                    {{getPerInfo.unit}}/{{getPerInfo.dept}}/{{getPerInfo.post}}
                </div>
            </div>
        </div>
        <div class="bord-btm mar-btm">
            <Calendar :markDateMore="arr" @choseDay="choseDay" @changeMonth="changeMonth"></Calendar>
        </div>
        <div class="pad-all">
            <!-- <div class="pos-rel mar-btm">
                <div class="mark3 text-center" style="width:16px;height:16px"></div>
                <div class="pos-abs fs14" style="left:30px;top:1px">异常</div>
            </div> -->
             <!--<div class="pos-rel mar-btm">
                <div class="mark1 text-center" style="width:16px;height:16px"></div>
                <div class="pos-abs fs14" style="left:30px;top:1px">异常</div>
            </div> -->
            <!-- <div class="pos-rel mar-btm">
                <div class="mark3 text-center" style="width:16px;height:16px"></div>
                <div class="pos-abs fs14" style="left:30px;top:1px">半天班</div>
            </div>
            <div class="pos-rel mar-btm">
                <div class="mark4 text-center" style="width:16px;height:16px"></div>
                <div class="pos-abs fs14" style="left:30px;top:1px">考勤异常</div>
            </div> -->
            <div>签到时间：{{log.morPunchtime}}</div>
            <div>签退时间：{{log.afterPunchtime}}</div>
            <div>考勤提示：{{log.kqState}}</div>
            <div style="margin-left: 30px;margin-top: 80px;">

        </div>
        </div>
    </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
export default {
    components: {
        Calendar
    },
    data() {
        return {
            arr: [],
            log:{
                morPunchtime:"",
                afterPunchtime:"",
                kqState:""
            }
        }
    },
    mounted() {
        this.load()
    },
    methods: {
         load() {
            if(this.yearMonth == null) {
                this.yearMonth = this.$utils.date.format(new Date(), 'yyyy-MM')
            }
            this.$axios.post(`/hrwebservice_hj/hrweb/getKqCheckByJobno?jobno=${this.getPerInfo.jobno}&date=${this.yearMonth}`, {}).then(data => {
                console.log(data.data)
                this.arr =  data.data
            })
        },
        // 切换月份时执行查询
        changeMonth(e) {
            this.yearMonth = this.$utils.date.format(e, 'yyyy-MM')
            // console.log(this.yearMonth)
            this.load()
        },
        choseDay(date) {
            console.log(date)
            let yearday = this.$utils.date.format(date, 'yyyy-MM-dd')
            this.$axios.post(`/hrwebservice_hj/hrweb/getKqDetailByJobno?jobno=${this.getPerInfo.jobno}&date=${yearday}`, {}).then(data => {
                // console.log(data.data)
                this.log.morPunchtime= data.data.morPunchtime
                this.log.afterPunchtime= data.data.afterPunchtime
                this.log.kqState= data.data.kqState
            })
        }
    }
}
</script>

<style>
    .wh_container{
        width:100% !important;
        max-width: 1000px !important;
    }
    .wh_top_changge{
        background: #f6f6f6;
    }
    .wh_content_all{
        background: #fff !important;
    }
    .wh_content_item{
        margin-bottom: 15px
    }
    .wh_content_item,.wh_content_li{
        color:#000 !important
    }
    .wh_jiantou1{
        border-top: 1px solid #000 !important;
        border-left: 1px solid #000 !important;
    }
    .wh_jiantou2{
        border-top: 1px solid #000 !important;
        border-right: 1px solid #000 !important;
    }

    .mark1,.mark2,.mark3,.mark4{
        color:#000 !important;
        border-radius: 50%
    }
    .mark1{      
        background:#fff !important;
        color:#000 !important;
    }
    .mark2{
        background:#fff !important;
        /* color:#720707 !important; */
        color:#fa3232 !important;
    }
    .mark3{
        background:#d4675a !important;
    }
    .mark4{
        background:#f0e552 !important;
    }
    .wh_chose_day{
        background: #41b4a9 !important;
        color:#000 !important;
    }
</style>
