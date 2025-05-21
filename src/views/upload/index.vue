<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="图片上传" name="image">
      <el-upload
        action="/upload/image"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="音频上传" name="audio">
      <el-upload
        action="/upload/audio"
        :on-remove="handleRemove"
      >
        <el-button type="primary">点击上传音频</el-button>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="视频上传" name="video">
      <el-upload
        action="/upload/video"
        :on-remove="handleRemove"
      >
        <el-button type="primary">点击上传视频</el-button>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const activeTab = ref('image');

    const handlePreview = (file) => {
      console.log('Preview file:', file);
    };

    const handleRemove = (file) => {
      console.log('Remove file:', file);
    };

    return {
      activeTab,
      handlePreview,
      handleRemove,
    };
  },
};
</script>

<style scoped>
.el-upload {
  margin-bottom: 20px;
}
</style>