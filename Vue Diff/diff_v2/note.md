# 1. vdom不同
判断依据：vdom.type以及vdom.key不同
方案：暴力替换，删除原有节点，替换成新的节点

# 2. vdom相同
## 2.1 newvdom没有children
方案：删除原有节点的所有子节点
## 2.2 newvdom有children， oldvdom没有children
方案：将新的节点添加上去
## 2.3 newvdom有children，oldvdom有children（最难☆）
方案：使用双端对比，利用4个指针分别指向新老vdom的开始和结尾（后续使用新前，新后，旧前，旧后来指代4个指针），按照以下顺序进行比对：
1. 新前diff旧前
2. 新后diff旧后
3. 新后diff旧前
4. 新前diff旧后
5. 循环查找

指针变量：
新前：newStart
新后：newEnd
旧前：oldStart
旧后：oldEnd

1. newStart === oldStart newStart和oldStart指针下移，否则进行第二步
2. newEnd === oldEnd newEnd和oldEnd指针上移，否则进行第三步
3. newEnd === oldStart newEnd指针上移，oldStart指针下移，将对应的oldvdom的节点用undefined标记，然后将节点对应的真实DOM移到oldEnd对应节点的后面，否则进行第四步
4. newStart === oldEnd newStart指针下移，oldEnd指针上移，将对应的oldvdom的节点用undefined标记，然后将节点对应的真实DOM移到oldStart对应节点的开头，否则进行第五步
5. 循环查找对应节点，如果没找到说明是需要新增，创建DOM节点插入到oldStart对应节点开头。如果找到了说明是需要移动，将其移动到oldStart对应节点开头
