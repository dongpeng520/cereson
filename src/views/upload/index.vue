<template>
  <div>
    <template>
      <el-dialog title="预览" :visible.sync="centerDialogVisible" width="30%"
                 center
      >
        <img :src="form.uploadBusinessLicense" style="width: 100%;">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <div class="upload">
      <el-upload ref="upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                 :on-change="onchange" :on-preview="handlePreview" :on-remove="handleRemove()"
                 :before-remove="beforeRemove"
                 :file-list="fileList" :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">
          {{ form.uploadBusinessLicense?'重新上传':'上传文件' }}
        </el-button>
        <div slot="tip" class="el-upload__tip">
          上传图片格式包含jpg、png、pdf，且文件大小不超过500kb
        </div>
        <div v-if="uploadFlag" slot="tip" style="margin: 0;cursor: pointer;"
             class="el-upload__tip" @click="centerDialogVisible = true"
        >
          {{ form.fileName }}
        </div>
      </el-upload>
    </div>
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
  uploadFlag = false; // true，编辑页面，图片的第一次展示
  form = {
    uploadBusinessLicense: '',
    fileName: ''
  };
  centerDialogVisible = false;
  fileList: any = [];
  handleRemove(file: any, fileList: any) {
    console.log(file, fileList);
  }
  beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`);
  }
  handlePreview(file: any) {
    if (file.raw.type === 'application/pdf') {
      const eleLink = document.createElement('a');
      eleLink.download = file.name;
      eleLink.style.display = 'none';
      /* // 字符内容转变成blob地址
        let blob = new Blob([file.raw]);
        eleLink.href = URL.createObjectURL(blob); */
      eleLink.href = file.url;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
    }
    console.log(file);
    this.centerDialogVisible = true;
  }
  onchange(file: any) {
    const isJPG =
      file.raw.type === 'image/jpeg' ||
      file.raw.type === 'image/png';
      // file.raw.type === 'application/pdf'
    const isLt2M = file.size / 1024 / 1024 < 0.5;
    if (!isJPG) {
      this.$message.error('只能上传jpg/png文件');
      if (this.fileList.length === 0) {
        this.fileList = [];
      }
      return false;
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 500kb!');
      if (this.fileList.length === 0) {
        this.fileList = [];
      }
      return false;
    }
    this.fileList = [];
    this.fileList.push(file);
    this.uploadFlag = false;
    this.form.fileName = file.name;
    const reader = new FileReader();
    const This: any = this;
    reader.readAsDataURL(file.raw);
    reader.onload = function() {
      This.form.uploadBusinessLicense = this.result;
    };
    // this.form.uploadBusinessLicense = file.url;
  }
}
</script>
<style lang="scss" scope>
.upload {
    width: 320px;
    margin: 100px auto;
  }
</style>
