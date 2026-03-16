const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const Questions = require('../models/QuestionsModel');

// helper function to run terminal commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });
  });
}

// main function
 ValidateCode = async(questionId, code, language) => {
  try {
    // 1. basic validation
    if (!questionId || !code || !language) {
      return { status: 'Error', message: 'questionId, code and language required' };
    }

    if (language !== 'cpp') {
      return { status: 'Error', message: 'Only C++ supported' };
    }

    // 2. get test cases (FIXED)
    const testCases = await fetchTestCases(questionId);
    if (!testCases || testCases.length === 0) {
      return { status: 'Error', message: 'Test cases not found' };
    }

    // 3. working directory
    const workDir = process.cwd();

    // 4. save user code
    fs.writeFileSync(path.join(workDir, 'Main.cpp'), code);

    // 5. compile ONCE
    const compileCmd =
      `docker run --rm -v ${workDir}:/code gcc:latest ` +
      `g++ /code/Main.cpp -o /code/a.out`;

    try {
      await runCommand(compileCmd);
    } catch (err) {
      return {
        status: 'Compilation Error',
        error: err.toString(),
      };
    }

    // 6. run test cases
    for (let i = 0; i < testCases.length; i++) {
      fs.writeFileSync(
        path.join(workDir, 'input.txt'),
        testCases[i].input
      );

      const runCmd =
  `docker run --rm -v ${workDir}:/code gcc:latest ` +
  `sh -c "/code/a.out < /code/input.txt"`;


      let output;
      try {
        output = await runCommand(runCmd);
      } catch (err) {
        return {
          status: 'Runtime Error',
          failedTest: i + 1,
          error: err.toString(),
          totalTests: testCases.length,
        };
      }

      if (output.trim() !== testCases[i].expected.trim()) {
        return {
          status: 'Wrong Answer',
          failedTest: i + 1,
          output: output.trim(),
          expected: testCases[i].expected.trim(),
          totalTests: testCases.length,
        };
      }
    }

    return {
      status: 'Accepted',
      totalTests: testCases.length,
    };
  } catch (err) {
    return {
      status: 'Error',
      message: 'Internal server error',
      error: err.message,
    };
  }
}

// helper to read test cases (DB-based)
async function fetchTestCases(questionId) {
  try {
    const question = await Questions
      .findById(questionId)
      .select('testCases -_id');

    if (!question) return null;

    return question.testCases;
  } catch (err) {
    console.error('Error fetching test cases:', err.message);
    return null;
  }
}

module.exports = {ValidateCode};
