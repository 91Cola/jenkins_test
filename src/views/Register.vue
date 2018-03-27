/**
 * created by junjia.wan ###### Mon Mar 19 14:01:27 CDT 2018
 */

<template>
 <div class="register">
   <Header />

   <!-- input containor -->
   <div class="containor">
     <div class="btn-join-telegram">
       <a class="box" :href="$t('register.telegramUrl')" target="_blank">{{ $t('common.joinTelegram') }}</a>
     </div>
     <p class="invite">{{ $t('register.invite') }}</p>
     <div class="eth-input">
       <input v-model="ethAddress" type="text" :placeholder="$t('register.placeHolder')" />
     </div>
     <div class="btn-submit">
       <button @click="submit" class="box">{{ $t('register.submit') }}</button>
     </div>
     <p class="footer-text">{{ $t('register.footerText') }}</p>
   </div>
 </div>
</template>
 
<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

import { isAddress } from '../common/CheckAddress';

import Header from '../components/Header.vue';

export default {
  name: 'Register',
  components: {
    Header,
  },
  data() {
    return {
      ethAddress: '',
      parentId: '', // 暂时不知道是做什么用的... I dont know this variable means ?? ...
    };
  },
  computed: {
    ...mapGetters(['store_eth_address']),
  },
  watch: {
    store_eth_address: {
      immediate: true,
      handler(val) {
        this.ethAddress = val;
      },
    },
  },
  methods: {
    ...mapActions(['setETHAddress']),
    submit() {
      if (!isAddress(this.ethAddress)) {
        alert(this.$t('errMsg.notETHAddress'));
        return;
      }

      axios
        .post('/register', {
          parentId: this.parentId,
          ethAddress: this.ethAddress,
        })
        .then(res => {
          const { data, status } = res;

          if (status >= 400) {
            throw new Error('Bad response from server');
          }

          const { code, msg } = data;

          if (code === 200 || code === 201) {
            this.$router.push({
              name: 'detail',
              query: {
                ...this.$route.query,
                code: msg.code,
              },
            });
          } else {
            alert('error');
          }
        })
        .catch(e => {
          console.log(e);
        });

      this.setETHAddress(this.ethAddress);
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  .containor {
    max-width: 510px;
    margin: 0 auto 50px;
    padding: 0 20px;
    box-sizing: border-box;

    p {
      color: #fff;
      text-align: center;

      &.invite {
        margin: 20px 0;
        font-size: 12px;
      }
    }

    .box {
      width: 100%;
      height: 76px;
    }

    .btn-join-telegram,
    .btn-submit {
      background: linear-gradient(to left, #411ad4, #9763ef);
      border-radius: 38px;

      a,
      button {
        display: block;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-size: 24px;
        line-height: 76px;
        cursor: pointer;
      }
    }

    .btn-submit {
      margin: 25px 0 100px;
    }

    .eth-input {
      input {
        width: 100%;
        height: 76px;
        padding: 20px;
        box-sizing: border-box;
        border: none;
        outline: none;
        border-radius: 38px;
        font-size: 16px;
        text-align: center;

        &::placeholder {
          color: #9d9d9d;
          font-size: 16px;
          text-align: center;
        }
      }
    }

    .footer-text {
      font-size: 12px;
    }
  }
}
</style>
