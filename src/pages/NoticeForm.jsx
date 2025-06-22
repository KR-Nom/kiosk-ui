// src/pages/NoticeForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoticeForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, studentId }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('공지사항이 등록되었습니다.');
        navigate('/dashboard');
      } else {
        alert(`오류: ${result.message}`);
      }
    } catch (err) {
      alert('서버 연결 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600">공지사항 작성</h2>

        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-32"
          required
        />
        <input
          type="text"
          placeholder="학번"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? '저장 중...' : '공지 등록'}
        </button>
      </form>
    </div>
  );
}
