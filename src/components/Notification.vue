<template>
  <v-alert v-if="notInfo" :type="notInfo.type" dense outlined>{{ notInfo.msg }}</v-alert>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',

  data: () => ({
    notInfo: null
  }),

  computed: {
    ...mapGetters(['messagePool'])
  },

  watch: {
    messagePool: function({ type, msg }) {
      this.notInfo = {
        type,
        msg
      };

      setTimeout(() => {
        this.notInfo = null;
      }, 5000);
    }
  }
};
</script>
