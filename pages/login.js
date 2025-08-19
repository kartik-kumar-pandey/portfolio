import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) router.replace('/admin');
    });
    return () => authListener.subscription.unsubscribe();
  }, [router]);

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const signInWithProvider = async (provider) => {
    setError('');
    setInfo('');
    setLoading(true);
    // Redirect to site origin; we'll route to /admin after session is established
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}` } });
    if (error) setError(error.message);
    setLoading(false);
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setInfo('Sign-up successful. Please check your email to confirm your account, then sign in.');
    setLoading(false);
  };

  const sendMagicLink = async () => {
    setError('');
    setInfo('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (error) setError(error.message);
    else setInfo('Magic link sent. Check your inbox.');
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 style={{ marginBottom: 8 }}>Admin Login</h1>
        <p className="auth-hint" style={{ marginBottom: '1rem' }}>Sign in to access your dashboard</p>
        <div className="auth-actions">
          <button onClick={() => signInWithProvider('google')} className="btn btn-outline cursor-target">Continue with Google</button>
          <button onClick={() => signInWithProvider('github')} className="btn btn-outline cursor-target">Continue with GitHub</button>
        </div>
        <div className="divider">or continue with email</div>
        <form onSubmit={signInWithEmail} style={{ display: 'grid', gap: '0.5rem' }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required className="form-input cursor-target" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required className="form-input cursor-target" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" disabled={loading} className="btn btn-primary cursor-target" style={{ flex: 1 }}>{loading ? 'Signing in...' : 'Sign In'}</button>
            <button onClick={signUpWithEmail} disabled={loading} className="btn btn-outline cursor-target" type="button" style={{ flex: 1 }}>Sign Up</button>
          </div>
        </form>
        <button onClick={sendMagicLink} disabled={loading || !email} className="btn btn-ghost cursor-target" style={{ width: '100%', marginTop: '0.75rem' }}>Send Magic Link</button>
        {error && <p style={{ color: '#ef4444', marginTop: 12 }}>{error}</p>}
        {info && <p style={{ color: '#22c55e', marginTop: 8 }}>{info}</p>}
      </div>
    </div>
  );
}


