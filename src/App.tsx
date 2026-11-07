import { useEffect, useRef, useState } from 'react'

const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
)
const Play = (p: { size?: number }) => <Icon {...p} d="M8 5v14l11-7z" />
const Pause = (p: { size?: number }) => <Icon {...p} d="M6 5h4v14H6zM14 5h4v14h-4z" />
const RotateCcw = (p: { size?: number }) => <Icon {...p} d="M12 5V1L7 6l5 5V7a6 6 0 11-6 6H4a8 8 0 108-8z" />
const Volume = (p: { size?: number }) => <Icon {...p} d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zm-2.5-8.5v2.1a7 7 0 010 12.8v2.1a9 9 0 000-17z" />
const Muted = (p: { size?: number }) => <Icon {...p} d="M3 9v6h4l5 4V5L7 9H3zm12.6 3l2.2-2.2-1.4-1.4-2.2 2.2L12 8.4v2.8l.8.8-.8.8v2.8l2.2-2.2 2.2 2.2 1.4-1.4z" />
const Download = (p: { size?: number }) => <Icon {...p} d="M11 4h2v8l3-3 1.4 1.4L12 15.8l-5.4-5.4L8 9l3 3V4zM5 18h14v2H5z" />

const RED = '#e5484d'
const BLUE = '#3b82f6'

const Stars = () => (
  <div
    className="absolute inset-0 opacity-[0.07]"
    style={{
      backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)',
      backgroundSize: '40px 40px',
      animation: 'drift 12s linear infinite',
    }}
  />
)

const d = (s: number) => ({ animationDelay: `${s}s` })

function Tag({ children }: { children: React.ReactNode }) {
  return <div className="rise text-sm tracking-[0.3em] text-sky-300 mb-4 uppercase">{children}</div>
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="rise serif text-5xl font-black text-white mb-10" style={d(0.1)}>{children}</h2>
}

function Seats({ n, cols, total, color, delay }: { n: number; cols: number; total: number; color: string; delay: number }) {
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="pop aspect-square rounded-full"
          style={{ background: i < n ? color : '#ffffff22', animationDelay: `${delay + i * 0.004}s` }}
        />
      ))}
    </div>
  )
}

const scenes: { dur: number; narration: string; el: () => React.ReactNode }[] = [
  {
    dur: 8.5,
    narration: '美国中期选举。三分钟读懂：选什么，以及为什么重要。',
    el: () => (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="pop flex gap-2 mb-8">
          {[RED, '#fff', BLUE].map((c) => <span key={c} className="w-14 h-2 rounded" style={{ background: c }} />)}
        </div>
        <h1 className="rise serif text-8xl font-black text-white" style={d(0.2)}>美国中期选举</h1>
        <p className="rise text-2xl text-sky-200 mt-6 tracking-[0.4em]" style={d(0.7)}>U.S. MIDTERM ELECTIONS</p>
        <p className="rise text-xl text-white/60 mt-10" style={d(1.3)}>三分钟读懂:选什么、为什么重要</p>
      </div>
    ),
  },
  {
    dur: 18,
    narration: '中期选举，是总统任期的期中考试。它每四年一次，在总统任期正中间举行。下一次中期选举，是二零二六年十一月三日。',
    el: () => (
      <div className="h-full flex flex-col justify-center px-24">
        <Tag>01 · 什么是中期选举</Tag>
        <Title>总统任期的“期中考试”</Title>
        <div className="relative mt-4">
          <div className="grow h-1.5 bg-white/30 rounded" style={d(0.4)} />
          <div className="flex justify-between mt-0 -translate-y-[13px]">
            {['就职', '中期选举', '总统大选', '任期结束'].map((t, i) => (
              <div key={t} className="pop flex flex-col items-center gap-3" style={d(0.8 + i * 0.5)}>
                <span className={`w-6 h-6 rounded-full border-4 border-[#0a0f1f] ${i === 1 ? 'scale-150' : ''}`} style={{ background: i === 1 ? RED : '#fff' }} />
                <span className={`text-xl ${i === 1 ? 'text-white font-bold' : 'text-white/60'}`}>{t}</span>
                <span className="text-sm text-white/40">第 {[0, 2, 4, 4][i]} 年</span>
              </div>
            ))}
          </div>
        </div>
        <p className="rise text-2xl text-white/80 mt-16 leading-relaxed" style={d(3)}>
          每四年一次,在总统任期正中间举行,日期固定为<b className="text-white">十一月第一个星期一之后的星期二</b>。
          <br />下一次:<b style={{ color: RED }}>2026 年 11 月 3 日</b>。
        </p>
      </div>
    ),
  },
  {
    dur: 15.5,
    narration: '中期选举选什么？四百三十五名众议员全部改选，约三分之一的参议员，以及三十六个州的州长和数千名地方官员。',
    el: () => (
      <div className="h-full flex flex-col justify-center px-24">
        <Tag>02 · 选什么</Tag>
        <Title>国会与地方权力一起洗牌</Title>
        <div className="grid grid-cols-4 gap-6">
          {[
            ['435', '众议员', '任期 2 年,全部改选'],
            ['35', '参议员(约)', '任期 6 年,约三分之一改选'],
            ['36', '州长', '全美 50 州中的 36 个'],
            ['数千', '州议员与地方官员', '含州务卿、检察长等'],
          ].map(([n, t, s], i) => (
            <div key={t} className="rise rounded-2xl bg-white/[0.06] border border-white/10 p-6" style={d(0.5 + i * 0.5)}>
              <div className="serif text-6xl font-black text-white">{n}</div>
              <div className="text-xl text-sky-200 mt-3 font-medium">{t}</div>
              <div className="text-base text-white/50 mt-2">{s}</div>
            </div>
          ))}
        </div>
        <p className="rise text-xl text-white/60 mt-10" style={d(3)}>总统本人不在选票上,所以选民投票更像是对执政表现的直接评价。</p>
      </div>
    ),
  },
  {
    dur: 17,
    narration: '国会控制权决定法案、预算、调查和重要任命。总统所属政党如果失去一院或两院，政策推进往往会更加困难。',
    el: () => (
      <div className="h-full flex flex-col justify-center px-24">
        <Tag>03 · 为什么重要</Tag>
        <Title>谁控制国会,谁就掌握议程</Title>
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          {[
            ['立法', '法案能否通过'],
            ['预算', '掌握联邦政府“钱袋子”'],
            ['调查与弹劾', '众议院可发起弹劾'],
            ['任命确认', '参议院批准法官与内阁'],
          ].map(([t, s], i) => (
            <div key={t} className="rise flex items-center gap-5" style={d(0.5 + i * 0.6)}>
              <span className="serif text-4xl font-black w-1.5 h-14 rounded" style={{ background: i % 2 ? BLUE : RED }} />
              <div>
                <div className="text-3xl font-bold text-white">{t}</div>
                <div className="text-lg text-white/60">{s}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="rise text-2xl text-white/80 mt-12" style={d(3.4)}>
          若总统所属政党失去一院或两院,就会出现“<b className="text-white">分裂政府</b>”,政策推进往往陷入僵局。
        </p>
      </div>
    ),
  },
  {
    dur: 14.5,
    narration: '历史上，执政党通常会在中期选举中吃亏。二战以来，总统所属政党平均丢失约二十六个众议院席位。',
    el: () => (
      <div className="h-full flex flex-col justify-center px-24">
        <Tag>04 · 历史规律</Tag>
        <Title>执政党通常“吃亏”</Title>
        <div className="flex gap-16 items-center">
          <div className="w-[46%]">
            <Seats n={26} cols={29} total={435} color={RED} delay={0.5} />
            <p className="text-base text-white/50 mt-4">435 个众议院席位示意(红色约 26 席)</p>
          </div>
          <div>
            <div className="rise serif text-8xl font-black text-white" style={d(1)}>≈ 26</div>
            <div className="rise text-2xl text-white/80 mt-2" style={d(1.4)}>二战后,总统所属政党在中期选举中<br />平均丢失的众议院席位数</div>
            <div className="rise text-lg text-white/50 mt-4" style={d(2)}>原因:选民不满、支持者动员不足、新鲜感消退</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    dur: 17,
    narration: '选举从党内初选开始，经过竞选和提前投票，最后在选举日直接计票。选区划分和摇摆选区，也会影响席位归属。',
    el: () => (
      <div className="h-full flex flex-col justify-center px-24">
        <Tag>05 · 如何运作</Tag>
        <Title>从初选到宣布结果</Title>
        <div className="flex items-stretch gap-4">
          {[
            ['党内初选', '春夏两党各自选出候选人'],
            ['竞选', '辩论、广告、拉票'],
            ['提前投票', '多数州允许邮寄或提前投票'],
            ['选举日', '各州直接计票,不使用选举人团'],
          ].map(([t, s], i) => (
            <div key={t} className="rise flex-1 rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10" style={d(0.4 + i * 0.6)}>
              <div className="text-sm text-sky-300 mb-2">STEP {i + 1}</div>
              <div className="text-2xl font-bold text-white mb-2">{t}</div>
              <div className="text-base text-white/60">{s}</div>
            </div>
          ))}
        </div>
        <p className="rise text-xl text-white/60 mt-10" style={d(3.2)}>
          选区划分(包括“杰利蛮德”争议)和摇摆选区,常常决定最终的席位归属。
        </p>
      </div>
    ),
  },
  {
    dur: 12,
    narration: '一场投票，可能改变未来两年的美国政治。关注二零二六年中期选举，谢谢观看。',
    el: () => (
      <div className="h-full flex flex-col items-center justify-center text-center px-24">
        <div className="rise flex w-[520px] h-5 rounded-full overflow-hidden mb-10">
          <div className="grow flex-1" style={{ background: RED }} />
          <div className="grow flex-1" style={{ background: BLUE, ...d(0.3) }} />
        </div>
        <h2 className="rise serif text-6xl font-black text-white leading-tight" style={d(0.5)}>一场投票,<br />改变未来两年的美国政治</h2>
        <p className="rise text-xl text-white/60 mt-8" style={d(1.3)}>关注 2026 年 11 月 3 日 · 谢谢观看</p>
      </div>
    ),
  },
]

const total = scenes.reduce((a, s) => a + s.dur, 0)
const starts = scenes.reduce<number[]>((a, s, i) => [...a, i ? a[i - 1] + scenes[i - 1].dur : 0], [])

export default function App() {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [voiceOn, setVoiceOn] = useState(true)
  const last = useRef(performance.now())

  useEffect(() => {
    if (!playing) return
    last.current = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = (now - last.current) / 1000
      last.current = now
      setT((p) => {
        const n = p + dt
        if (n >= total) { setPlaying(false); return total - 0.001 }
        return n
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const idx = starts.filter((s) => s <= t).length - 1

  const speakScene = (sceneIndex: number) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(scenes[sceneIndex].narration)
    utterance.lang = 'zh-CN'
    utterance.rate = 1.08
    utterance.pitch = 1
    const voices = window.speechSynthesis.getVoices()
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase() === 'zh-cn')
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('zh'))
      ?? null
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (!voiceOn || !playing) {
      window.speechSynthesis?.cancel()
      return
    }
    speakScene(idx)
    return () => window.speechSynthesis?.cancel()
  }, [idx, voiceOn])

  useEffect(() => {
    if (!voiceOn || !('speechSynthesis' in window)) return
    if (playing) {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()
    } else {
      window.speechSynthesis.pause()
    }
  }, [playing, voiceOn])

  const togglePlaying = () => {
    if (t >= total - 0.01) {
      setT(0)
      setPlaying(true)
      speakScene(0)
      return
    }
    if (!playing && voiceOn && !window.speechSynthesis.speaking) speakScene(idx)
    setPlaying(!playing)
  }
  const seek = (i: number) => {
    setT(starts[i])
    setPlaying(true)
    if (voiceOn && i === idx) speakScene(i)
  }
  const restart = () => {
    setT(0)
    setPlaying(true)
    if (voiceOn && idx === 0) speakScene(0)
  }
  const toggleVoice = () => {
    if (voiceOn) window.speechSynthesis?.cancel()
    setVoiceOn(!voiceOn)
  }
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-[#05070f]">
      <div
        className="relative w-full max-w-[1280px] aspect-video overflow-hidden rounded-xl shadow-2xl"
        style={{ background: 'radial-gradient(ellipse at 20% 0%, #1b2a5c 0%, #0a0f1f 60%)' }}
      >
        <Stars />
        <div className="absolute top-0 left-0 right-0 h-2 flex"><div className="flex-1" style={{ background: RED }} /><div className="flex-1" style={{ background: BLUE }} /></div>
        {/* key remounts the scene to replay its animations; scaled to fit any width */}
        <div className="absolute inset-0" style={{ containerType: 'inline-size' }}>
          <div key={idx + (t < starts[idx] + 0.05 ? 'a' : '')} className="origin-top-left w-[1280px] h-[720px]" style={{ transform: 'scale(calc(100cqw / 1280px))' }}>
            {scenes[idx].el()}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1280px] flex items-center gap-4 text-white">
        <button onClick={togglePlaying} className="p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label={playing ? '暂停' : '播放'}>
          {playing ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={restart} className="p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="restart"><RotateCcw size={20} /></button>
        <button
          onClick={toggleVoice}
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${voiceOn ? 'bg-sky-500/25 text-sky-200' : 'bg-white/10 text-white/50'}`}
          aria-label={voiceOn ? '关闭中文配音' : '开启中文配音'}
          title={voiceOn ? '关闭中文配音' : '开启中文配音'}
        >
          {voiceOn ? <Volume size={20} /> : <Muted size={20} />}
          <span className="text-sm whitespace-nowrap">中文配音</span>
        </button>
        <a
          href="/us-midterm-election.mp4"
          download="美国中期选举.mp4"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 transition-colors"
          title="下载 MP4 视频"
        >
          <Download size={20} />
          <span className="text-sm whitespace-nowrap">下载 MP4</span>
        </a>
        <div className="flex-1 flex gap-1">
          {scenes.map((s, i) => (
            <button key={i} onClick={() => seek(i)} className="h-2 rounded bg-white/15 overflow-hidden" style={{ flex: s.dur }} aria-label={`scene ${i + 1}`}>
              <div className="h-full bg-sky-400" style={{ width: `${Math.max(0, Math.min(1, (t - starts[i]) / s.dur)) * 100}%` }} />
            </button>
          ))}
        </div>
        <span className="text-sm tabular-nums text-white/60">{fmt(t)} / {fmt(total)}</span>
      </div>
    </div>
  )
}
