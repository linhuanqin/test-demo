export default {  
    install(Vue,options)  
    {  
      Vue.prototype.getPerInfo = { 
        firstname:'', 
        name:'',  
        jobno:'',  
        unit:'',
        dept:'',
        post:'',
      };  
      Vue.prototype.baseUrl = function () {  
         return '111';  
      };   
    }

  }