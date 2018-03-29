<template>
  <div>
    <div class="lunch-tools">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-location" :loading="isLoadingChoiceLunch" @click="choiceLunch">
            Choice
          </el-button>
        </el-col>
        <el-col :span="12" class="lunch-tools-choice">
          <el-button type="info" icon="el-icon-circle-plus" @click="visibleDialogLunchForm = true">New</el-button>
        </el-col>
      </el-row>

      <el-dialog :visible.sync="visibleDialogChoiceLunch" title="Choice lunch" width="30%"
                 :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <span>Did you like the choice?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="visibleDialogChoiceLunch = false">No</el-button>
          <el-button type="success" :loading="isLoadingGoLunch" @click="goLunch">Yes</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="visibleDialogLunchForm" title="New lunch" ref="dialogLunchForm"
                 :before-close="resetLunchForm">
        <el-form :model="lunch" :rules="rules" ref="lunchForm" label-width="120px">
          <el-form-item label="Name" prop="name">
            <el-input v-model="lunch.name" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="Times" prop="time">
            <el-select v-model="lunch.time" placeholder="Please select a time" value="">
              <el-option label="Low" value="Low"/>
              <el-option label="Medium" value="Medium"/>
              <el-option label="High" value="High"/>
            </el-select>
          </el-form-item>
          <el-form-item label="Prices" prop="price">
            <el-select v-model="lunch.price" placeholder="Please select a price" value="">
              <el-option label="Low" value="Low"/>
              <el-option label="Medium" value="Medium"/>
              <el-option label="High" value="High"/>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="resetLunchForm">Cancel</el-button>
          <el-button type="success" @click="submitLunchForm">Create</el-button>
        </span>
      </el-dialog>
    </div>

    <el-table :data="lunches" class="table" v-loading="isLoadingLunches" stripe border>
      <el-table-column prop="name" label="Name" sortable/>
      <el-table-column prop="time" label="Time" width="200"/>
      <el-table-column prop="price" label="Price" width="200"/>
      <el-table-column label="Operations" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
      <template slot="empty">No data</template>
    </el-table>
  </div>
</template>

<script>
import http from '@/service/http'

export default {
  name: 'Lunch',
  data () {
    return {
      isLoadingLunches: true,
      isLoadingChoiceLunch: false,
      isLoadingGoLunch: false,
      visibleDialogLunchForm: false,
      visibleDialogChoiceLunch: false,
      errors: [],
      lunch: {
        name: '',
        time: '',
        price: ''
      },
      rules: {
        name: [
          {required: true, message: 'Please input name', trigger: 'blur'}
        ],
        time: [
          {required: true, message: 'Please select time', trigger: 'change'}
        ],
        price: [
          {required: true, message: 'Please select price', trigger: 'change'}
        ]
      },
      lunches: []
    }
  },
  async mounted () {
    this.getLunches()
  },
  methods: {
    async getLunches () {
      http.get('/lunches')
        .then((res) => {
          this.lunches = res.data.lunches
          this.isLoadingLunches = false
        })
        .catch(e => {
          this.errors.push(e)
          this.isLoadingLunches = false
        })
    },
    submitLunchForm () {
      this.$refs['lunchForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetLunchForm (done) {
      this.$refs['lunchForm'].resetFields()

      if (typeof done === 'function') {
        done()
      } else {
        this.visibleDialogLunchForm = false
      }
    },
    choiceLunch () {
      this.isLoadingChoiceLunch = true
      setTimeout(() => {
        this.visibleDialogChoiceLunch = true
        this.isLoadingChoiceLunch = false
      }, 2000)
    },
    goLunch () {
      this.isLoadingGoLunch = true
      setTimeout(() => {
        this.isLoadingGoLunch = false
        this.visibleDialogChoiceLunch = false
      }, 2000)
    },
    handleEdit (id) {
      console.log(id)
    },
    handleDelete (id) {
      console.log(id)
    }
  }
}
</script>
