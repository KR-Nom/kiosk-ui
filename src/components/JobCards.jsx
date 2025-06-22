export default function JobCards({ jobs }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3 text-purple-700">💼 추천 채용 정보</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobs.map((job, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold">{job.company}</h3>
            <p className="mb-2">{job.title}</p>
            <a href={job.link} className="text-blue-600 hover:underline">자세히 보기 →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
