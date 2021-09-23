<template>
  <form @submit.prevent="">
    <div class="row">
      <div class="col-25">
        <label>
          <slot :tab="tab">Default text</slot>
        </label>
      </div>
      <div class="col-75">
        <input :type="type" :min="0" :max="max" v-model.number="tab">
      </div>
    </div>
  </form>
</template>

<script type="ts">
export default {
  created() {
    if (this.modify != null) {
      this.tab = this.modify;
    }
  },
  name: "input-form",
  props: {
    type: {
      required: true,
      default: 'text'
    },
    max: {
      required: false,
      default: 100000
    },
    modify: {
      required: false,
      default: null
    }
  },
  data() {
    return {
      tab: '',
      to_complete: {}
    }
  }
}
</script>