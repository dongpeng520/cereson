<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <slot name="contain" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'CommonDialog'
})
export default class CommonDialog extends Vue {
  @Prop() title?: string; // 大标题
  @Prop() saveVal!: () => void;
  @Prop() dialogVisible!: boolean;
  data = '';
  handleClose() {
    this.$emit('update:dialogVisible', false);
  }
  submit() {
    this.$props.saveVal();
  }
}

</script>

<style lang="scss" scoped>

</style>
