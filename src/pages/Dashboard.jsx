// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import timetable from '../data/timetable.json';
import jobs from '../data/jobs.json';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [notices, setNotices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState('');

  // 공지사항 불러오기
  useEffect(() => {
    axios.get('http://localhost:5000/api/notices')
      .then(res => setNotices(res.data))
      .catch(err => console.error('공지사항 불러오기 실패:', err));
  }, []);

  // 연결 정보 불러오기
  useEffect(() => {
    axios.get('http://localhost:5000/api/connections')
      .then(res => setConnections(res.data))
      .catch(err => console.error('연결 정보 불러오기 실패:', err));
  }, []);

  // 연결 추가
  const handleAddConnection = () => {
    if (newConnection.trim()) {
      axios.post('http://localhost:5000/api/connections', { text: newConnection })
        .then(res => {
          setConnections(prev => [res.data, ...prev]);
          setNewConnection('');
        })
        .catch(err => alert('등록 실패: 관리자만 가능합니다.'));
    }
  };

  // 연결 삭제
  const handleDeleteConnection = (id) => {
    axios.delete(`http://localhost:5000/api/connections/${id}`)
      .then(() => {
        setConnections(prev => prev.filter(c => c._id !== id));
      })
      .catch(err => alert('삭제 실패'));
  };

  // 공지사항 삭제
  const handleDeleteNotice = (id) => {
    axios.delete(`http://localhost:5000/api/notices/${id}`)
      .then(() => {
        setNotices(prev => prev.filter(n => n._id !== id));
      })
      .catch(err => alert('공지사항 삭제 실패'));
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* 인사말 */}
        <div className="bg-indigo-50 p-6 rounded-2xl shadow text-center">
          <h1 className="text-3xl font-bold text-indigo-700">
            👋 {user?.name ?? '사용자'}님, 환영합니다!
          </h1>
          <p className="text-gray-600">오늘의 정보를 확인해보세요.</p>
        </div>

        {/* 공지사항 */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-pink-600">📢 최근 공지사항</h2>
            {user?.role === 'admin' && (
              <Link
                to="/notice/write"
                className="text-sm text-indigo-600 underline"
              >
                ✏️ 공지 작성
              </Link>
            )}
          </div>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {notices.length === 0 ? (
              <li>공지사항이 없습니다.</li>
            ) : (
              notices.map((n) => (
                <li key={n._id} className="flex justify-between items-center">
                  <span><strong>{n.title}</strong> - {n.content}</span>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => handleDeleteNotice(n._id)}
                      className="ml-4 text-red-500 text-sm hover:underline"
                    >
                      삭제
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </section>

        {/* 시간표 */}
        <section className="bg-white p-6 rounded-2xl shadow-md space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">📅 오늘의 시간표</h2>
          <ul className="space-y-2 text-lg">
            {timetable.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.time}</span>
                <span>{item.subject} ({item.room})</span>
                <span
                  className={`font-semibold ${
                    item.attendance === '출석' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {item.attendance}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 채용 정보 */}
        <section className="bg-white p-6 rounded-2xl shadow-md space-y-3">
          <h2 className="text-2xl font-bold text-purple-700">💼 추천 채용 정보</h2>
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold">{job.company}</h3>
                <p>{job.title}</p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline text-sm"
                >
                  자세히 보기 →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 연결 정보 */}
        <section className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">👥 추천 연결</h2>
          <ul className="list-disc list-inside text-gray-800">
            {connections.map((conn) => (
              <li key={conn._id} className="flex justify-between items-center">
                <span>{conn.text}</span>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDeleteConnection(conn._id)}
                    className="ml-4 text-sm text-red-600 hover:underline"
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul>

          {user?.role === 'admin' && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                value={newConnection}
                onChange={(e) => setNewConnection(e.target.value)}
                placeholder="예: 멘토링 - 빅데이터 전공 탐색"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <button
                onClick={handleAddConnection}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                + 연결 등록
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
