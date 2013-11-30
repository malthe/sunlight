var should = require('should'),
	sunlight = require('../');

describe('6502 ASM', function() {
	var highlighter = new sunlight.Highlighter();
	highlighter.register('6502asm', require('../src/lang/6502asm'));
	var nbsp = String.fromCharCode(0xA0);

	it('label', function() {
		var highlighted = highlighter.highlight('FooBar', '6502asm').result;
		highlighted.should.equal('<span class="6502asm"><span class="label">FooBar</span></span>');
	});

	it('label even if it is a keyword if it starts a line', function() {
		var highlighted = highlighter.highlight('sta', '6502asm').result,
			expected = '<span class="6502asm"><span class="label">sta</span></span>';
		highlighted.should.equal(expected);
	});

	it('label after instruction', function() {
		var highlighted = highlighter.highlight('Foo\n sta foo\nBar', '6502asm').result,
			expected = '<span class="6502asm">' +
				'<span class="label">Foo</span>\n' +
				nbsp + '<span class="keyword">sta</span>' +
				nbsp + '<span class="ident">foo</span>\n' +
				'<span class="label">Bar</span>' +
				'</span>';
		highlighted.should.equal(expected);
	});

	it('keywords', function() {
		var highlighted = highlighter.highlight('FooBar\n sta', '6502asm').result,
			expected = '<span class="6502asm"><span class="label">FooBar</span>\n' + nbsp + '<span class="keyword">sta</span></span>';
		highlighted.should.equal(expected);
	});

	it('comments', function() {
		var highlighted = highlighter.highlight('; lolz', '6502asm').result,
			expected = '<span class="6502asm"><span class="comment">;' + nbsp + 'lolz</span></span>';
		highlighted.should.equal(expected);
	});

	it('single-quoted strings', function() {
		var highlighted = highlighter.highlight('\'foo\'', '6502asm').result,
			expected = '<span class="6502asm"><span class="string">\'foo\'</span></span>';
		highlighted.should.equal(expected);
	});

	it('pseudo op', function() {
		var highlighted = highlighter.highlight('Foo\n .byte', '6502asm').result,
			expected = '<span class="6502asm"><span class="label">Foo</span>\n' +
				nbsp + '<span class="punctuation">.</span>' +
				'<span class="pseudoOp">byte</span></span>';
		highlighted.should.equal(expected);
	});

	it('constant', function() {
		var highlighted = highlighter.highlight('Foo\n ldy #PLAYERAREAHEIGHT', '6502asm').result,
			expected = '<span class="6502asm"><span class="label">Foo</span>\n' +
				nbsp + '<span class="keyword">ldy</span>' + nbsp +
				'<span class="constant">#PLAYERAREAHEIGHT</span></span>';
		highlighted.should.equal(expected);
	});

	it('constant with nested brackets and parens', function() {
		var highlighted = highlighter.highlight('#<[3.[14] * (1(0))0]', '6502asm').result,
			expected = '<span class="6502asm"><span class="constant">#&lt;[3.[14]' + nbsp + '*' + nbsp + '(1(0))0]</span></span>';
		highlighted.should.equal(expected);
	});

	it('number', function() {
		var highlighted = highlighter.highlight('42', '6502asm').result,
			expected = '<span class="6502asm"><span class="number">42</span></span>';
		highlighted.should.equal(expected);
	});

	it('number that starts with $', function() {
		var highlighted = highlighter.highlight('$2C', '6502asm').result,
			expected = '<span class="6502asm"><span class="number">$2C</span></span>';
		highlighted.should.equal(expected);
	});

	it('ident', function() {
		var highlighted = highlighter.highlight('Foo\n SLEEP', '6502asm').result,
			expected = '<span class="6502asm">' +
				'<span class="label">Foo</span>\n' +
				nbsp + '<span class="ident">SLEEP</span>' +
				'</span>';
		highlighted.should.equal(expected);
	});

	it('illegal opcode', function() {
		var highlighted = highlighter.highlight('Foo\n dcp MaidLineCounter2', '6502asm').result,
			expected = '<span class="6502asm">' +
				'<span class="label">Foo</span>\n' +
				nbsp + '<span class="illegalOpcode">dcp</span>' +
				nbsp + '<span class="ident">MaidLineCounter2</span>' +
				'</span>';
		highlighted.should.equal(expected);
	});
});