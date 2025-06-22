import { useState } from 'react';

export default function Admin() {
  const [notices, setNotices] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() !== '') {
      setNotices(prev => [...prev, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">📢 공지사항 등록</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="공지 내용을 입력하세요"
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-xl text-lg mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-4 text-xl rounded-xl hover:bg-blue-700 transition"
        >
          등록
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">📄 등록된 공지 목록</h2>
        <ul className="space-y-3">
          {notices.map((notice, i) => (
            <li key={i} className="bg-white p-4 rounded-xl shadow text-lg">
              • {notice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
