const answerArea = document.getElementById('answer-area');
const resultArea = document.getElementById('result');
const submitButton = document.getElementById('submit');
const proceedButton = document.getElementById('proceed');
const settingArea = document.getElementById('setting-area');
const deletionSetting = document.getElementById('deletion');

// Initialize
answerArea.value = "問題を追加してください";
submitButton.disabled = true;

submitButton.addEventListener('click', () => {
  submitButton.classList.remove('active');
  proceedButton.classList.add('active');
  answerArea.style.display = 'none';
  resultArea.style.display = 'block';
  // To add stylings for mistaken parts
  resultArea.appendChild(correctMistakes(split(answerArea.value), settingArea.dataset.answer, settingArea.dataset.problem));
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
settingArea.addEventListener('change', () => { settingArea.dataset.problem = split(settingArea.value); proceedButton.dispatchEvent('click'); });
deletionSetting.addEventListener('change', () => { deletionSetting.dataset.deletionNum = deletionSetting.value; proceedButton.dispatchEvent('click'); });

function correctMistakes(userAnswer, correctAnswers, problem) {
  for (idx in correctAnswers) {
    if (userAnswer[idx] !== problem[idx]) {
      const span = document.createElement('span');
      span.style.fontColor = 'red';
      span.textContent = userAnswer[idx];
      userAnswer[idx] = span;
    }
  }

  const container = document.createElement('p');
  userAnswer.forEach(e => typeof e === 'string' ? container.textContent += e : container.appendChild(e));
  return container;
}

function generateProblem(problem, num) {
  const prob = [...problem];
  const answers = removeRandom(prob);
  settingArea.dataset.answer = answers;
  return prob.join(' ');
}

function removeRandom(options, numRemove) {
  return [...new Array(numRemove)].map(_ => {
    const idx = getRandomNum(options.length);
    options.splice(idx, 1);
    return idx;
  });
}
  
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function split(s) {
  return s.trim().split(/[\s]/).filter(s => s !== '');
}
