import Editor from "./components/Editor";
import Prompter from "./components/Prompter";

function App() {
  return (
    <div className="p-2">
      <div className="mx-auto my-8 max-w-[8.5in]">
        <Prompter />
      </div>
      <div className="mb-8">
        <Editor />
      </div>
    </div>
  );
}

export default App;
