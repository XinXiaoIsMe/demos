export type ConditionLogic = 'and' | 'or'

export interface ConditionItem {
  name: string
  operator: string
  value: number | string
}

export interface ConditionData {
  logic: ConditionLogic
  conditions: ConditionItem[]
  children?: ConditionData[]
}

export interface ConditionNode {
  logic: ConditionLogic
  level: number
  id: symbol
  data: ConditionData
  conditions: ConditionItem[]
  parentNode?: ConditionNode
  childNodes?: ConditionNode[]
  children?: ConditionData[]
}

interface ConditionOption {
  label: string
  value: string
}

export interface ConditionOptions {
  name: ConditionOption[]
  operator: ConditionOption[]
}

export interface ConditionConfig {
  activeColor: string
  titlePadding: number
  listPadding: number
}
