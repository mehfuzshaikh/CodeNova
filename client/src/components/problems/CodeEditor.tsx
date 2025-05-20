"use client";

import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  theme: string;
  fontSize: number;
}

const CodeEditor = ({ language, value, onChange, theme, fontSize }: CodeEditorProps) => {
  return (
    <div className="w-full h-full border rounded-md overflow-hidden">
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value}
        theme={theme}
        onChange={(value) => onChange(value ?? "")}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
