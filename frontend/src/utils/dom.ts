interface Result {
  startIndex: number;
  endIndex: number;
  type: 'opening' | 'closing';
}

const BACKTICK = '`';
export function getCaretOffset(elm: HTMLElement) {
  var caretOffset = 0;

  if (window.getSelection) {
    var range = window.getSelection()!.getRangeAt(0);
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(elm);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }

  return caretOffset;
}

export function findCodeBlocks(str: string) {
  let isOpening = true;
  const results = [] as Result[];
  const splitted = str.split('');

  const backticksFound: number[] = [];

  splitted.forEach((char, index) => {
    if (char !== BACKTICK) return;
    const lastFound = backticksFound[backticksFound.length - 1];

    // if not match (clear founds)
    if (lastFound + 1 !== index) backticksFound.length = 0;
    backticksFound.push(index);

    if (backticksFound.length === 3) {
      results.push({
        startIndex: backticksFound[0],
        endIndex: backticksFound[backticksFound.length - 1],
        type: isOpening ? 'opening' : 'closing',
      });

      backticksFound.length = 0;
      isOpening = !isOpening;
    }
  });

  return results;
}

export function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode('');
  el.appendChild(target);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}

export function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}
