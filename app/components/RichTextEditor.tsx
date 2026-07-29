"use client";

import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { useRef } from "react";

type ToolbarAction = {
  label: string;
  command: string;
  icon: typeof Bold;
};

const ACTIONS: ToolbarAction[] = [
  { label: "Bold", command: "bold", icon: Bold },
  { label: "Italic", command: "italic", icon: Italic },
  { label: "Bulleted list", command: "insertUnorderedList", icon: List },
  { label: "Numbered list", command: "insertOrderedList", icon: ListOrdered },
];

export function RichTextEditor({
  id,
  ariaLabel,
  onChange,
  onEmptyChange,
}: {
  id: string;
  ariaLabel: string;
  /** Called with the current HTML and plain text whenever the content changes. */
  onChange: (value: { html: string; text: string }) => void;
  /** Called with whether the editor is currently empty. */
  onEmptyChange?: (isEmpty: boolean) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  function emit() {
    const el = editorRef.current;
    if (!el) return;
    const text = (el.textContent ?? "").trim();
    onChange({ html: el.innerHTML, text });
    onEmptyChange?.(text.length === 0);
  }

  function runCommand(command: string) {
    editorRef.current?.focus();
    // execCommand is deprecated but remains the most reliable cross-browser way
    // to apply inline formatting to a contentEditable region without a heavy dep.
    document.execCommand(command, false);
    emit();
  }

  return (
    <div className="rounded-sm border border-white/28 bg-transparent transition focus-within:border-white focus-within:ring-1 focus-within:ring-white">
      <div
        className="flex flex-wrap items-center gap-1 border-b border-white/16 p-1.5"
        role="toolbar"
        aria-label="Text formatting"
      >
        {ACTIONS.map(({ label, command, icon: Icon }) => (
          <button
            key={command}
            type="button"
            aria-label={label}
            title={label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => runCommand(command)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        id={id}
        role="textbox"
        aria-label={ariaLabel}
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        data-placeholder="Share the story you would like us to hear…"
        className="rich-text-editor min-h-40 max-h-72 overflow-y-auto px-4 py-3 text-base leading-7 text-white outline-none [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
      />
    </div>
  );
}
