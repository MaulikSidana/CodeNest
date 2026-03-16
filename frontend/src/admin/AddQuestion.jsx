import { useState } from "react";
import app from "../../app/axios";
import Panel from "./AddPanel";

export default function AddQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interaction, setInteraction] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [constraints, setConstraints] = useState([""]);

  const [testCases, setTestCases] = useState([
    { input: "", expected: "" }
  ]);

  const [loading, setLoading] = useState(false);

  /* ------------------ Test Case Handlers ------------------ */

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expected: "" }]);
  };

  const removeTestCase = (index) => {
    if (testCases.length === 1) return;
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  /* ------------------ Constraint Handlers ------------------ */

  const handleConstraintChange = (index, value) => {
    const updated = [...constraints];
    updated[index] = value;
    setConstraints(updated);
  };

  const addConstraint = () => {
    setConstraints([...constraints, ""]);
  };

  const removeConstraint = (index) => {
    if (constraints.length === 1) return;
    setConstraints(constraints.filter((_, i) => i !== index));
  };

  /* ------------------ Submit ------------------ */

  const handleSubmit = async () => {
    // 🚨 Frontend validation
    if (!title || !description || !interaction) {
      alert("All fields are required");
      return;
    }

    if (constraints.some(c => !c.trim())) {
      alert("Constraints cannot be empty");
      return;
    }

    for (const tc of testCases) {
      if (!tc.input.trim() || !tc.expected.trim()) {
        alert("Test cases cannot be empty or partial");
        return;
      }
    }

    try {
      setLoading(true);

      await app.post("/admin/add-question", {
        title,
        description,
        interaction,
        difficulty,
        constraints,
        testCases
      });

      alert("Question added successfully");

      // reset form
      setTitle("");
      setDescription("");
      setInteraction("");
      setDifficulty("Easy");
      setConstraints([""]);
      setTestCases([{ input: "", expected: "" }]);

    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <Panel
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      interaction={interaction}
      setInteraction={setInteraction}
      difficulty={difficulty}
      setDifficulty={setDifficulty}

      constraints={constraints}
      handleConstraintChange={handleConstraintChange}
      addConstraint={addConstraint}
      removeConstraint={removeConstraint}

      testCases={testCases}
      handleTestCaseChange={handleTestCaseChange}
      addTestCase={addTestCase}
      removeTestCase={removeTestCase}

      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}
