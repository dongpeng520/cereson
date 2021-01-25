<template>
  <div>
    <el-button type="text" @click="actionDialogVisible = true">
      点击打开 Dialog
    </el-button>
    <div>
      <span>活动名称</span><span>{{ name }}</span>
    </div>
    <div>
      <span>活动区域</span><span>{{ region }}</span>
    </div>
    <common-dialog v-if="actionDialogVisible" :title="dialogDetail.title" :save-val="selectAction"
                   :dialog-visible.sync="actionDialogVisible"
    >
      <template #contain>
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </common-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Select } from 'element-ui';
import CommonDialog from '@/components/CommonDialog/index.vue';
@Component({
  name: 'DraggableDialogDemo',
  components: {
    CommonDialog
  }
})
export default class extends Vue {
  private actionDialogVisible = false;
  private dialogDetail: any = {
    title: '提示1'
  };
  private form = {
    name: '',
    region: ''
  };
  region = '';
  name = '';
  private formLabelWidth = '120px';
  selectAction(data: any, data1: any) {
    this.actionDialogVisible = false;
    this.region = this.form.region;
    this.name = this.form.name
  }
}
</script>
