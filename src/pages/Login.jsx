import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { login } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userName.trim() && studentId.trim()) {
      login(userName, studentId);
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md text-center space-y-8">
        {/* 전남대 로고 */}
        <img
          src="/assets/jnu-logo.svg"
          alt="전남대학교 로고"
          className="w-24 h-24 mx-auto"
        />

        <h2 className="text-3xl font-extrabold text-green-700">전남 스마트 캠퍼스 로그인</h2>
        <p className="text-gray-600">이름과 학번을 입력해 주세요</p>

        {/* 이름 입력 */}
        <input
          type="text"
          placeholder="이름 입력"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-4 text-lg border-2 border-green-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 transition"
        />

        {/* 학번 입력 */}
        <input
          type="text"
          placeholder="학번 입력"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-4 text-lg border-2 border-green-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-700 text-white py-4 text-lg rounded-xl font-semibold hover:bg-green-800 transition"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
