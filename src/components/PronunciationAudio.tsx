import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader2, LogIn, Volume2 } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const AUDIO_BUCKET = 'word-audio'
const SIGNED_URL_TTL_SECONDS = 3600

export function PronunciationAudio({
  words,
  audioByWord,
}: {
  words?: string[]
  audioByWord?: Record<string, string>
}) {
  const entries = useMemo(() => {
    if (!words?.length || !audioByWord) return []
    const seen = new Set<string>()
    return words
      .filter((word) => {
        if (!audioByWord[word] || seen.has(word)) return false
        seen.add(word)
        return true
      })
      .map((word) => ({ word, path: audioByWord[word] }))
  }, [audioByWord, words])

  const [session, setSession] = useState<Session | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string | null>(null)
  const playing = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let active = true
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setCheckingSession(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setCheckingSession(false)
    })
    return () => {
      active = false
      data.subscription.unsubscribe()
      playing.current?.pause()
    }
  }, [])

  useEffect(() => {
    if (!session || entries.length === 0) {
      setSignedUrls({})
      return
    }

    let active = true
    setAudioLoading(true)
    setMessage(null)

    void Promise.all(entries.map(async ({ word, path }) => {
      const { data, error } = await supabase.storage
        .from(AUDIO_BUCKET)
        .createSignedUrl(path, SIGNED_URL_TTL_SECONDS)
      if (error || !data?.signedUrl) return [word, null] as const
      return [word, data.signedUrl] as const
    })).then((results) => {
      if (!active) return
      const urls: Record<string, string> = {}
      for (const [word, url] of results) {
        if (url) urls[word] = url
      }
      setSignedUrls(urls)
      if (Object.keys(urls).length === 0) setMessage('The recording is currently unavailable.')
    }).finally(() => {
      if (active) setAudioLoading(false)
    })

    return () => { active = false }
  }, [entries, session])

  if (entries.length === 0) return null

  async function signIn(event: React.FormEvent) {
    event.preventDefault()
    setAuthLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage('Could not sign in. Use the same email and password as Ordly.')
    else {
      setPassword('')
      setShowLogin(false)
    }
    setAuthLoading(false)
  }

  function play(word: string) {
    const url = signedUrls[word]
    if (!url) return
    playing.current?.pause()
    const audio = new Audio(url)
    playing.current = audio
    void audio.play().catch(() => setMessage('Could not play this recording on the device.'))
  }

  if (checkingSession) {
    return (
      <section className="pronunciation-panel" aria-label="Word pronunciation">
        <Loader2 className="spin" size={17} />
        <span>Checking word audio…</span>
      </section>
    )
  }

  if (!session) {
    return (
      <section className="pronunciation-panel" aria-label="Word pronunciation">
        <div className="pronunciation-heading">
          <Volume2 size={17} />
          <strong>Real word audio</strong>
        </div>
        {!showLogin ? (
          <button type="button" className="audio-signin-button" onClick={() => setShowLogin(true)}>
            <LogIn size={16} />
            Sign in for pronunciation
          </button>
        ) : (
          <form className="audio-login-form" onSubmit={signIn}>
            <input
              type="email"
              autoComplete="email"
              required
              placeholder="Ordly email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              autoComplete="current-password"
              required
              placeholder="Ordly password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" className="audio-signin-button" disabled={authLoading}>
              {authLoading ? <Loader2 className="spin" size={16} /> : <LogIn size={16} />}
              Sign in
            </button>
          </form>
        )}
        {message && <div className="audio-message">{message}</div>}
      </section>
    )
  }

  return (
    <section className="pronunciation-panel" aria-label="Word pronunciation">
      <div className="pronunciation-heading">
        <Volume2 size={17} />
        <strong>Pronunciation</strong>
      </div>
      <div className="pronunciation-buttons">
        {entries.map(({ word }) => (
          <button
            type="button"
            className="word-audio-button"
            key={word}
            disabled={audioLoading || !signedUrls[word]}
            onClick={() => play(word)}
          >
            {audioLoading ? <Loader2 className="spin" size={15} /> : <Volume2 size={15} />}
            {word}
          </button>
        ))}
      </div>
      {message && <div className="audio-message">{message}</div>}
    </section>
  )
}
