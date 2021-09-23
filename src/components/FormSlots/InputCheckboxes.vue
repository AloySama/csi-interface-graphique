<template>
  <div class="row">
    <div class="col-25">
      <slot :bool="bool"></slot>
    </div>
    <div class="col-75">
      <label class="checkbox-button">
        <input type="checkbox" class="checkbox-button__input" name="choice1" v-model="bool">
        <span class="checkbox-button__control"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (this.modify != null) this.bool = this.modify;
  },
  props: {
    modify: {
      required: false,
      default: null
    }
  },
  name: "input-checkbox",
  data() {
    return {
      bool: Boolean
    }
  }
}
</script>