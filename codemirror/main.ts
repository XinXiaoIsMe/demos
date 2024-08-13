import './index.css'

const hintList = [
  'hint1',
  'hint2',
  'we'
];
CodeMirror.registerHelper('hint', 'custom', function (cm) {
  const cur = cm.getCursor();
  const token = cm.getTokenAt(cur);
  const start = token.start;
  const end = cur.ch;
  const str = token.string;

  const list = hintList.filter(item => {
    return item.indexOf(str) === 0;
  });

  if (list.length) {
    return {
      list,
      form: CodeMirror.Pos(cur.line, start),
      to: CodeMirror.Pos(cur.line, end)
    }
  }
})

const oApp = document.getElementById('app')!
const oTextArea = oApp.getElementsByClassName('codemirror-container')![0] as HTMLTextAreaElement
const oButton = oApp.getElementsByTagName('button')![0]
const codemirror = CodeMirror.fromTextArea(oTextArea, {
  mode: 'custom',
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
    'Meta': 'autocomplete'
  }
})

document.addEventListener('keydown', e => {
  console.log(e.key)
})
