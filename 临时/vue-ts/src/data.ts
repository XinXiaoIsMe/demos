export default {
  logic: 'and',
  conditions: [
    { name: '项目名称', operator: '=', value: 1 },
    { name: '项目地址', operator: '=', value: 'xxx' },
    { name: '项目周期', operator: '>=', value: 30 }
  ],
  children: [
    {
      logic: 'or',
      conditions: [
        { name: '项目名称', operator: '=', value: 2 },
        { name: '项目地址', operator: '=', value: 'xxxx' },
        { name: '项目周期', operator: '>=', value: 300 }
      ]
    }
  ]
}
