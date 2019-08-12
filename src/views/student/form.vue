<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" class="app-student-form" width="1200" :styles="{'top': '50px'}">
    <Form ref="studentForm" :model="studentForm" :label-width="90">
      <Row :gutter="32">
        <Col span="8">
          <FormItem
              label="学生编码"
              prop="code"
              :rules="{ required: true, validator: validateCode, trigger: 'blur' }"
            >
            <Input type="text" v-model.trim="studentForm.code" :maxlength="50" clearable/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem
              label="学生姓名"
              prop="name"
              :rules="{ required: true, message: '请输入学生姓名', trigger: 'blur' }"
            >
            <Input type="text" v-model.trim="studentForm.name" :maxlength="50" clearable/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem
              label="联系方式"
              prop="phone"
              :rules="{ required: true, message: '请输入联系方式', trigger: 'blur' }"
            >
            <Input type="text" v-model.trim="studentForm.phone" :maxlength="50" clearable/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="8">
          <FormItem
              label="在读学校"
              prop="schoolName"
              :rules="{ required: true, message: '请输入在读学校', trigger: 'blur' }"
            >
            <Input type="text" v-model.trim="studentForm.schoolName" :maxlength="50" clearable/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="学生性别" prop="sex">
            <RadioGroup v-model="studentForm.sex">
              <Radio label="Man">男</Radio>
              <Radio label="Woman">女</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="学生年级" prop="grade">
            <RadioGroup v-model="studentForm.grade">
              <Radio label="One">高一</Radio>
              <Radio label="Two">高二</Radio>
              <Radio label="Three">高三</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="出生日期" prop="birthday">
            <DatePicker type="date" v-model="studentForm.birthday" style="width: 100%" :clearable="false"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="毕业时间" prop="schoolDate">
            <DatePicker type="date" v-model="studentForm.schoolDate" style="width: 100%" :clearable="false"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="到访日期" prop="reportDate">
            <DatePicker type="date" v-model="studentForm.reportDate" style="width: 100%" :clearable="false"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="详细信息" prop="info">
            <Input type="textarea" :rows="4" v-model.trim="studentForm.info" :maxlength="500" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="意向专业" prop="">
            <Row>
              <Col span="2" offset="21">
                <Button @click="addMajor" icon="ios-add-circle-outline" />
              </Col>
            </Row>
          </FormItem>
          <FormItem
            v-for="(item, index) in studentForm.majorList"
            :key="index"
            :label="'专业' + (index + 1)"
            :prop="'majorList.' + index + '.majorName'"
            :rules="{required: true, message: '请输入专业' + (index + 1) + '名称', trigger: 'blur'}">
            <Row>
              <Col span="20">
                <Input type="text" v-model.trim="item.majorName" :maxlength="50" />
              </Col>
              <Col span="2" offset="1">
                <Button @click="removeMajor(index)" icon="ios-close-circle-outline"/>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="意向院校" prop="">
            <Row>
              <Col span="2" offset="21">
                <Button @click="addSchool" icon="ios-add-circle-outline" />
              </Col>
            </Row>
          </FormItem>
          <FormItem
            v-for="(item, index) in studentForm.schoolList"
            :key="index"
            :label="'院校' + (index + 1)"
            :prop="'schoolList.' + index + '.schoolId'"
            :rules="{required: true, message: '请选择院校' + (index + 1), trigger: 'blur'}">
            <Row>
              <Col span="20">
                <Select
                  v-model="item.schoolId"
                  filterable
                  remote
                  :remote-method="remoteSchool"
                  :loading="loadingSchool">
                  <Option v-for="(option, index) in schoolList" :value="option.id" :key="index">{{option.name}}</Option>
                </Select>
              </Col>
              <Col span="2" offset="1">
                <Button @click="removeSchool(index)" icon="ios-close-circle-outline"/>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { checkCode, save, modify, find } from '@/api/report/student'
import { listAll } from '@/api/ieg/school'

export default {
  name: 'Student_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    studentId: {type: String, default: '', required: false}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑学生信息',
        'raise': '新增学生信息'
      }
      return titleAry[this.type]
    }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      studentForm: {
        id: null,
        code: null,
        name: null,
        phone: null,
        schoolName: null,
        sex: 'Man',
        grade: 'Three',
        birthday: new Date(),
        schoolDate: new Date(),
        reportDate: new Date(),
        info: null,
        areaList: [],
        majorList: [],
        schoolList: []
      },
      schoolList: [],
      loadingSchool: false
    }
  },
  methods: {
    validateCode (rule, value, callback) {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入学生编码'))
      } else {
        checkCode(this.studentForm.id, value).then(data => {
          if (data.result) callback(new Error('学生编码已存在'))
          else callback()
        })
      }
    },
    ok () {
      this.$refs.studentForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    raise () {
      save(this.studentForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    modify () {
      modify(this.studentForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.studentForm.resetFields()
      this.studentForm = {
        id: null,
        code: null,
        name: null,
        phone: null,
        schoolName: null,
        sex: 'Man',
        grade: 'Three',
        birthday: new Date(),
        schoolDate: new Date(),
        reportDate: new Date(),
        info: null,
        areaList: [],
        majorList: [],
        schoolList: []
      }

      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify' && !this.$CV.isEmpty(this.studentId)) {
        listAll({name: ''}).then(data => {
          this.schoolList = data.result

          find(this.studentId).then(data => {
            this.studentForm = data.result
          })
        })
      }
    },
    addMajor () {
      this.studentForm.majorList.push(
        {
          majorName: ''
        }
      )
    },
    removeMajor (index) {
      this.studentForm.majorList.splice(index, 1)
    },
    addSchool () {
      this.studentForm.schoolList.push(
        {
          schoolId: ''
        }
      )
    },
    removeSchool (index) {
      this.studentForm.schoolList.splice(index, 1)
    },
    remoteSchool (query) {
      if (query !== '') {
        this.loadingSchool = true
        listAll({name: query}).then(data => {
          this.schoolList = data.result
          this.loadingSchool = false
        })
      } else {
        this.schoolList = []
      }
    }
  }
}
</script>
