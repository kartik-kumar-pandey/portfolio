import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [replyDraft, setReplyDraft] = useState('');
  const [activeMessage, setActiveMessage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSessionAndLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      setSessionChecked(true);
      await loadMessages();
    };
    getSessionAndLoad();
  }, [router]);

  const loadMessages = async () => {
    setLoading(true);
    const res = await fetch('/api/messages');
    const json = await res.json();
    if (res.ok) setMessages(json.messages || []);
    setLoading(false);
  };

  const markResolved = async (id) => {
    const res = await fetch('/api/messages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'resolved' }) });
    if (res.ok) loadMessages();
  };

  const openReply = (msg) => {
    setActiveMessage(msg);
    setReplyDraft(`Hi ${msg.name},\n\nThanks for reaching out!`);
    setModalOpen(true);
  };

  const sendReply = async () => {
    if (!activeMessage) return;
    setError('');
    const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: activeMessage.email, subject: `Re: Your message to Kartik`, text: replyDraft, name: activeMessage.name }) });
    if (!res.ok) {
      const j = await res.json();
      setError(j.error || 'Failed to send email');
      return;
    }
    setModalOpen(false);
    setActiveMessage(null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (!sessionChecked) return null;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={signOut} className="btn btn-outline cursor-target">Sign out</button>
      </div>
      <div className="card-panel">
        {loading ? (
          <p className="muted">Loading...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{m.message}</td>
                    <td>
                      <span className={`badge ${m.status === 'resolved' ? 'badge-resolved' : 'badge-pending'}`}>{m.status || 'pending'}</span>
                    </td>
                    <td>{new Date(m.created_at).toLocaleString()}</td>
                    <td>
                      <button onClick={() => openReply(m)} className="btn btn-small btn-outline cursor-target" style={{ marginRight: 8 }}>Reply</button>
                      {m.status !== 'resolved' && (
                        <button onClick={() => markResolved(m.id)} className="btn btn-small btn-primary cursor-target">Resolve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ marginTop: 0 }}>Reply to {activeMessage?.name}</h3>
            <p className="muted" style={{ marginBottom: 8 }}>{activeMessage?.email}</p>
            <textarea rows={8} className="form-input cursor-target" value={replyDraft} onChange={(e) => setReplyDraft(e.target.value)} />
            {error && <p style={{ color: '#ef4444', marginTop: 8 }}>{error}</p>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <button onClick={() => setModalOpen(false)} className="btn btn-ghost cursor-target">Cancel</button>
              <button onClick={sendReply} className="btn btn-primary cursor-target">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


