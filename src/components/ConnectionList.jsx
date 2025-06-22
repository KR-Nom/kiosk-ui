export default function ConnectionList({ connections }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3 text-gray-800">👥 추천 연결 (스터디/멘토링)</h2>
      <ul className="bg-white rounded-2xl shadow-lg p-6 space-y-2 text-lg">
        {connections.map((conn, i) => (
          <li key={i}>• {conn}</li>
        ))}
      </ul>
    </section>
  );
}
