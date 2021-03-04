<template>
  <div id="widget">
  </div>
</template>

<script>
import inviteWidget from './widget/inviteWidget'
export default {
  name: "invite-widget",
  mounted() {
    let widget = new inviteWidget({
      clientId: "03a23040-7b1d-11eb-b480-c7398dc5effd",
      //type
      //app id 
    })
    widget.mount("#widget")
  }
}
</script>