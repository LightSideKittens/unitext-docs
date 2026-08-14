/**
 * Getting Started guide page.
 * Task-ordered walkthrough of UniText: scene setup, fonts and markup first,
 * then the subsystems — parameters, paint, animation, rules, interaction,
 * selection, editing, clipboard and platform input.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Accessibility,
  ArrowRight,
  ChevronRight,
  Clipboard,
  Code,
  Download,
  FileCode,
  Globe,
  ImageIcon,
  Languages,
  Layers,
  ListChecks,
  MousePointerClick,
  Palette,
  Pencil,
  Plus,
  Puzzle,
  SlidersHorizontal,
  Smile,
  Sparkles,
  TextCursor,
  Type,
  Wand2,
  Zap,
} from "lucide-react";
import { useDocs, CodeBlock, Notice, AutoLink } from "@lightside/docs-system";

const FONT_RESOLUTION = [
  {
    tier: "Requested family",
    name: "Inter",
    note: "selected by the component or by <font>",
    glyphs: "Hello",
    dir: "ltr",
    text: "text-sky-300",
    ring: "border-sky-400/40 bg-sky-400/10",
    dot: "bg-sky-400/20 text-sky-300",
  },
  {
    tier: "Fallback chain",
    name: "Noto Sans Arabic",
    note: "next family that covers the run",
    glyphs: "مرحبا",
    dir: "rtl",
    text: "text-amber-300",
    ring: "border-amber-400/40 bg-amber-400/10",
    dot: "bg-amber-400/20 text-amber-300",
  },
  {
    tier: "Fallback chain",
    name: "Noto Sans CJK",
    note: "next family again",
    glyphs: "汉字",
    dir: "ltr",
    text: "text-violet-300",
    ring: "border-violet-400/40 bg-violet-400/10",
    dot: "bg-violet-400/20 text-violet-300",
  },
  {
    tier: "System font",
    name: "OS font",
    note: "last resort everywhere except WebGL",
    glyphs: "한국어",
    dir: "ltr",
    text: "text-emerald-300",
    ring: "border-emerald-400/40 bg-emerald-400/10",
    dot: "bg-emerald-400/20 text-emerald-300",
  },
] as const;

/** §2.2 three-tier resolution: one string, each run drawn by the first family that covers it. */
function FontResolutionDiagram() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
        Rendering
      </div>
      <div className="text-2xl flex flex-wrap gap-x-3 gap-y-1 mb-6">
        {FONT_RESOLUTION.map((f) => (
          <span key={f.name} dir={f.dir} className={f.text}>
            {f.glyphs}
          </span>
        ))}
      </div>

      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
        Resolution — searched top to bottom
      </div>
      <div className="space-y-2">
        {FONT_RESOLUTION.map((f, i) => (
          <div
            key={f.name}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${f.ring}`}
          >
            <span
              className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${f.dot}`}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold leading-tight">{f.name}</div>
              <div className="text-xs text-white/40">
                {f.tier} — {f.note}
              </div>
            </div>
            <span dir={f.dir} className={`text-lg shrink-0 ${f.text}`}>
              {f.glyphs}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-white/50">
        A stack of Inter + Noto Sans Arabic + Noto Sans CJK renders mixed
        English, Arabic and Chinese correctly: each run picks the first family
        that covers it, and the OS font catches whatever is left.
        Emoji-presentation codepoints skip the chain entirely.
      </p>
    </div>
  );
}

/** §3 patch panel: any range source can drive any modifier — nothing is hard-wired. */
function SourceModifierCrossbar() {
  const sources = [
    { label: 'TagRule "b"', y: 34 },
    { label: 'TagRule "strong"', y: 90 },
    { label: 'MarkdownWrapRule "**"', y: 146 },
    { label: "Style.WholeText(…)", y: 202 },
  ];
  const mods = [
    { label: "BoldModifier", y: 62 },
    { label: "ColorModifier", y: 138 },
    { label: "StrokeModifier", y: 214 },
  ];
  const wire = (y1: number, y2: number) =>
    `M188 ${y1} C280 ${y1} 280 ${y2} 372 ${y2}`;
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4 overflow-x-auto">
      <svg
        viewBox="0 0 560 244"
        className="w-full min-w-[480px] h-auto"
        role="img"
        aria-label="Any range source can drive any modifier"
      >
        <text
          x="8"
          y="12"
          fill="rgba(255,255,255,0.4)"
          fontSize="11"
          letterSpacing="1"
        >
          RANGE SOURCES
        </text>
        <text
          x="552"
          y="12"
          textAnchor="end"
          fill="rgba(255,255,255,0.4)"
          fontSize="11"
          letterSpacing="1"
        >
          MODIFIERS
        </text>

        <path
          d={wire(90, 62)}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
        <path
          d={wire(146, 62)}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
        <path
          d={wire(202, 62)}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
        <path
          d={wire(146, 214)}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
        <path d={wire(34, 62)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <path
          d={wire(34, 138)}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2.5"
        />

        {sources.map((s) => (
          <g key={s.label}>
            <rect
              x="8"
              y={s.y - 18}
              width="180"
              height="36"
              rx="8"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text
              x="20"
              y={s.y + 4}
              fill="rgba(255,255,255,0.85)"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              {s.label}
            </text>
          </g>
        ))}
        {mods.map((m) => (
          <g key={m.label}>
            <rect
              x="372"
              y={m.y - 18}
              width="180"
              height="36"
              rx="8"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text
              x="540"
              y={m.y + 4}
              textAnchor="end"
              fill="rgba(255,255,255,0.85)"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              {m.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 text-sm text-white/50">
        Highlighted: the same <code>&lt;b&gt;</code> tag driving two different
        effects — <span className="text-sky-300">BoldModifier</span> and{" "}
        <span className="text-amber-300">ColorModifier</span>. A tag name means
        nothing on its own; a Style is what pairs a source with a modifier.
      </p>
    </div>
  );
}

/** §5.1 the four stages that resolve one parameter, weakest first. */
function ParameterCascade() {
  const stages = [
    {
      name: "Field",
      value: "inspector value",
      note: "every range of the modifier",
    },
    {
      name: "Rule default",
      value: "source default",
      note: "every range that source produces",
    },
    { name: "Markup token", value: "<color=#F00>", note: "one range" },
    {
      name: "Owned value",
      value: "Own / clip / rule",
      note: "composes on top",
      accent: true,
    },
  ];
  const items: ReactNode[] = [];
  stages.forEach((st, i) => {
    if (i > 0) {
      items.push(
        <div
          key={`arrow-${i}`}
          className="flex items-center justify-center shrink-0 px-1.5"
        >
          <ArrowRight className="w-4 h-4 text-white/30" />
        </div>,
      );
    }
    items.push(
      <div
        key={st.name}
        className={`flex-1 rounded-lg border px-3 py-2.5 ${
          st.accent
            ? "border-emerald-400/40 bg-emerald-400/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="text-[11px] font-mono text-white/40 mb-1">
          {st.name}
        </div>
        <div className="font-mono text-sm text-white/90 break-all">
          {st.value}
        </div>
        <div className="text-[11px] text-white/40 mt-1.5">{st.note}</div>
      </div>,
    );
  });
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-6 overflow-x-auto">
      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-3">
        weakest stage first — each one falls through when it carries nothing
      </div>
      <div className="flex items-stretch min-w-[640px]">{items}</div>
      <p className="mt-3 text-sm text-white/50">
        The first three stages overwrite one another. Owned values do not — they
        compose on top of the cascade result and are released independently, so
        a range returns to its authored value the moment the owner lets go.
      </p>
    </div>
  );
}

/** §6.4 compositing order: layer-major (default) versus glyph-major. */
function PaintOrderDiagram() {
  const layers = [
    { name: "Shadow", cls: "bg-white/10 text-white/50" },
    { name: "Stroke", cls: "bg-amber-400/20 text-amber-200" },
    { name: "Fill", cls: "bg-sky-400/25 text-sky-200" },
  ];
  const glyphs = ["A", "B", "C"];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
            layer-major — component default, cheapest
          </div>
          <div className="space-y-1.5">
            {layers.map((l) => (
              <div key={l.name} className="flex items-center gap-1.5">
                <span className="w-16 shrink-0 text-xs text-white/40">
                  {l.name}
                </span>
                {glyphs.map((g) => (
                  <span
                    key={g}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-semibold ${l.cls}`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/40">
            Each layer is drawn across every glyph, then the next layer.
          </p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
            glyph-major — correct when neighbours overlap
          </div>
          <div className="flex gap-3">
            {glyphs.map((g) => (
              <div key={g} className="space-y-1.5">
                <div className="text-xs text-white/40 text-center">{g}</div>
                {layers.map((l) => (
                  <span
                    key={l.name}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-semibold ${l.cls}`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/40">
            Every layer of one glyph is finished before the next glyph starts.
          </p>
        </div>
      </div>
    </div>
  );
}

/** §8.1 phase-driven motion: visual state is a pure function of the input parameter. */
function PhaseDrivenDiagram() {
  const samples = [0, 0.25, 0.5, 0.75, 1];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4 overflow-x-auto">
      <div className="min-w-[520px]">
        <div className="text-[11px] uppercase tracking-wider text-white/40 mb-3">
          Phase in — frame out. The modifier never advances time itself.
        </div>
        <div className="flex items-end gap-3">
          {samples.map((p) => {
            const offset = Math.round(-Math.sin(p * Math.PI * 2) * 14);
            return (
              <div key={p} className="flex-1 text-center">
                <div className="h-16 flex items-end justify-center">
                  <span
                    className="text-2xl font-semibold text-sky-300"
                    style={{ transform: `translateY(${offset}px)` }}
                  >
                    W
                  </span>
                </div>
                <div className="mt-2 rounded border border-white/10 bg-white/[0.03] py-1 font-mono text-xs text-white/60">
                  Phase {p}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-4 text-sm text-white/50">
        The same input always renders the same frame, so scrubbing, rewinding
        and deterministic tests all work. Feed the value from{" "}
        <code>UniTextDriver</code>, a tween library, Timeline, or an Animator.
      </p>
    </div>
  );
}

/**
 * §8.5 one driver clip over four matched ranges: the window opens at Start, each
 * member ramps for MemberDuration, and Stagger offsets the next one.
 */
function DriverClipDiagram() {
  const px = (t: number) => 40 + t * 112;
  const start = 1;
  const memberDuration = 1.5;
  const stagger = 0.5;
  const members = [0, 1, 2, 3];
  const clipEnd = start + memberDuration + stagger * (members.length - 1);
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4 overflow-x-auto">
      <svg
        viewBox="0 0 640 210"
        className="w-full min-w-[560px] h-auto"
        role="img"
        aria-label="A driver clip ramping four matched ranges with a stagger between them"
      >
        <defs>
          <linearGradient id="clipRamp" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4, 5].map((t) => (
          <g key={t}>
            <line
              x1={px(t)}
              y1="30"
              x2={px(t)}
              y2="186"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
            <text
              x={px(t)}
              y="200"
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="10"
            >
              {t}s
            </text>
          </g>
        ))}

        <rect
          x={px(start)}
          y="34"
          width={px(clipEnd) - px(start)}
          height="150"
          rx="8"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(52,211,153,0.35)"
          strokeDasharray="4 3"
        />
        <text
          x={px(start)}
          y="24"
          fill="rgba(52,211,153,0.9)"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          Start
        </text>
        <text
          x={px(clipEnd)}
          y="24"
          textAnchor="end"
          fill="rgba(255,255,255,0.4)"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          clip length = MemberDuration + Stagger × 3
        </text>

        {members.map((i) => {
          const t0 = start + stagger * i;
          const y = 48 + i * 33;
          return (
            <g key={i}>
              <text x="8" y={y + 15} fill="rgba(255,255,255,0.4)" fontSize="11">
                #{i + 1}
              </text>
              <rect
                x={px(t0)}
                y={y}
                width={memberDuration * 112}
                height="22"
                rx="5"
                fill="url(#clipRamp)"
                stroke="rgba(255,255,255,0.16)"
              />
              <text
                x={px(t0) + 8}
                y={y + 15}
                fill="rgba(255,255,255,0.55)"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                From
              </text>
              <text
                x={px(t0) + memberDuration * 112 - 8}
                y={y + 15}
                textAnchor="end"
                fill="rgba(255,255,255,0.9)"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                To
              </text>
            </g>
          );
        })}

        <line
          x1={px(start)}
          y1="41"
          x2={px(start + stagger)}
          y2="41"
          stroke="#fbbf24"
          strokeWidth="1.5"
        />
        <text
          x={px(start) + 4}
          y="38"
          fill="#fbbf24"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
        >
          Stagger
        </text>
      </svg>
      <p className="mt-3 text-sm text-white/50">
        Four ranges matched by one clip&rsquo;s query. Every member runs the
        same <code>MemberDuration</code> ramp from <code>From</code> to{" "}
        <code>To</code>; <code>Stagger</code> offsets each next one in text
        order, which is what makes the clip&rsquo;s length follow how many
        ranges the query currently matches.
      </p>
    </div>
  );
}

/** §9 the reactive chain: a signal reaches a modifier parameter without code. */
function RangeRuleChain() {
  const steps = [
    { name: "RangeSignal", value: "hover", note: "what the range emits" },
    {
      name: "RangeStateSelector",
      value: "Interaction",
      note: "when the rule applies",
    },
    {
      name: "RangeStatePlayback",
      value: "120 ms · ease",
      note: "how it moves",
      accent: true,
    },
    {
      name: "ParameterDescriptor",
      value: "Glow.Param.Color",
      note: "what it drives",
    },
  ];
  const items: ReactNode[] = [];
  steps.forEach((st, i) => {
    if (i > 0) {
      items.push(
        <div
          key={`arrow-${i}`}
          className="flex items-center justify-center shrink-0 px-1.5"
        >
          <ArrowRight className="w-4 h-4 text-white/30" />
        </div>,
      );
    }
    items.push(
      <div
        key={st.name}
        className={`flex-1 rounded-lg border px-3 py-2.5 ${
          st.accent
            ? "border-emerald-400/40 bg-emerald-400/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="text-[11px] font-mono text-white/40 mb-1">
          {st.name}
        </div>
        <div className="font-mono text-sm text-white/90 break-all">
          {st.value}
        </div>
        <div className="text-[11px] text-white/40 mt-1.5">{st.note}</div>
      </div>,
    );
  });
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-6 overflow-x-auto">
      <div className="flex items-stretch min-w-[640px]">{items}</div>
      <p className="mt-3 text-sm text-white/50">
        &ldquo;Links glow on hover, animated over 120&nbsp;ms, and the glow is
        the link&rsquo;s own colour&rdquo; is four serialized objects. Writing
        an owned parameter changes only that ownership — the serialized modifier
        field is never mutated.
      </p>
    </div>
  );
}

/** §14.1 paste ladder: the highest-priority adapter whose format is present wins. */
function ClipboardLadder() {
  const rungs = [
    {
      name: "UniTextSourceClipboardAdapter",
      format: "application/vnd.lightside.unitext",
      note: "visible text + markup spans · priority 100",
      cls: "border-emerald-400/40 bg-emerald-400/10",
    },
    {
      name: "TagHtmlClipboardAdapter",
      format: "HTML",
      note: "styled text for other apps · priority 50",
      cls: "border-sky-400/40 bg-sky-400/10",
    },
    {
      name: "MarkdownClipboardAdapter",
      format: "Markdown",
      note: "delimiters per modifier · priority 40",
      cls: "border-amber-400/40 bg-amber-400/10",
    },
    {
      name: "PlainTextClipboardAdapter",
      format: "plain text",
      note: "the floor · priority 0",
      cls: "border-white/15 bg-white/[0.04]",
    },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-3">
        On paste — first match wins, top to bottom
      </div>
      <div className="space-y-2">
        {rungs.map((r) => (
          <div
            key={r.name}
            className={`rounded-lg border px-4 py-2.5 ${r.cls}`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-sm text-white/90">{r.name}</span>
              <span className="font-mono text-xs text-white/50">
                {r.format}
              </span>
            </div>
            <div className="text-xs text-white/40 mt-0.5">{r.note}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/50">
        On copy every registered adapter contributes its format in one atomic
        multi-format write, so a single copy carries all of them at once.
      </p>
    </div>
  );
}

export default function GettingStartedPage() {
  const { versionedBasePath, version } = useDocs();
  const basePath = versionedBasePath;

  return (
    <AutoLink>
      <div className="space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50">
          <Link to={basePath} className="hover:text-white transition">
            Docs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Getting Started</span>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-lg text-white/60">
            UniText is a complete text engine for Unity: Unicode analysis,
            shaping (HarfBuzz), layout, glyph rasterization (FreeType), atlas
            management, rendering — and, since 3.0, selection, editing and
            system integration.
          </p>
          <p className="text-white/60 mt-4">
            This guide is task-ordered. Read §1&ndash;§4 to put styled text on
            screen; the rest is reference by subsystem.
          </p>
          <div className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
              Two packages
            </div>
            <p className="text-white/70">
              <code>media.lightside.unitext</code> depends on{" "}
              <code>media.lightside.core</code> (MIT, free) — pooling, worker
              threads, math, catalogs, the inspector toolkit, the
              asset-migration framework, and the value types the UniText API
              exposes directly: <code>Ease</code>, <code>Gradient</code>,{" "}
              <code>UnitValue</code>, <code>PaintProjectionKind</code>,{" "}
              <code>PaintFit</code>, <code>PaintSpread</code> and{" "}
              <code>LayerBlend</code>. Installing UniText pulls Core
              automatically.
            </p>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* Installation                                                        */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Download className="w-6 h-6 text-[var(--color-accent)]" />
            Installation
          </h2>

          <div className="space-y-6">
            <Notice type="warning">
              If you have a previous version of UniText installed, remove it
              first via <strong>Window &rarr; Package Manager</strong> before
              installing {version.replace(/^v/, "")}. This is a major update and
              cannot be installed over the previous version.
            </Notice>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Setup Tool</h3>
              <ol className="space-y-2 text-white/70 list-decimal list-inside">
                <li>
                  Check your email for a setup email from Light Side with your{" "}
                  <strong>access token</strong>
                </li>
                <li>
                  Download the <strong>setup tool</strong> from the email and
                  import it into your Unity project. The setup window opens
                  automatically — paste your token and click{" "}
                  <strong>Set Up</strong>
                </li>
                <li>
                  Done! UniText is installed. You can manage versions anytime
                  via <strong>Light Side &rarr; UniText Setup</strong> in the
                  Unity menu bar
                </li>
              </ol>
            </div>
          </div>

          <Notice type="info" className="mt-4">
            Requires Unity 2022.3 LTS or newer.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 1. Adding UniText to a Scene                                        */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6 text-[var(--color-accent)]" />
            1. Adding UniText to a Scene
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                1.1 Canvas text — <code>UniText</code>
              </h3>

              <p className="text-white/70 mb-4">
                <strong>GameObject → UI (Canvas) → UniText → Text</strong>. The
                menu instantiates the prefab in{" "}
                <code>UniTextSettings.TextPrefab</code> — the package ships one
                — so a designer&rsquo;s configured prefab is what appears, not a
                code-built hierarchy. With the slot empty the menu builds the
                object in code instead: a <code>UniText</code> on a 220×50{" "}
                <code>RectTransform</code> under the scene&rsquo;s canvas,
                creating that canvas and an <code>EventSystem</code> if there is
                none.
              </p>

              <p className="text-white/70 mb-4">
                <code>UniText</code> derives from <code>MaskableGraphic</code>,
                so it behaves like any uGUI graphic: masks, layout groups,{" "}
                <code>ContentSizeFitter</code>, <code>RectMask2D</code> and
                canvas batching all apply.
              </p>

              <CodeBlock
                code={`var text = gameObject.AddComponent<UniText>();
text.Styles.Add(Style.Tag(new BoldModifier(), "b"));   // <b> exists only because this line says so
text.Text = "Hello <b>world</b>";
text.FontSize = 24;
text.color = Color.white;`}
              />

              <Notice type="info" className="mt-4">
                No tag is built in. A component with no matching style renders{" "}
                <code>&lt;b&gt;world&lt;/b&gt;</code> as literal characters —
                markup is a style list, not a fixed vocabulary (§3). The shipped
                prefabs and the Styles picker wire the common tags for you.
              </Notice>

              <p className="text-white/70 mt-4">
                The same submenu creates <strong>Button</strong>,{" "}
                <strong>Selectable Text</strong>, <strong>Editable Text</strong>{" "}
                and <strong>Input Field</strong>, each from its own prefab slot
                in <code>UniTextSettings</code> — assembled components, not
                separate types (§12, §13).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                1.2 World-space text — <code>UniTextWorld</code>
              </h3>

              <p className="text-white/70 mb-4">
                <strong>GameObject → UI (World) → UniText → World Text</strong>.
                Renders through a mesh batcher rather than a{" "}
                <code>CanvasRenderer</code>, so it takes part in the
                scene&rsquo;s normal render queue: sorting layers, sorting
                order, shadow casting.
              </p>

              <p className="text-white/70 mb-4">
                World texts that share a sorting context — sorting layer, order
                in layer, <code>SortingGroup</code>, Unity layer, scene, shadow
                casting — merge into one mesh behind one renderer, and one
                renderer has one depth-sorting position: nothing can draw
                between two texts of the same batch. Enable{" "}
                <code>Standalone</code> on a text to give it a renderer of its
                own; it then sorts by its own distance to the camera against
                every other transparent renderer in the scene, at the cost of
                one draw call.
              </p>

              <p className="text-white/70">
                Pointer input for world text is routed by{" "}
                <code>UniTextWorldRaycaster</code> — add it to the camera that
                should see the text (see §10.4).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">1.3 Which one to use</h3>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60"></th>
                      <th className="text-left py-2 pr-4 text-white/60">
                        <code>UniText</code>
                      </th>
                      <th className="text-left py-2 text-white/60">
                        <code>UniTextWorld</code>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/50">Parent</td>
                      <td className="py-2 pr-4">Canvas</td>
                      <td className="py-2">any Transform</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/50">
                        Culling / clipping
                      </td>
                      <td className="py-2 pr-4">
                        Canvas mask, <code>RectMask2D</code>
                      </td>
                      <td className="py-2">frustum, camera layers</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/50">Sorting</td>
                      <td className="py-2 pr-4">canvas draw order</td>
                      <td className="py-2">
                        <code>SortingLayerID</code>, <code>SortingOrder</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/50">Batching</td>
                      <td className="py-2 pr-4">per canvas</td>
                      <td className="py-2">
                        per sorting context; <code>Standalone</code> opts out
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white/50">Lighting</td>
                      <td className="py-2 pr-4">unlit</td>
                      <td className="py-2">unlit or lit shaders</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                Everything else — markup, fonts, paints, animation, selection,
                editing — is identical; both derive from{" "}
                <code>UniTextBase</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 2. Fonts                                                            */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Type className="w-6 h-6 text-[var(--color-accent)]" />
            2. Fonts
          </h2>

          <p className="text-white/70 mb-6">
            UniText does not use Unity font assets. It reads OpenType files
            directly through FreeType and HarfBuzz, so OpenType features,
            variable axes and complex scripts work as the font author intended.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.1 Creating a font asset</h3>

              <p className="text-white/70 mb-4">
                <strong>Tools → UniText → Tools → Create Font Asset</strong>, or
                right-click a <code>.ttf</code>/<code>.otf</code>/
                <code>.ttc</code>/<code>.otc</code> file — or a Unity{" "}
                <code>Font</code> — →{" "}
                <strong>Create → UniText → Font Asset</strong>.
              </p>

              <p className="text-white/70 mb-4">
                A <code>UniTextFont</code> wraps one font file. It carries the
                face metrics (<code>FaceInfo</code>), its rasterization tuning,
                variable-axis defaults and per-glyph overrides; the glyph atlas
                itself is shared by every font of a render mode. The font bytes
                are Zstd-compressed into the asset, so the source file does not
                have to ship.
              </p>

              <p className="text-white/60 text-sm mb-3">
                Key inspector settings:
              </p>
              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <strong>Render mode</strong> — <code>UniTextRenderMode</code>.
                  <code>SDF</code> (rounded corners on effects) or{" "}
                  <code>MSDF</code> (sharp corners). Set per component on{" "}
                  <code>UniTextBase.RenderMode</code>, not on the font asset.
                  MSDF costs more atlas memory; use it for sharp-cornered
                  display type.
                </li>
                <li>
                  <strong>Rasterization</strong> — <code>SDF Detail</code> and{" "}
                  <code>Tile Size Offset</code> pick the raster tile a glyph
                  lands in (64 or 128 px); raise them for hairline or
                  calligraphic faces. Page size is fixed.
                </li>
                <li>
                  <strong>Sizing</strong> — <code>Font Scale</code> rescales a
                  face drawn too small or too large by design;{" "}
                  <code>Normalize Size</code> (on by default) keeps the face in
                  font-size normalization, matching its x-height or cap-height
                  to the primary font. The metric itself is a project setting
                  (Project Settings → UniText → Text Defaults →{" "}
                  <strong>Font Size Match</strong>,{" "}
                  <code>FontNormalizeMetric</code>);{" "}
                  <code>FontSizeMatchModifier</code> overrides it on a
                  component.
                </li>
                <li>
                  <strong>Metrics</strong> and <strong>Face Info</strong> — line
                  height, ascender, descender, cap and mean line, underline,
                  strikethrough and sub/superscript offsets, all read from the
                  file and editable when a font ships bad values;{" "}
                  <code>Reset Metrics</code> restores the file&rsquo;s own.
                  Family name, style, weight and italic flag are read-only
                  unless the asset is a <code>UniTextFontVariant</code>.
                  Per-platform overrides (<code>FaceInfoOverride</code>) exist
                  only on <code>UniTextSystemFont</code> (§2.5).
                </li>
                <li>
                  <strong>Spacing &amp; Style</strong> —{" "}
                  <code>Spacing Offset</code> and <code>Space Width</code> in
                  design units for faces that render too tight or too loose;{" "}
                  <code>Italic Style</code> (synthetic slant, degrees) and{" "}
                  <code>Fake Bold Weight</code> (CSS weight steps) stand in for
                  a missing italic or bold cut.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                2.2 Font stacks and families
              </h3>

              <p className="text-white/70 mb-4">
                A <code>UniTextFontStack</code> goes in a component&rsquo;s{" "}
                <code>FontStack</code> slot; a single face can go in{" "}
                <code>Font</code> instead, and when both are set{" "}
                <code>Font</code> is the primary while the stack supplies the
                fallbacks. A stack holds <strong>families</strong>; a{" "}
                <code>FontFamily</code> groups a primary plus faces that differ
                only by style (bold, italic, bold-italic, variable), carries a{" "}
                <code>name</code> used by the <code>&lt;font&gt;</code> tag, and
                an optional <code>preferredLanguage</code> BCP 47 tag that wins
                resolution for runs marked with it (§15.2).
              </p>

              <p className="text-white/60 text-sm mb-3">
                Resolution is three-tier, in order:
              </p>

              <FontResolutionDiagram />

              <p className="text-white/70 mb-4">
                Emoji-presentation codepoints bypass this chain: an assigned{" "}
                <code>UniTextColorFont</code> in the stack wins, otherwise the
                platform emoji cascade (§17).
              </p>

              <p className="text-white/60 text-sm mb-3">Two stack shapes:</p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <strong>Combined</strong> — one stack, families grouped
                  inside. The common case.
                </li>
                <li>
                  <strong>Per font</strong> — one stack per family, chained. Use
                  when several components need different primary families but
                  the same fallbacks.
                </li>
              </ul>

              <p className="text-white/70">
                Both are created from a font-asset selection:{" "}
                <strong>Create → UniText → Font Stack (Combined)</strong> merges
                two or more fonts into one stack,{" "}
                <strong>Create → UniText → Font Stack (Per Font)</strong> makes
                one stack per selected font. A stack chains to the next through
                its <code>Fallback Stack</code> slot.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.3 Variable fonts</h3>

              <p className="text-white/70 mb-4">
                A variable font exposes axes (<code>wght</code>,{" "}
                <code>wdth</code>, <code>ital</code>, <code>slnt</code>,{" "}
                <code>opsz</code>). UniText reads them and can instance any
                point in the design space. Set defaults per font asset (
                <code>UniTextFont.AxisDefault</code>, inspector{" "}
                <strong>Variable Font Axes</strong>) and override per range with{" "}
                <code>&lt;var&gt;</code> (§4.1).
              </p>

              <p className="text-white/70 mb-4">
                <code>UniTextFontVariant</code> (
                <strong>Create → UniText → Font Variant</strong>) borrows
                another font&rsquo;s bytes and owns everything else — metrics,
                rasterization, axis defaults, glyph overrides — with its own
                atlas and shaper cache, so pinned axis defaults give a reusable
                design-space point without duplicating the file.
              </p>

              <p className="text-white/70">
                Variable instancing is memory-aware —{" "}
                <code>UniTextFontProvider.VariationMemoryStats</code> returns a{" "}
                <code>FontVariationMemoryStats</code> snapshot of what the
                variation cache holds.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.4 Tools window</h3>

              <p className="text-white/70 mb-4">
                <strong>Tools → UniText → Tools</strong>:
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <strong>Create Font Asset</strong> — batch-create{" "}
                  <code>UniTextFont</code> assets from font files.
                </li>
                <li>
                  <strong>Font Subsetter</strong> — strip unused glyphs from a
                  font to shrink the build. Pick <strong>Keep</strong> or{" "}
                  <strong>Remove</strong>, give it character sets, ranges or a
                  text corpus, and it emits either a reduced <code>.ttf</code>{" "}
                  file or a <code>UniTextFont</code> asset built from it.
                </li>
                <li>
                  <strong>Dictionary Builder</strong> — builds the
                  word-segmentation dictionary used for line breaking in scripts
                  without spaces (Thai, Lao, Khmer, Myanmar, Chinese, Japanese)
                  — see <code>WordSegmentationDictionary</code>. A built
                  dictionary takes effect only once it is listed in Project
                  Settings → UniText → Word Segmentation (
                  <code>UniTextSettings.Dictionaries</code>).
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.5 System fonts</h3>

              <p className="text-white/70 mb-4">
                <strong>Automatic OS fallback</strong> is on by default: any
                codepoint no family in the stack covers is rendered from the OS
                font, so a project that ships only a Latin font still renders
                Japanese text pasted by a user. Project Settings → UniText →
                Fonts → <strong>Disable System Font Fallback</strong> turns it
                off (<code>UniTextSettings.SystemFontDisabled</code>, runtime
                mirror <code>SystemFont.Disabled</code>); explicitly assigned{" "}
                <code>UniTextSystemFont</code> assets keep working.
              </p>

              <Notice type="warning" className="mb-4">
                WebGL has no OS font access — assign a regular{" "}
                <code>UniTextFont</code> there.
              </Notice>

              <p className="text-white/70 mb-4">
                <strong>Explicit system font</strong> —{" "}
                <strong>Create → UniText → System Font Asset</strong> makes a{" "}
                <code>UniTextSystemFont</code>: a font whose bytes come from the
                OS, picked per platform (Common, Windows, macOS, Linux, iOS,
                Android) with per-platform face-metric (
                <code>FaceInfoOverride</code>) and rasterization overrides. Put
                it in a stack to use the OS font as a named family, e.g. to
                match the platform&rsquo;s UI font. Project Settings → UniText →
                Fonts → <strong>Default System Font</strong> additionally makes
                one the primary for components with no <code>Font</code> and no{" "}
                <code>FontStack</code>.
              </p>

              <p className="text-white/70 mb-4">
                An entry is requested from the operating system{" "}
                <strong>by family name</strong>, so it resolves wherever the
                machine keeps that family installed. On Android the entries
                resolve to the device&rsquo;s own sans-serif, serif and
                monospace roles, so <code>Roboto</code>, <code>Noto Sans</code>{" "}
                and <code>Droid Sans</code> all yield the real UI face of the
                device, manufacturer replacements included. A resolved face
                carries the variable-axis values the OS bound to it. Lookup
                happens the first time the asset is drawn or its data is read,
                so <code>ResolvedFontName</code>, <code>ResolvedPath</code>,{" "}
                <code>ResolvedPlatform</code> and <code>ResolveFailed</code>{" "}
                stay unset until then.
              </p>

              <p className="text-white/70">
                <code>SystemFont.MemoryStats</code> returns a{" "}
                <code>SystemFontMemoryStats</code> snapshot of what the
                system-font cache holds;{" "}
                <code>SystemFont.InactiveSourceCapacity</code> and{" "}
                <code>SystemFont.InactiveByteBudget</code> bound what it keeps
                after the last text releases it.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">2.6 Color fonts</h3>
                <p className="text-white/70">
                  <code>UniTextColorFont</code> (
                  <strong>Create → UniText → Color Font Asset</strong>) handles
                  color glyph formats: CBDT/sbix bitmap and COLRv0/COLRv1
                  vector. Emoji are the common case (§17) — the always-on emoji
                  font stays the provider for emoji-presentation codepoints —
                  but the same path renders any color font.{" "}
                  <strong>Color Pixel Size</strong> sets the rasterization size
                  in the shared color atlas; bitmap faces snap to the nearest
                  strike. SVG-in-OT is detected but not rendered, and WebGL
                  rasterizes no embedded color font.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">2.7 Materials</h3>
                <p className="text-white/70">
                  Materials are shared, not per asset: one canvas material draws
                  SDF, MSDF and color glyphs together, and world text adds a lit
                  and an unlit variant. Custom shaders are covered in §18;
                  assigning a custom material to a range is{" "}
                  <code>MaterialModifier</code> (§4.1).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 3. Markup: Sources and Modifiers                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-[var(--color-accent)]" />
            3. Markup: Sources and Modifiers
          </h2>

          <p className="text-white/70 mb-4">
            UniText&rsquo;s markup has no fixed tag table. It separates{" "}
            <strong>which ranges exist</strong> from{" "}
            <strong>what happens to them</strong>:
          </p>

          <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
            <li>
              <code>RangeSource</code> produces logical ranges.{" "}
              <code>ParseRule</code> is the subtype that finds them by parsing
              text syntax.
            </li>
            <li>
              <code>BaseModifier</code> applies an effect to those ranges.
            </li>
          </ul>

          <p className="text-white/70 mb-4">
            A <code>Style</code> is one Source + Modifier pair. A component
            holds a list of them.
          </p>

          <SourceModifierCrossbar />

          <p className="text-white/70 mb-4">
            Nothing couples a tag name to an effect. <code>&lt;b&gt;</code> runs{" "}
            <code>BoldModifier</code> only because a preset wired it that way.
            The same modifier can be driven by a tag, a Markdown marker, an
            authored range, or your own source:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Source</th>
                  <th className="text-left py-2 pr-4 text-white/60">Syntax</th>
                  <th className="text-left py-2 text-white/60">Modifier</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>TagRule(&quot;b&quot;)</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>&lt;b&gt;bold&lt;/b&gt;</code>
                  </td>
                  <td className="py-2">
                    <code>BoldModifier</code>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>TagRule(&quot;strong&quot;)</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>&lt;strong&gt;bold&lt;/strong&gt;</code>
                  </td>
                  <td className="py-2">
                    <code>BoldModifier</code>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>MarkdownWrapRule</code> · Marker <code>**</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>**bold**</code>
                  </td>
                  <td className="py-2">
                    <code>BoldModifier</code>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    <code>Style.WholeText(…)</code>
                  </td>
                  <td className="py-2 pr-4 text-white/50 italic">
                    entire text, no markup
                  </td>
                  <td className="py-2">
                    <code>BoldModifier</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.1 Adding styles</h3>

              <p className="text-white/70 mb-4">
                <strong>Inspector.</strong> Expand <strong>Styles</strong> on
                the component, press <strong>+</strong>. A searchable picker
                opens, grouped first by how the style is driven — Whole Text,
                Tags, Inline Tags, Markdown, Auto-detect, Protection — and under
                Whole Text and Tags by modifier category (Common, Text Style,
                Decoration, Appearance, Layout, Interactive, Inline, Utility,
                Animation, Custom). Picking a preset configures both sides; you
                can then edit either independently.
              </p>

              <p className="text-white/70 mb-4">
                <strong>Code.</strong> <code>Style</code> exposes four static
                builders:
              </p>

              <CodeBlock
                code={`Style.Tag(modifier, "b", defaultParameter: null)   // driven by <b>…</b>
Style.WholeText(modifier, parameter: null)         // the entire text, no markup
Style.Range(modifier, start, end, parameter: null) // one authored codepoint span
Style.FromSource(source, modifier)                 // any RangeSource you like`}
              />

              <CodeBlock
                className="mt-4"
                code={`text.Styles.Add(Style.Tag(new BoldModifier(), "b"));
text.Styles.Add(Style.Tag(new ColorModifier(), "warning", "#FF0000"));`}
              />

              <p className="text-white/70 mt-4">
                A style can be switched off without removing it:{" "}
                <code>Enabled = false</code> skips it entirely — never parsed,
                applied or rendered — and preserves its configuration.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                3.2 Custom tags with default parameters
              </h3>

              <p className="text-white/70 mb-4">
                <code>TagRule.defaultParameter</code> pre-fills the
                modifier&rsquo;s parameters, so the text stays clean:
              </p>

              <CodeBlock
                code={`Style.Tag(new ColorModifier(), "warning", "#FF0000")`}
              />

              <ul className="space-y-2 text-white/70 list-disc list-inside mt-4 mb-4">
                <li>
                  <code>&lt;warning&gt;error&lt;/warning&gt;</code> — red from
                  the default
                </li>
                <li>
                  <code>&lt;warning=#FFA500&gt;caution&lt;/warning&gt;</code> —
                  the tag wins
                </li>
              </ul>

              <p className="text-white/70 mb-4">
                For multi-parameter modifiers the merge is per-slot: values
                present in the tag win, missing slots come from the default.
                Slots inside one modifier are comma-separated, and an empty slot
                takes the default — <code>&lt;pspace=,4&gt;</code> sets only the
                second. A <code>CompositeModifier</code> splits its parameter by{" "}
                <code>;</code>, one segment per child, before each child reads
                its own slots. <code>MarkdownWrapRule</code> supports the same
                field.
              </p>

              <p className="text-white/70">
                That merge is one stage of the parameter cascade — modifier
                field, rule default, markup token, owned value (§5.1).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.3 Parse rule types</h3>

              <p className="text-white/70 mb-4">
                <strong>Tag rules.</strong> <code>TagRule</code> with a
                configurable name. Parameters are optional. Self-closing is
                syntax-driven: <code>&lt;tag/&gt;</code>,{" "}
                <code>&lt;tag=value/&gt;</code>. <code>InlineTagRule</code> is
                the self-closing variant used by inline media.
              </p>

              <p className="text-white/70 mb-3">
                An opening tag can carry a <code>#label</code> anchor, written
                after the tag name and before any value:
              </p>

              <CodeBlock
                language="text"
                disableTypeLinks
                code={`<b #intro>named range</b>
<color #warn=#FF0000>named range with a value</color>
<obj #icon=star/>`}
              />

              <p className="text-white/70 mt-4 mb-6">
                The label names that one occurrence. It is stripped with the
                tag, travels with the range as <code>ModifierRange.Label</code>,
                and selects it in a range query —{" "}
                <code>modifier.Ranges().WhereLabel(&quot;intro&quot;)</code>{" "}
                (§19.6). Label characters are letters, digits, <code>_</code>{" "}
                and <code>-</code>. The closing tag stays plain:{" "}
                <code>&lt;/b&gt;</code>.
              </p>

              <p className="text-white/60 text-sm mb-3">Markdown rules</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Rule
                      </th>
                      <th className="text-left py-2 text-white/60">Syntax</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code>, Marker <code>**</code>
                      </td>
                      <td className="py-2">
                        <code>**bold**</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code>, Marker <code>*</code>
                      </td>
                      <td className="py-2">
                        <code>*italic*</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code>, Marker <code>~~</code>
                      </td>
                      <td className="py-2">
                        <code>~~strike~~</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code>, Marker <code>++</code>
                      </td>
                      <td className="py-2">
                        <code>++underline++</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownLinkParseRule</code>
                      </td>
                      <td className="py-2">
                        <code>[text](url)</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownListParseRule</code>
                      </td>
                      <td className="py-2">
                        <code>- item</code>, <code>* item</code>,{" "}
                        <code>+ item</code>, <code>1. item</code>,{" "}
                        <code>1) item</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>RawUrlParseRule</code>
                      </td>
                      <td className="py-2">
                        auto-detects bare URLs: <code>http(s)://</code>,{" "}
                        <code>ftp(s)://</code>, <code>file://</code>,{" "}
                        <code>mailto:</code>, <code>tel:</code>,{" "}
                        <code>www.</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/60 text-sm mb-3">Utility sources</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Source
                      </th>
                      <th className="text-left py-2 text-white/60">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>FixedRangeSource</code>
                      </td>
                      <td className="py-2">
                        apply a modifier to authored codepoint ranges, no markup
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MutableRangeSource</code>
                      </td>
                      <td className="py-2">
                        ranges maintained at runtime that survive edits (§12.4)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>StringParseRule</code>
                      </td>
                      <td className="py-2">
                        match a list of literal patterns (case-sensitive),
                        optionally replacing each with one fixed string
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>CompositeParseRule</code>
                      </td>
                      <td className="py-2">
                        group several rules under one modifier
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>TriggerWordParseRule</code>
                      </td>
                      <td className="py-2">
                        auto-detects <code>&lt;trigger&gt;word</code> tokens (
                        <code>@name</code>, <code>#tag</code>) — one
                        configurable trigger character, the word becomes the
                        parameter; commonly paired with{" "}
                        <code>InteractiveModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SeparatorParseRule</code>
                      </td>
                      <td className="py-2">
                        void <code>&lt;sep&gt;</code> tag replaced with a
                        configurable separator string (
                        <code>&lt;sep=&quot; ● &quot;&gt;</code> overrides it);
                        pair with <code>SeparatorModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>RubyParseRule</code>
                      </td>
                      <td className="py-2">ruby / furigana annotations</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>LineBreakParseRule</code>
                      </td>
                      <td className="py-2">
                        explicit <code>&lt;br&gt;</code>,{" "}
                        <code>&lt;br/&gt;</code> — inserts a soft line break
                        (U+2028) that wraps inside the paragraph; standalone, no
                        modifier
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>MathParseRule</code>
                      </td>
                      <td className="py-2">math formula spans (§4.7)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-3">
                <strong>Protection rules</strong> shield their content from
                every other rule. They are <em>standalone</em> — registered
                without a modifier:
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Rule
                      </th>
                      <th className="text-left py-2 pr-4 text-white/60">
                        Syntax
                      </th>
                      <th className="text-left py-2 text-white/60">Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>NoparseTagRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>&lt;noparse&gt;…&lt;/noparse&gt;</code>
                      </td>
                      <td className="py-2">
                        contents are literal; a missing closer protects the rest
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>CodeSpanRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>`x`</code>, <code>``x``</code>
                      </td>
                      <td className="py-2">
                        balanced backtick runs, following the CommonMark
                        code-span rule
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>BackslashEscapeRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>\*</code>, <code>\[</code>, <code>\#</code>
                      </td>
                      <td className="py-2">
                        escapes one ASCII punctuation character
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <CodeBlock
                code={`text.AddRule(new NoparseTagRule());
text.AddRule(new BackslashEscapeRule());
text.RemoveRule(myRule);`}
              />

              <p className="text-white/70 mt-4">
                <code>AddRule</code> accepts standalone rules only. Your own
                rule opts in with <code>IsStandalone =&gt; true</code>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.4 Priority</h3>

              <p className="text-white/70 mb-4">
                Ranges from different sources can overlap. Priority belongs to
                the rule, not the <code>Style</code>:{" "}
                <code>ParseRule.Priority</code> orders the rules highest first,
                and the first rule that consumes at a position claims it.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Priority
                      </th>
                      <th className="text-left py-2 text-white/60">Rules</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>int.MaxValue</code>
                      </td>
                      <td className="py-2">
                        protection rules — they always win
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>10</code>
                      </td>
                      <td className="py-2">
                        <code>MathParseRule</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>1</code>
                      </td>
                      <td className="py-2">
                        <code>LineBreakParseRule</code>,{" "}
                        <code>SeparatorParseRule</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>0</code>
                      </td>
                      <td className="py-2">
                        the default, <code>TagRule</code> included;{" "}
                        <code>MarkdownWrapRule</code> uses its marker length
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>-100</code>
                      </td>
                      <td className="py-2">
                        auto-detection — <code>RawUrlParseRule</code>,{" "}
                        <code>TriggerWordParseRule</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                Auto-detection sits below everything, so explicit markup claims
                a position before a detector does. A custom rule overrides{" "}
                <code>Priority</code>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.5 Style presets</h3>
              <p className="text-white/70 mb-3">
                A <code>StylePreset</code> is a project asset holding a
                configured style list. Assign presets to a component (
                <code>StylePresets</code>) to share one markup vocabulary across
                many components; <code>UniTextSettings.GlobalStylePreset</code>{" "}
                applies project-wide when <code>UseGlobalStylePreset</code> is
                on. Local styles compose on top.
              </p>
              <p className="text-white/70">
                Editing a preset asset rebuilds every live component using it.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 4. Built-in Modifiers                                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-[var(--color-accent)]" />
            4. Built-in Modifiers
          </h2>

          <p className="text-white/70 mb-4">
            Default tag names below are conventions, not constraints — the
            Styles picker wires most of them, and any modifier takes any tag
            through <code>Style.Tag(...)</code> (§3.1).
          </p>

          <p className="text-white/70 mb-6">
            Every value a tag carries lands in one of the modifier&rsquo;s{" "}
            <strong>parameters</strong>: §5 is how they resolve, how a modifier
            of your own declares them, and how code addresses them.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.1 Text style</h3>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Tag</th>
                      <th className="text-left py-2 pr-4 text-white/60">
                        Modifier
                      </th>
                      <th className="text-left py-2 text-white/60">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;b&gt;</code>, <code>**…**</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>BoldModifier</code>
                      </td>
                      <td className="py-2">
                        <code>&lt;b=700&gt;</code> picks a weight;{" "}
                        <code>&lt;b=700,f&gt;</code> synthesizes it,{" "}
                        <code>&lt;b=700,r&gt;</code> uses a real face only
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;i&gt;</code>, <code>*…*</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ItalicModifier</code>
                      </td>
                      <td className="py-2">
                        real italic face, or synthesized slant
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;upper&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>UppercaseModifier</code>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;lower&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>LowercaseModifier</code>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;smallcaps&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>SmallCapsModifier</code>
                      </td>
                      <td className="py-2">
                        uses OpenType <code>smcp</code> when the font has it
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;size&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>SizeModifier</code>
                      </td>
                      <td className="py-2">
                        <code>24</code>, <code>150%</code>, <code>+10</code>,{" "}
                        <code>-5</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;color&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ColorModifier</code>
                      </td>
                      <td className="py-2">
                        <code>#RGB</code>, <code>#RRGGBB</code>,{" "}
                        <code>#RRGGBBAA</code>, or a named colour
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;var&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>VariationModifier</code>
                      </td>
                      <td className="py-2">variable-font axes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;font&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>FontModifier</code>
                      </td>
                      <td className="py-2">
                        selects a <code>FontFamily.name</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;lang&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>LanguageModifier</code>
                      </td>
                      <td className="py-2">BCP 47 tag</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;mat&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>MaterialModifier</code>
                      </td>
                      <td className="py-2">custom material, optional tint</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;ruby&gt;</code>,{" "}
                        <code>&lt;ruby=かんじ&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>RubyModifier</code>
                      </td>
                      <td className="py-2">
                        furigana above a base run; pair with{" "}
                        <code>RubyParseRule</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;sup&gt;</code>, <code>&lt;sub&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ScriptPositionModifier</code>
                      </td>
                      <td className="py-2">
                        OpenType <code>sups</code>/<code>subs</code>,
                        synthesized when the font lacks them
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white/40">—</td>
                      <td className="py-2 pr-4">
                        <code>GlyphResolutionModifier</code>
                      </td>
                      <td className="py-2">
                        raises the atlas tile resolution of the range&rsquo;s
                        glyphs; grow-only and shared
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                <strong>Named colours:</strong> white, black, red, green, blue,
                yellow, cyan, magenta, orange, purple, gray, lime, brown, pink,
                navy, teal, olive, maroon, silver, gold.
              </p>

              <p className="text-white/70 mb-3">
                <strong>Variable axes</strong> are positional in the order{" "}
                <code>wght, wdth, ital, slnt, opsz</code>; <code>~</code> skips
                an axis:
              </p>

              <CodeBlock
                language="text"
                disableTypeLinks
                code={`<var=700>          weight 700
<var=150%>         150% of the default weight
<var=+200>         +200 from default
<var=700,80>       weight 700, width 80
<var=~,~,~,-12>    slant only`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.2 Layout</h3>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Tag</th>
                      <th className="text-left py-2 pr-4 text-white/60">
                        Modifier
                      </th>
                      <th className="text-left py-2 text-white/60">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;cspace&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>LetterSpacingModifier</code>
                      </td>
                      <td className="py-2">
                        <code>5</code>, <code>0.1em</code>. On cursive scripts
                        positive spacing renders tatweel so joins survive
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;cwidth&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>CharacterWidthModifier</code>
                      </td>
                      <td className="py-2">
                        fits each character into a cell of one width and centers
                        the glyph in it: <code>1em</code> full-width,{" "}
                        <code>0.5em</code> half-width, <code>auto</code> the
                        widest glyph of the range
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;wspace&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>WordSpacingModifier</code>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;line-height&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>LineHeightModifier</code>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;pspace&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ParagraphSpacingModifier</code>
                      </td>
                      <td className="py-2">
                        <code>&lt;pspace=10&gt;</code> after,{" "}
                        <code>&lt;pspace=10,4&gt;</code> after and before; never
                        applied at the block edges
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;nobr&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>NoBreakModifier</code>
                      </td>
                      <td className="py-2">
                        keeps the range on one line, and lets the line break
                        immediately before and after it
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;ellipsis&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>EllipsisModifier</code>
                      </td>
                      <td className="py-2">
                        <code>1</code> end, <code>0</code> start,{" "}
                        <code>0.5</code> middle
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;truncate&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>TruncateModifier</code>
                      </td>
                      <td className="py-2">
                        same positions, no &hellip; marker
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;li&gt;</code>, <code>- item</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ListModifier</code>
                      </td>
                      <td className="py-2">
                        markers, indentation, ordered/unordered
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;indent&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>IndentModifier</code>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;align&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>AlignmentModifier</code>
                      </td>
                      <td className="py-2">per-range alignment</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;dir&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>DirectionModifier</code>
                      </td>
                      <td className="py-2">whole-text base direction</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;arc&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ArcModifier</code>
                      </td>
                      <td className="py-2">curves the baseline</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/40">—</td>
                      <td className="py-2 pr-4">
                        <code>SeparatorModifier</code>
                      </td>
                      <td className="py-2">
                        keeps each run between tagged separators whole across
                        wrap; pair with <code>SeparatorParseRule</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/40">—</td>
                      <td className="py-2 pr-4">
                        <code>TextBoxTrimModifier</code>
                      </td>
                      <td className="py-2">
                        trims space above and below to chosen metrics (CSS{" "}
                        <code>text-box-trim</code>)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white/40">—</td>
                      <td className="py-2 pr-4">
                        <code>FontSizeMatchModifier</code>
                      </td>
                      <td className="py-2">
                        matches mixed fonts on x-height or cap-height (CSS{" "}
                        <code>font-size-adjust</code>)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Notice type="warning">
                The monospace flag on <code>&lt;cspace&gt;</code> is gone.{" "}
                <code>&lt;cwidth=auto&gt;</code> replaces it; a second{" "}
                <code>&lt;cspace&gt;</code> token is ignored.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.3 Paint layers</h3>

              <Notice type="warning" className="mb-4">
                The 2.x <code>&lt;gradient&gt;</code> and{" "}
                <code>&lt;outline&gt;</code> tags are gone. Fills, strokes,
                shadows and glows are now <strong>paint layers</strong> over a
                shared paint system (§6).
              </Notice>

              <p className="text-white/70 mb-4">
                They ship as whole-text style presets rather than tags, because
                their parameter set is richer than a tag comfortably carries —
                add them from the Styles picker, and give one your own tag with{" "}
                <code>Style.Tag(...)</code> if you want markup control.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Modifier
                      </th>
                      <th className="text-left py-2 text-white/60">Effect</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>FillModifier</code>
                      </td>
                      <td className="py-2">
                        fills the glyph interior. The first fill claims the base
                        quad; further fills stack
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>StrokeModifier</code>
                      </td>
                      <td className="py-2">
                        true rim stroke around the glyph outline
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>ShadowModifier</code>
                      </td>
                      <td className="py-2">offset drop shadow</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>GlowModifier</code>
                      </td>
                      <td className="py-2">
                        soft halo — a shadow with no offset and a wide edge
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>InnerShadowModifier</code>
                      </td>
                      <td className="py-2">
                        inset shadow hugging the inner edge
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>ExtrudeModifier</code>
                      </td>
                      <td className="py-2">extruded depth</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>PaintOrderModifier</code>
                      </td>
                      <td className="py-2">
                        switches layer-major vs glyph-major compositing (
                        <code>PaintOrder</code>)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>FillModifier</code>, <code>StrokeModifier</code>,{" "}
                <code>ShadowModifier</code>, <code>GlowModifier</code> and{" "}
                <code>InnerShadowModifier</code> each take a colour, a gradient
                or a texture through the same <code>PaintRef</code> (§6).{" "}
                <code>ExtrudeModifier</code> shades its slices across a near→far
                colour pair, and <code>PaintOrderModifier</code> carries no
                paint.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.4 Decoration</h3>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Tag</th>
                      <th className="text-left py-2 pr-4 text-white/60">
                        Modifier
                      </th>
                      <th className="text-left py-2 text-white/60">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;u&gt;</code>, <code>++…++</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>UnderlineModifier</code>
                      </td>
                      <td className="py-2">
                        <code>LineStyle</code> follows CSS{" "}
                        <code>text-decoration-style</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;s&gt;</code>, <code>~~…~~</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>StrikethroughModifier</code>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white/40">—</td>
                      <td className="py-2 pr-4">
                        <code>HighlightModifier</code>
                      </td>
                      <td className="py-2">
                        paints a background behind matched ranges; the same
                        presentation renders live selection
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>HighlightModifier</code> is range geometry, not a glyph
                effect: <code>HighlightPresentation</code> carries its paint,
                corners and geometry mapping (§7).{" "}
                <code>UnderlineModifier</code> and{" "}
                <code>StrikethroughModifier</code> draw horizontal lines across
                the text and carry their own paint, <code>LineStyle</code>,
                thickness, offset and skip-ink parameters.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.5 Interactive and inline</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Tag</th>
                      <th className="text-left py-2 text-white/60">Modifier</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;link&gt;</code>, <code>[text](url)</code>
                      </td>
                      <td className="py-2">
                        <code>LinkModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;spoiler&gt;</code>
                      </td>
                      <td className="py-2">
                        <code>SpoilerModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white/40">—</td>
                      <td className="py-2">
                        <code>InteractiveModifier</code> (usually driven by{" "}
                        <code>TriggerWordParseRule</code>)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>&lt;obj=name/&gt;</code>
                      </td>
                      <td className="py-2">
                        <code>ObjModifier</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>&lt;sprite=name/&gt;</code>
                      </td>
                      <td className="py-2">
                        <code>SpriteModifier</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">4.6 Animation</h3>
                <p className="text-white/70 mb-3">
                  <code>&lt;reveal&gt;</code> drives <code>RevealModifier</code>
                  ; the phase-driven glyph modifiers (<code>WaveModifier</code>,{" "}
                  <code>ShakeModifier</code>, …) are added as styles. Both are
                  covered in §8.
                </p>
                <p className="text-white/70">
                  <code>UniTextDriver</code> sequences either of them, per
                  range, with no code (§8.5).
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">4.7 Math</h3>
                <p className="text-white/70">
                  <code>MathModifier</code> with <code>MathParseRule</code>{" "}
                  typesets formula spans — parser, layout engine, delimiter
                  builder and symbol tables.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">4.8 Utility</h3>
                <p className="text-white/70">
                  <code>CompositeModifier</code> runs several modifiers in one
                  slot. <code>EmptyModifier</code> is a no-op placeholder useful
                  when a source should mark ranges without changing appearance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 5. Modifier Parameters                                              */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-[var(--color-accent)]" />
            5. Modifier Parameters
          </h2>

          <p className="text-white/70 mb-4">
            Every serialized field a modifier exposes to markup or to runtime
            addressing is a <strong>parameter</strong>: one named, typed value
            that resolves separately for each range the modifier covers.
          </p>

          <p className="text-white/70 mb-6">
            Four surfaces address the same parameter, because all four address
            the one <code>ParameterDescriptor</code> the modifier publishes: a
            markup token (§3), a range state rule (§9), a driver clip (§8.5),
            and code (§19.6).
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.1 The cascade</h3>

              <p className="text-white/70 mb-4">
                A parameter resolves per range, weakest stage first:
              </p>

              <ParameterCascade />

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Stage
                      </th>
                      <th className="text-left py-2 pr-4 text-white/60">
                        Set by
                      </th>
                      <th className="text-left py-2 text-white/60">Scope</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Field</td>
                      <td className="py-2 pr-4">
                        the modifier&rsquo;s inspector value
                      </td>
                      <td className="py-2">every range of the modifier</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Rule default</td>
                      <td className="py-2 pr-4">
                        the source&rsquo;s default parameter (§3.2)
                      </td>
                      <td className="py-2">every range that source produces</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Markup token</td>
                      <td className="py-2 pr-4">
                        the tag&rsquo;s positional slot
                      </td>
                      <td className="py-2">one range</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Owned value</td>
                      <td className="py-2 pr-4">
                        <code>Own</code> — code (§19.6), a driver clip (§8.5), a{" "}
                        <code>ParameterRule</code> (§9)
                      </td>
                      <td className="py-2">
                        one range, or every range a query matches
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                A stage that carries nothing falls through to the one below: an
                absent slot, an unparsable token and a bare empty slot (
                <code>&lt;pspace=,4&gt;</code>) all leave the value where the
                weaker stage put it. <code>&quot;&quot;</code> and{" "}
                <code>&apos;&apos;</code> are set empty strings, not absent.
              </p>

              <p className="text-white/70 mb-4">
                Slots are positional and comma-separated in tag order (
                <code>&lt;pspace=10,4&gt;</code>). A subclass&rsquo;s own
                parameters precede the ones it inherits, so a base-declared
                parameter sits at a later slot on a subclass&rsquo;s tag than on
                the base&rsquo;s.
              </p>

              <Notice type="info">
                Tokens parse out of the box for <code>float</code>,{" "}
                <code>int</code>, <code>bool</code>, <code>string</code>,{" "}
                <code>Vector2</code>, <code>Color32</code>,{" "}
                <code>UnitValue</code>, <code>UnitVector2</code>, and any enum —
                by member name, or by a single character when it is unique among
                the members. Any other type parses only through a declared
                parser (§5.3).
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.2 Descriptors</h3>

              <p className="text-white/70 mb-4">
                A <code>ParameterDescriptor</code> is one parameter&rsquo;s
                stable identity. Each modifier publishes its own in a nested
                static <code>Param</code> class:
              </p>

              <CodeBlock
                code={`ColorModifier.Param.Color        // ParameterDescriptor<ColorModifier, Color32>
WaveModifier.Param.Amplitude     // ParameterDescriptor<WaveModifier, float>
RevealModifier.Param.Front       // ParameterDescriptor<RevealModifier, UnitValue>`}
              />

              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Member
                      </th>
                      <th className="text-left py-2 text-white/60">Reports</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Id</code>
                      </td>
                      <td className="py-2">
                        the backing field name — what serialized bindings
                        persist
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>DisplayName</code>
                      </td>
                      <td className="py-2">the editor label</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Slot</code>
                      </td>
                      <td className="py-2">
                        the positional markup slot, or −1 for a parameter with
                        no markup presence
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SlotOn(modifier)</code>
                      </td>
                      <td className="py-2">
                        the slot on a concrete subclass, where own parameters
                        come first
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>ValueType</code>, <code>ModifierType</code>
                      </td>
                      <td className="py-2">the closed types</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>SupportedCompositions</code>
                      </td>
                      <td className="py-2">
                        which <code>ParameterComposition</code> operations owned
                        values may use
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                The typed descriptor does the work:{" "}
                <code>Resolve(modifier, in context)</code> returns the full
                cascade including owned values, <code>ResolveCascade</code>{" "}
                stops below them, <code>ReadRoot</code> / <code>SetRoot</code>{" "}
                read and write the field itself, and <code>Lerp</code>{" "}
                interpolates under the value type&rsquo;s contract.
              </p>

              <p className="text-white/70 mb-4">
                <code>Param.All</code> is a modifier&rsquo;s full set, and{" "}
                <code>ParameterDescriptor.Find(modifier, id)</code> resolves one
                by <code>Id</code> where the modifier type is not known
                statically.
              </p>

              <p className="text-white/70">
                <strong>Composition.</strong> <code>ParameterComposition</code>{" "}
                is how an owned value combines with the cascade result:{" "}
                <code>Replace</code>, <code>Add</code>, <code>Multiply</code>,
                or the descriptor&rsquo;s declared <code>Custom</code>{" "}
                operation. What a parameter supports follows its value type —{" "}
                <code>float</code>, <code>int</code> and <code>Vector2</code>{" "}
                add and multiply, <code>Color32</code> multiplies,{" "}
                <code>UnitValue</code> and <code>UnitVector2</code> add (mixed
                units cannot combine, and the owned value wins whole), enums,{" "}
                <code>bool</code> and <code>string</code> replace only.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.3 Declaring parameters</h3>

              <CodeBlock
                code={`[Serializable]
[GenerateParameters]
public partial class WaveModifier : GlyphParamModifier<WaveModifier.Params>
{
    /// <summary>Peak vertical offset in pixels.</summary>
    [SerializeField, Parameter, StateProperty(nameof(MarkMeshDirty))]
    private float amplitude = 3f;
}`}
              />

              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Attribute
                      </th>
                      <th className="text-left py-2 text-white/60">Declares</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>[GenerateParameters]</code>
                      </td>
                      <td className="py-2">
                        the type opts in; it must be <code>partial</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>[Parameter]</code>
                      </td>
                      <td className="py-2">
                        a parameter occupying the next positional markup slot,
                        in declaration order
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>[SlotlessParameter]</code>
                      </td>
                      <td className="py-2">
                        a parameter with cascade, ownership and rules but no
                        markup slot
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>[ParameterContainer]</code>
                      </td>
                      <td className="py-2">
                        flattens a <code>[SerializeReference]</code>{" "}
                        object&rsquo;s own <code>[Parameter]</code> fields into
                        the owner&rsquo;s schema; it must name{" "}
                        <code>Invalidate</code>, and containers do not nest
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                <code>[GenerateParameters]</code> emits the nested{" "}
                <code>Param</code> class, the aggregated <code>Param.All</code>{" "}
                set (inherited members first) and the <code>Descriptors</code>{" "}
                override, at compile time — the generator ships prebuilt as{" "}
                <code>Analyzers/LightSide.UniText.ParamCodeGen.dll</code>,
                source in <code>tools~/ParamCodeGen</code>. Authoring mistakes
                are compiler errors: a type that is not <code>partial</code>{" "}
                (UTP001), a marked type with no parameter fields (UTP002), a
                container naming no invalidation (UTP003).
              </p>

              <p className="text-white/70 mb-4">
                A parameter field is state-tracked: it carries{" "}
                <code>[StateProperty]</code> (or another state attribute) beside{" "}
                <code>[Parameter]</code>, and that is also its invalidation — a
                write through any stage of the cascade raises exactly what a
                write to the field raises.
              </p>

              <p className="text-white/70 mb-4">
                <code>[Parameter]</code> carries three options.{" "}
                <code>Parser</code> names a static{" "}
                <code>bool (ReadOnlySpan&lt;char&gt;, out T)</code> method
                giving the parameter its own token vocabulary.{" "}
                <code>Invalidate</code> names an instance parameterless method
                to raise instead of the field&rsquo;s own notification.{" "}
                <code>Descriptor = false</code> keeps the markup slot and the
                editor schema while declaring no descriptor — no cascade, no
                ownership, no driving.
              </p>

              <p className="text-white/70 mb-4">
                A parameter whose root is not a plain field declares its
                descriptor by hand with <code>ParameterDescriptor.From</code>,{" "}
                <code>FromEnum</code> or <code>Custom</code>;{" "}
                <code>WithParser</code> and <code>WithCustom</code> refine one.
              </p>

              <p className="text-white/70">
                Four further attributes shape only the inspector:{" "}
                <code>[Unit(&quot;%|abs&quot;)]</code> lists the unit choices of
                a <code>UnitValue</code> / <code>UnitVector2</code>,{" "}
                <code>[Options(&quot;@paints&quot;)]</code> fills a{" "}
                <code>string</code> parameter&rsquo;s dropdown from a registered
                provider, <code>[Variant]</code> renders a discriminated union,
                and <code>[VisibleWhen]</code> hides a field until another
                parameter holds a given value. A provider whose catalog lives
                outside Unity&rsquo;s object graph calls{" "}
                <code>ParameterProviders.Invalidate</code> to make open
                inspectors rebuild their dropdowns.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 6. The Paint System                                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-6 h-6 text-[var(--color-accent)]" />
            6. The Paint System
          </h2>

          <p className="text-white/70 mb-6">
            One model drives every coloured surface: fills, strokes, shadows,
            glows, inner shadows, decorations and selection.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.1 What a paint is</h3>
              <p className="text-white/70 mb-3">
                A <code>TextPaint</code> is the resolved runtime paint — a solid
                colour, a gradient or a texture, plus how it projects and
                composites. It is resolved per application and is never
                serialized. The authored form is <code>Paint</code> (source,
                projection, blend); a <code>PaintSwatch</code> is a named{" "}
                <code>Paint</code> plus its <code>PaintMapping</code>, held in a
                catalogue.
              </p>
              <p className="text-white/70">
                A layer&rsquo;s authored choice is a <code>PaintRef</code>: an
                inline colour, a named swatch, or the layer default (
                <code>PaintRefKind</code>).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.2 Where swatches live</h3>

              <p className="text-white/70 mb-4">
                Named swatches come from an <code>IPaintProvider</code>:
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Provider
                      </th>
                      <th className="text-left py-2 text-white/60">Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>InlinePaintProvider</code>
                      </td>
                      <td className="py-2">
                        swatches edited directly on the modifier
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>AssetPaintProvider</code>
                      </td>
                      <td className="py-2">
                        a specific <code>UniTextPaints</code> asset
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>GlobalSettingsPaintProvider</code>
                      </td>
                      <td className="py-2">
                        the project-wide asset in{" "}
                        <code>UniTextSettings.Paints</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                Any modifier implementing <code>IHasPaintProvider</code> shows
                the swatch dropdown in its inspector.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.3 Projection</h3>

              <p className="text-white/70 mb-4">
                Four settings decide how a gradient or texture spreads over
                text:
              </p>

              <ul className="space-y-3 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>PaintMapping</code> — the frame the paint is measured
                  against: the glyph, the range, the line, the whole block.
                </li>
                <li>
                  <code>PaintFit</code> — how the source&rsquo;s own aspect
                  fills that frame: <code>Stretch</code>, <code>Contain</code>,{" "}
                  <code>Cover</code>, <code>Tile</code>. Textures take their
                  aspect from the sampled pixels; <code>Radial</code> and{" "}
                  <code>Angular</code> gradients are square sources, so anything
                  but <code>Stretch</code> keeps a ring circular on a non-square
                  frame. <code>Linear</code> ignores it; <code>Tile</code> makes{" "}
                  <code>scale</code> the repeat count.
                </li>
                <li>
                  <code>PaintProjectionKind</code> — <code>Linear</code>{" "}
                  (project onto an axis), <code>Radial</code> (distance from
                  centre), <code>Angular</code> (conic sweep).
                </li>
                <li>
                  <code>PaintSpread</code> — how a gradient continues past the
                  frame: <code>Clamp</code> holds the end stops,{" "}
                  <code>Repeat</code> restarts the ramp, <code>Mirror</code>{" "}
                  restarts it reversed so adjacent periods meet without a step.
                  Inert for <code>Angular</code>, whose sweep already spans one
                  period.
                </li>
              </ul>

              <p className="text-white/70 mb-4">
                The frame choice is what makes a gradient run across a whole
                sentence instead of restarting per glyph.
              </p>

              <Notice type="info">
                Every projection value resolves through one chain, weakest to
                strongest: swatch → modifier field → default parameters (§3.2) →
                tag attribute. <code>Inherit</code> on <code>PaintMapping</code>
                , <code>PaintProjectionKind</code>, <code>PaintFit</code>,{" "}
                <code>PaintSpread</code> and <code>LayerBlend</code>, and{" "}
                <code>NaN</code> on <code>angle</code>, <code>scale</code> or
                either <code>offset</code> axis, mean no value at that layer. A
                chain that resolves to nothing falls back to <code>Block</code>,{" "}
                <code>Linear</code>, <code>Stretch</code>, <code>Clamp</code>{" "}
                and <code>Normal</code>; a non-positive <code>scale</code>{" "}
                becomes 1.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.4 Compositing</h3>

              <PaintOrderDiagram />

              <p className="text-white/70">
                Layers composite in painter order. <code>PaintOrder</code>{" "}
                selects <strong>layer-major</strong> (each layer across all
                glyphs, then the next — the component default, cheapest) or{" "}
                <strong>glyph-major</strong> (every layer of one glyph, then the
                next glyph — correct when layers of adjacent glyphs overlap).
                Glyph-major covers only same-material quads of the base mesh;
                texture paints and the colour-glyph segment always stack
                layer-major. <code>LayerBlend</code> sets how a resolved paint
                composites — <code>Normal</code>, <code>Multiply</code>,{" "}
                <code>Screen</code>, <code>Additive</code>,{" "}
                <code>Exclusion</code> — and its <code>Inherit</code> member
                keeps the mode the swatch authored.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 7. Range Decorations                                                */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--color-accent)]" />
            7. Range Decorations
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-white/70">
              <code>BaseRangeDecorationModifier</code> is the base for
              modifier-authored geometry attached to visual ranges —{" "}
              <code>HighlightModifier</code> and your own. It owns range
              accumulation, paint resolution, renderer handles and rebuild
              timing; a subclass only turns one logical range into figures.
              Underlines and strikethroughs take the other path:{" "}
              <code>BaseLineModifier</code> emits virtual glyph quads through
              the mesh pipeline, so per-glyph modifiers reach them like any face
              glyph.
            </p>

            <p className="text-white/70">
              <code>GeometryMapping</code> chooses how a logical range becomes
              visual figures: <code>Glyph</code> (one rounded figure per shaped
              cluster), <code>Line</code> (one per line/BiDi fragment),{" "}
              <code>Range</code> (fragments rounded only at the logical
              endpoints — the default), <code>Block</code> (one connected
              multi-line contour with no internal seams).{" "}
              <code>RangePaintMapping</code> picks the paint frame independently
              of that topology: <code>InheritGeometry</code>, <code>Glyph</code>
              , <code>Line</code>, <code>Range</code>, <code>TextBlock</code>.{" "}
              <code>RangeDecorationCorners</code> masks which corners round.{" "}
              <code>RangeDecorationOrder</code> places a decoration{" "}
              <code>Behind</code> or <code>Above</code> the text.
            </p>

            <Notice type="info">
              Live text selection uses this same path —{" "}
              <code>HighlightPresentation</code> is shared between authored
              highlights and the selection highlight, so styling one teaches you
              the other.
            </Notice>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 8. Animation                                                        */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-[var(--color-accent)]" />
            8. Animation
          </h2>

          <p className="text-white/70 mb-6">
            Two systems — continuous phase-driven motion and reveal — plus the{" "}
            <code>UniTextDriver</code> sequencer that ramps any modifier
            parameter of either over a timeline.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">8.1 Phase-driven modifiers</h3>

              <p className="text-white/70 mb-4">
                Every animated glyph modifier renders from an external input
                parameter — <code>Phase</code>, or <code>Roll</code> on{" "}
                <code>RollingModifier</code>: its visual state is a pure
                function of that input. The modifier never advances time itself.
                The input is a <em>slotless</em> parameter — it takes no
                positional markup slot, but it cascades and can be owned per
                range like any other (§5.1).
              </p>

              <PhaseDrivenDiagram />

              <p className="text-white/60 text-sm mb-3">
                Feed it from whatever owns time:
              </p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-6">
                <li>
                  <code>UniTextDriver</code> — a sequencer component on the
                  text&rsquo;s GameObject. Its clips ramp any modifier
                  parameter, <code>Phase</code> included, over a shared timeline
                  (§8.5).
                </li>
                <li>A tween library, Timeline, or your own code.</li>
                <li>
                  A Unity Animator through <code>UniTextAnimationBridge</code> +{" "}
                  <code>ModifierFieldsAnimationHandler</code> (§8.4), or by
                  animating <code>UniTextDriver.Progress</code>.
                </li>
              </ul>

              <p className="text-white/60 text-sm mb-3">
                Built-ins — all <code>GlyphParamModifier&lt;Params&gt;</code>{" "}
                subclasses except <code>GlitchModifier</code> (an{" "}
                <code>EffectModifier</code>) and <code>RollingModifier</code>{" "}
                and <code>ScrambleModifier</code> (<code>BaseModifier</code>s):
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Modifier
                      </th>
                      <th className="text-left py-2 text-white/60">Motion</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WaveModifier</code>
                      </td>
                      <td className="py-2">
                        vertical sine travelling along the text
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>ShakeModifier</code>
                      </td>
                      <td className="py-2">
                        deterministic per-glyph jitter, re-rolled{" "}
                        <code>rate</code> times per phase unit
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SpinModifier</code>
                      </td>
                      <td className="py-2">
                        continuous rotation about the glyph centre
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>PulseModifier</code>
                      </td>
                      <td className="py-2">scale pulsation about the centre</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WobbleModifier</code>
                      </td>
                      <td className="py-2">jelly rocking</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>BounceModifier</code>
                      </td>
                      <td className="py-2">periodic hops off the baseline</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>FloatModifier</code>
                      </td>
                      <td className="py-2">
                        slow two-axis drift on smooth noise
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>PendulumModifier</code>
                      </td>
                      <td className="py-2">swing about the top edge</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>GlitchModifier</code>
                      </td>
                      <td className="py-2">RGB-split glitch bursts</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>RollingModifier</code>
                      </td>
                      <td className="py-2">
                        characters roll on a cyclic glyph wheel; driven by{" "}
                        <code>Roll</code> toward 0, not <code>Phase</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>ScrambleModifier</code>
                      </td>
                      <td className="py-2">
                        decode effect settling left to right; driven by{" "}
                        <code>Progress</code>, with <code>Phase</code> churning
                        the random picks
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>spread</code> decorrelates neighbouring glyphs;{" "}
                <code>frequency</code> sets cycles per phase unit.{" "}
                <code>ShakeModifier</code>, <code>GlitchModifier</code> and{" "}
                <code>ScrambleModifier</code> carry neither — their{" "}
                <code>rate</code> sets re-rolls per phase unit;{" "}
                <code>RollingModifier</code>&rsquo;s <code>spread</code> is roll
                reduction per character, so later characters settle later.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">8.2 Writing your own</h3>
              <p className="text-white/70">
                Subclass <code>GlyphParamModifier&lt;TParams&gt;</code>: mark
                each serialized field <code>[Parameter]</code>, tag the class{" "}
                <code>[GenerateParameters]</code>, and resolve the range&rsquo;s
                values through the cascade in{" "}
                <code>ResolveParams(in RangeApplyContext context)</code> — one{" "}
                <code>Param.&lt;Name&gt;.Resolve(this, in context)</code> call
                per field. Override <code>AttributeKey</code> with a string
                unique to the modifier type (the built-ins use{" "}
                <code>AttributeKeys</code>). Then transform each glyph in{" "}
                <code>
                  OnGlyph(UniTextMeshGenerator gen, int cluster, in TParams p,
                  float phase)
                </code>{" "}
                through <code>GlyphQuad</code> (four vertices, order
                BL-TL-TR-BR). Keep it a pure function of the supplied phase and
                worker-thread safe.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">8.3 Reveal</h3>

              <p className="text-white/70 mb-4">
                <code>RevealModifier</code> shows only the leading part of each
                covered range — the engine behind typewriter text.
              </p>

              <CodeBlock
                code={`text.GetModifier<RevealModifier>().Front = UnitValue.Percent(100f * elapsed / duration);`}
              />

              <ul className="space-y-2 text-white/70 list-disc list-inside mt-4 mb-6">
                <li>
                  <code>Front</code> (<code>UnitValue</code>, default{" "}
                  <code>100%</code>) — the reveal frontier: a percentage of the
                  frontier axis, or an absolute position in grapheme clusters.
                  Fractional values blend the frontier cluster; positions beyond
                  the length show everything.
                </li>
                <li>
                  Authorable in markup: <code>&lt;reveal=fade,50%&gt;</code> —
                  the first tag parameter names the appearance entry, the second
                  sets <code>Front</code>.
                </li>
                <li>
                  <code>Collapse</code> — <code>false</code> keeps hidden
                  text&rsquo;s space (CSS <code>visibility: hidden</code>),{" "}
                  <code>true</code> reflows as if absent (
                  <code>display: none</code>).
                </li>
                <li>
                  Reveals whole grapheme clusters in logical order; line breaks
                  are never hidden.
                </li>
                <li>
                  <code>PerRange</code> — <code>false</code> (the default) runs
                  one shared frontier over the union of covered clusters in text
                  order, so covered ranges reveal one after another;{" "}
                  <code>true</code> fills every range independently and
                  simultaneously.
                </li>
                <li>
                  A cluster covered by overlapping ranges belongs to the
                  innermost one — it alone governs that cluster&rsquo;s
                  visibility and appearance effect.
                </li>
                <li>
                  <code>Clock</code> (<code>PlaybackClock</code>, default{" "}
                  <code>Unscaled</code>) — the time source appear and hide
                  effects advance on. <code>Manual</code> advances only through{" "}
                  <code>AdvanceTime(float)</code>; a clock change mid-flight
                  restarts running phases.
                </li>
              </ul>

              <p className="text-white/70 mb-4">
                <strong>Appearance</strong> is a separate concern: a{" "}
                <code>RevealHandler</code> decides how each glyph arrives.
                Built-ins include Fade, Slide, Scale, Spin, Flip, Skew, Stretch,
                Spiral, Pop, Drop, Rain, Burst, Domino, Swing, Wave, Shake,
                Glitch, Chaos and Tint. <code>CompositeRevealHandler</code> runs
                several in one slot; <code>EasedRevealHandler</code> is the base
                for handlers that remap <code>Progress</code> through an{" "}
                <code>Ease</code> — a built-in curve, a cubic Bézier, or an
                authored keyed curve.
              </p>

              <p className="text-white/70 mb-4">
                Handlers are named entries in a catalogue (
                <code>RevealHandlerEntry</code>), resolved per range by the tag
                parameter, from <code>InlineRevealHandlerProvider</code> (edited
                on the modifier) or <code>AssetRevealHandlerProvider</code> /{" "}
                <code>UniTextRevealHandlers</code> (a shared project asset). The
                modifier&rsquo;s <code>HandlerName</code> parameter is the
                default for ranges whose tag carries no parameter; an empty name
                selects the provider&rsquo;s unnamed entry. Each handler&rsquo;s{" "}
                <code>Duration</code> (seconds, default <code>0.25</code>) is
                how long its effect plays for one glyph; <code>0</code> makes
                the change instant.
              </p>

              <p className="text-white/70 mb-4">
                A receding frontier animates too. The cluster keeps its place in
                the mesh — and, under <code>Collapse</code>, in layout — until
                its hide effect finishes. Each entry&rsquo;s optional{" "}
                <code>HideHandler</code> picks that effect; left unset, the
                entry&rsquo;s own <code>Handler</code> replays backwards.
                Interrupting one direction with the other continues from the
                glyph&rsquo;s current state instead of restarting.
              </p>

              <Notice type="warning">
                A custom handler transforms only the quad handed to{" "}
                <code>Apply</code> (<code>RevealGlyphInfo</code>), must be
                worker-thread safe, and <strong>must</strong> resolve to
                identity at <code>Progress = 1</code> — that single rule is what
                lets every effect serve both directions. A handler that wraps
                others constructs a <code>RevealGlyphInfo</code> with an
                explicit progress to give each child its own remapped timeline,
                the way <code>CompositeRevealHandler</code> does.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">8.4 Animator integration</h3>

              <p className="text-white/70 mb-4">
                A Unity Animator writes serialized fields directly, bypassing
                the property setters that raise <code>UniTextDirty</code>.{" "}
                <code>UniTextAnimationBridge</code> fixes that: each{" "}
                <code>AnimationHandler</code> on it diffs one unit after the
                Animator writes and converts changes into correct invalidation.
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>UniTextFieldsAnimationHandler</code> — the
                  component&rsquo;s own fields (size, colour, wrap, auto-size,
                  alignment). <code>UniTextWorldFieldsAnimationHandler</code>{" "}
                  adds sorting and shadow casting.
                </li>
                <li>
                  <code>ModifierFieldsAnimationHandler</code> — every state
                  field of every modifier in the host&rsquo;s styles, rebound
                  when the style graph changes. It covers the component&rsquo;s
                  own <code>Styles</code> only; a modifier living in a{" "}
                  <code>StylePreset</code> or the project-wide preset is not
                  reached.
                </li>
              </ul>

              <Notice type="info">
                Per-range parameter values are not diffable this way — drive
                them through <code>UniTextDriver</code> (§8.5) or parameter
                ownership (§19.6) instead.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">8.5 The sequencer</h3>

              <p className="text-white/70 mb-4">
                <code>UniTextDriver</code> animates parameters (§5) without
                code: each clip owns one parameter of one modifier across the
                ranges its query matches and ramps every match between two
                endpoint values inside its own window on a shared timeline. Add
                it to the text&rsquo;s own GameObject —{" "}
                <strong>Add Component → UniText → UniText Driver</strong>; it
                requires a <code>UniTextBase</code> there.
              </p>

              <p className="text-white/70 mb-4">
                Clips are authored in the inspector, or on the timeline its{" "}
                <strong>Open Timeline</strong> button raises: clips sit on
                tracks, drag to move and resize, split at the playhead,
                duplicate, copy, paste, mute and marquee-select, with a
                scrubbable ruler, snapping, zoom and pan. Double-clicking a clip
                opens its full editor in place; a multi-clip selection edits the
                shared fields together.
              </p>

              <DriverClipDiagram />

              <p className="text-white/60 text-sm mb-3">Per clip:</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Setting
                      </th>
                      <th className="text-left py-2 text-white/60">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Start</code>
                      </td>
                      <td className="py-2">
                        the second on the driver&rsquo;s timeline the
                        clip&rsquo;s window opens
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Query</code>
                      </td>
                      <td className="py-2">
                        the <code>RangeQueryDefinition</code> (§19.6) selecting
                        the ranges this clip drives; its filters follow text
                        edits
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>From</code>, <code>To</code>
                      </td>
                      <td className="py-2">
                        the endpoint values, both <code>RuleValue</code>s of the
                        parameter&rsquo;s own type (§9)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Composition</code>
                      </td>
                      <td className="py-2">
                        how the driven value combines with each range&rsquo;s
                        cascade (§5.2)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Priority</code>
                      </td>
                      <td className="py-2">
                        against other owners of the same parameter
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MemberDuration</code>
                      </td>
                      <td className="py-2">
                        seconds one member&rsquo;s ramp lasts
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Stagger</code>
                      </td>
                      <td className="py-2">
                        seconds between the starts of adjacent members&rsquo;
                        ramps, in text order
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>Easing</code>
                      </td>
                      <td className="py-2">
                        the <code>Ease</code> the ramp is remapped through
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                A clip lasts{" "}
                <code>MemberDuration + Stagger × (members − 1)</code>, so its
                length follows how many ranges its query currently matches.
                Outside its window a clip holds its boundary value —{" "}
                <code>From</code> before the start, <code>To</code> after the
                end. A <code>Replace</code> clip holds only until the playhead
                passes the start of another <code>Replace</code> clip of the
                same parameter and priority; the latest started one drives.{" "}
                <code>Add</code>, <code>Multiply</code> and <code>Custom</code>{" "}
                clips compose alongside and stay engaged throughout.
              </p>

              <p className="text-white/60 text-sm mb-3">Per driver:</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Setting
                      </th>
                      <th className="text-left py-2 text-white/60">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Clock</td>
                      <td className="py-2">
                        <code>PlaybackClock</code> — <code>Scaled</code>,{" "}
                        <code>Unscaled</code>, or <code>Manual</code>, which
                        advances only through <code>Advance(deltaTime)</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Loop</td>
                      <td className="py-2">
                        <code>DriverLoop.Once</code>, <code>Loop</code> or{" "}
                        <code>PingPong</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Duration</td>
                      <td className="py-2">
                        fixed timeline length in seconds; clips still extend it,
                        and 0 derives the length from the clips alone
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Play On Enable</td>
                      <td className="py-2">
                        starts playback when the component enables, in play mode
                        only
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                <code>Speed</code> scales the playhead and runs it backwards
                when negative. <code>Progress</code> is the normalized playhead,
                0&ndash;1: setting it renders that exact state, so an Animator,
                a Timeline track or a scrub bar drives the whole sequence
                through one float. <code>Playhead</code> is the same position in
                seconds — a <code>PingPong</code> return reads as the mirrored
                position, never as a phase past the end — and{" "}
                <code>TimelineLength</code> reports the resolved length.{" "}
                <code>Play()</code>, <code>Pause()</code>, <code>Stop()</code>,{" "}
                <code>Seek(normalized)</code> and <code>Advance(seconds)</code>{" "}
                drive it; <code>Rebind()</code> rebuilds every clip&rsquo;s
                ownership against the current styles, which a style change does
                on its own.
              </p>

              <p className="text-white/70">
                Ownership follows each clip&rsquo;s query across text edits and
                is released on disable, returning every range to its cascade.
                Scrubbing and playback both work in edit mode.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 9. Range State Rules                                                */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[var(--color-accent)]" />
            9. Range State Rules
          </h2>

          <p className="text-white/70 mb-6">
            A reactive layer that drives <strong>any modifier parameter</strong>{" "}
            from <strong>any signal</strong>, per range, without code.
          </p>

          <RangeRuleChain />

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm mb-3">The pieces:</p>
              <ul className="space-y-3 text-white/70 list-disc list-inside">
                <li>
                  <code>RangeSignal</code> — a value a range emits: hover,
                  press, focus, a scalar you publish (
                  <code>BuiltInScalarSignal</code>, <code>RangeSignals</code>).
                  A project declares its own with{" "}
                  <code>new RangeSignal&lt;T&gt;(id)</code> — the{" "}
                  <code>unitext.</code> id namespace is reserved — and matches
                  it from code with <code>RangeSignalSelector&lt;T&gt;</code>.
                </li>
                <li>
                  <code>RangeStateSelector</code> — when the rule applies.
                  Compose with <code>AllRangeStateSelector</code>,{" "}
                  <code>AnyRangeStateSelector</code>,{" "}
                  <code>NotRangeStateSelector</code>,{" "}
                  <code>InteractionRangeStateSelector</code>,{" "}
                  <code>ScalarRangeStateSelector</code>.
                </li>
                <li>
                  <code>RangeStatePlayback</code> — how the contribution moves
                  over time: <code>TransitionPlayback</code> (enter/exit
                  duration, <code>Ease</code>, <code>PlaybackClock</code>),{" "}
                  <code>InstantPlayback</code>, <code>ManualPlayback</code>,{" "}
                  <code>SignalProgressPlayback</code>.
                </li>
                <li>
                  <code>ParameterDescriptor</code> /{" "}
                  <code>OwnedParameter&lt;TValue&gt;</code> — the target. Every{" "}
                  <code>[Parameter]</code> field of a modifier is published as a
                  static descriptor on that modifier&rsquo;s generated{" "}
                  <code>Param</code> class (§5.2), which is what{" "}
                  <code>ParameterRule.SetTarget</code> binds to. Writing an{" "}
                  <code>OwnedParameter</code> changes only that ownership; it
                  never mutates the serialized modifier field.
                </li>
                <li>
                  <code>RuleValue</code> — typed targets:{" "}
                  <code>ColorRuleValue</code>, <code>FloatRuleValue</code>,{" "}
                  <code>UnitRuleValue</code>, <code>Vector2RuleValue</code>,{" "}
                  <code>UnitVector2RuleValue</code>, <code>IntRuleValue</code>,{" "}
                  <code>BoolRuleValue</code>, <code>StringRuleValue</code>,{" "}
                  <code>EnumRuleValue&lt;TEnum&gt;</code>. Each supplies either
                  the value authored on it or, with{" "}
                  <code>RangeValueSource.PayloadMember</code>, a named member
                  read from the range&rsquo;s payload.{" "}
                  <code>RuleValue&lt;TValue&gt;</code> is the public base for a
                  project&rsquo;s own unmanaged value type.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/70 mb-4">
                <code>RangeStateRule</code> wires them together;{" "}
                <code>ModifierRule</code> (applies a transient modifier graph
                while active) and <code>ParameterRule</code> (drives one
                parameter of another modifier in the same graph) are the
                concrete shapes. Rules are authored on{" "}
                <code>InteractiveModifier.Rules</code>;{" "}
                <code>UniTextRanges</code> is the per-component runtime that
                owns their playbacks, reached with{" "}
                <code>UniTextRanges.For(text)</code>.
              </p>

              <p className="text-white/70 mb-4">
                Every rule also carries <code>Scope</code> —{" "}
                <code>RangeRuleScope.Entity</code> by default, one playback
                writing to every segment of the entity, or <code>Segment</code>{" "}
                for an independent playback per segment — an optional one-shot{" "}
                <code>Trigger</code> (<code>RangeRuleEvent.Activated</code> or{" "}
                <code>ContextRequested</code>) that fires independently of the
                selector, and a <code>Priority</code> deciding which{" "}
                <code>Replace</code> contribution wins. A{" "}
                <code>ParameterRule</code> adds <code>Composition</code> (
                <code>Replace</code>, <code>Add</code>, <code>Multiply</code>,{" "}
                <code>Custom</code>), deciding how its contribution combines
                with the cascade result and with concurrent rules. The default
                selector is <code>InteractionRangeStateSelector</code> requiring{" "}
                <code>Hovered</code>; the default playback is{" "}
                <code>InstantPlayback</code>.
              </p>

              <p className="text-white/70 mb-4">
                From code, <code>UniTextRanges.For(text)</code> publishes
                signals —{" "}
                <code>SetSignal(entity, RangeSignals.Selected, true)</code>, the
                segment-scoped and <code>RangeChannel</code> overloads, and{" "}
                <code>SetSignalForAll</code> — advances playbacks configured
                with <code>PlaybackClock.Manual</code> through{" "}
                <code>AdvanceManual(deltaTime)</code>, and raises{" "}
                <code>RuleEntered</code>, <code>RuleExited</code>,{" "}
                <code>RuleUpdated</code> and <code>RuleTriggered</code>, each
                carrying the <code>RangeRuleInstance</code>. <code>Own</code>{" "}
                takes one parameter of a materialized range into ownership until
                the handle is released or the range&rsquo;s identity retires
                with a text edit (§19.6). <code>PrefersReducedMotion</code>{" "}
                collapses every decorative playback to its final value.
              </p>

              <p className="text-white/70">
                <code>Playback</code> is the weight envelope every playback runs
                on: instant and eased transitions, pulses, deferred release and
                clock routing, allocation-free. A playback of your own drives it
                through a host implementing <code>IPlaybackHost</code> —{" "}
                <code>ApplyWeight</code> for the current weight,{" "}
                <code>ReleaseOutputs</code> after a releasing run completes.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 10. Interaction                                                     */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MousePointerClick className="w-6 h-6 text-[var(--color-accent)]" />
            10. Interaction
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">10.1 Interactive ranges</h3>

              <p className="text-white/70 mb-4">
                <code>InteractiveModifier</code> makes a range respond to
                pointer input. Input, geometry, overlap and pointer state belong
                to one per-component <code>UniTextInteractions</code> router the
                modifier registers with; the modifier owns only authored policy,
                events and default actions. Overlapping ranges resolve to a
                single target: highest <code>InteractionPriority</code> first,
                then Style order, then the shorter range, then registration
                order. A range with <code>PassThrough</code> set emits its
                events without consuming the pointer, so underlying UI still
                receives the gesture.
              </p>

              <p className="text-white/70 mb-4">
                <code>RangeInteraction</code> is the borrowed event context
                routed through capture, target and bubble — copy any value
                needed after the callback returns, because the router reuses the
                instance. <code>RangeState</code> is the per-range machine{" "}
                <code>Normal → Hovered → Pressed</code>, plus{" "}
                <code>Disabled</code>; read it with{" "}
                <code>InteractiveModifier.GetRangeState</code>. The router
                publishes the same changes as typed signals —{" "}
                <code>RangeSignals.Hovered</code>, <code>Pressed</code>,{" "}
                <code>Focused</code>, <code>Disabled</code> — and those, not{" "}
                <code>RangeState</code>, are what §9 selectors match.
              </p>

              <p className="text-white/70">
                Code subscribes through the same router:{" "}
                <code>UniTextInteractions.For(text).Get(channel)</code> returns
                the <code>RangeInteractionChannel</code> for one{" "}
                <code>RangeChannel</code> asset, with <code>Activated</code>,{" "}
                <code>ContextRequested</code>, <code>Entered</code>,{" "}
                <code>Exited</code>, <code>StateChanged</code>,{" "}
                <code>LongPressProgress</code>, <code>Gesture</code>,{" "}
                <code>FocusChanged</code> and a catch-all{" "}
                <code>Interaction</code>. A modifier with no channel of its own
                inherits the range source&rsquo;s; with neither, routing is
                modifier-local through{" "}
                <code>InteractiveModifier.Interaction</code>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">10.2 Actions</h3>

              <p className="text-white/70 mb-4">
                A range can carry serialized actions instead of code:
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Action
                      </th>
                      <th className="text-left py-2 text-white/60">Effect</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>OpenUrlAction</code>
                      </td>
                      <td className="py-2">opens the range&rsquo;s URL</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>CopyRangeTextAction</code>
                      </td>
                      <td className="py-2">copies the range text</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>SetActiveAction</code>
                      </td>
                      <td className="py-2">
                        sets a GameObject active or inactive
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>RangeAction</code> is the base — subclass it for your own.{" "}
                <code>RangeActionContext</code> carries the text component, the
                entity, the hit segment, the payload and the pointer data, and
                stays valid after dispatch returns. Each action declares which
                routed events run it through <code>RangeActionEvents</code> (
                <code>Activated</code>, <code>ContextRequested</code>, default{" "}
                <code>Activated</code>) and returns <code>RangeActionFlow</code>{" "}
                to continue or stop the rest of the list. Actions run in
                Inspector order after capture, target and bubble handlers, and
                are skipped when a handler calls{" "}
                <code>RangeInteraction.PreventDefault</code>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">10.3 Gestures</h3>
              <p className="text-white/70">
                <code>RangeGestureRecognizer</code> and{" "}
                <code>DragRangeGestureRecognizer</code> turn raw pointer streams
                into range gestures. <code>RangeGestureCompatibility</code>{" "}
                decides which recognizers may run together.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                10.4 Viewports and world text
              </h3>

              <p className="text-white/70 mb-4">
                Scrolling and camera setups need to know where the text actually
                is on screen:
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>ScrollRectRangeViewport</code> — inside a{" "}
                  <code>ScrollRect</code>.
                </li>
                <li>
                  <code>CameraRangeViewport</code> — world-space text seen by a
                  camera.
                </li>
                <li>
                  <code>RangeViewportAdapter</code> — write your own.
                </li>
              </ul>

              <p className="text-white/70">
                For world text, add <code>UniTextWorldRaycaster</code> to the
                camera so Unity&rsquo;s EventSystem can hit{" "}
                <code>UniTextWorld</code>.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">10.5 Links</h3>
                <p className="text-white/70">
                  <code>LinkModifier</code> + <code>MarkdownLinkParseRule</code>{" "}
                  + <code>RawUrlParseRule</code> cover the usual set: explicit{" "}
                  <code>&lt;link=url&gt;</code>, Markdown{" "}
                  <code>[text](url)</code>, and bare URLs. It opens the resolved
                  URL through <code>Application.OpenURL</code> while{" "}
                  <code>AutoOpenUrl</code> is set, and raises{" "}
                  <code>LinkClicked</code>, <code>LinkEntered</code> and{" "}
                  <code>LinkExited</code>; use <code>OpenUrlAction</code>{" "}
                  instead when the URL comes from a payload member or a literal.
                  It carries no colour or underline of its own — compose it with{" "}
                  <code>ColorModifier</code> (§4.1) and{" "}
                  <code>UnderlineModifier</code> (§4.4) — and ships two{" "}
                  <code>ModifierRule</code> entries for pressed and activation
                  feedback; add a §9 rule for hover feedback.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">10.6 Text resolver</h3>
                <p className="text-white/70">
                  <code>IUniTextResolver</code> overrides the source text of a
                  component before it is parsed — without touching the
                  serialized field. This is the localization hook: the scene
                  stores a key, the resolver substitutes the translation, and{" "}
                  <code>TextOverrideSource</code> reports why the rendered text
                  differs from what is stored.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 11. Inline Media                                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[var(--color-accent)]" />
            11. Inline Media
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              <code>&lt;obj=name&gt;</code> and <code>&lt;sprite=name&gt;</code>{" "}
              place an object or sprite in the text flow. Each inserts one
              codepoint — U+FFFC OBJECT REPLACEMENT CHARACTER — so glyph
              advance, line breaking, baseline alignment and every codepoint
              index treat it as a character. Both run on{" "}
              <code>InlineTagRule</code> (§3.3): the <code>/&gt;</code>{" "}
              shorthand is accepted but not required, and a stray{" "}
              <code>&lt;/obj&gt;</code> is stripped.
            </p>

            <p className="text-white/60 text-sm mb-3">
              Arguments are positional and comma-separated after the name:
            </p>

            <CodeBlock
              language="text"
              disableTypeLinks
              code={`<obj=name[,size][,offset][,advance][,lineHeightAbove][,lineHeightBelow][,pivot][,rotation]>
<sprite=name[,color][,aspect][,size][,offset][,advance][,lineHeightAbove][,lineHeightBelow][,pivot][,rotation]>`}
            />

            <p className="text-white/70 mt-4 mb-6">
              Size, offset, advance and line height are em units (1 = font
              size); pivot is normalized; rotation is degrees.{" "}
              <code>color</code> is empty for the entry&rsquo;s own colour,{" "}
              <code>i</code> to inherit the component&rsquo;s colour (CSS{" "}
              <code>currentColor</code>), or <code>#RGB</code> /{" "}
              <code>#RRGGBB</code> / <code>#RRGGBBAA</code> / a named colour;{" "}
              <code>aspect</code> is <code>true</code> / <code>false</code>.
              Values resolve weakest → strongest: provider entry → keyed
              override → default parameter (§3.2) → tag argument.
            </p>

            <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
              <li>
                <code>ObjModifier</code> / <code>SpriteModifier</code> — the
                modifiers.
              </li>
              <li>
                <code>IObjProvider</code> / <code>ISpriteProvider</code> — name
                → entry resolution, from <code>InlineObjProvider</code> /{" "}
                <code>InlineSpriteProvider</code> (inline lists) or{" "}
                <code>AssetObjProvider</code> / <code>AssetSpriteProvider</code>{" "}
                (<code>UniTextObjects</code> / <code>UniTextSprites</code>{" "}
                assets).
              </li>
              <li>
                <code>MediaWrapper</code> — how the entry is presented:{" "}
                <code>PrefabMediaWrapper</code> instantiates a prefab,{" "}
                <code>SpriteImageWrapper</code> draws a sprite.
              </li>
              <li>
                <code>InlineObjectOverride</code> /{" "}
                <code>InlineSpriteOverride</code> — rows on the modifier&rsquo;s{" "}
                <code>Overrides</code> list, each matched to one provider entry
                by <code>Key</code>. Each field has an unset state — NaN,{" "}
                <code>InheritBool.Inherit</code>,{" "}
                <code>SpriteColorSource.Original</code> — that falls back to the
                provider entry.
              </li>
            </ul>

            <p className="text-white/70">
              <code>InlineObjectPolicy</code> on{" "}
              <code>InteractiveModifier</code> (§10) decides whether the U+FFFC
              clusters of inline media take part in an interactive range&rsquo;s
              hit geometry: <code>Include</code> (default), <code>Exclude</code>
              , <code>Only</code>.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 12. Selection                                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <TextCursor className="w-6 h-6 text-[var(--color-accent)]" />
            12. Selection
          </h2>

          <p className="text-white/70 mb-6">
            <code>UniTextSelectable</code> adds read-only selection to Canvas or
            world text.{" "}
            <strong>
              GameObject → UI (Canvas) → UniText → Selectable Text
            </strong>{" "}
            instantiates the prefab assigned in <code>UniTextSettings</code>,
            already wired with handles and a context menu;{" "}
            <strong>Add Component → UniText → Selectable</strong> adds the
            component to an existing text object. The text component must be
            there first — <code>RequireComponent</code> validates{" "}
            <code>UniTextBase</code> but cannot auto-add an abstract type. One
            per GameObject.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.1 What the user gets</h3>
              <p className="text-white/70">
                Click places a caret; double-click selects a word (and a drag
                continuing from it extends by whole words); triple-click selects
                a paragraph; drag selects; Shift extends; right-click or
                long-press opens the context menu, promoting a collapsed caret
                to the word under the pointer and leaving an existing selection
                intact; Copy and Select-All work from the keyboard while
                focused. One selection per document, with EventSystem-driven
                defocus.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.2 The selection model</h3>

              <p className="text-white/70 mb-4">
                <code>TextSelection</code> is anchor / focus / affinity over
                codepoint indices:
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>Anchor</code> — where the selection began.
                </li>
                <li>
                  <code>Focus</code> — the caret, always where it is rendered.
                </li>
                <li>
                  <code>Affinity</code> (<code>CaretAffinity</code>) — which
                  visual side the caret takes at an ambiguous boundary: a
                  soft-wrap break (end of line N vs start of N+1) or a BiDi run
                  boundary.
                </li>
              </ul>

              <Notice type="info">
                Codepoint indices alone cannot disambiguate those boundaries, so
                without affinity the caret position is undefined there.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.3 Code</h3>

              <CodeBlock
                code={`selectable.SetCaret(index);
selectable.SetSelection(anchor, focus);
selectable.ExtendSelection(focus);
selectable.DragSelectionHandle(draggingAnchor, index);
selectable.SelectWord(index);
selectable.SelectLine(index);
selectable.SelectParagraph(index);
selectable.SelectAll();
selectable.ClearSelection();
var s = selectable.GetSelectedText();`}
              />

              <p className="text-white/70 mt-4 mb-4">
                Mutators return <code>bool</code> — <code>false</code> means the
                selection did not change: the request resolved to the state
                already held, or a <code>SelectionChanging</code> subscriber
                vetoed it. Out-of-range indices are clamped to{" "}
                <code>[0, codepointCount]</code>, never rejected.{" "}
                <code>DragSelectionHandle</code> never collapses the selection —
                an endpoint dragged onto the fixed one is clamped a grapheme
                cluster away, and dragging past it swaps the handles&rsquo;
                roles.
              </p>

              <p className="text-white/60 text-sm mb-3">Events:</p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>SelectionChanging</code> — vetoable and ordered:{" "}
                  <code>
                    selectable.SelectionChanging.Subscribe(handler, order)
                  </code>
                  , lower orders first. Inspect <code>Proposed</code>, set{" "}
                  <code>Cancel</code> to block, or assign <code>Proposed</code>{" "}
                  to clamp the change into a permitted range. Selection moves
                  caused by a text mutation (insert, delete, IME commit, undo)
                  bypass it.
                </li>
                <li>
                  <code>SelectionChanged</code> — carries previous and current
                  state plus a hierarchical <code>UserEvent</code> string (
                  <code>SelectionChangeReason</code>, CodeMirror 6 convention).
                  Match a family with{" "}
                  <code>reason.StartsWith(&quot;select.&quot;)</code>.
                </li>
              </ul>

              <p className="text-white/70">
                <code>SelectionHitTest</code> exposes the line/codepoint
                navigation helpers the caret path uses.{" "}
                <code>SelectionHighlight</code> styles the live highlight — the
                same <code>HighlightPresentation</code> authored highlights use
                (§7); <code>RefreshHighlight()</code> re-bakes its rects after
                an out-of-band reposition.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                12.4 Ranges that survive edits
              </h3>

              <p className="text-white/70 mb-4">
                <code>MutableRangeSource</code> maintains ranges at runtime and
                patches their indices through every edit, so a highlight stays
                on the word it marked even as the user types before it. Under
                the default <code>RangeTracking.Content</code>, a range whose
                span the edit removed entirely is dropped.
              </p>

              <CodeBlock
                code={`using var update = source.BeginUpdate(source.Snapshot);
var id = update.Add(new TextRange(start, length));
update.Commit();

source.SetRanges(source.Snapshot.Revision, ranges);   // replace everything in one notification`}
              />

              <p className="text-white/70 mt-4">
                Every update targets one <code>TextRevision</code>:{" "}
                <code>BeginUpdate</code> and <code>Commit</code> throw when the
                text moved on, or when the source is not bound to a component
                with a completed parse.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.5 Context menu</h3>

              <p className="text-white/70 mb-4">
                The menu is <strong>your scene UI</strong>.{" "}
                <code>ContextMenuItem</code> binds a control you built (a
                Button, a Toggle) to an action; the menu wires the event and
                shows or hides the control by <code>IsApplicable</code>. Items
                carry no visuals.
              </p>

              <p className="text-white/70 mb-4">
                Built-in items: <code>CopyContextMenuItem</code>,{" "}
                <code>CutContextMenuItem</code>,{" "}
                <code>PasteContextMenuItem</code>,{" "}
                <code>SelectAllContextMenuItem</code>, plus{" "}
                <code>ActionContextMenuItem</code> (a Button raising{" "}
                <code>Invoked</code>) and <code>ToggleContextMenuItem</code> (a
                Toggle raising <code>ValueChanged</code>); both hide on a bare
                caret when their Only With Selection flag is set.{" "}
                <code>CommandContextMenuItem</code> /{" "}
                <code>ButtonContextMenuItem</code> are the bases.{" "}
                <code>ContextMenuCapabilities</code> reports which standard
                actions apply right now — <code>CanCut</code>,{" "}
                <code>CanCopy</code>, <code>CanPaste</code>,{" "}
                <code>CanSelectAll</code>, <code>HasSelection</code>.
              </p>

              <p className="text-white/70 mb-4">
                <code>PrefabTextContextMenu</code> presents a Unity-UI menu from
                a prefab shared through the touch overlay; with the slot empty
                it presents nothing.{" "}
                <code>Defaults/Editing/ContextMenu.prefab</code> is the shipped
                menu, assigned in the shipped Selectable Text prefab. Implement{" "}
                <code>ITextContextMenu</code> directly for a native or bespoke
                menu.
              </p>

              <Notice type="info">
                An item whose control is not assigned never counts as applicable
                — an unwired menu cannot open as an invisible input-blocking
                panel.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.6 Touch affordances</h3>

              <p className="text-white/70 mb-4">
                The entity slots live on <code>UniTextSelectable</code>, but a
                sibling <code>UniTextEditable</code> (§13) shows and drives them
                — read-only selection alone presents no handles and no
                magnifier. The context menu (§12.5) is the one touch affordance{" "}
                <code>UniTextSelectable</code> presents by itself.
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>ISelectionHandles</code> — two draggable endpoints.
                </li>
                <li>
                  <code>IInsertionHandle</code> — a single handle under a
                  collapsed caret.
                </li>
                <li>
                  <code>IMagnifier</code> — the loupe shown during long-press
                  placement and handle dragging.
                </li>
              </ul>

              <p className="text-white/70">
                <code>PrefabSelectionHandles</code> and{" "}
                <code>PrefabMagnifier</code> present Unity-UI entities from a
                prefab shared through the touch overlay; an entity whose prefab
                slot is empty presents nothing.{" "}
                <code>Defaults/Editing/SelectionHandles.prefab</code> is the
                shipped handles prefab, assigned in the shipped Selectable Text
                prefab. No loupe prefab ships — build one from{" "}
                <strong>Add Component → UniText → Magnifier</strong> (
                <code>UniTextMagnifier</code>) and assign it; it captures
                through a canvas camera, so it stays hidden on a Screen Space -
                Overlay canvas, which has none. <code>SelectableEntity</code> is
                the base for your own. Each capability is independent — an
                entity may implement either or both (<code>ITouchHandles</code>
                ).
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 13. Editing                                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Pencil className="w-6 h-6 text-[var(--color-accent)]" />
            13. Editing
          </h2>

          <p className="text-white/70 mb-4">
            <strong>GameObject → UI (Canvas) → UniText → Editable Text</strong>{" "}
            and{" "}
            <strong>GameObject → UI (Canvas) → UniText → Input Field</strong>{" "}
            add an editable field to a Canvas. Both instantiate the prefab
            assigned in <code>UniTextSettings</code>, so a project&rsquo;s own
            prefab is what appears; with an empty slot the menu item creates
            nothing and warns.
          </p>

          <p className="text-white/70 mb-4">
            <code>UniTextEditable</code> is a sibling of{" "}
            <code>UniTextSelectable</code> on the same GameObject. It implements{" "}
            <code>ITextDocument</code> (read-only codepoint-indexed view for
            generic consumers — find/replace, validators, accessibility readers)
            and <code>ISavedStateProvider</code>.
          </p>

          <p className="text-white/70 mb-4">
            It tracks its size through the text component&rsquo;s{" "}
            <code>ILayoutElement</code>: add a <code>ContentSizeFitter</code>,
            or place it under a layout group. Put it directly under a{" "}
            <code>RectMask2D</code> to make that parent the clipping viewport
            and enable internal scrolling when content overflows. The rest of
            the field chrome — background, placeholder, labels — is assembled
            from ordinary Unity layout components plus decorators, not a fixed
            component.
          </p>

          <Notice type="new" className="mb-6">
            All OS input arrives independently of Unity&rsquo;s input system, so
            editing works whatever the project&rsquo;s Active Input Handling is
            set to (§16).
          </Notice>

          <CodeBlock
            code={`editable.Text = "value";              // serialized source; preserved byte-for-byte until an edit
var visible = editable.VisibleText;   // the same document without markup
editable.InsertText("abc");
editable.DeletePrevious();
editable.DeleteWordNext();
editable.Copy(); editable.Cut(); editable.Paste();
editable.PastePlain();                // paste without formatting
editable.Undo(); editable.Redo();
editable.SelectAll();
editable.Activate(); editable.Deactivate();`}
          />

          <p className="text-white/70 mt-4 mb-6">
            <code>ReadOnly</code> keeps selection and copy while refusing every
            mutation.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">13.1 Events</h3>

              <CodeBlock
                code={`editable.TextChanged      += () => { };
editable.ValueChanged     += value => { };
editable.DocumentChanged  += reason => { };   // TextChangeReason: input.type, input.paste, program.set, input.restore
editable.Submitted        += value => { };
editable.Cancelled        += () => { };
editable.Focused          += () => { };
editable.Defocused        += () => { };
editable.SelectionChanged += (anchor, focus) => { };
editable.EditApplied      += shape => { };
editable.CompositionStateChanged     += composing => { };
editable.TouchKeyboardVisibilityChanged += visible => { };
editable.CaretContextChanged            += context => { };
editable.ValidationChanged              += state => { };`}
              />

              <p className="text-white/70 mt-4">
                <code>EditShape</code> describes one mutation — removed
                codepoints replaced by inserted codepoints at a start index — so
                consumers patch derived state instead of recomputing it.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">13.2 Behaviors</h3>

              <p className="text-white/70 mb-4">
                Policy lives in <code>InputBehavior</code> objects, not in the
                component. A behavior subscribes to the hooks it needs in{" "}
                <code>OnEnable</code> and unsubscribes in <code>OnDisable</code>
                . The base carries no policy; every specific lives in a
                subclass. This mirrors <code>BaseModifier</code>, adapted to the
                editing pipeline.
              </p>

              <p className="text-white/70 mb-4">
                An editor holds two slots: <code>Behaviors</code>, the local
                list in hook order, and <code>BehaviorPresets</code>, shared
                preset assets applied after it.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Behavior
                      </th>
                      <th className="text-left py-2 text-white/60">Effect</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>PasswordBehavior</code>
                      </td>
                      <td className="py-2">
                        single-line masked field: every codepoint renders as{" "}
                        <code>MaskChar</code>, line breaks are rejected,
                        copy/cut are blocked unless <code>AllowCopy</code>,
                        native input is secure; <code>Revealed</code> drives a
                        show-password toggle
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SingleLineBehavior</code>
                      </td>
                      <td className="py-2">
                        web <code>&lt;input&gt;</code> semantics: Enter submits,
                        newlines are stripped from typing, paste and IME commit
                        (multi-line pastes are joined), and submit releases
                        focus unless <code>KeepFocusOnSubmit</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>LengthLimitBehavior</code>
                      </td>
                      <td className="py-2">
                        caps length, in the chosen <code>TextLengthUnit</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>InputMaskBehavior</code>
                      </td>
                      <td className="py-2">
                        live pattern formatting — <code>(###) ###-####</code>,{" "}
                        <code>##/##/####</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>CaseTransformBehavior</code>
                      </td>
                      <td className="py-2">
                        forces upper / lower / title case as text is entered
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SelectAllOnFocusBehavior</code>
                      </td>
                      <td className="py-2">selects everything on focus</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>DefocusOnCancelBehavior</code>
                      </td>
                      <td className="py-2">
                        releases focus on Escape / system back
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SubmitKeyBehavior</code>,{" "}
                        <code>TabKeyBehavior</code>
                      </td>
                      <td className="py-2">key bindings</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>TextFormattingBehavior</code>
                      </td>
                      <td className="py-2">
                        style commands over the selection or as a typing style —
                        bold (B), italic (I), underline (U), clear formatting (
                        <code>{"`"}</code>) — and the field&rsquo;s markup
                        policy: <code>MarkupVisibility</code>,{" "}
                        <code>MarkupChrome</code>, <code>RichPaste</code>,{" "}
                        <code>PlainTextPaste</code>, <code>TypingMarkup</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>CaretContextBehavior</code>
                      </td>
                      <td className="py-2">
                        hosts <code>CaretContextHandler</code>s (toolbar state,
                        formatting bubbles)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>StripFormatOnPasteBehavior</code>,{" "}
                        <code>LinkOnPasteBehavior</code>
                      </td>
                      <td className="py-2">paste policy</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MediaInputBehavior</code>
                      </td>
                      <td className="py-2">
                        receives pasted/dropped images and files
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>NativeKeyboardBehavior</code>,{" "}
                        <code>NativeFieldOverlayBehavior</code>
                      </td>
                      <td className="py-2">
                        soft-keyboard traits and OS overlay
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>KeyboardAvoidanceBehavior</code>
                      </td>
                      <td className="py-2">
                        lifts the field above the software keyboard
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>AutoValidateBehavior</code>
                      </td>
                      <td className="py-2">
                        re-runs validators on a chosen trigger (
                        <code>AutoValidateMode</code>:{" "}
                        <code>OnValueChanged</code>, <code>OnUnfocus</code>,{" "}
                        <code>OnSubmit</code>, <code>Always</code>) and
                        publishes the result to <code>Validation</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                <code>InputBehaviorPreset</code> is a project asset holding a
                behavior list — one asset defines a field archetype (chat
                composer, password field, form field) reused across scenes. Each
                editor instantiates a runtime copy, so per-instance state never
                leaks back into the asset.
              </p>

              <p className="text-white/70">
                Markup visibility is the field-level policy for authored tags.{" "}
                <code>UniTextEditable.MarkupVisibility</code> is{" "}
                <code>Hidden</code> (default — tags never show and the caret
                steps over them as atomic units), <code>RevealActiveRange</code>{" "}
                (the tags of the range the caret is inside reveal as editable
                source), or <code>Raw</code> (every tag shows as literal source
                text and the caret moves through it);{" "}
                <code>TextFormattingBehavior</code> authors it.{" "}
                <code>ChromeRule</code> entries in{" "}
                <code>UniTextEditable.MarkupChrome</code> style the visible tag
                characters — different modifier kinds compose, same-kind rules
                resolve by selector specificity, ties to the first listed.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">13.3 Filters vs validators</h3>

              <p className="text-white/70 mb-4">Two different jobs:</p>

              <ul className="space-y-3 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>InputFilterBase</code> rejects characters{" "}
                  <em>as they are typed</em>. Built-ins:{" "}
                  <code>AlphanumericFilter</code>, <code>IntegerFilter</code>,{" "}
                  <code>DecimalFilter</code>, <code>EmailFilter</code>,{" "}
                  <code>NameFilter</code>. Override{" "}
                  <code>Allows(in EditProposal)</code> and judge the post-state:
                  replacing a selection is legal whenever the result is legal.
                  Pure deletions never reach it — a character filter cannot
                  block deleting. <code>PreferredKeyboardType</code> supplies a
                  mobile keyboard when no <code>NativeKeyboardBehavior</code>{" "}
                  overrides it.
                </li>
                <li>
                  <code>InputValidatorBase</code> lets input through and judges
                  the <em>whole value</em>. Override{" "}
                  <code>Validate(ITextDocument)</code> and return a{" "}
                  <code>ValidationState</code>; none ship — validators are
                  per-project. <code>Status</code> is an open token, empty when
                  valid (<code>ValidationStatus.Invalid</code> /{" "}
                  <code>Pending</code> are the common ones), and{" "}
                  <code>Message</code> is what a{" "}
                  <code>SupportingTextDecorator</code> shows.
                </li>
              </ul>

              <Notice type="info" className="mb-4">
                Filters run only on committed text — never on in-progress IME
                composition, undo/redo replay, or programmatic <code>Text</code>{" "}
                writes.
              </Notice>

              <p className="text-white/70">
                <code>InputEdit</code> is the mutation a filter hook sees,
                passed by ref: reject it, rewrite <code>text</code>, or retarget
                the whole edit (a CodeMirror-style transaction rewrite — this is
                how a mask reformats the entire field).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">13.4 Decorators</h3>

              <p className="text-white/70 mb-4">
                <code>FieldDecorator</code> is a state-driven visual that
                receives a <code>FieldState</code> snapshot whenever the
                editor&rsquo;s state changes. Built-ins:
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Decorator
                      </th>
                      <th className="text-left py-2 text-white/60">Shows</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>PlaceholderDecorator</code>
                      </td>
                      <td className="py-2">placeholder while empty</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>FloatingLabelDecorator</code>
                      </td>
                      <td className="py-2">
                        label animating between resting and floated positions
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SupportingTextDecorator</code>
                      </td>
                      <td className="py-2">helper / error text</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>CharacterCounterDecorator</code>
                      </td>
                      <td className="py-2">
                        <code>count</code> or <code>count/limit</code>,
                        recoloured at the cap
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                The counter counts the document <strong>source</strong> — the
                same space <code>LengthLimitBehavior</code> enforces in — so
                count and cap always agree. In a field with hidden markup that
                count includes the markup characters, not just the visible text.
              </p>

              <p className="text-white/70">
                Decorators are <code>InputBehavior</code>s, so they appear in
                the same picker and follow the same lifecycle.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">13.5 Caret</h3>
                <p className="text-white/70 mb-3">
                  <code>InputCaretRenderer</code> draws the caret as a filled
                  rectangle. It is the extension point: subclass it, override{" "}
                  <code>OnPopulateMesh</code> reading <code>CaretRect</code> and{" "}
                  <code>BlinkVisible</code> for a block cursor, an underline or
                  a gradient, then assign it to{" "}
                  <code>UniTextEditable.CaretRenderer</code>; with none
                  assigned, one is created on first activation.
                </p>
                <p className="text-white/70">
                  The caret toggles every{" "}
                  <code>UniTextSettings.CaretBlinkInterval</code> seconds and
                  stops blinking, visible, after{" "}
                  <code>UniTextSettings.CaretBlinkTimeout</code> seconds of
                  inactivity. The static{" "}
                  <code>InputCaretRenderer.PrefersNonBlinkingCaret</code>{" "}
                  suppresses the blink entirely; the integration layer sets it
                  from the platform preference — iOS 17+ &ldquo;Prefer
                  Non-Blinking Cursor&rdquo;, the macOS Reduce Motion cursor
                  setting — alongside{" "}
                  <code>Accessibility.PrefersReducedMotion</code>.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">13.6 Caret context</h3>
                <p className="text-white/70 mb-3">
                  <code>CaretContext</code> reports which modifiers cover the
                  caret — the full set plus what entered and left since the
                  previous state — with the selection it was computed for and
                  the source editor for follow-up queries (
                  <code>IsStyleActive&lt;T&gt;</code>,{" "}
                  <code>TryGetStyleParameter&lt;T&gt;</code>, caret geometry).
                </p>
                <p className="text-white/70">
                  This is what drives a formatting toolbar:{" "}
                  <code>CaretContextBehavior</code> hosts handlers,{" "}
                  <code>StyleStateHandler</code> lights up buttons. The lists
                  are reused between dispatches — read them during the call,
                  copy what you need to keep.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">13.7 Soft keyboard</h3>

              <p className="text-white/70 mb-4">
                <code>NativeKeyboardConfig</code> carries the portable traits:{" "}
                <code>KeyboardType</code>, <code>ReturnKeyType</code>,{" "}
                <code>AutoCapitalization</code>, <code>AutoCorrection</code>,{" "}
                <code>SpellChecking</code>, <code>AutofillHint</code>. iOS-only:{" "}
                <code>SmartQuotes</code>, <code>SmartDashes</code>,{" "}
                <code>SmartInsertDelete</code> (each a{" "}
                <code>SmartFeatureMode</code>), <code>KeyboardAppearance</code>,{" "}
                <code>EnablesReturnKeyAutomatically</code>,{" "}
                <code>ShowDoneToolbar</code>, <code>PasswordRules</code>.
                Android-only: <code>ImeFlags</code> (
                <code>AndroidImeFlags</code>).
              </p>

              <p className="text-white/70 mb-4">
                <code>KeyboardType</code> deliberately exposes only values that
                map across iOS, Android and Web, so a value never silently
                degrades on another platform; an iOS-only type goes through the
                iOS override field.
              </p>

              <p className="text-white/70 mb-4">
                <code>KeyboardRequest</code> is passed by ref to resolver hooks
                each time the field raises the keyboard — a behavior fills in
                traits and overlay styling; unset fields keep OS defaults.
              </p>

              <p className="text-white/70">
                <code>NativeEditorAction</code> delivers the keyboard&rsquo;s
                action key as an open vocabulary (<code>Submit</code> /{" "}
                <code>Next</code> / <code>Previous</code> / <code>Newline</code>
                , with Go/Search/Send/Done all arriving as <code>Submit</code>),
                so a chat composer submits and a form field advances focus. With
                no subscriber it degrades to a synthesized Return.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 14. Clipboard                                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Clipboard className="w-6 h-6 text-[var(--color-accent)]" />
            14. Clipboard
          </h2>

          <p className="text-white/70 mb-6">
            Copy and paste are multi-format and lossless within UniText.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">14.1 Adapters</h3>

              <p className="text-white/70 mb-4">
                An <code>IClipboardAdapter</code> is one format stage. The
                built-in set is fixed per field: on copy every adapter
                contributes its format as one atomic multi-format write; on
                paste the highest-<code>Priority</code> adapter whose format is
                present wins.
              </p>

              <ClipboardLadder />

              <p className="text-white/70 mb-4">
                Copying a styled selection into an email keeps the formatting;
                copying it back into UniText restores the exact modifiers.
              </p>

              <Notice type="info">
                A selection whose markup is visible to the user —{" "}
                <code>Raw</code>, or a range revealed under{" "}
                <code>RevealActiveRange</code> — copies as plain text only, with
                no semantic channels: what is on screen is what pastes.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                14.2 Teaching a modifier to travel
              </h3>

              <p className="text-white/70 mb-4">
                Formats are declared per modifier <strong>type</strong>, not per
                instance, in <code>ClipboardModifierBindMap</code>:
              </p>

              <CodeBlock
                code={`ClipboardModifierBindMap.Register<MyModifier>(schema);`}
              />

              <p className="text-white/70 mt-4 mb-4">
                <code>ModifierClipboardSchema</code> carries{" "}
                <code>ModifierHtmlSchema</code> (which elements) and{" "}
                <code>ModifierMarkdownSchema</code> (which delimiters —{" "}
                <code>MarkdownSyntaxKind.Wrap</code> for <code>**bold**</code>,{" "}
                <code>Link</code> for <code>[text](url)</code> where the
                parameter is the URL). A schema must declare{" "}
                <code>CanonicalTagName</code> — the UniText source tag the paste
                gate matches against the field&rsquo;s styles — or set{" "}
                <code>MatchesSourceTagName</code> when the modifier&rsquo;s own
                tag names are its element names (<code>sup</code> /{" "}
                <code>sub</code>); a schema with neither is rejected with a
                warning. Register once per type, on the main thread; a repeat
                registration of the same type is a no-op. An unregistered
                modifier&rsquo;s ranges copy as plain text. Built-ins are
                pre-registered.
              </p>

              <Notice type="info">
                Registration is explicit — no assembly scan, nothing for IL2CPP
                stripping to break, and the first paste costs nothing.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">14.3 Plain text</h3>

              <p className="text-white/70 mb-4">
                Plain text is the one channel whose intent is unknown: a pasted{" "}
                <code>&lt;b&gt;</code> might be markup or literal.{" "}
                <code>UniTextEditable.PlainTextPaste</code> decides —{" "}
                <code>Auto</code> (default) follows{" "}
                <code>MarkupVisibility</code>, parsing under <code>Raw</code>{" "}
                and inserting literally otherwise, <code>Literal</code> always
                inserts verbatim, <code>Parse</code> always reparses with the
                field&rsquo;s own rules.{" "}
                <code>UniTextEditable.TypingMarkup</code> does the same for
                hand-typed text — <code>Parse</code> (default) or{" "}
                <code>Literal</code>; formatting commands, programmatic styling,
                inline objects and paste are unaffected by it.
              </p>

              <p className="text-white/70">
                <code>UniTextEditable.RichPaste</code> (default{" "}
                <code>true</code>) gates the structured channels entirely: with
                it off, a paste always inserts the clipboard&rsquo;s plain text
                and the HTML / Markdown / UniText formats are ignored.{" "}
                <code>TextFormattingBehavior</code> carries all three as
                authored values and applies them to the editor.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">14.4 Media</h3>
                <p className="text-white/70">
                  <code>MediaContent</code> is offered to{" "}
                  <code>MediaReceived</code> before the text pipeline runs —
                  from a paste, a drag-and-drop, or a picker (
                  <code>MediaSource</code>
                  ). A handler probes the formats it cares about (image blobs
                  via <code>GetData</code>, files via <code>GetFiles</code> /{" "}
                  <code>ReadFile</code>) and sets <code>Handled</code> to
                  consume it; left unhandled, a paste falls through to the text
                  channels. <code>MediaInputBehavior</code> is the
                  inherit-and-override entry point — this is how a chat composer
                  turns pasted images into attachment cards.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">14.5 Paste permission</h3>
                <p className="text-white/70">
                  <code>UniTextPasteControl</code> is the cross-platform Paste
                  widget. On iOS 16+ it overlays a native{" "}
                  <code>UIPasteControl</code> on its own{" "}
                  <code>RectTransform</code>, so a tap pastes without the system
                  paste-permission prompt; elsewhere it drives{" "}
                  <code>UniTextEditable.Paste</code> through an optional{" "}
                  <code>Button</code> on itself or a child. Left unassigned,{" "}
                  <code>Target</code> resolves from the parent hierarchy and{" "}
                  <code>FallbackButton</code> from itself or a child.{" "}
                  <code>DisplayMode</code> (<code>IconAndLabel</code> /{" "}
                  <code>IconOnly</code> / <code>LabelOnly</code>) and{" "}
                  <code>CornerStyle</code> (<code>Capsule</code> /{" "}
                  <code>Dynamic</code> / <code>Fixed</code> / <code>Small</code>
                  ) style the native control; <code>Pasted</code> fires on
                  either path. A programmatic <code>TriggerPaste</code> on iOS
                  16+ outside a user-action context surfaces the system prompt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 15. Language and Internationalization                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-[var(--color-accent)]" />
            15. Language and Internationalization
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                15.1 Three places to set the language
              </h3>

              <ol className="space-y-2 text-white/70 list-decimal list-inside mb-4">
                <li>
                  <strong>Component</strong> — <code>Language</code>, the
                  default BCP 47 tag for all text in it (a whole-text{" "}
                  <code>LanguageModifier</code>).
                </li>
                <li>
                  <code>&lt;lang=…&gt;</code> — per range, BCP 47:{" "}
                  <code>&lt;lang=zh-Hans&gt;汉字&lt;/lang&gt;</code>.
                </li>
                <li>
                  <strong>Font family</strong> — a family may declare one BCP 47
                  tag it prefers (<code>FontFamily.preferredLanguage</code>); a
                  run carrying a matching tag prefers that family during
                  codepoint-to-font resolution. Matching is prefix-wise, so{" "}
                  <code>zh</code> matches <code>zh-Hans</code> (
                  <code>LanguageMatching</code>).
                </li>
              </ol>

              <p className="text-white/70 mb-4">
                Language matters beyond fallback: it drives the OpenType{" "}
                <code>locl</code> feature, which selects the correct forms for
                Han unification (Chinese vs Japanese vs Korean shapes of the
                same codepoint).
              </p>

              <Notice type="info">
                Case conversion and line breaking are language-independent:{" "}
                <code>UppercaseModifier</code> / <code>LowercaseModifier</code>{" "}
                use the bundled simple UCD mappings, which ignore
                locale-conditional rules such as Turkish dotless I, and break
                opportunities come from each codepoint&rsquo;s script
                (UAX&nbsp;#14).
              </Notice>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">
                  15.2 Picking fonts by language
                </h3>
                <p className="text-white/70">
                  Put language-specific families in the stack and name them;{" "}
                  <code>&lt;font=…&gt;</code> selects one explicitly, and
                  automatic fallback selects one implicitly for characters the
                  primary family lacks.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">15.3 Localization</h3>
                <p className="text-white/70">
                  <code>IUniTextResolver</code> (§10.6) substitutes text at
                  render time. Combined with <code>&lt;lang&gt;</code> and a
                  per-language font stack, one component serves every locale
                  without scene changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 16. RTL, BiDi and Platform Input                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[var(--color-accent)]" />
            16. RTL, BiDi and Platform Input
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">16.1 Bidirectional text</h3>

              <p className="text-white/70 mb-4">
                The full Unicode Bidirectional Algorithm runs on every
                paragraph: Arabic, Hebrew, Syriac and Thaana, mixed with Latin,
                resolve correctly including nested embeddings, mirrored brackets
                and neutral runs.
              </p>

              <p className="text-white/70 mb-4">
                The base direction is <code>TextDirection.Auto</code> unless a{" "}
                <code>DirectionModifier</code> sets it; <code>Auto</code>{" "}
                resolves each paragraph from its own first strong character
                (UAX&nbsp;#9). <code>DirectionModifier</code> applies whole-text
                — its resolved value becomes the base direction of every
                paragraph, not of one range. Caret movement, selection and
                hit-testing are all BiDi-aware — this is why{" "}
                <code>CaretAffinity</code> exists (§12.2).
              </p>

              <p className="text-white/70">
                Cursive joining is handled by the shaper, so{" "}
                <code>LetterSpacingModifier</code> renders tatweel rather than
                breaking joins.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">16.2 Native input</h3>

              <p className="text-white/70 mb-4">
                <code>UniTextNativeInput</code> delivers OS key, text,
                composition, selection and keyboard-visibility events{" "}
                <strong>independently of Unity&rsquo;s input system</strong> —
                no <code>Event.PopEvent</code>. Editing therefore works whatever
                Active Input Handling is set to (Legacy, New Input System, or
                Both), which removes the biggest friction point of every Unity
                input-field asset.
              </p>

              <p className="text-white/70 mb-4">
                Control keys arrive only via key-down; printable text arrives
                only after the OS resolves layout, dead keys and IME.{" "}
                <code>NativeKeyCode</code> and{" "}
                <code>[Flags] NativeModifiers</code> are cross-platform.
              </p>

              <p className="text-white/70">
                <code>INativeInputBackend</code> is the backend seam;{" "}
                <code>ManagedInputBackend</code> is the portable fallback.{" "}
                <code>ITextInputContext</code> is the per-field context the
                backend talks to.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">16.3 IME</h3>
              <p className="text-white/70">
                Composition is first-class: <code>CompositionStateChanged</code>{" "}
                reports when a composition is in flight, composition clauses
                carry their own styling (<code>CompositionClause</code>,{" "}
                <code>CompositionClauseStyle</code>), and filters never see
                in-progress composition text.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 17. Emoji                                                           */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Smile className="w-6 h-6 text-[var(--color-accent)]" />
            17. Emoji
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              Colour emoji render from the OS emoji font by default — nothing to
              configure. Flags, ZWJ sequences (family, profession) and skin-tone
              modifiers form single glyph clusters as the Unicode spec requires.
            </p>

            <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
              <li>
                <code>EmojiFont</code> — the system emoji runtime, resolved from
                the OS and served without a stack entry (<code>Instance</code>,{" "}
                <code>IsAvailable</code>, <code>Disabled</code>); reserved font
                id −1.
              </li>
              <li>
                <code>SystemEmojiFont</code> — locates the OS emoji font file
                per platform (Segoe UI Emoji, Apple Color Emoji, NotoColorEmoji,
                …).
              </li>
              <li>
                <code>UniTextColorFont</code> — a colour-font asset (CBDT/sbix
                bitmap or COLRv0/COLRv1 vector) added to a stack like any other
                font.
              </li>
              <li>
                <code>ColorFontCore</code> — the shared colour-font runtime
                behind <code>EmojiFont</code> and <code>UniTextColorFont</code>.
              </li>
            </ul>

            <p className="text-white/70 mb-4">
              Emoji participate in line breaking, selection and editing as
              single clusters: one arrow-key press crosses a whole family emoji,
              and one backspace deletes it.
            </p>

            <p className="text-white/70">
              <strong>Project Settings → UniText → Disable Emoji</strong> turns
              colour emoji off globally (
              <code>UniTextSettings.EmojiDisabled</code>, mirrored to{" "}
              <code>EmojiFont.Disabled</code>). A <code>UniTextColorFont</code>{" "}
              in the stack ships a colour font of your own; the system emoji
              font stays the privileged provider for emoji-presentation
              codepoints.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 18. Custom Materials and Shaders                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
            18. Custom Materials and Shaders
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                18.1 Using a ready material
              </h3>

              <p className="text-white/70 mb-4">
                Assign a material to <code>MaterialModifier</code> and tag a
                range with <code>&lt;mat&gt;</code>. An optional parameter tints
                it: <code>&lt;mat=#FF8800&gt;</code>.
              </p>

              <p className="text-white/70">
                <code>RenderOrder</code> decides how the sub-mesh composes with
                the base text pass: <code>Replace</code> (the default)
                suppresses the base face on the range, so only the custom
                material shows; <code>Keep</code> renders the custom material as
                its own layer, ordered by the modifier&rsquo;s position in{" "}
                <code>Styles</code>. Paint layers (stroke, shadow, glow) stay
                separate quads either way.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.2 Authoring a shader</h3>

              <p className="text-white/70 mb-4">
                UniText ships shader includes so one source compiles for Canvas,
                world-space, Built-in <strong>and</strong> URP. Effects read the
                shared coverage and paint channels rather than reimplementing
                SDF sampling.
              </p>

              <p className="text-white/70 mb-4">
                <strong>Assets → Create → UniText → Custom Effect</strong>{" "}
                writes three files: the effect include plus its Canvas and World
                shells, with the package prelude includes already resolved. The
                visual logic lives in the include — implement{" "}
                <code>half4 UniTextEffect(UniTextFrag i)</code> and return a
                premultiplied colour; the shells are touched only to declare
                Properties. <code>UniTextFrag</code> carries{" "}
                <code>sdfAlpha</code>, <code>signedDist</code>,{" "}
                <code>glyphUV</code>, <code>atlasUV</code>,{" "}
                <code>atlasColor</code>, <code>color</code>,{" "}
                <code>glyphMeta</code>, <code>lineFlow</code>,{" "}
                <code>tileId</code>, <code>tileHash</code>, <code>userA</code> /{" "}
                <code>userB</code> and <code>positionWS</code>;{" "}
                <code>UniText_EffectLib.hlsl</code> supplies the building
                blocks. A material bound through <code>MaterialModifier</code>{" "}
                must declare <code>_MainTex</code> as a <code>2DArray</code> —
                the atlas is bound automatically.
              </p>

              <Notice type="warning" className="mb-4">
                Vertex channels are a contract, and TEXCOORD2 / TEXCOORD3 carry
                two disjoint streams that never share a quad. On base-mesh quads
                they hold the coverage and paint contract (
                <code>CoverageMode</code>, written by{" "}
                <code>CoverageQuadOps</code>, read with the{" "}
                <code>UniTextCoverage</code> helpers). On a{" "}
                <code>MaterialModifier</code> sub-mesh they are user channels A
                and B — filled from <code>ConstantUv2</code> /{" "}
                <code>ConstantUv3</code>, the <code>glyphDataWriter</code>{" "}
                delegate, or an <code>OnWriteGlyphUV</code> override — and reach
                the fragment as <code>UniTextFrag.userA</code> /{" "}
                <code>userB</code>.
              </Notice>

              <p className="text-white/70 mb-4">
                The prelude&rsquo;s own interpolators are fully claimed (
                <code>meta.w</code> carries the packed tile hash), so per-glyph
                custom data rides the <code>MaterialModifier</code> user
                channels or is produced in the <code>UNITEXT_EFFECT_VERT</code>{" "}
                vertex hook. The paint interpolator&rsquo;s fourth channel packs
                the gradient&rsquo;s <code>PaintSpread</code> alongside the
                paint kind, so a hand-written shader reading it directly must
                unpack both.
              </p>

              <p className="text-white/70">
                <code>MaterialModifier</code> derives from{" "}
                <code>SubMeshModifier</code>, the abstract base that gives a
                range its own sub-mesh, <code>CanvasRenderer</code> and
                material. A range that needs a genuinely different shader needs
                only <code>MaterialModifier</code>; subclass{" "}
                <code>SubMeshModifier</code> when the sub-mesh geometry itself
                must be built differently.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.3 Noise</h3>
              <p className="text-white/70">
                <strong>Tools → LightSide → Noise Generator</strong> produces
                noise textures for shader effects.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 19. Text Model and Runtime API                                      */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[var(--color-accent)]" />
            19. Text Model and Runtime API
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">19.1 Assigning text</h3>

              <CodeBlock
                code={`text.Text = "value";                 // serialized field
text.SetText(stringBuilder);         // no allocation from a builder
text.SetText(charSpan);              // from a span`}
              />

              <p className="text-white/70 mt-4">
                <code>Text</code> is the serialized field. <code>RawText</code>{" "}
                is the runtime source before any resolver substitution,{" "}
                <code>ResolvedText</code> the resolver&rsquo;s last output,{" "}
                <code>RenderedText</code> what the pipeline actually parses —
                the resolver&rsquo;s output when one is active, otherwise{" "}
                <code>RawText</code> — and <code>CleanText</code> the same text
                with markup stripped. All are zero-alloc; <code>CleanText</code>
                &rsquo;s span is pooled, so copy it if it must outlive the next
                parse. <code>TextOverride</code> (
                <code>TextOverrideSource</code>) reports why the rendered text
                differs from the serialized field — a runtime buffer, a
                resolver, or both.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">19.2 Measuring</h3>

              <CodeBlock
                code={`var size = text.MeasureText(new TextMeasureOptions { maxWidth = 300f });`}
              />

              <p className="text-white/70 mt-4 mb-4">
                Every null field in <code>TextMeasureOptions</code> falls back
                to the component&rsquo;s current value, so a default measure is
                &ldquo;the current text, as configured, at its natural
                size&rdquo;. Dimensions are outer — padding included.
              </p>

              <Notice type="warning">
                The text resolver is bypassed, and the call is main-thread only.
                Measuring another <code>text</code> re-parses and re-shapes both
                texts — cache the result rather than calling it per frame.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">19.3 Hit testing</h3>

              <p className="text-white/70 mb-4">
                <code>HitTestRange(localPoint, maxDistance)</code>, and its
                overload taking a screen point and a <code>Camera</code>,
                returns a <code>TextHitResult</code>: the glyph whose box
                contains the point and its cluster. Use it for entity queries —
                links, mentions, hover ranges.
              </p>

              <p className="text-white/70 mb-4">
                <code>HitTestCaret(screenPoint, camera)</code> returns the
                codepoint index a caret should take, edge-snapped (left half of
                glyph N → N, right half → N+1); the{" "}
                <code>out bool upstream</code> overload also reports affinity
                (§12.2). The two are not interchangeable: caret snapping at a
                range&rsquo;s trailing edge lands past the range.
              </p>

              <p className="text-white/70">
                <code>ResultGlyphs</code> exposes the laid-out glyphs (
                <code>PositionedGlyph</code>), <code>Buffers.lines</code> the
                lines (<code>TextLine</code>) and{" "}
                <code>Buffers.orderedRuns</code> the runs in visual order (
                <code>ShapedRun</code>); <code>TextRun</code> is the pre-shaping
                itemization run. <code>TextRange</code> addresses a span as
                start plus length. All of these are pooled — copy what must
                outlive the next rebuild.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">19.4 Invalidation</h3>

              <p className="text-white/70 mb-4">
                <code>UniTextDirty</code> names the coarsest pipeline stage a
                change invalidates; higher stages subsume the cheaper ones.{" "}
                <code>SetDirty</code> re-enters at the flag you pass, so pass
                the least expensive stage that captures your change; its second
                overload also declares the observable outputs the pass will
                change. <code>UniTextCommitChanges</code> reports what one
                completed pass actually changed and arrives on{" "}
                <code>Committed</code>; <code>LayoutCommitted</code> fires when
                this component&rsquo;s mesh is applied and its layout is final
                for the frame.
              </p>

              <p className="text-white/70">
                A custom attribute store implements{" "}
                <code>IAttributeData.Prepare(int)</code>, which UniText calls
                once per parse, so the store is always indexed by the codepoints
                of the text currently being laid out.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">19.5 Inspecting</h3>

              <p className="text-white/70 mb-4">
                The debug overlay visualizes glyph boxes, baselines, advances,
                run bounds, line bounds, modifier ranges, BiDi direction and
                pipeline statistics — the first tool to reach for when layout
                does something unexpected.
              </p>

              <p className="text-white/70">
                <strong>Tools → UniText → Inspection Mode</strong>{" "}
                (Ctrl/Cmd+Shift+I) toggles it in the editor;{" "}
                <code>UniTextInspector.ToggleKey</code> (F8) toggles it in play
                mode and in development builds. <code>PinKey</code> (P) freezes
                the current card so the cursor can move on.{" "}
                <code>UniTextInspector.Layers</code> (
                <code>InspectionLayers</code>) selects the drawn layers,{" "}
                <code>ShowBiDi</code> and <code>ShowStats</code> add direction
                arrows and the statistics card, and <code>Target</code> pins one
                component instead of following the cursor. The card lists each
                modifier covering the probed cluster with its parameters
                resolved there.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                19.6 Ranges and parameter ownership
              </h3>

              <p className="text-white/70 mb-4">
                A parse materializes a modifier&rsquo;s ranges. Code reads them
                as <code>ModifierRange</code>, selects them with{" "}
                <code>RangeQuery</code>, and takes a parameter (§5) over on them
                with <code>Own</code>.
              </p>

              <CodeBlock
                code={`var ranges = new List<ModifierRange>();
text.GetModifier<LinkModifier>().GetRanges(ranges);   // text order`}
              />

              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        <code>ModifierRange</code> member
                      </th>
                      <th className="text-left py-2 text-white/60">Carries</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Range</code>
                      </td>
                      <td className="py-2">
                        the covered codepoints, in rendered text space
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Identity</code>, <code>Segment</code>
                      </td>
                      <td className="py-2">
                        the stable entity, and the concrete segment of it this
                        range covers
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>PrimaryValue</code>
                      </td>
                      <td className="py-2">
                        the semantic value the source emitted — a link&rsquo;s
                        URL, a mention&rsquo;s id
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Label</code>
                      </td>
                      <td className="py-2">
                        the <code>#label</code> anchor authored on the tag
                        (§3.3), or null
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Channel</code>
                      </td>
                      <td className="py-2">
                        the <code>RangeChannel</code> asset the range is routed
                        to, or null
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Resolve(parameter)</code>
                      </td>
                      <td className="py-2">
                        the range&rsquo;s resolved value: cascade plus owned
                        values
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>Own(parameter, …)</code>
                      </td>
                      <td className="py-2">
                        takes that parameter over on this one range
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Notice type="info" className="mb-6">
                A range stays addressable for as long as the parser preserves
                its <code>Identity</code>; an edit inside the range retires the
                identity, and ownership taken on it is released.
              </Notice>

              <p className="text-white/70 mb-3">
                <strong>Queries.</strong> <code>modifier.Ranges()</code> starts
                a <code>RangeQuery</code>. It is an immutable value: every
                filter returns a new query, and filters combine with AND.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Filter
                      </th>
                      <th className="text-left py-2 text-white/60">Keeps</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WhereLabel(label)</code>
                      </td>
                      <td className="py-2">
                        ranges whose tag carries that <code>#label</code> anchor
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WhereParameter(parameter, value)</code>
                      </td>
                      <td className="py-2">
                        ranges whose token for that parameter parses to{" "}
                        <code>value</code>; ranges without the token never match
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WhereToken(parameter, token)</code>
                      </td>
                      <td className="py-2">
                        ranges whose raw token for that parameter matches,
                        ordinally
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WhereBare()</code>
                      </td>
                      <td className="py-2">
                        ranges authored with no explicit token at all
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WherePrimaryValue(value)</code>
                      </td>
                      <td className="py-2">
                        ranges whose source-emitted value matches
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>WhereChannel(channel)</code>
                      </td>
                      <td className="py-2">
                        ranges routed to one channel asset
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Intersecting(range)</code>,{" "}
                        <code>Within(range)</code>
                      </td>
                      <td className="py-2">
                        ranges overlapping, or contained by, a codepoint span
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Where(predicate)</code>
                      </td>
                      <td className="py-2">
                        ranges a <code>ModifierRangePredicate</code> accepts
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>Skip(n)</code>, <code>Take(n)</code>
                      </td>
                      <td className="py-2">
                        a window of the matches, in text order
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-6">
                A query carries at most one parameter filter —{" "}
                <code>WhereParameter</code> and <code>WhereToken</code> exclude
                each other. <code>Collect(list)</code> materializes the matches;{" "}
                <code>Matches(in range)</code> tests one range against the
                filters. <code>RangeQueryDefinition</code> is the serialized
                form of the same filter set, rebuilt into a live query on every
                bind, so an inspector-authored selection follows text edits.
                Driver clips (§8.5) are authored this way.
              </p>

              <p className="text-white/70 mb-3">
                <strong>Ownership.</strong> <code>Own</code> composes a value on
                top of a parameter&rsquo;s cascade until it is released.
              </p>

              <CodeBlock
                code={`text.Text = "Stock <color #alert>low</color>, restock <color #alert>today</color>";

var color = text.GetModifier<ColorModifier>();
using var alert = color.Ranges()
    .WhereLabel("alert")
    .Own(ColorModifier.Param.Color);

alert.Value = new Color32(255, 64, 64, 255);        // every matching range
alert.SetValue(0, new Color32(255, 160, 0, 255));   // the first one, until the next parse`}
              />

              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">
                        Entry point
                      </th>
                      <th className="text-left py-2 text-white/60">Owns</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>ModifierRange.Own</code>
                      </td>
                      <td className="py-2">
                        one parameter of one range →{" "}
                        <code>OwnedParameter&lt;TValue&gt;</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>RangeQuery.Own</code>
                      </td>
                      <td className="py-2">
                        one parameter across the query&rsquo;s matches →{" "}
                        <code>OwnedParameterSet&lt;TModifier,TValue&gt;</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>BaseModifier.Own</code>
                      </td>
                      <td className="py-2">
                        the same, across every range of the modifier
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>UniTextRanges.Own</code>
                      </td>
                      <td className="py-2">
                        either shape, from the runtime the component already
                        holds
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                <code>OwnedParameter&lt;TValue&gt;</code> carries{" "}
                <code>Value</code>, the <code>Baseline</code> beneath it, its{" "}
                <code>Composition</code> and <code>IsAlive</code>.{" "}
                <code>Release</code> — or <code>Dispose</code> — returns the
                parameter to its cascade; every other member throws{" "}
                <code>ObjectDisposedException</code> once the ownership is dead.
              </p>

              <p className="text-white/70 mb-4">
                <code>OwnedParameterSet&lt;TModifier,TValue&gt;</code> is
                standing ownership. It re-materializes after every parse —
                ranges that stop matching release, new matches receive the
                broadcast <code>Value</code>, survivors keep theirs — and raises{" "}
                <code>Changed</code> when it does. <code>Count</code> and{" "}
                <code>GetRange(i)</code> follow text order,{" "}
                <code>SetValue(i, value)</code> writes one member until the next
                parse, and <code>Withhold()</code> deactivates every
                member&rsquo;s value without giving up membership.
              </p>

              <Notice type="info" className="mb-4">
                Code, rules (§9) and driver clips (§8.5) all reach a parameter
                through this one path, so they compose against each other by{" "}
                <code>ParameterComposition</code> and priority instead of
                overwriting one another.
              </Notice>

              <p className="text-white/70">
                <strong>Tools → UniText → Range Debugger</strong> captures a{" "}
                <code>UniTextRangeDebugSnapshot</code> — the live range entities
                of a component and the rule playbacks bound to them — and can
                push signal values by hand.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 20. Accessibility                                                   */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Accessibility className="w-6 h-6 text-[var(--color-accent)]" />
            20. Accessibility
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              <code>UniTextSemantics.For(text)</code> returns the semantic tree
              of one component; the static <code>TryGet</code> finds an existing
              one without creating it. <code>Nodes</code> lists the live{" "}
              <code>TextSemanticNode</code>s in logical codepoint order, each
              carrying <code>Identity</code>, <code>Role</code> (
              <code>TextSemanticRole</code>), <code>Label</code>,{" "}
              <code>Value</code>, <code>Hint</code>, <code>Language</code>,{" "}
              <code>States</code> (<code>TextSemanticStates</code>),{" "}
              <code>Actions</code> (<code>TextSemanticActions</code>),{" "}
              <code>Segments</code> and <code>Bounds</code>.
            </p>

            <p className="text-white/70 mb-4">
              <code>Changed</code> fires once per added, updated or removed
              node, <code>Committed</code> after one layout commit has emitted
              them all. <code>PerformAction(identity, action)</code> invokes a
              single declared action; <code>ActionRequested</code> runs project
              handlers first, and <code>PreventDefault</code> on the request
              suppresses the built-in Activate / Context routing.
            </p>

            <p className="text-white/70 mb-4">
              <code>SemanticModifier</code> is the only producer: applied
              through a <code>Style</code> like any modifier (§3.1), it
              annotates a range with role, label, value, hint, language, states
              and actions. An empty label derives from the covered text by
              default.
            </p>

            <Notice type="info">
              Nothing enters the tree on its own: a range is described only
              where a <code>SemanticModifier</code> covers it, and its role is
              whatever that modifier resolves — <code>Text</code>,{" "}
              <code>Link</code>, <code>Button</code>, <code>Mention</code>,{" "}
              <code>Tag</code>, <code>Code</code>, <code>Math</code>,{" "}
              <code>Heading</code>, <code>Image</code>, <code>Comment</code>,{" "}
              <code>Error</code> or <code>Status</code>. The tree is
              platform-neutral: a native accessibility bridge or an automated
              test is an adapter over it, and the package ships none.
            </Notice>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 21. Recipes                                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-[var(--color-accent)]" />
            21. Recipes
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Clickable links</h3>
              <CodeBlock
                code={`text.Styles.Add(Style.Tag(new LinkModifier(), "link"));
text.Styles.Add(Style.FromSource(new RawUrlParseRule(), new LinkModifier()));
text.Text = "See <link=https://example.com>the docs</link> or https://example.com";`}
              />
              <p className="text-white/70 mt-4">
                <code>LinkModifier</code> carries no base visual styling —
                compose it with <code>ColorModifier</code> and{" "}
                <code>UnderlineModifier</code> in a{" "}
                <code>CompositeModifier</code> (as the built-in Link preset
                does) to make links read as links. <code>AutoOpenUrl</code> is
                on by default; subscribe to <code>LinkClicked</code> to handle
                activation instead.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Typewriter</h3>
              <CodeBlock
                code={`var reveal = text.GetModifier<RevealModifier>();
reveal.Collapse = false;
for (float t = 0; t < duration; t += Time.deltaTime)
{
    reveal.Front = UnitValue.Percent(100f * t / duration);
    yield return null;
}`}
              />
              <p className="text-white/70 mt-4">
                A <code>UniTextDriver</code> clip on{" "}
                <code>RevealModifier.Param.Front</code> does the same without a
                coroutine, and scrubs in the editor (§8.5).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                Whole-text colour without markup
              </h3>
              <CodeBlock
                code={`text.Styles.Add(Style.WholeText(new ColorModifier(), "#FF0000"));
text.Styles.Add(Style.Range(new ColorModifier(), 0, 5, "#FF0000"));   // a fixed span`}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">A chat composer</h3>
                <p className="text-white/70">
                  Add <code>UniTextSelectable</code> +{" "}
                  <code>UniTextEditable</code>, then an{" "}
                  <code>InputBehaviorPreset</code> holding{" "}
                  <code>SubmitKeyBehavior</code> (Enter submits, Shift+Enter
                  inserts a newline, focus survives), a{" "}
                  <code>MediaInputBehavior</code> subclass (pasted images become
                  attachments), <code>LengthLimitBehavior</code>, and a{" "}
                  <code>PlaceholderDecorator</code>.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">A password field</h3>
                <p className="text-white/70">
                  <code>PasswordBehavior</code> +{" "}
                  <code>SelectAllOnFocusBehavior</code> +{" "}
                  <code>NativeKeyboardBehavior</code> with{" "}
                  <code>AutofillHint.Password</code> and{" "}
                  <code>AutoCorrection</code> off.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">A validated email field</h3>
                <p className="text-white/70">
                  <code>EmailFilter</code> (rejects illegal characters as typed)
                  + a validator subclassing <code>InputValidatorBase</code>{" "}
                  (judges the whole value) + <code>AutoValidateBehavior</code> +{" "}
                  <code>SupportingTextDecorator</code> to show the message.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">
                  System fonts only, no bundled font
                </h3>
                <p className="text-white/70">
                  Leave the stack empty or put a single{" "}
                  <code>UniTextSystemFont</code> in it. Automatic OS fallback (
                  <code>SystemFont</code>) covers everything else. WebGL is the
                  exception — it has no OS font access, so a WebGL build needs a
                  regular <code>UniTextFont</code> in the stack.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* Next Steps                                                          */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section className="p-6 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/10 to-purple-500/10 border border-[var(--color-accent)]/20">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to={`${basePath}/api/UniText`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Layers className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Explore UniText API</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=modifiers`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Puzzle className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Markup Modifiers</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=paint`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Palette className="w-5 h-5 text-[var(--color-accent)]" />
              <span>The Paint System</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=editing`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Pencil className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Editing and Input</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
          </div>
        </section>
      </div>
    </AutoLink>
  );
}
