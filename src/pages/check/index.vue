<template>
  <div class="pad-all">
    <div class="media">
      <div class="media-left pad-btm">
        <div class="circle-size head-name">{{getPerInfo.firstname}}</div>
      </div>
      <div class="media-body">
        <div style="margin-top:1px">
          {{getPerInfo.name}}
          <!-- <span class="pull-right text-remark">{{getKqInfo.totalTime}}</span> -->
        </div>
        <div class="text-remark mar-top">{{getPerInfo.unit}}/{{getPerInfo.dept}}/{{getPerInfo.post}}</div>
      </div>
    </div>
    <div class=" mar-top">
      <i class=" ion-ios-location" style="color:#ffb300"></i>
      {{getKqInfo.totalTime}}
    </div>
    <timeline>
      <timeline-item bg-color="#0391d1">
        <div >
         上班打卡  {{getKqInfo.morKqTime}}
        </div>
        <div style="margin-left: 30px;margin-top: 20px;">
          签到时间：{{getKqInfo.morPunchtime}}
        </div>
        <div style="margin-left: 30px;margin-top: 10px;">
          数据来源：{{getKqInfo.mororigin}}
        </div>
        <div style="margin-left: 30px;margin-top: 10px;">
          状态：{{getKqInfo.morPunchState}}
        </div>
      </timeline-item>
      <timeline-item bg-color="#0391d1">
        <div >
         下班打卡  {{getKqInfo.afterKqTime}}
        </div>
        <div style="margin-left: 30px;margin-top: 20px;">
          签退时间：{{getKqInfo.afterPunchtime}}
        </div>
         <div style="margin-left: 30px;margin-top: 10px;">
          数据来源：{{getKqInfo.afterorigin}}
        </div>
        <div style="margin-left: 30px;margin-top: 10px;">
          状态：{{getKqInfo.afterPunchState}}
        </div>
         
        
      </timeline-item>
      <span class=" text-remark" style="margin-left: 10px;">工作辛苦啦！</span>
    </timeline>
    <div class="text-center text-remark mar-top"></div> 
   <div style="margin-left: 30px;margin-top: 80px;">
         
        </div>
  </div>
</template>

<script>
import { Timeline, TimelineItem } from "vue-cute-timeline";
import { MessageBox } from 'mint-ui';
export default {
  components: {
    Timeline,
    TimelineItem
  },
  data() {
    return {
      getKqInfo: {
        workState:"", //工作日  非工作日
        morPunchtime:"",//早上打卡时间   第一条记录
        afterPunchtime:"",//下午打卡时间   第二条记录
        morPunchState:"",//早上打卡状态 正常/迟到
        afterPunchState:"",//下午打卡状态 正常/早退
        morKqTime: "",//上班标准打卡时间
        afterKqTime: "",//下班标准打卡时间
        mororigin:"",//数据来源
        afterorigin:"",
        morTime: "",
        afterTime: "",
        kqTime: "",      
        totalTime: "",
        distinctState:"", //实际距离中心点的距离状态
        morKqState: true,//打卡圆圈状态
        afterKqState: true,
        timelimInt:0
      },
      latlng: null,
      longitude: 0, //经度
      latitude: 0, //纬度
      currentAddress: ""
    };
  },
  mounted() {

    // let ticket = this.$route.query.ticket
    // this.$axios.get(`/hrwebservice_hj/hrweb/dandian?ticket=${ticket}`).then(data=>{
    //     console.log(data);
    //     (this.getPerInfo.jobno = data.data.jobno),
    //     (this.getPerInfo.firstname = data.data.firstname),
    //     (this.getPerInfo.name = data.data.name),
    //     (this.getPerInfo.unit = data.data.unit),
    //     (this.getPerInfo.dept = data.data.dept),
    //     (this.getPerInfo.post = data.data.post);
    // })

    // this.load(); 
    this.$axios
        .post("/hrwebservice_hj/hrweb/getTimeLim", {})
        .then(data => {         
          this.timelimInt = data.data
            // 页面加载完后显示当前时间
          this.getKqInfo.totalTime = this.dealWithTotalTime(new Date());
      });  
    
    // this.getKqInfo.kqTime = this.dealWithKqTime(new Date());
    // this.getPerInfoByJobno(this.getPerInfo.jobno);
    this.getKqInfoByJobno(this.getPerInfo.jobno);
    // 定时刷新时间
    // let _this = this;
    // 定时器
    // this.timer = setInterval(function() {
      // _this.getKqInfo.totalTime = _this.dealWithTotalTime(new Date()); // 修改数据date
      // _this.getKqInfo.kqTime = _this.dealWithKqTime(new Date());
      // _this.getKqInfo.morKqState = _this.getMorKqState();//早上打卡状态
      // _this.getKqInfo.afterKqState = _this.getAfterKqState();//下午打卡状态
      // _this.dealMap();
    // }, 1000);
    // this.timerMap = setInterval(function() {
    //    _this.dealMap();
    // }, 1000*10);
  },
  methods: {
    load() {
      var loc = new qq.maps.Geolocation(
        "MOCBZ-VZQ6K-XBCJJ-ALLJE-MH6OO-MEFHX",
        "szwelclock"
      );
      loc.getLocation(this.fixPosition, this.fixPostionError);
    },
    //获取实时位置
    // dealMap(){
    //    var loc = new qq.maps.Geolocation(
    //     "MOCBZ-VZQ6K-XBCJJ-ALLJE-MH6OO-MEFHX",
    //     "szwelclock"
    //   );
    //   loc.getLocation(this.fixPositionFB, this.fixPostionError);
    // },
    dealWithTotalTime(data) {
      let formatDateTime;
      let Y = data.getFullYear();
      let M = data.getMonth() + 1;
      let D = data.getDate();
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      let W = data.getDay();
      
      D = H > Number(this.timelimInt) ? D : D-1;
       console.log(H+'--h--'+this.timelimInt)
      W = H > Number(this.timelimInt) ? W : W-1;
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;      
      
      switch (W) {
        case 0:
          W = "天";
          break;
        case 1:
          W = "一";
          break;
        case 2:
          W = "二";
          break;
        case 3:
          W = "三";
          break;
        case 4:
          W = "四";
          break;
        case 5:
          W = "五";
          break;
        case 6:
          W = "六";
          break;
        default:
          break;
      }
      formatDateTime =
        Y + "年" + M + "月" + D + "日 " + " 星期" + W;
      return formatDateTime;
    },
    dealWithKqTime(data) {
      let formatDateTime;
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      // S = S < 10 ? "0" + S : S;
      // formatDateTime = H + ":" + Min + ":" + S;
      formatDateTime = H + ":" + Min;
      return formatDateTime;
    },
    //判断打卡状态  ---  通过位置以及权限判断  --判断外勤和内勤方式待定
    getKqState(){
        //时间
        // let startTime = new Date(Date.parse(this.getKqInfo.morKqStartTime));  
        // let endTime = new Date(Date.parse(this.getKqInfo.morKqEndTime));  
        // let currentTime = new Date(); 
        //地理位置
        let curlatitude = this.latitude;
        let curlongitude = this.longitude;

        this.$axios
        .post("/hrwebservice_hj/hrweb/getKqState?jobno=" + this.getPerInfo.jobno 
         + "&curlatitude=" + this.latitude + "&curlongitude=" + this.longitude, {})
        .then(data => {
              this.getKqInfo.morKqState=data.data;
        });    
    },
    // 注意在vue实例销毁前，清除我们的定时器。
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    //上午打卡
    punch(){
      this.getKqInfo.morKqState=true;
      if(this.getKqInfo.morKqState==true){
        console.log('punch');
        //打卡数据写入
        this.$axios.post("/hrwebservice_hj/hrweb/punch?jobno=" + this.getPerInfo.jobno 
         + "&punchtime=" + this.getKqInfo.kqTime, {})
        .then(data => {
          console.log(data.data);
          if(data.data.punchstate=='ok'){
              this.getKqInfo.morPunchtime = data.data.morPunchtime,
              this.getKqInfo.afterPunchtime = data.data.afterPunchtime,
              MessageBox.alert('打卡成功！','提示');
          }
        });
      }else{
        console.log('punch wrong');
      }
      
    },
    // //获取个人信息
    // getPerInfoByJobno(jobno) {
    //   console.log("getPerInfoByJobno--jobno" + jobno);
    //   this.$axios
    //     .post("/hrwebservice_hj/hrweb/getPerInfoByJobno?jobno=" + jobno, {})
    //     .then(data => {
    //       console.log(data.data);
    //       (this.getPerInfo.firstname = data.data.firstname),
    //         (this.getPerInfo.name = data.data.name),
    //         (this.getPerInfo.unit = data.data.unit),
    //         (this.getPerInfo.dept = data.data.dept),
    //         (this.getPerInfo.post = data.data.post);
    //     });
    // },
    //获取考勤信息
    getKqInfoByJobno(jobno) {
      console.log("getKqInfoByJobno--jobno" + jobno);
      this.$axios
        .post("/hrwebservice_hj/hrweb/getKqInfoByJobno?jobno=" + jobno, {})
        .then(data => {
            console.log(data.data),
            this.getKqInfo.workState = data.data.workState,
            this.getKqInfo.morKqTime = data.data.morKqTime,
            this.getKqInfo.afterKqTime = data.data.afterKqTime,
            this.getKqInfo.morPunchtime = data.data.morPunchtime,
            this.getKqInfo.afterPunchtime = data.data.afterPunchtime,
            this.getKqInfo.mororigin =data.data.mororigin,
            this.getKqInfo.afterorigin =data.data.afterorigin,
            // this.getKqInfo.morPunchState =  data.data.workState='非工作日'?'正常':data.data.morPunchState,
            // this.getKqInfo.afterPunchState =  data.data.workState='非工作日'?'正常':data.data.afterPunchState
            this.getKqInfo.morPunchState = data.data.morPunchState,
            this.getKqInfo.afterPunchState = data.data.afterPunchState
       
       });
    },
    // fixPositionFB(position){
    //   this.latitude = position.lat;
    //   this.longitude = position.lng;
    //   this.city = position.city;
    //   // console.log(this.latitude + "--33-" + this.longitude +'---'+ this.city );
    // },
    fixPosition(position) {
      this.latitude = position.lat;
      this.longitude = position.lng;
      this.city = position.city;
      console.log(this.latitude + "---" + this.longitude);
      this.setMap();
      var geocoder = new qq.maps.Geocoder();
      geocoder.setComplete(result => {
        this.currentAddress = result.detail.address;
      });
      geocoder.getAddress(this.latlng);
      this.getKqState();
    },
    fixPostionError() {
      this.load(); //定位失败再请求定位
    },
    setMap() {
      //设置地图中心点
      this.latlng = new qq.maps.LatLng(this.latitude, this.longitude);

      //定义工厂模式函数
      var myOptions = {
        zoom: 13, //设置地图缩放级别
        center: this.latlng, //设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP //设置地图样式详情参见MapType
      };
      // 获取dom元素添加地图信息
      var map = new qq.maps.Map(document.getElementById("map"), myOptions);
      // 给定位的位置添加图片标注
      var marker = new qq.maps.Marker({
        position: this.latlng,
        map: map
      });
      // 给定位的位置添加文本标注
      new qq.maps.Label({
        position: this.latlng,
        map: map,
        content: "我的位置"
      });
    }
  }
};
</script>

<style>
.clock {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  color: #fff;
  /* font-size: 18px; */
  font-size: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.clock.on {
  background: rgba(3, 145, 209, 0.9);
}
.clock.off {
  background: rgba(102, 111, 108, 0.9);
}
.clock .remark {
  /* font-size: 18px; */
  font-size: 25px;
  padding-top: 30px;
}
.clock .time {
  /* font-size: 13px; */
  font-size: 20px;
  margin-top: 8px;
}
.timeline-item {
  margin: 10px !important;
}
.timeline-circle {
  top: 0px;
  left: -13.6px;
  width: 6px;
  height: 6px;
}
.timeline {
  margin-left: 4px;
}
.circle-size{
  width: 50px;
  height: 50px;
}
.head-name{
  line-height: 50px;
  font-weight: 700
}
</style>
