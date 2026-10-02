import { useEffect, useMemo, useState } from "react";
import API from "../config";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export default function DailyHealthReport() {
  const user = getUser();
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState("");
  const [exercise, setExercise] = useState("");
  const [meals, setMeals] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const score = useMemo(() => {
    const w = Math.max(0, Math.min(20, Number(water) || 0));
    const s = Math.max(0, Math.min(24, Number(sleep) || 0));
    const e = Math.max(0, Math.min(600, Number(exercise) || 0));
    const m = Math.max(0, Math.min(10, Number(meals) || 0));
    const waterScore = Math.min(25, Math.round((w / 8) * 25));
    let sleepScore = 0;
    if (s >= 7 && s <= 9) sleepScore = 25;
    else if ((s >= 6 && s < 7) || (s > 9 && s <= 10)) sleepScore = 20;
    else if ((s >= 5 && s < 6) || (s > 10 && s <= 12)) sleepScore = 15;
    else if (s > 0) sleepScore = 10;
    const exerciseScore = Math.min(25, Math.round((e / 30) * 25));
    const mealScore = Math.min(25, Math.round((m / 3) * 25));
    return Math.min(100, waterScore + sleepScore + exerciseScore + mealScore);
  }, [water, sleep, exercise, meals]);

  const loadReports = async () => {
    if (!user) { setLoading(false); return; }
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/daily-health-report/${user.id}`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Could not load reports.");
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
      setError("Could not load daily health reports.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadReports(); }, []);

  const saveReport = async (event) => {
    event.preventDefault();
    if (!user) { setError("Please login first."); return; }
    try {
      setSaving(true); setMessage(""); setError("");
      const response = await fetch(`${API}/api/daily-health-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          water_glasses: Number(water) || 0,
          sleep_hours: Number(sleep) || 0,
          exercise_minutes: Number(exercise) || 0,
          healthy_meals: Number(meals) || 0
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Could not save report.");
      setMessage("✅ Today's health report has been saved.");
      await loadReports();
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save report.");
    } finally { setSaving(false); }
  };

  if (!user) {
    return <div className="min-h-screen bg-blue-50 px-6 py-16"><div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center"><div className="text-6xl mb-5">📊</div><h1 className="text-3xl font-bold text-gray-800">Daily Health Report</h1><p className="text-gray-600 mt-4">Please login to create and view your daily health reports.</p></div></div>;
  }

  const scoreText = score >= 80 ? "Great work! Your daily health habits look strong." : score >= 60 ? "Good progress. A few healthy improvements can raise your score." : score >= 40 ? "You are making a start. Try improving one or two habits today." : "Begin with small healthy habits such as water, sleep and movement.";

  return <div className="min-h-screen bg-blue-50 py-12 px-6"><div className="max-w-6xl mx-auto">
    <div className="text-center mb-10"><div className="text-6xl mb-4">📊</div><p className="text-blue-600 font-semibold tracking-widest uppercase">DAILY WELLNESS TRACKER</p><h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2">Daily Health Report</h1><p className="text-gray-600 mt-4 max-w-2xl mx-auto">Record your daily wellness habits and keep a simple history of your progress.</p></div>
    {message && <div className="bg-green-100 border border-green-300 text-green-800 rounded-xl px-5 py-4 mb-6">{message}</div>}
    {error && <div className="bg-red-100 border border-red-300 text-red-800 rounded-xl px-5 py-4 mb-6">{error}</div>}
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8"><div className="flex items-center justify-between mb-8"><div><h2 className="text-2xl font-bold text-gray-800">Today's Health Details</h2><p className="text-gray-500 mt-1">Enter your activities for today.</p></div><div className="text-4xl">🩺</div></div>
        <form onSubmit={saveReport}>
          <div className="mb-7"><label className="block font-semibold text-gray-800 mb-3">💧 Water Intake</label><div className="flex items-center gap-4"><button type="button" onClick={() => setWater(Math.max(0, Number(water)-1))} className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 text-2xl font-bold">−</button><div className="text-xl font-bold text-blue-700 min-w-[120px] text-center">{water} glasses</div><button type="button" onClick={() => setWater(Math.min(20, Number(water)+1))} className="w-12 h-12 rounded-full bg-blue-600 text-white text-2xl font-bold">+</button></div></div>
          <div className="mb-7"><label htmlFor="sleep" className="block font-semibold text-gray-800 mb-2">😴 Sleep</label><input id="sleep" type="number" min="0" max="24" step="0.5" value={sleep} onChange={e => setSleep(e.target.value)} placeholder="Example: 7.5" className="w-full border border-gray-300 rounded-xl px-4 py-3" /></div>
          <div className="mb-7"><label htmlFor="exercise" className="block font-semibold text-gray-800 mb-2">🏃 Exercise</label><input id="exercise" type="number" min="0" max="600" value={exercise} onChange={e => setExercise(e.target.value)} placeholder="Example: 30" className="w-full border border-gray-300 rounded-xl px-4 py-3" /></div>
          <div className="mb-8"><label htmlFor="meals" className="block font-semibold text-gray-800 mb-2">🥗 Healthy Meals</label><input id="meals" type="number" min="0" max="10" value={meals} onChange={e => setMeals(e.target.value)} placeholder="Example: 3" className="w-full border border-gray-300 rounded-xl px-4 py-3" /></div>
          <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg">{saving ? "Saving..." : "Save Today's Report"}</button>
        </form>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-8 h-fit"><p className="text-blue-600 font-semibold">TODAY'S SCORE</p><h2 className="text-2xl font-bold text-gray-800 mt-2">Health Score</h2><div className="flex justify-center my-8"><div className="w-44 h-44 rounded-full bg-blue-50 border-8 border-blue-500 flex items-center justify-center"><div className="text-center"><div className="text-5xl font-bold text-blue-700">{score}</div><div className="text-gray-500 font-semibold">/ 100</div></div></div></div><p className="text-gray-600 text-center leading-7">{scoreText}</p><div className="mt-8 space-y-4"><div className="flex justify-between border-b pb-3"><span>💧 Water</span><strong>{water} glasses</strong></div><div className="flex justify-between border-b pb-3"><span>😴 Sleep</span><strong>{sleep || 0} hrs</strong></div><div className="flex justify-between border-b pb-3"><span>🏃 Exercise</span><strong>{exercise || 0} min</strong></div><div className="flex justify-between"><span>🥗 Healthy Meals</span><strong>{meals || 0}</strong></div></div></div>
    </div>
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8"><div className="flex items-center justify-between mb-6"><div><h2 className="text-2xl font-bold text-gray-800">Health Report History</h2><p className="text-gray-500 mt-1">Your previous daily reports saved in MySQL.</p></div><div className="text-4xl">📅</div></div>{loading ? <p className="text-gray-500">Loading report history...</p> : reports.length === 0 ? <div className="text-center py-10 text-gray-500">No health reports saved yet.</div> : <div className="space-y-4">{reports.map(report => <div key={report.id} className="border rounded-2xl p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-bold text-gray-800">📅 {report.report_date}</p><p className="text-gray-500 text-sm mt-1">Updated: {new Date(report.updated_at).toLocaleString()}</p></div><div className="text-center"><p className="text-sm text-gray-500">Health Score</p><p className="text-3xl font-bold text-blue-600">{report.health_score}/100</p></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5"><div className="bg-blue-50 rounded-xl p-4"><p className="text-sm text-gray-500">💧 Water</p><p className="font-bold text-lg">{report.water_glasses} glasses</p></div><div className="bg-purple-50 rounded-xl p-4"><p className="text-sm text-gray-500">😴 Sleep</p><p className="font-bold text-lg">{report.sleep_hours} hrs</p></div><div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">🏃 Exercise</p><p className="font-bold text-lg">{report.exercise_minutes} min</p></div><div className="bg-yellow-50 rounded-xl p-4"><p className="text-sm text-gray-500">🥗 Meals</p><p className="font-bold text-lg">{report.healthy_meals}</p></div></div></div>)}</div>}</div>
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mt-8"><p className="text-sm text-gray-700 leading-6"><strong>Note:</strong> This Daily Health Report is a wellness-tracking tool for general awareness. The score is not a medical diagnosis and should not replace advice from a qualified healthcare professional.</p></div>
  </div></div>;
}
