export class FormatService {
  private readonly patterns = {
    boldItalic: /\*\*\*(.*?)\*\*\*/gs,
    bold: /\*\*(.*?)\*\*/gs,
    italic: /\*(.*?)\*/gs,
    underline: /__(.*?)__/gs,
    strikethrough: /~~(.*?)~~/gs,
    codeLine: /`(.*?)`/gs,
    twoCodeLines: /``(.*?)``/gs,
    codeMultiline: /```(.*?)```/gs,
    url: /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
  };

  public toHTML(content: string) {
    return content
      .replace(this.patterns.strikethrough, '<del>$1</del>')
      .replace(this.patterns.underline, '<u>$1</u>')
      .replace(this.patterns.bold, '<strong>$1</strong>')
      .replace(this.patterns.italic, '<em>$1</em>')
      .replace(this.patterns.codeMultiline, '<pre><code>$1</code></pre>')
      .replace(this.patterns.twoCodeLines, '<code className="inline">$1</code>')
      .replace(this.patterns.codeLine, '<code className="inline">$1</code>')
      .replace(this.patterns.url, '<a href="$1" target="_blank">$1</a>');
  }
}
