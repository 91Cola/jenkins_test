/**
 * created by junjia.wan ###### Tue Mar 20 10:15:18 CDT 2018
 */

<template>
  <div class="detail">
    <Header />

    <div class="content">
      <!-- first step -->
      <p class="step">1. {{ $t('detail.firstStep') }}</p>
      <div class="btn-join-telegram">
        <a class="box" :href="$t('register.telegramUrl')" target="_blank">{{ $t('common.joinTelegram') }}</a>
      </div>

      <!-- second step -->
      <p class="step">2. {{ $t('detail.secondStep') }}</p>
      <div class="box text">
        <p>{{ showCode }}</p>
        <button 
          class="copy" 
          v-clipboard:copy="showCode"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >{{ $t('detail.copy') }}</button>
      </div>

      <!-- three step -->
      <p class="step">3. {{ $t('detail.threeStep') }}</p>
      <div class="box text">
        <p>{{ inviteUrl }}</p>
        <button 
          class="copy" 
          v-clipboard:copy="inviteUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >{{ $t('detail.copy') }}</button>
      </div>

      <!-- invited number and atn gained -->
      <div class="invite-result">
        <div 
          :key="index"
          class="result-box"
          v-for="(item, index) in results"
        >
          <template>
            <p>{{ item.title }}</p>
            <p>{{ item.number }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Header from '../components/Header.vue';

export default {
  name: 'Dedail',
  components: {
    Header,
  },
  data() {
    return {
      results: [
        {
          title: this.$t('detail.poepleInvited'),
          number: 0,
        },
        {
          title: this.$t('detail.atnGained'),
          number: 0,
        },
      ],
      baseUrl: 'https://telegram.atn.io/?parentId=',
      code: this.$route.query.code,
      inviteUrl: '',
    };
  },
  computed: {
    showCode() {
      return `/code ${this.code}`;
    },
  },
  mounted() {
    this.getInviteUrl();
  },
  methods: {
    getInviteUrl() {
      axios.get(`/invite?code=${this.code}`).then(res => {
        const { data, status } = res;

        if (status >= 400) {
          throw new Error('Bad response from server');
        }

        const { msg } = data;

        this.inviteUrl = `${this.baseUrl}${msg._id}`;
        this.results[0].number = msg.invitedPerson;
        this.results[1].number = msg.atn;
      });
    },
    onCopy() {
      const alertStr = this.$t('detail.copied');

      alert(alertStr);
    },
    onError() {
      alert(this.$t('detail.copyError'));
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .content {
    max-width: 610px;
    padding: 0 10px;
    margin: 0 auto 50px;
    box-sizing: border-box;
    color: #fff;

    .step {
      margin: 20px 0;
      font-size: 12px;
    }

    .box {
      width: 100%;
      height: 50px;
    }

    .btn-join-telegram {
      background: linear-gradient(to left, #411ad4, #9763ef);
      border-radius: 25px;

      a {
        display: block;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-size: 18px;
        line-height: 50px;
      }
    }

    .text {
      padding-left: 12px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 25px;
      position: relative;
      overflow: hidden;

      p {
        margin: 0 130px 0 0;
        font-size: 12px;
        color: #9d9d9d;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .copy {
        width: 125px;
        height: 50px;
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        outline: none;
        border-radius: 25px;
        background: linear-gradient(to left, #411ad4, #9763ef);
        color: #fff;
        cursor: pointer;
      }
    }

    .invite-result {
      margin-top: 45px;
      display: flex;
      justify-content: space-between;

      .result-box {
        margin-left: 50px;
        flex: 1;
        height: 80px;
        border: 3px solid #9763ef;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &:first-child {
          margin-left: 0;
        }

        p {
          margin: 0;
          text-align: center;

          &:first-child {
            margin-bottom: 15px;
            font-size: 12px;
          }

          &:last-child {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
