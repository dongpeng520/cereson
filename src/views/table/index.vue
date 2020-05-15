<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="ID"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="Author"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Pageviews"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Created at"
        width="250"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-tooltip
      placement="top"
      content="Customize your tooltip content here"
    >
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getArticles } from '@/api/articles';
import { IArticleData } from '@/api/types';
import Pagination from '@/components/Pagination/index.vue';
import BackToTop from '@/components/BackToTop/index.vue';

@Component({
  name: 'Table',
  components: {
    Pagination,
    BackToTop
  },
  filters: {
    statusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    },
    parseTime: (timestamp: string) => {
      return new Date(timestamp).toISOString();
    }
  }
})
export default class extends Vue {
  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }
  private myBackToTopStyle = {
    right: '50px',
    bottom: '50px',
    width: '40px',
    height: '40px',
    'border-radius': '4px',
    'line-height': '45px', // Please keep consistent with height to make it center vertically
    background: '#e7eaf1'
  }
  created() {
    this.getList();
  }

  private async getList() {
    this.listLoading = true;
    const { data } = await getArticles(this.listQuery);
    this.list = data.items;
    // Just to simulate the time of the request
    this.total = data.total;
    setTimeout(() => {
      this.listLoading = false;
    }, 0.5 * 1000);
  }
}
</script>
