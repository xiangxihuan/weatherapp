<template>
  <div class="weather">
    <div class="content_top">
      <h1>多云</h1>
      <h2>{{cityData.province}} {{cityData.city}}</h2>
      <p>18&deg</p>
      <img src="../assets/img/logo_e.png" width="100%" alt="">
    </div>
    <div class="content_bottom">
      <ul>
        <li>
          <a href="" class="Onetime">
            <span>周一</span>
            <span>12&deg-13&deg</span>
          </a>
        </li>
        <li>
          <a href="" class="Towtime">
            <span>周二</span>
            <span>15&deg-20&deg</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    mounted(){
      this.GetUserIpAddress()
    },
    data () {
      return {
        cityData: {}
      }
    },
    methods : {
      // 获取用户的ip地址
      GetUserIpAddress () {
        this.$http.get(this.$config.GetUserIp)
          .then(success => {
            // 首先从success中获取到ip地址，然后传入 GetUserAdress() 方法
            this.GetUserAdress(success.data.ip)
          })
          .catch( error  => {
            $.toast('请检查你的网络')
          })
      },
      // 获取用户的地理位置
      GetUserAdress (ip) {
        // 通过jsonp发送ajax请求
        this.$http.jsonp(this.$config.GetUserAddress,{
          // 拼接 api接口需要的参数
          params: {
            ak: this.$config.ipConf.ak,
            ip: ip
          }
        })
          .then(success => {
            // 将获取到的数据存入 cityData 中，方便 页面使用
            this.cityData = success.data.content.address_detail
          })
          .catch(error => {
            $.toast('请检查你的网络')
          })
      }
    }
  }
</script>

<style scoped>
 .weather{
    text-align: center;
    height: 100%;
  }

  .content_top{
    padding-top: 80px;
    color: #fff;
    background: -webkit-linear-gradient(#dd4879 , #fdd73f);
    background: -o-linear-gradient(#dd4879 , #fdd73f);
    background: -moz-linear-gradient(#dd4879 , #fdd73f);
    background: linear-gradient(#dd4879 , #fdd73f);
    height: 80%;
    position: relative;
  }
  .content_top h1{
    font-weight: 500;
    margin:5px 0px;
  }
  .content_top h2{
    font-size: 20px;
    font-weight: 400;
  }
  .content_top p{
    font-size: 80px;
    margin-top: 10px;
  }
  .content_top img{
    margin-top: 98px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .content_bottom ul li{
    border-bottom: 1px solid #ccc;
  }
  .content_bottom ul li a{
    overflow:hidden ;
    display: block;
    margin: 23px 30px;
    text-align: center;
  }
  .Onetime span:first-child{
    float: left;
  }
  .Onetime span:last-child{
    float: right;
  }
  .Towtime span:first-child{
    float: left;
  }
  .Towtime span:last-child{
    float: right;
  }
</style>
