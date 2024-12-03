const answerArea = document.getElementById('answer-area');
const answerAreaLabel = document.getElementById('answer-area-label');
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
  answerAreaLabel.style.display = 'none';
  resultArea.style.display = 'block';
  // To add stylings for mistaken parts
  resultArea.appendChild(correctMistakes(split(answerArea.value), JSON.parse(settingArea.dataset.answer), JSON.parse(settingArea.dataset.problem)));
});
proceedButton.addEventListener('click', () => {
  submitButton.classList.add('active');
  proceedButton.classList.remove('active');
  answerAreaLabel.style.display = 'block';
  answerArea.style.display = 'block';
  answerArea.value = '';
  resultArea.innerHTML = '';
  answerArea.focus()
  resultArea.style.display = 'none';
  if (settingArea.value === '') {
    answerArea.textContent = "問題を追加してください";
    submitButton.disabled = true;
  } else {
    answerArea.value = generateProblem(settingArea.dataset.problem, deletionSetting.value);
    submitButton.disabled = false;
  }
});
settingArea.addEventListener('change', () => { settingArea.dataset.problem = str(split(settingArea.value)); proceedButton.dispatchEvent(new Event('click')); });
deletionSetting.addEventListener('change', () => { deletionSetting.dataset.deletionNum = str(deletionSetting.value); proceedButton.dispatchEvent(new Event('click')); });

function correctMistakes(userAnswer, correctAnswers, problem) {
  const container = document.createElement('p');
  problem.forEach((s, idx) => {
    console.log(s, idx)
    const span = document.createElement('span');
    if (correctAnswers.includes(idx)) {
      console.log('problem', userAnswer[idx], s)
      span.style.color = (userAnswer[idx] === s) ? 'green' : 'red';
      span.textContent = (s ?? 'EXTRA_WORD!') + ' ';
    } else {
      span.style.color = 'green';
      span.textContent = s + ' ';
    }
    container.appendChild(span);
  });
  return container;
}

function generateProblem(problem, num) {
  const prob = [...JSON.parse(problem)];
  const answers = removeRandom(prob, num);
  settingArea.dataset.answer = str(answers);
  return prob.join(' ');
}

function removeRandom(options, numRemove) {
  let indices = Array(numRemove * 1).fill(0).map(_ => getRandomNum(options.length));
  indices = [...new Set(indices)]; // remove duplicated indices
  indices.sort();
  indices.reverse();
  return indices.map(idx => {options.splice(idx, 1); return idx;});
}
  
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function split(s) {
  return s.trim().split(/[\s]/).filter(s => s !== '');
}

function str(obj) {
  return JSON.stringify(obj);
}
