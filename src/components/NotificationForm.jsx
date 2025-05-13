import { useState, useEffect } from "react";

export default function NotificationForm() {
  const token = "ExponentPushToken[RZAwvgAuBIF0VdSp67hkA2]";
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [historico, setHistorico] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://rhema-backend-production.up.railway.app/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: token, title, body }),
      });
      const data = await res.json();
      alert("Notificação enviada com sucesso!");
      setTitle("");
      setBody("");
      fetchHistorico(); // Atualiza histórico após envio
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao enviar.");
    }
  };

  const fetchHistorico = async () => {
    try {
      const res = await fetch("https://rhema-backend-production.up.railway.app/notificacoes");
      if (!res.ok) {
        console.error("Erro na resposta do servidor:", res.status);
        console.log("URL:", res.url);
        setHistorico([]);
        return;
      }
      try {
        const data = await res.json();
        console.log("Dados recebidos:", data);
        if (Array.isArray(data)) {
          setHistorico(data);
        } else if (data && Array.isArray(data.notificacoes)) {
          setHistorico(data.notificacoes);
        } else {
          console.warn("Formato de resposta inesperado:", data);
          setHistorico([]);
        }
      } catch (jsonError) {
        const errorText = await res.text();
        console.error("Erro ao fazer parse da resposta:", errorText);
        setHistorico([]);
      }
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
      setHistorico([]);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold text-center">Enviar Notificação</h2>

        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensagem"
          className="w-full p-2 border rounded h-28 resize-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
          Enviar
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Histórico de Notificações</h3>
        {historico.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhuma notificação enviada ainda.</p>
        )}
        <ul className="space-y-3">
          {historico.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded shadow">
              <div className="text-sm text-gray-500">{new Date(item.data).toLocaleString()}</div>
              <div className="font-semibold">{item.title}</div>
              <div>{item.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}