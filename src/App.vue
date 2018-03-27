<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$i18n.locale = this.$route.query.lang === 'zh-cn' ? 'cn' : 'en';
  },
};
</script>
