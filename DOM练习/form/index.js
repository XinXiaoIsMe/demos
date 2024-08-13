const form = Form.create([
  {
    label: '应聘岗位',
    tagName: 'input',
    type: 'text',
    prop: 'job',
    required: true,
    rules: [
      { message: '请输入应聘岗位', validator: val => !!val }
    ]
  },
  {
    label: '填表日期',
    tagName: 'input',
    type: 'date',
    prop: 'date',
    required: true,
    rules: [
      { message: '请选择填表日期', validator: val => !val }
    ]
  },
  {
    label: '婚否',
    prop: 'isMarried',
    tagName: 'input',
    type: 'radio',
    options: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    required: true,
    rules: [
      { message: '请选择是否婚配', validator: val => val !== undefined }
    ]
  },
  {
    label: '电子邮箱',
    prop: 'email',
    tagName: 'input',
    type: 'email',
    required: true,
    rules: [
      { message: '请输入正确的邮箱', validator: val => !!val }
    ]
  },
  {
    label: '学历',
    tagName: 'select',
    prop: 'educationalBackground',
    required: true,
    options: [
      { label: '博士', value: 0 },
      { label: '硕士', value: 1 },
      { label: '本科', value: 2 },
      { label: '大专', value: 3 }
    ]
  },
  {
    label: '爱好',
    tagName: 'select',
    prop: 'hobbies',
    multiple: true,
    options: [
      { label: '篮球', value: 'basketball' },
      { label: '足球', value: 'football' },
      { label: '乒乓球', value: 'pingpong' },
    ]
  },
  {
    label: '优点',
    tagName: 'input',
    type: 'checkbox',
    prop: 'advantage',
    options: [
      { label: '细心', value: 0 },
      { label: '勤劳', value: 1 },
      { label: '气质好', value: 2 },
    ]
  },
  // {
  //   label: '教育经历(请至少完整填写一行)',
  //   tagName: 'table',
  //   prop: 'educationalExperience',
  //   required: true,
  //   columns: [
  //     { label: '时间', value: 'time' },
  //     { label: '毕业院校', value: 'school' },
  //     { label: '专业', value: 'profession' },
  //     { label: '详细情况', value: 'detail' }
  //   ],
  //   rules: [
  //     { message: '请至少完整填写一行', validator: val => val.length > 0 && val.some(row => columns.every(({ value }) => row[value])) }
  //   ]
  // },
  {
    label: '自我评价',
    tagName: 'textarea',
    prop: 'comment'
  }
], document.getElementById('app'), {
  job: '教师',
  date: '2023-09-01',
  educationalBackground: 1,
  isMarried: true,
  hobbies: [ 'basketball', 'pingpong' ],
  advantage: [ 1, 2 ]
});

// form.on('submit', (data) => {
//   console.log(data);
// })