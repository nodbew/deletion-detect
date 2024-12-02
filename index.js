const answerArea = document.getElementById('answer-area');
const resultArea = document.getElementById('result');
const submitButton = document.getElementById('submit');
const proceedButton = document.getElementById('proceed');
const settingArea = document.getElementById('setting-area');
const deletionSetting = document.getElementById('deletion');

// Initialize
answerArea.textContent = "問題を追加してください";
submitButton.disabled = true;

submitButton.addEventListener('click', () => {
  submitButton.classList.remove('active');
  proceedButton.classList.add('active');
  answerArea.style.display = 'none';
  resultArea.style.display = 'block';
  // To add stylings for mistaken parts
  resultArea.innerHTML = correctMistakes(answerArea.value);
});
proceedButton.addEventListener('click', () => {
  submitButton.classList.add('active');
  proceedButton.classList.remove('active');
  answerArea.style.display = 'block';
  answerArea.value = '';
  answerArea.focus()
  resultArea.style.display = 'none';
  if (settingArea.value === '') {
    answerArea.textContent = "問題を追加してください";
    submitButton.disabled = true;
  } else {
    answerArea.value = generateProblem(settingArea.dataset.problem, deletionSetting.dataset.deletionNum);
  }
});
settingArea.addEventListener('input', (e) => { settingArea.dataset.problem = e.target.value.split(' ') });
deletionSetting.addEventListener('change', (e) => { deletionSetting.dataset.deletionNum = e.target.value });

function correctMistakes(userAnswer) {
  return userAnswer;
}

function generateProblem(

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function removeRandom(options, numRemove) {
  return [...new Array(numRemove)].map(_ => options.splice(getRandomNum(options.length), 1));
}
