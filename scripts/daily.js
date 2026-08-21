const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROBLEMS_PATH = path.join(__dirname, '.problems.json');
const STATE_PATH = path.join(__dirname, '.state.json');

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeOutput(pairs) {
  const outFile = process.env.GITHUB_OUTPUT;
  const lines = Object.entries(pairs).map(([k, v]) => `${k}=${v}`).join('\n') + '\n';
  if (outFile) {
    fs.appendFileSync(outFile, lines);
  } else {
    console.log(lines);
  }
}

function buildFileContent(problem, ext) {
  const solution = problem.solution.trim();
  if (ext === 'js') {
    const header = `// ${problem.id}. ${problem.title}`;
    const descLines = (problem.description || '')
      .split('\n')
      .filter(Boolean)
      .map((line) => `// ${line}`)
      .join('\n');
    const parts = [header];
    if (descLines) parts.push(descLines);
    parts.push('', '// solution', '', solution, '');
    return parts.join('\n');
  }
  const header = `# ${problem.id}. ${problem.title}`;
  return `${header}\n${solution}\n`;
}

function main() {
  const problems = readJson(PROBLEMS_PATH, []);
  const state = readJson(STATE_PATH, { lastIndex: -1 });

  let index = state.lastIndex + 1;
  let problem = null;
  let ext = null;
  let filePath = null;

  while (index < problems.length) {
    const candidate = problems[index];
    const candidateExt = candidate.language === 'py' ? 'py' : 'js';
    const dir = path.join(ROOT, candidate.difficulty || 'easy');
    const candidatePath = path.join(dir, `${candidate.id}.${candidateExt}`);

    if (fs.existsSync(candidatePath)) {
      console.log(`Skipping problem ${candidate.id} (${candidate.title}) - file already exists.`);
      index += 1;
      continue;
    }

    problem = candidate;
    ext = candidateExt;
    filePath = candidatePath;
    break;
  }

  if (!problem) {
    console.log('No new problems left in problems.json.');
    writeOutput({ skip: 'true' });
    return;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buildFileContent(problem, ext));

  fs.writeFileSync(STATE_PATH, JSON.stringify({ lastIndex: index }, null, 2) + '\n');

  console.log(`Added ${filePath}`);
  writeOutput({
    skip: 'false',
    id: problem.id,
    title: problem.title.replace(/[\r\n]+/g, ' '),
  });
}

main();
