import { useEffect, useState } from "react";
import API from "../config";

export default function Profile() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("language") || "English");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/profile/${user.id}`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Profile loading error:", error));
  }, []);

  const labels = {
    English: { title: "My Profile", bmi: "BMI History", pills: "Pill Reminders", chat: "Chatbot History", logs: "Activity Logs", reports: "Daily Health Reports" },
    Hindi: { title: "मेरी प्रोफ़ाइल", bmi: "BMI इतिहास", pills: "दवा अनुस्मारक", chat: "चैटबॉट इतिहास", logs: "गतिविधि लॉग", reports: "दैनिक स्वास्थ्य रिपोर्ट" },
    Telugu: { title: "నా ప్రొఫైల్", bmi: "BMI చరిత్ర", pills: "మందుల రిమైండర్లు", chat: "చాట్‌బాట్ చరిత్ర", logs: "యాక్టివిటీ లాగ్స్", reports: "రోజువారీ ఆరోగ్య నివేదికలు" }
  };
  const t = labels[lang] || labels.English;

  const changeLanguage = (event) => {
    const value = event.target.value;
    setLang(value);
    localStorage.setItem("language", value);
  };

  if (!user) return <div className="min-h-screen bg-blue-50 p-10 text-center">Please login to view your profile.</div>;
  if (!data) return <div className="min-h-screen bg-blue-50 p-10 text-center">Loading profile...</div>;

  return <div className="min-h-screen bg-blue-50 py-10 px-5"><div className="max-w-5xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-8"><div className="flex flex-wrap justify-between gap-4 items-center"><div><p className="text-5xl">👤</p><h1 className="text-4xl font-bold text-blue-700 mt-2">{t.title}</h1><p className="text-gray-600 mt-2">{data.user.name} • {data.user.email}</p></div><div><label className="font-semibold mr-2">Language</label><select value={lang} onChange={changeLanguage} className="border rounded-lg px-3 py-2"><option>English</option><option>Hindi</option><option>Telugu</option></select></div></div></div>
    <Section title={t.reports}>{data.healthReports?.length ? data.healthReports.map(report => <div key={report.id} className="border rounded-xl p-4 mb-3"><div className="flex justify-between items-center flex-wrap gap-3"><p className="font-bold">📅 {report.report_date}</p><p className="font-bold text-blue-600">Health Score: {report.health_score}/100</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4"><div className="bg-blue-50 rounded-lg p-3">💧 Water: <b>{report.water_glasses}</b> glasses</div><div className="bg-purple-50 rounded-lg p-3">😴 Sleep: <b>{report.sleep_hours}</b> hrs</div><div className="bg-green-50 rounded-lg p-3">🏃 Exercise: <b>{report.exercise_minutes}</b> min</div><div className="bg-yellow-50 rounded-lg p-3">🥗 Meals: <b>{report.healthy_meals}</b></div></div></div>) : <Empty />}</Section>
    <Section title={t.bmi}>{data.bmi?.length ? data.bmi.map(item => <Row key={item.id}>{new Date(item.created_at).toLocaleString()} — <b>{item.bmi}</b> ({item.category})</Row>) : <Empty />}</Section>
    <Section title={t.pills}>{data.pills?.length ? data.pills.map(item => <Row key={item.id}>💊 {item.medicine_name} — {String(item.reminder_time).slice(0,5)}{item.dosage ? ` • ${item.dosage}` : ""}</Row>) : <Empty />}</Section>
    <Section title={t.chat}>{data.chats?.length ? data.chats.map(item => <Row key={item.id}>🤖 {item.title} — {item.message_count} messages</Row>) : <Empty />}</Section>
    <Section title={t.logs}>{data.logs?.length ? data.logs.map(item => <Row key={item.id}>{new Date(item.created_at).toLocaleString()} — {item.action}{item.page ? ` (${item.page})` : ""}</Row>) : <Empty />}</Section>
  </div></div>;
}

function Section({ title, children }) { return <section className="bg-white rounded-2xl shadow-lg p-7 mt-6"><h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>{children}</section>; }
function Row({ children }) { return <div className="border rounded-lg p-3 mb-2 text-gray-700">{children}</div>; }
function Empty() { return <p className="text-gray-500">No records yet.</p>; }
