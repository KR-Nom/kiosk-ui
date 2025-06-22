export default function TimetableCard({ timetable }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3 text-blue-800">📅 오늘의 시간표</h2>
      <ul className="bg-white rounded-2xl shadow-lg p-6 space-y-3 text-lg">
        {timetable.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span className="w-20">{item.time}</span>
            <span className="flex-1">{item.subject} ({item.room})</span>
            <span className={`font-semibold ${item.attendance === "출석" ? "text-green-600" : "text-yellow-600"}`}>
              {item.attendance}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
