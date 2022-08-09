interface Result {
  startIndex: number;
  endIndex: number;
  type: 'opening' | 'closing';
}

const BACKTICK = '`';
export function getCaretOffset(elm: HTMLElement) {
  var caretOffset = 0;

  if (window.getSelection) {
    var range = window.getSelection()!.getRangeAt(0),
      preCaretRange = range.cloneRange();
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
