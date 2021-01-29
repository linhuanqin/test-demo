<template>
<div>
    正在登陆……
    <!-- <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"><vue-loading> -->
</div>
</template>

<script>
// import vueLoading from 'vue-loading-template'
export default {
    // components: {
    //   vueLoading
    // },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
         let ticket = this.$route.query.ticket
         this.$axios.get(`/hrwebservice_hj/hrweb/dandian?ticket=${ticket}`).then(data=>{
             console.log(data);
            (this.getPerInfo.jobno = data.data.jobno),
            (this.getPerInfo.firstname = data.data.firstname),
            (this.getPerInfo.name = data.data.name),
            (this.getPerInfo.unit = data.data.unit),
            (this.getPerInfo.dept = data.data.dept),
            (this.getPerInfo.post = data.data.post);
             this.$router.push({path: 'check'})
         })
    }
}
</script>

<style>

</style>
