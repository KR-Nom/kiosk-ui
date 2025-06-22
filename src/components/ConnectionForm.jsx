import { useState } from 'react';

export default function ConnectionForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="멘토링 항목 추가"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 rounded-lg border-gray-300"
      />
      <button type="submit" className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700">
        추가
      </button>
    </form>
  );
}
