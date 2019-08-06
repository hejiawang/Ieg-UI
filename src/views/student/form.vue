<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" class="app-student-form" width="1200" :styles="{'top': '50px'}">
    <Form ref="studentForm" :model="studentForm" :rules="studentRules" :label-width="90">
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="学生编码" prop="code">
            <Input type="text" v-model.trim="studentForm.code" :maxlength="50" clearable/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="学生姓名" prop="name">
            <Input type="text" v-model.trim="studentForm.name" :maxlength="50" clearable/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="联系方式" prop="phone">
            <Input type="text" v-model.trim="studentForm.phone" :maxlength="50" clearable/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="在读学校" prop="schoolName">
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
    </Form>
  </Modal>
</template>
<script>
import { checkCode, save, modify, find } from '@/api/report/student'

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
    /**
     * validateCode
     * @param rule rule
     * @param value value
     * @param callback callback
     */
    const validateCode = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入学生编码'))
      } else {
        checkCode(this.studentForm.id, value).then(data => {
          if (data.result) callback(new Error('学生编码已存在'))
          else callback()
        })
      }
    }

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
      studentRules: {
        code: { required: true, validator: validateCode, trigger: 'blur' },
        name: { required: true, message: '请输入学生姓名', trigger: 'blur' },
        phone: { required: true, message: '请输入联系方式', trigger: 'blur' },
        schoolName: { required: true, message: '请输入在读学校', trigger: 'blur' }
      }
    }
  },
  methods: {
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
        find(this.studentId).then(data => {
          this.studentForm = data.result
        })
      }
    }
  }
}
</script>
