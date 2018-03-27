/**
 * created by junjia.wan ###### Tue Mar 20 14:14:09 CDT 2018
 */

<template>
  <div class="header">
    <!-- top bar -->
    <div class="top-bar">
      <div class="atn-icon">
        <img :src="iconAtn" alt="atn">
      </div>
      <div class="atn-url">
        <div class="select">
          <Multiselect 
            v-model="showLang"
            :options="options" 
            :searchable="false" 
            :close-on-select="true"
            :hideSelected="true"
            selectLabel=""
            selectedLabel=""
            deselectLabel=""
            @select="selectLanguage"
          ></Multiselect>
        </div>
        <a :href="atnOfficialUrl">
          <img :src="iconUrl" :alt="atnOfficialUrl">
        </a>
      </div>
    </div>

  <!-- big atn -->
    <div class="big-atn">
      <p>ATN</p>
      <p>{{ $t('register.describle') }}</p>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

import iconAtn from '../assets/images/icon-09.png';
import iconUrl from '../assets/images/icon-10.png';

export default {
  name: 'Header',
  components: {
    Multiselect,
  },
  data() {
    return {
      iconAtn,
      iconUrl,
      atnOfficialUrl: 'https://atn.io',
      lang: '',
      showLang: '',
      options: ['中文', 'English'],
    };
  },
  mounted() {
    this.lang = this.$route.query.lang;
    this.showLang = this.lang === 'zh-cn' ? '中文' : 'English';
  },
  methods: {
    selectLanguage(lang) {
      // set $i18n language config
      this.$i18n.locale = lang === '中文' ? 'cn' : 'en';
      // set language will show in the page
      this.showLang = lang;

      // change the router params 'lang'
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          lang: lang === '中文' ? 'zh-cn' : 'en',
        },
      });
    },
  },
};
</script>


<style lang="less" scoped>
.header {
  .top-bar {
    padding: 35px 45px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .atn-url {
      display: flex;
      align-items: center;
    }

    .select {
      width: 100px;
      margin-right: 10px;
    }
  }

  .big-atn {
    margin: 50px 0 70px;
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
      margin: 0;
      color: #fff;

      &:first-child {
        font-size: 100px;
        margin-bottom: 25px;
      }

      &:last-child {
        font-size: 30px;
      }
    }
  }
}
</style>
