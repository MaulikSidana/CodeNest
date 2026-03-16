export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 leading-relaxed">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          About Code Nest
        </h1>

        <p className="text-gray-600 mb-8">
          A focused coding practice platform built with simplicity in mind.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            What is Code Nest?
          </h2>
          <p>
            Code Nest is a minimal coding platform created to provide a clean and
            distraction-free environment for practicing algorithmic problems.
            The goal is to help users focus entirely on problem solving, without
            unnecessary UI clutter or complex workflows.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Why this platform exists
          </h2>
          <p>
            Many coding platforms are powerful but often overwhelming for
            beginners or learners who want to focus on core concepts. Code Nest
            was built to bridge this gap — offering essential features like
            problem browsing, code editing, and instant feedback, while keeping
            the experience intuitive and lightweight.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Key features
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Browse and solve algorithmic problems</li>
            <li>Write solutions using a VS Code–like editor</li>
            <li>Submit code and view detailed output and errors</li>
            <li>Track solved problems and progress</li>
            <li>Clean and responsive user interface</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Technology stack
          </h2>
          <p>
            Code Nest is built using modern web technologies including React for
            the frontend, Node.js and Express for backend services, and MongoDB
            for data persistence. The code execution and evaluation logic is
            designed to be modular and scalable.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Learning-focused by design
          </h2>
          <p>
            This project emphasizes good software engineering practices such as
            component-based architecture, separation of concerns, and clean UI
            design. It serves both as a learning tool for users and a practical
            demonstration of full-stack development principles.
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-6 border-t text-sm text-gray-500">
           # Built with care as a learning-driven full-stack project.
        </footer>

      </div>
    </div>
  );
}
