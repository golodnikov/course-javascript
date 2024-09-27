beforeAll(() => {
  require('./index');
});

test('При нажатии на кнопку, DOM-дерево должно быть изменено', () => {
  const button = document.getElementById('my-button');
  const result = document.getElementById('my-result');

  if (button) {
    button.click();
  }
  if (result) {
    expect(result.textContent).toBe('42');
  }
});
