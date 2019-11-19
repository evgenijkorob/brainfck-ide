import 'ace-builds/webpack-resolver';
import { require as aceRequire } from 'ace-builds';

export function getBfModeConstructor(): any {
  const oop = aceRequire('ace/lib/oop');
  const TextMode = aceRequire('ace/mode/text').Mode;
  const BfHighlightRules = makeBfHighlightRules(oop);
  const BfMode = function() {
    this.HighlightRules = BfHighlightRules;
  };

  oop.inherits(BfMode, TextMode);
  BfMode.prototype.$id = 'ace/mode/bf';
  return BfMode;
}

function makeBfHighlightRules(aceOop) {
  const TextHighlightRules = aceRequire('ace/mode/text_highlight_rules').TextHighlightRules;
  const BfHighlightRules = function() {
    this.$rules = {
      start: [
        {
          regex: /,|\./,
          token: 'keyword'
        },
        {
          regex: /<|>/,
          token: 'keyword.constant.buildin'
        },
        {
          regex: /\+|\-/,
          token: 'keyword.string'
        },
        {
          regex: /\[|\]/,
          token: 'keyword'
        }
      ]
    };
  };

  aceOop.inherits(BfHighlightRules, TextHighlightRules);
  return BfHighlightRules;
}
