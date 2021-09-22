<template>
  <form @submit.prevent="">
    <div class="row">
      <div class="col-25">
        <label>
          <slot :tab="tab">Default text</slot>
        </label>
      </div>
      <div class="col-75">
        <input :type="type" min="0" :max="max" v-model.number="tab" > <!-- @change="$parent.$emit('form-input', tab)" -->
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "input-form",
  props: {
    type: {
      required: true,
      default: 'text'
    },
    max: {
      required: false,
      default: 50
    }
  },
  emits: ['form-input'],
  render() {
    return this.$slots.default;
  },
  data() {
    return {
      tab: ''
    }
  }
}
</script>