import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import app from "../../app/axios";
import Panel from "./AddPanel";

export default function UpdateQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interaction, setInteraction] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [constraints, setConstraints] = useState([""]);

  const [testCases, setTestCases] = useState([
    { input: "", expected: "" }
  ]);

  const [loading, setLoading] = useState(true);

  /* ------------------ Fetch Existing Question ------------------ */

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await app.get(`/admin/question/${id}`);
      const q = res.data.question;

      setTitle(q.title);
      setDescription(q.description);
      setInteraction(q.interaction);
      setDifficulty(q.difficulty);

      setConstraints(
        q.constraints?.length ? q.constraints : [""]
      );

      setTestCases(
        q.testCases?.length ? q.testCases : [{ input: "", expected: "" }]
      );

    } catch (err) {
      alert("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

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

  /* ------------------ Submit Update ------------------ */

  const handleSubmit = async () => {
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

      await app.put(`/admin/question/${id}`, {
        title,
        description,
        interaction,
        difficulty,
        constraints,
        testCases
      });

      alert("Question updated successfully");
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.message || "Failed to update question");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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

      heading="Update Question"
      submitText="Update Question"
      waiting="Updating..."
    />
  );
}