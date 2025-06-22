export default function NoticeBoard({ notices }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3 text-red-700">📢 최근 공지사항</h2>
      <ul className="bg-white rounded-2xl shadow-lg p-6 space-y-2 text-lg">
        {notices.map((notice, i) => (
          <li key={i}>• {notice}</li>
        ))}
      </ul>
    </section>
  );
}
