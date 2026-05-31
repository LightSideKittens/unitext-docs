/**
 * Getting Started guide page.
 * Comprehensive guide for UniText setup and usage.
 */

import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Plus,
  Type,
  Code,
  Languages,
  List,
  FileCode,
  ArrowRight,
  Settings,
  Layers,
  Link as LinkIcon,
  Image,
  Smile,
  MousePointerClick,
  Wrench,
  Download,
  Globe,
  Palette,
  FileText,
  ScanSearch,
  Copy,
} from 'lucide-react';
import { useDocs, CodeBlock, Notice, AutoLink } from '@lightside/docs-system';

const FONT_FALLBACK = [
  {
    name: 'Inter',
    note: 'primary + Bold / Italic faces',
    glyphs: 'Hello',
    dir: 'ltr',
    text: 'text-sky-300',
    ring: 'border-sky-400/40 bg-sky-400/10',
    dot: 'bg-sky-400/20 text-sky-300',
  },
  {
    name: 'Noto Sans Arabic',
    note: 'primary',
    glyphs: 'مرحبا',
    dir: 'rtl',
    text: 'text-emerald-300',
    ring: 'border-emerald-400/40 bg-emerald-400/10',
    dot: 'bg-emerald-400/20 text-emerald-300',
  },
  {
    name: 'Noto Sans Hebrew',
    note: 'primary',
    glyphs: 'עולם',
    dir: 'rtl',
    text: 'text-violet-300',
    ring: 'border-violet-400/40 bg-violet-400/10',
    dot: 'bg-violet-400/20 text-violet-300',
  },
] as const;

/**
 * Visual replacement for the §2.3 ASCII font-stack tree: shows the example
 * string resolving down the fallback chain, each run color-matched to the
 * family that covers it. Pure CSS — SSR-safe, themeable, translatable.
 */
function FontFallbackDiagram() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">Rendering</div>
      <div className="text-2xl flex flex-wrap gap-x-3 gap-y-1 mb-6">
        {FONT_FALLBACK.map((f) => (
          <span key={f.name} dir={f.dir} className={f.text}>
            {f.glyphs}
          </span>
        ))}
      </div>

      <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
        Fallback chain — searched top to bottom
      </div>
      <div className="space-y-2">
        {FONT_FALLBACK.map((f, i) => (
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
              <div className="text-xs text-white/40">{f.note}</div>
            </div>
            <span dir={f.dir} className={`text-lg shrink-0 ${f.text}`}>
              {f.glyphs}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-white/50">
        Families are searched top to bottom; each run uses the first family that covers it. Anything
        still uncovered falls through to the OS fonts, then the emoji atlas (§2.6).
      </p>
    </div>
  );
}

/** Visual replacement for the §2.3 variable-font ASCII tree. */
function VariableFontDiagram() {
  const weights = ['Thin', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black'];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="shrink-0 rounded-lg border border-sky-400/40 bg-sky-400/10 px-4 py-3 sm:w-56">
          <div className="text-[11px] uppercase tracking-wider text-sky-300/70 mb-1">one file</div>
          <div className="font-semibold mb-2">Inter-Variable</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">
              wght 100–900
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">
              wdth 75–100
            </span>
          </div>
        </div>

        <ArrowRight className="w-5 h-5 shrink-0 self-center rotate-90 text-[var(--color-accent)] sm:rotate-0" />

        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
            replaces these static files
          </div>
          <div className="flex flex-wrap gap-1.5">
            {weights.map((w) => (
              <span
                key={w}
                className="text-xs px-2 py-1 rounded border border-white/10 text-white/50 line-through decoration-white/20"
              >
                Inter-{w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Visual replacement for the §2.3 fallbackStack-chaining ASCII tree. */
function FallbackChainDiagram() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="space-y-3">
          <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-amber-300/70 mb-1">
              for headings
            </div>
            <div className="font-semibold">HeadingStack</div>
            <div className="text-sm text-white/60">Montserrat (+ bold / italic faces)</div>
          </div>
          <div className="rounded-lg border border-sky-400/40 bg-sky-400/10 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-sky-300/70 mb-1">
              for body text
            </div>
            <div className="font-semibold">BodyStack</div>
            <div className="text-sm text-white/60">Inter (+ faces)</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-white/40">
          <span className="text-xs font-mono">fallbackStack</span>
          <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
        </div>

        <div className="self-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300/70 mb-1">
            create once · shared
          </div>
          <div className="font-semibold mb-2">LanguageSupportStack</div>
          <div className="space-y-1 text-sm text-white/70">
            <div>Noto Sans Arabic</div>
            <div>Noto Sans Hebrew</div>
            <div>Noto Sans Devanagari</div>
            <div>Noto Sans CJK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** SVG bipartite "patch panel" for §3.1: any parse rule can drive any modifier. */
function RuleModifierCrossbar() {
  const rules = [
    { label: 'TagRule "b"', y: 34 },
    { label: 'TagRule "strong"', y: 90 },
    { label: 'MarkdownWrapRule "**"', y: 146 },
    { label: 'RangeRule ".."', y: 202 },
  ];
  const mods = [
    { label: 'BoldModifier', y: 62 },
    { label: 'ColorModifier', y: 138 },
    { label: 'OutlineModifier', y: 214 },
  ];
  const wire = (y1: number, y2: number) => `M188 ${y1} C280 ${y1} 280 ${y2} 372 ${y2}`;
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-4 overflow-x-auto">
      <svg
        viewBox="0 0 560 244"
        className="w-full min-w-[480px] h-auto"
        role="img"
        aria-label="Any parse rule can drive any modifier"
      >
        <text x="8" y="12" fill="rgba(255,255,255,0.4)" fontSize="11" letterSpacing="1">
          PARSE RULES
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

        <path d={wire(90, 62)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <path d={wire(146, 62)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <path d={wire(202, 62)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <path d={wire(146, 214)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <path d={wire(34, 62)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <path d={wire(34, 138)} fill="none" stroke="#fbbf24" strokeWidth="2.5" />

        {rules.map((r) => (
          <g key={r.label}>
            <rect
              x="8"
              y={r.y - 18}
              width="180"
              height="36"
              rx="8"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text
              x="20"
              y={r.y + 4}
              fill="rgba(255,255,255,0.85)"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              {r.label}
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
        Highlighted: the same <code>&lt;b&gt;</code> tag driving two different effects —{' '}
        <span className="text-sky-300">BoldModifier</span> and{' '}
        <span className="text-amber-300">ColorModifier</span>. There is no fixed coupling: any rule
        can drive any modifier.
      </p>
    </div>
  );
}

/** §9 text-model flow: one value mutating through the pipeline stages. */
function TextPipeline() {
  const stages = [
    { name: 'Text', value: '"greeting.hello"', note: 'serialized · on disk' },
    { name: 'RawText', value: '"greeting.hello"', note: 'runtime source' },
    { name: 'RenderedText', value: '"Hello <b>!</b>"', note: 'goes to shaping', accent: true },
    { name: 'CleanText', value: '"Hello !"', note: 'markup stripped' },
  ];
  const items = [];
  stages.forEach((st, i) => {
    if (i > 0) {
      items.push(
        <div
          key={`arrow-${i}`}
          className="flex flex-col items-center justify-center shrink-0 px-1.5"
        >
          {i === 2 && (
            <span className="text-[10px] font-mono text-emerald-300 mb-1 whitespace-nowrap">
              Resolver
            </span>
          )}
          <ArrowRight className="w-4 h-4 text-white/30" />
        </div>
      );
    }
    items.push(
      <div
        key={st.name}
        className={`flex-1 rounded-lg border px-3 py-2.5 ${
          st.accent ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <div className="text-[11px] font-mono text-white/40 mb-1">{st.name}</div>
        <div className="font-mono text-sm text-white/90 break-all">{st.value}</div>
        <div className="text-[11px] text-white/40 mt-1.5">{st.note}</div>
      </div>
    );
  });
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 mb-6 overflow-x-auto">
      <div className="flex items-stretch min-w-[640px]">{items}</div>
      <p className="mt-3 text-sm text-white/50">
        What you read back from <code>Text</code> is the serialized value; what actually renders can
        differ. A resolver (if set) substitutes the source before shaping — everything except{' '}
        <code>Text</code> is zero-allocation.
      </p>
    </div>
  );
}

/** Small "this is engine-internals, optional" marker under a heading. */
function AdvancedBadge() {
  return (
    <div className="flex items-center gap-2 mb-4 -mt-1">
      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
        Advanced
      </span>
      <span className="text-xs text-white/40">engine internals — skip on first read</span>
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
            This guide covers the basics of setting up and using UniText in your Unity project.
          </p>
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
              If you have a previous version of UniText installed, remove it first via{' '}
              <strong>Window &rarr; Package Manager</strong> before installing{' '}
              {version.replace(/^v/, '')}. This is a major update and cannot be installed over
              the previous version.
            </Notice>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Setup Tool</h3>
              <ol className="space-y-2 text-white/70 list-decimal list-inside">
                <li>
                  Check your email for a setup email from Light Side with your{' '}
                  <strong>access token</strong>
                </li>
                <li>
                  Download the <strong>setup tool</strong> from the email and import it into
                  your Unity project. The setup window opens automatically — paste your token
                  and click <strong>Set Up</strong>
                </li>
                <li>
                  Done! UniText is installed. You can manage versions anytime via{' '}
                  <strong>Light Side &rarr; UniText Setup</strong> in the Unity menu bar
                </li>
              </ol>
            </div>
          </div>

          <Notice type="info" className="mt-4">
            Requires Unity 2021 LTS or newer.
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

          <p className="text-white/70 mb-4">
            UniText ships two rendering components. Pick the one that matches your scene:
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Component</th>
                  <th className="text-left py-2 pr-4 text-white/60">Use when</th>
                  <th className="text-left py-2 text-white/60">Renders via</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>UniText</code>
                  </td>
                  <td className="py-2 pr-4">Text in a Canvas UI (screens, HUDs, inspector overlays)</td>
                  <td className="py-2">
                    <code>CanvasRenderer</code> (UGUI)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    <code>UniTextWorld</code>
                  </td>
                  <td className="py-2 pr-4">
                    Text placed in 3D world space, particle-like text, floating labels
                  </td>
                  <td className="py-2">Combined mesh via an invisible batcher (see §1.3)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 mb-6">
            Both components share 100% of the text processing pipeline (parsing, shaping, layout,
            modifiers, emoji, variable fonts, language). Only the rendering surface differs.
          </p>

          <div className="space-y-6">
            {/* 1.1 Canvas text */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                1.1 Canvas text (<code>UniText</code>)
              </h3>

              <p className="text-white/70 mb-4">
                Use the <strong>GameObject</strong> menu to create ready-to-use Canvas UniText
                objects:
              </p>

              <ul className="space-y-2 text-white/70 mb-6 list-disc list-inside">
                <li>
                  <strong>GameObject &rarr; UI (Canvas) &rarr; UniText &rarr; Text</strong> — text
                  with default font and size
                </li>
                <li>
                  <strong>GameObject &rarr; UI (Canvas) &rarr; UniText &rarr; Button</strong> —
                  button with UniText label (Image + Button + UniText child)
                </li>
              </ul>

              <Notice type="info" className="mb-6">
                <strong>Input Field</strong> is currently in development and will be available in a
                future release.
              </Notice>

              <p className="text-white/70 mb-4">
                Canvas and EventSystem are created automatically if not present. No font assignment
                is required on desktop or mobile — a component with no <code>FontStack</code> (a font
                plus its fallback chain, see §2.3) renders with the OS default font and fills
                coverage gaps from OS fonts (see §2.6). WebGL has no OS font access, so assign a
                regular <code>UniTextFont</code> for WebGL builds.
              </p>

              <p className="text-white/70 mb-4">
                You can also override default prefabs in{' '}
                <strong>Project Settings &rarr; UniText</strong> (Text Prefab, Button Prefab) — the
                menu will instantiate your prefab instead.
              </p>

              <CodeBlock
                code={`// Via code:
var uniText = gameObject.AddComponent<UniText>();
uniText.Text = "Hello, World!";            // renders with the OS default font (§2.6)
uniText.FontStack = myFontStack;           // optional — assign only when you want a specific typeface`}
              />

              <Notice type="info" className="mt-4">
                Prefab defaults (Text / Button prefab from Project Settings &rarr; UniText) are only
                applied when adding the component via the menu or Inspector. On WebGL there is no OS
                font, so assign a <code>FontStack</code>.
              </Notice>
            </div>

            {/* 1.2 World-space text */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                1.2 World-space text (<code>UniTextWorld</code>)
              </h3>

              <p className="text-white/70 mb-4">
                Use the menu to create a ready-to-go world-space text object:
              </p>

              <ul className="space-y-2 text-white/70 mb-6 list-disc list-inside">
                <li>
                  <strong>GameObject &rarr; UI (World) &rarr; UniText &rarr; World Text</strong>
                </li>
              </ul>

              <p className="text-white/70 mb-4">
                The menu creates a <code>UniTextWorld</code> scaled to <code>0.01</code> (so world
                units line up with your typical 3D scene), and auto-adds a{' '}
                <code>UniTextWorldRaycaster</code> to <code>Camera.main</code> so pointer events
                work out of the box (see §4.4). Override the prefab in{' '}
                <strong>Project Settings &rarr; UniText &rarr; World Text Prefab</strong>.
              </p>

              <p className="text-white/70 mb-4">
                World-space text authoring is identical to Canvas text — same{' '}
                <code>FontStack</code>, <code>FontSize</code>, alignment, modifiers, styles,
                language, and so on. The component also exposes Unity's standard sorting knobs:
              </p>

              <CodeBlock
                code={`var world = gameObject.AddComponent<UniTextWorld>();
world.Text = "Hello from world space!";
world.SortingOrder = 5;
world.SortingLayerID = SortingLayer.NameToID("Gameplay");`}
              />
            </div>

            {/* 1.3 How world-space rendering works */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">1.3 How world-space rendering works</h3>

              <p className="text-white/70">
                You never attach a <code>MeshRenderer</code> to a <code>UniTextWorld</code>. An
                invisible <code>UniTextWorldBatcher</code> assembles all world-space text into
                combined meshes automatically — grouping compatible components into single draw
                calls and respecting Unity's sorting model, so text interleaves correctly with{' '}
                <code>SpriteRenderer</code> and other renderers. It is fully transparent: you never
                configure it.
              </p>

              <p className="mt-3 text-sm text-white/50">
                Advanced: <code>UniTextWorld</code> also exposes batching and lifecycle events (
                <code>Activated</code>, <code>RenderDataAvailable</code>, <code>SortingChanged</code>
                , …) plus a tunable batch-shard size, for custom render tooling — see the API
                reference.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 2. Working with Fonts                                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Type className="w-6 h-6 text-[var(--color-accent)]" />
            2. Working with Fonts
          </h2>

          <p className="text-white/70 mb-8">
            <strong>Fonts work out of the box on desktop and mobile.</strong> A component with no
            font assigned renders with the operating system's default sans-serif, and any codepoint
            your assigned fonts don't cover is resolved automatically from the OS's installed fonts
            (see §2.6). Create and assign your own fonts when you want a specific typeface —
            everything below — but you don't have to set anything up just to see text.{' '}
            <strong>
              WebGL is the exception: it has no OS font access, so a WebGL build must be given a
              regular <code>UniTextFont</code>.
            </strong>
          </p>

          <p className="text-white/70 mb-4">
            <strong>
              Two properties assign a font — <code>Font</code> and <code>FontStack</code> — and you
              can set either, both, or neither:
            </strong>
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">
                    <code>Font</code>
                  </th>
                  <th className="text-left py-2 pr-4 text-white/60">
                    <code>FontStack</code>
                  </th>
                  <th className="text-left py-2 pr-4 text-white/60">Primary font</th>
                  <th className="text-left py-2 text-white/60">Fallback for uncovered glyphs</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">set</td>
                  <td className="py-2 pr-4">set</td>
                  <td className="py-2 pr-4">
                    <code>Font</code>
                  </td>
                  <td className="py-2">
                    families in <code>FontStack</code>, then OS fonts
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">set</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">
                    <code>Font</code>
                  </td>
                  <td className="py-2">OS fonts</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">set</td>
                  <td className="py-2 pr-4">the stack's primary</td>
                  <td className="py-2">rest of the stack, then OS fonts</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">OS default font</td>
                  <td className="py-2">OS fonts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 mb-8">
            <code>Font</code> is a single <code>UniTextFont</code>; <code>FontStack</code> is a
            multi-family collection with its own fallback chain (§2.3). Use <code>Font</code> for a
            quick single typeface, <code>FontStack</code> for multilingual or bold/italic-rich text —
            and set both to put one explicit primary in front of a shared fallback stack. The
            always-on OS fallback (§2.6) is always the last link.
          </p>

          <p className="text-white/70 mb-4">
            Under the hood, UniText renders glyphs with its own font format in two modes:
          </p>

          {/* Render modes table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Mode</th>
                  <th className="text-left py-2 pr-4 text-white/60">Description</th>
                  <th className="text-left py-2 text-white/60">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-semibold">SDF</td>
                  <td className="py-2 pr-4">Single-channel Signed Distance Field</td>
                  <td className="py-2">
                    Default. Resolution-independent, supports outlines and shadows
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold">MSDF</td>
                  <td className="py-2 pr-4">Multi-channel Signed Distance Field</td>
                  <td className="py-2">Sharper corners on geometric/display fonts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 mb-8">
            Both modes use Burst-compiled curve-based rasterization (no bitmap rendering). Glyphs
            are stored in a shared <code>Texture2DArray</code> atlas with adaptive tile sizes
            (64/128/256), reference counting, and LRU eviction. Set the mode per component via{' '}
            <code>RenderMode</code>.
          </p>

          <div className="space-y-6">
            {/* 2.1 Creating a UniTextFont Asset */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.1 Creating a UniTextFont Asset</h3>

              <p className="text-white/70 mb-3">
                <strong>Context Menu</strong> (from fonts already in the project):
              </p>
              <ol className="space-y-2 text-white/70 list-decimal list-inside mb-3">
                <li>
                  Import your font files (<code>.ttf</code>, <code>.otf</code>, or <code>.ttc</code>
                  ) into Unity
                </li>
                <li>Select one or multiple fonts in the Project window</li>
                <li>
                  Right-click &rarr; <strong>Create &rarr; UniText &rarr; Font Asset</strong>
                </li>
                <li>
                  A <code>.asset</code> file is created next to each source font
                </li>
              </ol>
              <p className="text-white/70 mb-6 text-sm">
                Supports batch creation — select 10 fonts, get 10 assets in one click.
              </p>

              <p className="text-white/70 mb-3">
                <strong>UniText Tools Window</strong> (also useful for creating from fonts outside
                the project):
              </p>
              <p className="text-white/70 mb-3">
                If the font file is somewhere on your computer but not imported into the Unity
                project:
              </p>
              <ol className="space-y-2 text-white/70 list-decimal list-inside mb-3">
                <li>
                  Open <strong>Tools &rarr; UniText &rarr; Tools</strong>
                </li>
                <li>
                  Drag-and-drop font files from the Project window, or click{' '}
                  <strong>Browse Files</strong> to pick fonts from anywhere on your computer
                </li>
                <li>
                  Click <strong>Create N UniText Font Asset(s)</strong>
                </li>
                <li>For external fonts, you will be prompted for an output folder within Assets</li>
              </ol>
              <p className="text-white/70 mb-4 text-sm">
                This is also useful for quick drag-and-drop workflow without manually importing
                fonts first.
              </p>

              <Notice type="info" className="mt-2">
                Font bytes are embedded directly in the asset — there is no external file dependency
                at runtime.
              </Notice>
            </div>

            {/* 2.2 Font Inspector Settings */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.2 Font Inspector Settings</h3>

              <p className="text-white/70 mb-4">
                Select a UniTextFont asset to configure in the Inspector:
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Setting</th>
                      <th className="text-left py-2 pr-4 text-white/60">Default</th>
                      <th className="text-left py-2 text-white/60">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-semibold">Font Scale</td>
                      <td className="py-2 pr-4">1.0</td>
                      <td className="py-2">
                        Visual scale multiplier. Normalizes fonts that appear too small or too large
                        by design
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-semibold">SDF Detail</td>
                      <td className="py-2 pr-4">1.0</td>
                      <td className="py-2">
                        Tile detail multiplier. Higher values force larger atlas tiles for fonts
                        with thin strokes (e.g. calligraphic)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-semibold">Glyph Overrides</td>
                      <td className="py-2 pr-4">—</td>
                      <td className="py-2">
                        Per-glyph tile size overrides (Auto/64/128/256) for fine-tuning quality on
                        specific glyphs
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-2">
                After changing SDF Detail or Glyph Overrides, click <strong>Apply</strong> to
                rebuild the atlas. <strong>Revert</strong> discards pending changes.
              </p>
              <p className="text-white/70 mb-4">
                A <strong>Glyph Picker</strong> is built into the inspector: type text to preview
                glyph rendering, select individual glyphs from the grid, and add tile size overrides
                directly.
              </p>
              <p className="text-white/70">The Inspector also shows:</p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mt-2">
                <li>
                  <strong>Face Info</strong> — family name, style, weight class, italic flag
                  (read-only, extracted from font data)
                </li>
                <li>
                  <strong>Variable Font Axes</strong> — if the font is variable, shows available
                  axes with min/default/max values
                </li>
                <li>
                  <strong>Font Data Status</strong> — whether font bytes are embedded
                </li>
                <li>
                  <strong>Runtime Data</strong> — glyph count, character count
                </li>
                <li>
                  <strong>Atlas Preview</strong> — SDF, MSDF, and Emoji atlas texture slices
                </li>
              </ul>
            </div>

            {/* 2.3 Creating a UniTextFontStack */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                2.3 Creating a UniTextFontStack (Font Collection)
              </h3>

              <p className="text-white/70 mb-4">
                <code>UniTextFontStack</code> organizes fonts into <strong>Font Families</strong>.
                Each family has:
              </p>

              <ul className="space-y-2 text-white/70 mb-4 list-disc list-inside">
                <li>
                  a <strong>primary</strong> font and optional <strong>faces</strong> (bold,
                  italic, light, etc.) — the same family, different weights/styles;
                </li>
                <li>
                  an optional <code>name</code> — a user-facing identifier addressable from markup
                  (see §5 and <code>FontModifier</code>);
                </li>
                <li>
                  an optional <code>preferredLanguage</code> — a BCP 47 tag that biases codepoint
                  resolution toward this family when the active language matches (see §5).
                </li>
              </ul>

              <p className="text-white/70 mb-6">
                Families are searched in order for glyph fallback.
              </p>

              <p className="text-white/70 mb-4">
                There are two creation modes when you select multiple <code>UniTextFont</code>{' '}
                assets:
              </p>

              {/* Font Stack (Combined) */}
              <h4 className="font-semibold text-white/90 mb-3">
                Font Stack (Combined) — Grouped by Family
              </h4>
              <ol className="space-y-1 text-white/70 list-decimal list-inside mb-4">
                <li>
                  Select 2+ <strong>UniTextFont</strong> assets in the Project window
                </li>
                <li>
                  Right-click &rarr;{' '}
                  <strong>Create &rarr; UniText &rarr; Font Stack (Combined)</strong>
                </li>
                <li>
                  Fonts are automatically grouped by <code>familyName</code>. The closest-to-Regular
                  font becomes the primary; others become faces.
                </li>
              </ol>

              <FontFallbackDiagram />

              <p className="text-white/70 mb-6">
                When <code>&lt;b&gt;</code> is applied, the system uses CSS §5.2 weight matching to
                find the best face within the same family (e.g., Inter-Bold). If no matching face
                exists, synthesis (fake bold/italic) is applied.
              </p>

              <p className="text-white/70 mb-6">
                <strong>Use case:</strong> Multilingual text with real bold/italic variants. One
                component handles any language.
              </p>

              {/* Font Stack (Per Font) */}
              <h4 className="font-semibold text-white/90 mb-3">
                Font Stack (Per Font) — Individual Stacks
              </h4>
              <ol className="space-y-1 text-white/70 list-decimal list-inside mb-4">
                <li>
                  Select 1+ <strong>UniTextFont</strong> assets in the Project window
                </li>
                <li>
                  Right-click &rarr;{' '}
                  <strong>Create &rarr; UniText &rarr; Font Stack (Per Font)</strong>
                </li>
                <li>
                  Creates <strong>one separate</strong> <code>UniTextFontStack</code> for each
                  selected font
                </li>
              </ol>

              <p className="text-white/70 mb-6">
                <strong>Use case:</strong> When different components use different fonts. Swap font
                stacks per component.
              </p>

              {/* Variable Fonts */}
              <h4 className="font-semibold text-white/90 mb-3">Variable Fonts</h4>
              <p className="text-white/70 mb-4">
                Variable fonts are strongly recommended over static font files. A single variable
                font file replaces dozens of static weights/widths:
              </p>

              <VariableFontDiagram />

              <p className="text-white/70 mb-6">
                Variable font axes are controlled via modifiers. <code>&lt;b&gt;</code> and{' '}
                <code>&lt;i&gt;</code> automatically set the appropriate axes when the font supports
                them. For direct control, use the VariationModifier with <code>&lt;var&gt;</code>{' '}
                tags.
              </p>

              {/* Three-Tier Face Resolution */}
              <h4 className="font-semibold text-white/90 mb-3">Three-Tier Face Resolution</h4>
              <p className="text-white/70 mb-3">
                When a modifier requests bold or italic, the system resolves in order:
              </p>
              <ol className="space-y-1 text-white/70 list-decimal list-inside mb-6">
                <li>
                  <strong>Variable font axes</strong> — if the font has <code>wght</code>/
                  <code>ital</code>/<code>slnt</code> axes, set them directly
                </li>
                <li>
                  <strong>Static font faces</strong> — find the closest matching face by
                  weight/italic in the family
                </li>
                <li>
                  <strong>Synthesis</strong> — apply fake bold (SDF dilate) or fake italic (shear
                  transform)
                </li>
              </ol>

              {/* Fallback Stack Chaining */}
              <h4 className="font-semibold text-white/90 mb-3">Fallback Stack Chaining</h4>
              <p className="text-white/70 mb-4">
                <code>UniTextFontStack</code> has a <code>fallbackStack</code> field that references
                another
                <code>UniTextFontStack</code>. The system searches primary fonts in each family
                first, then walks the <code>fallbackStack</code> chain. Circular references are
                handled automatically.
              </p>

              <FallbackChainDiagram />

              <p className="text-white/70">
                All stacks get full language support through one shared reference. After the whole
                chain is exhausted, anything still uncovered falls back to the OS's installed fonts
                (see §2.6) — so you only need to add families for the fonts you want explicit control
                over.
              </p>
            </div>

            {/* 2.4 UniText Tools Window */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[var(--color-accent)]" />
                2.4 UniText Tools Window
              </h3>

              <p className="text-white/70 mb-6">
                Open via <strong>Tools &rarr; UniText &rarr; Tools</strong>. Three tabs:
              </p>

              {/* Tab 1: Create Font Asset */}
              <h4 className="font-semibold text-white/90 mb-3">Tab 1: Create Font Asset</h4>
              <p className="text-white/70 mb-3">
                Batch creation of UniTextFont assets from source files.
              </p>
              <p className="text-white/70 mb-2">
                <strong>Adding fonts:</strong>
              </p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <strong>Drag &amp; drop</strong> — drop <code>.ttf</code>/<code>.otf</code>/
                  <code>.ttc</code> files into the drop area
                </li>
                <li>
                  <strong>Browse Files</strong> — opens file dialog with multi-select
                </li>
                <li>
                  <strong>Project selection</strong> — selecting font files in the Project window
                  auto-adds them
                </li>
              </ul>
              <p className="text-white/70 mb-2">
                Each entry shows the font name and file size. Click{' '}
                <strong>Create N UniText Font Asset(s)</strong> to generate all assets.
              </p>
              <p className="text-white/70 mb-2">
                <strong>Additional features:</strong>
              </p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <strong>Copy All Characters</strong> — extracts every codepoint the font supports
                  and copies to clipboard. Useful for checking font coverage or as input for the
                  Font Subsetter
                </li>
              </ul>
              <p className="text-white/70 mb-6">
                <strong>Output:</strong> Project fonts (within Assets) are saved next to the source
                file. External fonts (outside Assets) prompt for output folder.
              </p>

              {/* Tab 2: Font Subsetter */}
              <h4 className="font-semibold text-white/90 mb-3">Tab 2: Font Subsetter</h4>
              <p className="text-white/70 mb-4">
                Create optimized subset fonts by keeping or removing specific character ranges.
                Reduces font file size for builds where you don't need full Unicode coverage.
              </p>

              <p className="text-white/70 mb-2">
                <strong>Keep Mode</strong> — only selected characters remain in the font:
              </p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Select script ranges (Latin, Cyrillic, Arabic, etc.) and/or type custom text
                </li>
                <li>
                  The output font contains only those characters (plus GSUB-related composed forms)
                </li>
                <li>
                  Example: Keep only "Basic Latin + Cyrillic" for a game targeting English/Russian
                </li>
              </ul>

              <p className="text-white/70 mb-2">
                <strong>Remove Mode</strong> — selected characters are removed from the font:
              </p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>Select script ranges and/or type custom text to remove</li>
                <li>
                  Intelligent composition detection: combined characters (emoji sequences,
                  ligatures) are removed as glyphs while preserving their component codepoints
                </li>
                <li>
                  Two-pass process: (1) Codepoint removal with GSUB closure (handles contextual
                  forms), (2) Composition glyph removal without closure (preserves components)
                </li>
              </ul>

              <p className="text-white/70 mb-3">
                <strong>Available script ranges</strong> (30 sets in 10 groups):
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Group</th>
                      <th className="text-left py-2 text-white/60">Ranges</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Latin</td>
                      <td className="py-2">Basic Latin, Extended Latin, Vietnamese</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">European</td>
                      <td className="py-2">Cyrillic, Greek, Armenian, Georgian</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Semitic</td>
                      <td className="py-2">Arabic, Hebrew</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">N. Indic</td>
                      <td className="py-2">Devanagari, Bengali, Gujarati, Gurmukhi</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">S. Indic</td>
                      <td className="py-2">Tamil, Telugu, Kannada, Malayalam</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">SE Asian</td>
                      <td className="py-2">Thai, Lao, Myanmar, Khmer</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">E. Asian</td>
                      <td className="py-2">Hiragana, Katakana</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Other</td>
                      <td className="py-2">Sinhala, Tibetan</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Symbols (1)</td>
                      <td className="py-2">Digits, Punctuation, Currency, Math</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Symbols (2)</td>
                      <td className="py-2">Arrows, Box Drawing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-3">
                <strong>Output:</strong> Saves a new <code>.ttf</code> file with the suffix{' '}
                <code>_subset</code>. Reports original size, subset size, and reduction percentage.
              </p>

              <p className="text-white/70 mb-3">
                <strong>Practical scenarios:</strong>
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Scenario</th>
                      <th className="text-left py-2 pr-4 text-white/60">Mode</th>
                      <th className="text-left py-2 text-white/60">Configuration</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Mobile game, English only</td>
                      <td className="py-2 pr-4">Keep</td>
                      <td className="py-2">Basic Latin + Digits + Punctuation</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">European app, no Asian scripts</td>
                      <td className="py-2 pr-4">Remove</td>
                      <td className="py-2">Devanagari, Bengali, Tamil, Thai, CJK, etc.</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Localized to Arabic + English</td>
                      <td className="py-2 pr-4">Keep</td>
                      <td className="py-2">Basic Latin + Arabic + Digits + Punctuation</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Remove unused emoji from Noto</td>
                      <td className="py-2 pr-4">Remove</td>
                      <td className="py-2">Custom text with emoji codepoints</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tab 3: Dictionary Builder */}
              <h4 className="font-semibold text-white/90 mb-3">Tab 3: Dictionary Builder</h4>
              <p className="text-white/70 mb-3">
                Builds word segmentation dictionary assets for SE Asian scripts (Thai, Lao, Khmer,
                Myanmar) that don't use spaces between words.
              </p>
              <ol className="space-y-1 text-white/70 list-decimal list-inside mb-4">
                <li>Drag-and-drop a word list text file (one word per line)</li>
                <li>Select the target script</li>
                <li>
                  Click <strong>Build</strong> to compile a <code>WordSegmentationDictionary</code>{' '}
                  asset
                </li>
              </ol>
              <p className="text-white/70">
                The compiled dictionary is configured via{' '}
                <strong>
                  Project Settings &rarr; UniText &rarr; Word Segmentation &rarr; Dictionaries
                </strong>
                . UniText ships with a Thai dictionary (26K words from ICU).
              </p>
            </div>

            {/* 2.5 Materials */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--color-accent)]" />
                2.5 Materials
              </h3>

              <p className="text-white/70 mb-4">
                Materials for the base text pass (SDF Face, SDF Base, MSDF Face, MSDF Base) and the
                emoji pass are managed automatically by <code>UniTextMaterialCache</code> — there is
                no manual material assignment on <code>UniText</code>.
              </p>

              <p className="text-white/70 mb-4">
                Outline and shadow effects render as extra quads appended to the same mesh as the
                face (not as separate <code>CanvasRenderer</code> objects). Any number of outline /
                shadow modifiers can be layered on the same text without extra sub-meshes.
              </p>

              <p className="text-white/70">
                If you want to apply a <strong>custom material / shader</strong> to a text range,
                see §6.
              </p>
            </div>

            {/* 2.6 System Fonts */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--color-accent)]" />
                2.6 System Fonts
              </h3>

              <p className="text-white/70 mb-6">
                Two independent mechanisms let UniText draw text with fonts installed on the
                player's OS — no font files bundled, no assignment required. Supported on Windows,
                macOS, Linux, iOS, and Android. <strong>WebGL has no OS font access</strong> —
                assign a regular <code>UniTextFont</code> for WebGL builds.
              </p>

              <h4 className="font-semibold text-white/90 mb-3">
                Automatic OS fallback (always on)
              </h4>
              <p className="text-white/70 mb-4">
                Any codepoint none of your assigned fonts cover is resolved from the OS's installed
                fonts through the platform's native font-matching API, then cached. It is the last
                link in the fallback chain, after every family and <code>fallbackStack</code>. A
                component with no <code>FontStack</code> at all uses the OS default sans-serif as its
                primary font, so freshly created text renders immediately.
              </p>

              <CodeBlock
                code={`SystemFont.Disabled = true;   // turn OS fallback off — uncovered codepoints render as missing-glyph boxes`}
              />

              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                UniTextSystemFont asset (explicit)
              </h4>
              <p className="text-white/70 mb-4">
                A font asset whose bytes load from the OS at runtime instead of being embedded.
                Create via{' '}
                <strong>Assets &rarr; Create &rarr; UniText &rarr; System Font Asset</strong>, then
                add it to a font stack like any other font.
              </p>
              <p className="text-white/70 mb-4">
                The inspector has a tab per platform (
                <strong>Common / Win / macOS / Linux / iOS / Android</strong>). On each platform tab
                you pick a font guaranteed to ship with that platform. The <strong>Common</strong>{' '}
                tab maps an abstract choice (System Sans-Serif / Serif / Monospace) to the right
                family per platform — Segoe UI on Windows, Helvetica Neue on macOS, Roboto on
                Android, and so on — and is used as the fallback when a platform tab is left unset.
                Face metrics and SDF/tile settings can be overridden per platform; unset fields use
                values read from the resolved font. If the requested font isn't found at runtime,
                UniText falls back to a guaranteed platform font and logs a warning.
              </p>
              <p className="text-white/70">
                Use it to match the host UI's native font, or to ship a small build that leans on OS
                fonts instead of bundling typefaces.
              </p>
            </div>

            {/* 2.7 Font Variants */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Copy className="w-5 h-5 text-[var(--color-accent)]" />
                2.7 Font Variants
              </h3>

              <p className="text-white/70">
                A <code>UniTextFontVariant</code> reuses another font's raw bytes but owns all of its
                own face metrics, render settings, and glyph overrides. Create via{' '}
                <strong>Assets &rarr; Create &rarr; UniText &rarr; Font Variant</strong> and assign
                a <strong>Source</strong> font. Use it to render one TTF/OTF two different ways —
                different scale, spacing, fake-bold weight, or line metrics — without duplicating
                the font bytes. Each variant keeps its own atlas, so a variant and its source
                coexist without overwriting each other's glyphs. Face metrics are seeded from the
                source on first assignment, then owned by the variant.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 3. Markup System                                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-[var(--color-accent)]" />
            3. Markup System
          </h2>

          <p className="text-white/70 mb-6">
            UniText features an extensible markup system based on <strong>Modifiers</strong> and{' '}
            <strong>Parse Rules</strong>.
          </p>

          <div className="space-y-6">
            {/* 3.1 Architecture: Rule + Modifier */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3">3.1 Architecture: Rule + Modifier</h3>
              <p className="text-white/70 mb-4">
                The system separates <strong>what to parse</strong> from <strong>what to do</strong>
                :
              </p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <strong>Parse Rule</strong> (<code>IParseRule</code>) — finds patterns in text and
                  produces ranges with optional parameters
                </li>
                <li>
                  <strong>Modifier</strong> (<code>BaseModifier</code>) — applies a visual or
                  structural effect to those ranges
                </li>
              </ul>

              <p className="text-white/70 mb-4">
                There is <strong>no hard coupling</strong> between tags and modifiers. Any parse
                rule can drive any modifier. The tag name, the syntax, and even the parsing strategy
                are all independent from the effect being applied. A <code>&lt;highlight&gt;</code>{' '}
                tag can trigger a <code>ColorModifier</code>. A <code>**markdown**</code> wrapper
                can trigger an <code>OutlineModifier</code>. You decide.
              </p>

              <p className="text-white/70 mb-3">
                <strong>Example:</strong> The same <code>BoldModifier</code> works with completely
                different syntaxes:
              </p>
              <RuleModifierCrossbar />

              <p className="text-white/70">
                And the same <code>TagRule</code> (tagName=&quot;b&quot;) can be paired with any
                modifier — <code>BoldModifier</code>, <code>ColorModifier</code>, or your own custom
                modifier.
              </p>
            </div>

            {/* 3.2 Built-in Modifiers */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.2 Built-in Modifiers</h3>

              <p className="text-white/70 mb-4">
                The table below shows <strong>default pairings</strong> (how presets configure
                them). These are conventions, not constraints — you can reassign any tag to any
                modifier.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Default Tag</th>
                      <th className="text-left py-2 pr-4 text-white/60">Modifier</th>
                      <th className="text-left py-2 text-white/60">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {[
                      ['<b>', 'BoldModifier', '<b>bold</b> or <b=700>weight 700</b>'],
                      ['<i>', 'ItalicModifier', '<i>italic</i>'],
                      ['<u>', 'UnderlineModifier', '<u>underline</u>'],
                      ['<s>', 'StrikethroughModifier', '<s>strike</s>'],
                      ['<color>', 'ColorModifier', '<color=#FF0000>red</color>'],
                      ['<size>', 'SizeModifier', '<size=24>large</size>'],
                      ['<gradient>', 'GradientModifier', '<gradient=rainbow>text</gradient>'],
                      ['<cspace>', 'LetterSpacingModifier', '<cspace=5>wider</cspace>'],
                      [
                        '<line-height>',
                        'LineHeightModifier',
                        '<line-height=1.5>text</line-height>',
                      ],
                      [
                        '<line-spacing>',
                        'LineHeightModifier',
                        '<line-spacing=10>text</line-spacing>',
                      ],
                      ['<upper>', 'UppercaseModifier', '<upper>text</upper>'],
                      ['<ellipsis>', 'EllipsisModifier', '<ellipsis=1>long text</ellipsis>'],
                      ['<li>', 'ListModifier', '<li>bullet item</li>'],
                      ['<link>', 'LinkModifier', '<link=url>click</link>'],
                      ['<obj>', 'ObjModifier', '<obj=icon/>'],
                      [
                        '<outline>',
                        'OutlineModifier',
                        '<outline=#FF0000>text</outline> or <outline=#FF0000,0.3> (color, dilate)',
                      ],
                      [
                        '<shadow>',
                        'ShadowModifier',
                        '<shadow=#00000080>text</shadow> or <shadow=0.1,#000,2,2,0.5>',
                      ],
                      ['<var>', 'VariationModifier', '<var=700>weight</var> (direct axis control)'],
                      [
                        '<font>',
                        'FontModifier',
                        '<font=pixel>Score</font> — selects a family by FontFamily.name (see §5)',
                      ],
                      [
                        '<lang>',
                        'LanguageModifier',
                        '<lang=zh-Hans>汉字</lang> — BCP 47 tag (see §5)',
                      ],
                      [
                        '<mat>',
                        'MaterialModifier',
                        '<mat>text</mat> or <mat=#FF8800> — custom material (see §6)',
                      ],
                    ].map(([tag, modifier, example], i, arr) => (
                      <tr key={tag} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                        <td className="py-2 pr-4">
                          <code>{tag}</code>
                        </td>
                        <td className="py-2 pr-4">
                          <code>{modifier}</code>
                        </td>
                        <td className="py-2">
                          <code>{example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3.3 Custom Tags with Default Parameters */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.3 Custom Tags with Default Parameters</h3>

              <p className="text-white/70 mb-4">
                <code>TagRule</code> has a <code>defaultParameter</code> field that lets you create
                custom tags with pre-configured values. This way your text stays clean — no need to
                repeat parameter values in every tag.
              </p>

              <p className="text-white/70 mb-3">
                <strong>Example:</strong> Create a <code>&lt;warning&gt;</code> tag that always
                applies red color:
              </p>
              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>Style:</div>
                <div className="ml-4">
                  Rule: TagRule (tagName = &quot;warning&quot;, defaultParameter =
                  &quot;#FF0000&quot;)
                </div>
                <div className="ml-4">Modifier: ColorModifier</div>
              </div>

              <p className="text-white/70 mb-2">Now in text:</p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-6">
                <li>
                  <code>&lt;warning&gt;error occurred&lt;/warning&gt;</code> — uses default red
                  (#FF0000)
                </li>
                <li>
                  <code>&lt;warning=#FFA500&gt;caution&lt;/warning&gt;</code> — overrides with
                  orange
                </li>
              </ul>

              <p className="text-white/70 mb-3">
                <strong>Multi-parameter defaults:</strong> For modifiers with multiple parameters
                (like <code>OutlineModifier</code>: dilate, color), defaults fill in missing values:
              </p>
              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>Style:</div>
                <div className="ml-4">
                  Rule: TagRule (tagName = &quot;glow&quot;, defaultParameter =
                  &quot;0.3,#00FF00&quot;)
                </div>
                <div className="ml-4">Modifier: OutlineModifier</div>
              </div>

              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>&lt;glow&gt;text&lt;/glow&gt;</code> — dilate 0.3, green outline
                </li>
                <li>
                  <code>&lt;glow=0.5&gt;text&lt;/glow&gt;</code> — dilate 0.5, green outline (color
                  from default)
                </li>
              </ul>

              <p className="text-white/70 mb-2">
                This works because <code>TagRule</code> merges text parameters with defaults: values
                from the tag take priority, remaining parameters come from{' '}
                <code>defaultParameter</code>.
              </p>
              <p className="text-white/70">
                <code>MarkdownWrapRule</code> also supports <code>defaultParameter</code> the same
                way.
              </p>
            </div>

            {/* 3.4 Parse Rule Types */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.4 Parse Rule Types</h3>

              {/* Tag-Based Rules */}
              <h4 className="font-semibold text-white/90 mb-3">Tag-Based Rules</h4>
              <p className="text-white/70 mb-6">
                All tag-based rules use the universal <strong>TagRule</strong> class with a
                configurable tag name. Parameters are always optional. Self-closing is syntax-driven
                (<code>&lt;tag/&gt;</code> or <code>&lt;tag=value/&gt;</code>).
              </p>

              {/* Markdown-Style Rules */}
              <h4 className="font-semibold text-white/90 mb-3">Markdown-Style Rules</h4>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Parse Rule</th>
                      <th className="text-left py-2 pr-4 text-white/60">Syntax</th>
                      <th className="text-left py-2 text-white/60">Typical Modifier</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code> (<code>**</code>)
                      </td>
                      <td className="py-2 pr-4">
                        <code>**bold**</code>
                      </td>
                      <td className="py-2">
                        <code>BoldModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code> (<code>*</code>)
                      </td>
                      <td className="py-2 pr-4">
                        <code>*italic*</code>
                      </td>
                      <td className="py-2">
                        <code>ItalicModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule</code> (<code>~~</code>)
                      </td>
                      <td className="py-2 pr-4">
                        <code>~~strike~~</code>
                      </td>
                      <td className="py-2">
                        <code>StrikethroughModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownLinkParseRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>[text](url)</code>
                      </td>
                      <td className="py-2">
                        <code>LinkModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownListParseRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>- item</code>, <code>* item</code>, <code>1. item</code>
                      </td>
                      <td className="py-2">
                        <code>ListModifier</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>RawUrlParseRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        Auto-detects <code>https://...</code> URLs
                      </td>
                      <td className="py-2">
                        <code>LinkModifier</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Utility Rules */}
              <h4 className="font-semibold text-white/90 mb-3">Utility Rules</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Parse Rule</th>
                      <th className="text-left py-2 text-white/60">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>RangeRule</code>
                      </td>
                      <td className="py-2">
                        Apply modifier to specific character ranges without any markup in text
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>StringParseRule</code>
                      </td>
                      <td className="py-2">Match and optionally replace literal string patterns</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>CompositeParseRule</code>
                      </td>
                      <td className="py-2">
                        Groups multiple rules under one modifier — each position in text is checked
                        against child rules in order until one matches
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Protection Rules (standalone) */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Protection Rules (standalone)
              </h4>
              <p className="text-white/70 mb-3">
                Protection rules shield their content from being consumed by any other parse rule.
                They are <strong>standalone</strong> — they implement{' '}
                <code>IParseRule.IsStandalone = true</code> and register without a paired modifier
                (the rule acts on its own). The text is passed through unaltered except that the
                delimiters themselves are stripped.
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Parse Rule</th>
                      <th className="text-left py-2 pr-4 text-white/60">Syntax</th>
                      <th className="text-left py-2 text-white/60">Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>NoparseTagRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>&lt;noparse&gt;...&lt;/noparse&gt;</code>
                      </td>
                      <td className="py-2">
                        Everything inside is treated as literal text. Missing closer = rest of
                        string protected
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>CodeSpanRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>`x`</code>, <code>``x``</code>, <code>```x```</code>
                      </td>
                      <td className="py-2">Balanced backtick runs per CommonMark §6.1</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>BackslashEscapeRule</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>\*</code>, <code>\[</code>, <code>\#</code>, …
                      </td>
                      <td className="py-2">
                        Escapes a single ASCII punctuation character after <code>\</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-3">
                Register standalone rules with <code>AddRule</code>:
              </p>
              <CodeBlock
                code={`uniText.AddRule(new NoparseTagRule());
uniText.AddRule(new BackslashEscapeRule());

// Remove later if needed:
uniText.RemoveRule(myRule);`}
              />

              <p className="text-white/70 text-sm mt-3">
                <code>AddRule</code> enforces <code>IParseRule.IsStandalone == true</code> —
                passing a non-standalone rule logs an error and does nothing (use{' '}
                <code>AddStyle</code> with a modifier for those). Your own rules can opt into
                standalone behavior by overriding <code>IsStandalone =&gt; true</code>.
              </p>
            </div>

            {/* 3.5 Parameter Formats Reference */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.5 Parameter Formats Reference</h3>

              <p className="text-white/70 mb-6 text-sm">
                The tag names below (<code>&lt;color&gt;</code>, <code>&lt;font&gt;</code>,{' '}
                <code>&lt;mat&gt;</code>, …) are the conventional names used by the built-in
                presets — they are not hard-coded into the modifiers. Any modifier can be
                registered under any name via{' '}
                <code>Style.Tag(new XxxModifier(), "yourName")</code>, or driven by{' '}
                <code>MarkdownWrapRule</code> / <code>RangeRule</code> /{' '}
                <code>StringParseRule</code> / a custom rule with no tag at all (see §3.1). The{' '}
                <strong>parameter</strong> syntax shown for each modifier is what the modifier
                itself parses, regardless of how the range was matched.
              </p>

              <h4 className="font-semibold text-white/90 mb-2">
                Color (<code>ColorModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Hex: <code>#RGB</code>, <code>#RRGGBB</code>, <code>#RRGGBBAA</code>
                </li>
                <li>
                  Named (20 colors): white, black, red, green, blue, yellow, cyan, magenta, orange,
                  purple, gray, lime, brown, pink, navy, teal, olive, maroon, silver, gold
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Size (<code>SizeModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Absolute: <code>&lt;size=24&gt;</code> — 24 pixels
                </li>
                <li>
                  Percentage: <code>&lt;size=150%&gt;</code> — 150% of base size
                </li>
                <li>
                  Relative: <code>&lt;size=+10&gt;</code> / <code>&lt;size=-5&gt;</code> — offset
                  from base
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Gradient (<code>GradientModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-2">
                <li>
                  Format: <code>&lt;gradient=name[,shape][,angle]&gt;</code>
                </li>
                <li>
                  Shapes: <code>linear</code> (default), <code>radial</code>, <code>angular</code>
                </li>
                <li>
                  Angle: 0–360 degrees (0=right, 90=up). Used by <code>linear</code> and{' '}
                  <code>angular</code>
                </li>
              </ul>
              <p className="text-white/70 mb-1 text-sm">Examples:</p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4 ml-4">
                <li>
                  <code>&lt;gradient=rainbow&gt;</code> — linear, horizontal
                </li>
                <li>
                  <code>&lt;gradient=rainbow,radial&gt;</code> — radial from center
                </li>
                <li>
                  <code>&lt;gradient=rainbow,angular,90&gt;</code> — conic sweep, rotated 90°
                </li>
                <li>
                  <code>&lt;gradient=rainbow,linear,45&gt;</code> — linear, rotated 45°
                </li>
              </ul>
              <p className="text-white/70 mb-4 text-sm">
                Gradients are defined in the <code>UniTextGradients</code> asset (Project Settings
                &rarr; UniText &rarr; Gradients).
              </p>

              <h4 className="font-semibold text-white/90 mb-2">
                Letter Spacing (<code>LetterSpacingModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Format: <code>spacing[,monospace]</code>
                </li>
                <li>
                  Pixels: <code>&lt;cspace=5&gt;</code> — 5px extra spacing
                </li>
                <li>
                  Em units: <code>&lt;cspace=0.1em&gt;</code> — 0.1 em extra spacing
                </li>
                <li>
                  Monospace: <code>&lt;cspace=0.5em,true&gt;</code> — equal advance width for all
                  glyphs
                </li>
                <li>
                  For cursive scripts (Arabic, Syriac, etc.), positive spacing renders visual
                  tatweel (kashida) to preserve connections
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Outline (<code>OutlineModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>&lt;outline&gt;</code> — default (dilate=0.2, black)
                </li>
                <li>
                  <code>&lt;outline=#FF0000&gt;</code> — custom color
                </li>
                <li>
                  <code>&lt;outline=,0.3&gt;</code> — custom dilate (empty leading slot keeps color
                  at default)
                </li>
                <li>
                  <code>&lt;outline=#FF0000,0.3&gt;</code> — both (color, dilate)
                </li>
                <li>
                  <code>&lt;outline=rainbow&gt;</code> — gradient outline (requires an{' '}
                  <code>IGradientProvider</code> on the modifier)
                </li>
                <li>
                  <code>&lt;outline=rainbow,0.3,radial,45&gt;</code> — gradient + dilate + shape +
                  angle
                </li>
                <li>
                  <code>&lt;outline=rainbow,,radial,45&gt;</code> — gradient, default dilate, custom
                  shape + angle
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Shadow (<code>ShadowModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>&lt;shadow&gt;</code> — default (black 50% alpha)
                </li>
                <li>
                  <code>&lt;shadow=#00000080&gt;</code> — custom color
                </li>
                <li>
                  <code>&lt;shadow=0.1,#000,2,2,0.5&gt;</code> — dilate, color, offsetX, offsetY,
                  softness
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Variable Font Axes (<code>VariationModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>Positional axis values in order: wght, wdth, ital, slnt, opsz</li>
                <li>
                  Use <code>~</code> to skip an axis
                </li>
                <li>
                  Absolute: <code>&lt;var=700&gt;</code> — weight 700
                </li>
                <li>
                  Percentage: <code>&lt;var=150%&gt;</code> — 150% of default weight
                </li>
                <li>
                  Delta: <code>&lt;var=+200&gt;</code> — +200 from default weight
                </li>
                <li>
                  Multiple axes: <code>&lt;var=700,80&gt;</code> — weight 700, width 80
                </li>
                <li>
                  Skip axes: <code>&lt;var=~,~,~,-12&gt;</code> — only set slant to -12
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Ellipsis (<code>EllipsisModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>&lt;ellipsis=1&gt;</code> — truncate end (default): <code>Hello Wo...</code>
                </li>
                <li>
                  <code>&lt;ellipsis=0&gt;</code> — truncate start: <code>...o World</code>
                </li>
                <li>
                  <code>&lt;ellipsis=0.5&gt;</code> — truncate middle: <code>Hel...rld</code>
                </li>
                <li>Any float 0–1 for fine-grained control</li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Font (<code>FontModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Parameter is a <code>FontFamily.name</code> from the component's font stack
                </li>
                <li>
                  <code>&lt;font=pixel&gt;Score&lt;/font&gt;</code> — render "Score" in the family
                  named <code>pixel</code>
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Language (<code>LanguageModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>Parameter is a BCP 47 tag</li>
                <li>
                  <code>&lt;lang=zh-Hans&gt;汉字&lt;/lang&gt;</code>,{' '}
                  <code>&lt;lang=ja&gt;...&lt;/lang&gt;</code>,{' '}
                  <code>&lt;lang=ko&gt;...&lt;/lang&gt;</code>,{' '}
                  <code>&lt;lang=en-US&gt;...&lt;/lang&gt;</code>
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">
                Material (<code>MaterialModifier</code>)
              </h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside">
                <li>Parameter is an optional tint color (same syntax as Color)</li>
                <li>
                  <code>&lt;mat&gt;text&lt;/mat&gt;</code> — use the material's tint as-is
                </li>
                <li>
                  <code>&lt;mat=#FF8800&gt;text&lt;/mat&gt;</code> — multiply the vertex color by
                  orange
                </li>
              </ul>
            </div>

            {/* 3.6 Adding Styles to a Component */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.6 Adding Styles to a Component</h3>

              <h4 className="font-semibold text-white/90 mb-3">In the Inspector</h4>
              <ol className="space-y-1 text-white/70 list-decimal list-inside mb-4">
                <li>
                  Expand <strong>Styles</strong> list on the UniText component
                </li>
                <li>
                  Click <strong>+</strong> — a searchable selector opens with predefined presets
                  (Bold, Italic, Color, Font, Language, Material, Markdown variants, Protection
                  rules, and more)
                </li>
                <li>Select a preset — both the Rule and Modifier are configured automatically</li>
              </ol>
              <p className="text-white/70 mb-6 text-sm">
                Each entry is a Rule+Modifier pair. Tags from the Rule are parsed in text, and the
                Modifier applies the effect to matched ranges. You can also configure Rule and
                Modifier manually for custom combinations.
              </p>

              <h4 className="font-semibold text-white/90 mb-3">Via Code — Fluent Builders</h4>
              <p className="text-white/70 mb-3">
                <code>Style</code> exposes three static builders that cover the common cases:
              </p>
              <CodeBlock
                code={`// Whole-text application (equivalent to RangeRule with ".."):
uniText.AddStyle(Style.WholeText(new ColorModifier(), "#FF6600"));

// Fixed codepoint range:
uniText.AddStyle(Style.Range(new ColorModifier(), start: 0, end: 5, parameter: "#FF0000"));

// Tag-based:
uniText.AddStyle(Style.Tag(new ColorModifier(), "color"));
uniText.AddStyle(Style.Tag(new ColorModifier(), "warning", defaultParameter: "#FF0000"));`}
              />

              <p className="text-white/70 mt-4 mb-3">
                For custom combinations (<code>StringParseRule</code>, <code>CompositeParseRule</code>
                , custom rules) use the explicit form:
              </p>
              <CodeBlock
                code={`uniText.AddStyle(new Style
{
    Rule = new TagRule { tagName = "color" },
    Modifier = new ColorModifier()
});`}
              />

              <p className="text-white/70 mt-4 mb-2">Remove at runtime:</p>
              <CodeBlock
                code={`bool removed = uniText.RemoveStyle(style);
uniText.ClearStyles();`}
              />

              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Querying and Mutating Styles at Runtime
              </h4>
              <CodeBlock
                code={`// Check presence
bool hasBold = uniText.HasModifier<BoldModifier>();

// Find the first style backed by a given modifier type
if (uniText.TryGetStyle<ColorModifier>(out var colorStyle)) { ... }

// Enumerate every matching style (local + preset copies)
foreach (var s in uniText.GetStylesOfType<LinkModifier>()) { ... }

// Whole-text convenience — add/update/toggle/clear a style that covers the full text
uniText.SetWholeText<BoldModifier>();                      // bold everything
uniText.SetWholeText<ColorModifier>("#FF0000");            // red everything
bool isBold = uniText.ToggleWholeText<BoldModifier>();     // invert
string currentColor = uniText.GetWholeTextParameter<ColorModifier>();
uniText.ClearWholeText<ColorModifier>();`}
              />

              <p className="text-white/70 text-sm mt-3">
                <code>SetWholeText</code> / <code>ClearWholeText</code> / <code>ToggleWholeText</code>{' '}
                operate on the component's <strong>local</strong> Styles list only — they never
                mutate Style Presets (those are shared assets).
              </p>
            </div>

            {/* 3.7 Style Preset */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.7 Style Preset — Shared Configuration</h3>

              <p className="text-white/70 mb-3">
                <strong>Problem:</strong> You have 50 UniText components that all need the same set
                of modifiers (bold, italic, color, links). Setting up each one manually is tedious
                and error-prone.
              </p>
              <p className="text-white/70 mb-4">
                <strong>Solution:</strong> Style Preset is a ScriptableObject that stores a reusable
                list of Rule+Modifier pairs.
              </p>

              <h4 className="font-semibold text-white/90 mb-3">Setup</h4>
              <ol className="space-y-1 text-white/70 list-decimal list-inside mb-4">
                <li>
                  <strong>Assets &rarr; Create &rarr; UniText &rarr; Style Preset</strong>
                </li>
                <li>Add your modifier pairs:</li>
              </ol>

              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>MyModConfig.asset</div>
                <div className="ml-4">
                  ├── [0] <code>BoldModifier</code> + <code>TagRule</code> (b)
                </div>
                <div className="ml-4">
                  ├── [1] <code>ItalicModifier</code> + <code>TagRule</code> (i)
                </div>
                <div className="ml-4">
                  ├── [2] <code>ColorModifier</code> + <code>TagRule</code> (color)
                </div>
                <div className="ml-4">
                  ├── [3] <code>LinkModifier</code> + <code>TagRule</code> (link)
                </div>
                <div className="ml-4">
                  └── [4] <code>UnderlineModifier</code> + <code>TagRule</code> (u)
                </div>
              </div>

              <ol start={3} className="space-y-1 text-white/70 list-decimal list-inside mb-6">
                <li>
                  On each UniText component, add this config to the <strong>Style Presets</strong>{' '}
                  list
                </li>
              </ol>

              <h4 className="font-semibold text-white/90 mb-3">Benefits</h4>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-6">
                <li>
                  <strong>Single source of truth</strong> — change the config, all components update
                </li>
                <li>
                  <strong>No duplication</strong> — define modifiers once, reference everywhere
                </li>
                <li>
                  <strong>Combinable</strong> — a component can have multiple configs plus its own
                  local Styles. They all work together
                </li>
                <li>
                  <strong>Version control friendly</strong> — one asset to track rather than
                  per-component settings
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-3">Local vs Config</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Feature</th>
                      <th className="text-left py-2 pr-4 text-white/60">Local Styles</th>
                      <th className="text-left py-2 text-white/60">Style Presets</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Scope</td>
                      <td className="py-2 pr-4">Per-component</td>
                      <td className="py-2">Shared across components</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Edit location</td>
                      <td className="py-2 pr-4">UniText Inspector</td>
                      <td className="py-2">Preset asset Inspector</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Use case</td>
                      <td className="py-2 pr-4">Component-specific markup</td>
                      <td className="py-2">Project-wide standard markup</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/70 text-sm mt-3">
                A component's effective set of modifiers = its local Styles + all Style Presets.
              </p>

              <h4 className="font-semibold text-white/90 mt-6 mb-3">Runtime API</h4>
              <CodeBlock
                code={`uniText.AddStylePreset(myPreset);
bool removed = uniText.RemoveStylePreset(myPreset);
uniText.ClearStylePresets();`}
              />
              <p className="text-white/70 text-sm mt-3">
                Useful for toggling a markup configuration at runtime (e.g., apply a "chat
                formatting" preset while the chat panel is open, remove it when it closes) without
                building individual styles.
              </p>
            </div>

            {/* 3.8 RangeRule */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                3.8 <code>RangeRule</code> — Applying Modifiers Without Markup
              </h3>

              <p className="text-white/70 mb-4">
                <code>RangeRule</code> lets you apply a modifier to specific text ranges{' '}
                <strong>programmatically</strong>, without any tags in the text itself.
              </p>

              <h4 className="font-semibold text-white/90 mb-3">Apply to All Text</h4>
              <p className="text-white/70 mb-3">
                To apply a modifier to the entire text (e.g., make everything a specific color), use
                the range <code>".."</code>:
              </p>
              <CodeBlock
                code={`// Shortest form — Style.WholeText:
uniText.AddStyle(Style.WholeText(new ColorModifier(), "#FF0000"));

// Explicit form:
var rangeRule = new RangeRule();
rangeRule.data.Add(new RangeRule.Data
{
    range = "..",          // ".." means the full text range
    parameter = "#FF0000"
});
uniText.AddStyle(new Style { Rule = rangeRule, Modifier = new ColorModifier() });`}
              />

              <h4 className="font-semibold text-white/90 mt-6 mb-3">Range Syntax</h4>
              <p className="text-white/70 mb-3">
                <code>RangeRule</code> uses C#-style range notation:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Range</th>
                      <th className="text-left py-2 text-white/60">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>".."</code>
                      </td>
                      <td className="py-2">Entire text (start to end)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>"0..10"</code>
                      </td>
                      <td className="py-2">Codepoints 0 through 9</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>"5.."</code>
                      </td>
                      <td className="py-2">From codepoint 5 to end</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>"..5"</code>
                      </td>
                      <td className="py-2">From start to codepoint 4</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>"2..^3"</code>
                      </td>
                      <td className="py-2">From codepoint 2 to 3 from end</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>"^5.."</code>
                      </td>
                      <td className="py-2">Last 5 codepoints</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-6 text-sm">
                <code>RangeEx.WholeText</code> is the canonical <code>".."</code> constant, and{' '}
                <code>RangeEx.IsWholeText(expr)</code> accepts any equivalent form (<code>".."</code>
                , <code>"..^0"</code>, <code>"0.."</code>).
              </p>

              <h4 className="font-semibold text-white/90 mb-3">Multiple Ranges</h4>
              <CodeBlock
                code={`var rangeRule = new RangeRule();
rangeRule.data.Add(new RangeRule.Data { range = "0..5", parameter = "#FF0000" });
rangeRule.data.Add(new RangeRule.Data { range = "10..20", parameter = "#00FF00" });

uniText.AddStyle(new Style { Rule = rangeRule, Modifier = new ColorModifier() });
// Codepoints 0-4 are red, 10-19 are green`}
              />

              <h4 className="font-semibold text-white/90 mt-6 mb-3">Practical Scenarios</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Scenario</th>
                      <th className="text-left py-2 pr-4 text-white/60">Range</th>
                      <th className="text-left py-2 text-white/60">Modifier</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Bold the entire text</td>
                      <td className="py-2 pr-4">
                        <code>".."</code>
                      </td>
                      <td className="py-2">
                        <code>BoldModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Highlight first word (5 chars)</td>
                      <td className="py-2 pr-4">
                        <code>"0..5"</code>
                      </td>
                      <td className="py-2">
                        <code>ColorModifier</code> with color parameter
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Underline last 10 chars</td>
                      <td className="py-2 pr-4">
                        <code>"^10.."</code>
                      </td>
                      <td className="py-2">
                        <code>UnderlineModifier</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Apply size to specific range</td>
                      <td className="py-2 pr-4">
                        <code>"3..8"</code>
                      </td>
                      <td className="py-2">
                        <code>SizeModifier</code> with size parameter
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3.9 StringParseRule */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                3.9 <code>StringParseRule</code> — Literal Pattern Matching
              </h3>
              <p className="text-white/70 mb-4">
                <code>StringParseRule</code> matches literal string patterns in text (no XML/HTML
                syntax):
              </p>
              <CodeBlock
                code={`var emojiRule = new StringParseRule();
emojiRule.patterns = new[] { ":)", ":(", ":D" };
emojiRule.hasReplacement = true;
emojiRule.replacement = "\u{1F60A}";

uniText.AddStyle(new Style
{
    Rule = emojiRule,
    Modifier = new EmptyModifier()  // no visual effect, just replacement
});
// ":)" in text gets replaced with "\u{1F60A}"`}
              />
            </div>

            {/* 3.10 CompositeParseRule */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                3.10 <code>CompositeParseRule</code> — Combining Rules
              </h3>
              <p className="text-white/70 mb-4">
                <code>CompositeParseRule</code> groups multiple rules into one. It tries child rules
                in order and returns the first match:
              </p>
              <CodeBlock
                code={`var composite = new CompositeParseRule();
composite.rules.Add(new TagRule { tagName = "link" }); // <link=url>text</link>
composite.rules.Add(new MarkdownLinkParseRule()); // [text](url)
composite.rules.Add(new RawUrlParseRule());       // auto-detect https://...

uniText.AddStyle(new Style
{
    Rule = composite,
    Modifier = new LinkModifier()
});
// All three link syntaxes work with a single modifier`}
              />
            </div>

            {/* 3.11 Priority System */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.11 Priority System</h3>
              <p className="text-white/70 mb-4">
                Parse rules have a <code>Priority</code> property that controls matching order
                (higher = matched first):
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Priority</th>
                      <th className="text-left py-2 pr-4 text-white/60">Use Case</th>
                      <th className="text-left py-2 text-white/60">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Positive (e.g., 10)</td>
                      <td className="py-2 pr-4">
                        Explicit markup should match before anything else
                      </td>
                      <td className="py-2">Custom rules</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">0 (default)</td>
                      <td className="py-2 pr-4">Standard tag-based and markdown rules</td>
                      <td className="py-2">
                        <code>TagRule</code>, <code>MarkdownWrapRule</code>,{' '}
                        <code>MarkdownLinkParseRule</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Negative (e.g., -100)</td>
                      <td className="py-2 pr-4">
                        Auto-detection, should only match if nothing else did
                      </td>
                      <td className="py-2">
                        <code>RawUrlParseRule</code> (-100)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/70 text-sm">
                This prevents conflicts:{' '}
                <code>&lt;link=url&gt;https://example.com&lt;/link&gt;</code> won't be
                double-matched by both <code>TagRule</code> and <code>RawUrlParseRule</code>.
              </p>
            </div>

            {/* 3.12 Creating Custom Parse Rules */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">3.12 Creating Custom Parse Rules</h3>
              <AdvancedBadge />
              <p className="text-white/70 mb-4">
                Implement <code>IParseRule</code> to create your own markup syntax:
              </p>
              <CodeBlock
                code={`public interface IParseRule
{
    int Priority => 0;
    bool IsStandalone => false;   // true = register without a modifier (protection rules)
    int TryMatch(ReadOnlySpan<char> text, int index, PooledList<ParsedRange> results);
    void Finalize(ReadOnlySpan<char> text, PooledList<ParsedRange> results) { }
    void Reset() { }
}`}
              />

              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Simplest Approach — Use <code>TagRule</code>
              </h4>
              <p className="text-white/70 mb-3">
                If your syntax follows the <code>&lt;tag&gt;content&lt;/tag&gt;</code> pattern, use
                the built-in <code>TagRule</code> with a custom tag name — no subclassing needed:
              </p>
              <CodeBlock
                code={`// In Inspector: add a TagRule, set tagName = "highlight"
// Now <highlight=yellow>text</highlight> works automatically`}
              />
              <p className="text-white/70 text-sm mt-3">
                Parameters are always optional. Self-closing is purely syntax-driven (
                <code>&lt;tag/&gt;</code> or <code>&lt;tag=value/&gt;</code>).
              </p>
            </div>

            {/* 3.13 Creating Custom Modifiers */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">3.13 Creating Custom Modifiers</h3>
              <AdvancedBadge />
              <p className="text-white/70 mb-6">
                UniText has several modifier base classes for different use cases:
              </p>

              {/* Pattern 1 */}
              <h4 className="font-semibold text-white/90 mb-3">
                Pattern 1: Text Transformation (<code>BaseModifier</code>)
              </h4>
              <p className="text-white/70 mb-3">
                For modifiers that transform codepoints before rendering (like uppercase):
              </p>
              <CodeBlock
                code={`[Serializable]
public class LowercaseModifier : BaseModifier
{
    protected override void OnEnable() { }
    protected override void OnDisable() { }
    protected override void OnDestroy() { }

    protected override void OnApply(int start, int end, string parameter)
    {
        var codepoints = buffers.codepoints.data;
        var count = buffers.codepoints.count;
        var clampedEnd = Math.Min(end, count);

        for (var i = start; i < clampedEnd; i++)
            codepoints[i] = char.ToLowerInvariant((char)codepoints[i]);
    }
}`}
              />

              {/* Pattern 2 */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Pattern 2: Per-Glyph Visual Effect (<code>GlyphModifier&lt;T&gt;</code>)
              </h4>
              <p className="text-white/70 mb-3">
                For modifiers that change glyph appearance during mesh generation (color, underline,
                etc.):
              </p>
              <CodeBlock
                code={`[Serializable]
public class HighlightModifier : GlyphModifier<byte>
{
    [SerializeField] private Color highlightColor = Color.yellow;

    protected override string AttributeKey => "highlight";

    protected override Action GetOnGlyphCallback() => OnGlyph;

    protected override void DoApply(int start, int end, string parameter)
    {
        var buffer = attribute.buffer.data;
        buffer.SetFlagRange(start, Math.Min(end, buffers.codepoints.count));
    }

    private void OnGlyph()
    {
        var gen = uniText.MeshGenerator;
        if (!attribute.buffer.data.HasFlag(gen.currentCluster))
            return;

        var colors = gen.Colors;
        var baseIdx = gen.faceBaseIdx;   // stable index of the face quad for this glyph
        colors[baseIdx] = colors[baseIdx + 1] =
        colors[baseIdx + 2] = colors[baseIdx + 3] = highlightColor;
    }
}`}
              />

              <Notice type="warning" className="mt-4">
                Use <code>gen.faceBaseIdx</code> to address the current glyph's face quad. Never
                use <code>gen.vertexCount - 4</code> — other modifiers can append geometry before
                your <code>onGlyph</code> runs and shift the last-four assumption.
              </Notice>

              {/* Pattern 3 — EffectModifier */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Pattern 3: Effect Quads (<code>EffectModifier</code>)
              </h4>
              <p className="text-white/70 mb-3">
                For effects like outline, shadow, glow — duplicate geometry rendered behind/ahead of
                the face, painted per effect:
              </p>
              <CodeBlock
                code={`[Serializable]
public class MyGlowModifier : EffectModifier
{
    [SerializeField] private Color glowColor = Color.cyan;
    [SerializeField] private float dilate = 0.3f;

    protected override void OnGlyphEffect()
    {
        var gen = uniText.MeshGenerator;
        if (gen.font.IsColor) return;                // skip emoji

        var baseIdx = gen.faceBaseIdx;
        var packed = EffectPacking.PackColor(glowColor);
        EnqueueEffectQuad(
            baseIdx,
            new Vector4(dilate, packed.x, packed.y, 0f),
            expandDelta: 0f);
    }
}`}
              />

              <p className="text-white/70 text-sm mt-3">
                <code>EnqueueEffectQuad</code> records a request for an extra quad that renders
                behind the face in registration order. All outline-modifier quads render before all
                shadow-modifier quads, which render before the face — painter order is grouped per
                modifier, not per glyph.
              </p>

              {/* Pattern 4 — SubMeshModifier */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Pattern 4: Sub-mesh With Its Own Material (<code>SubMeshModifier</code>)
              </h4>
              <p className="text-white/70 mb-3">
                For effects that need a separate <code>Material</code> / shader (like{' '}
                <code>MaterialModifier</code>). Inherit <code>SubMeshModifier</code> and override{' '}
                <code>ShouldIncludeCurrentGlyph</code>, <code>GetMaterialForSlot</code>,{' '}
                <code>GetRenderOrder</code>, <code>GetSortIndex</code> — see{' '}
                <code>MaterialModifier.cs</code> for a full reference.
              </p>

              {/* Pattern 5 — InteractiveModifier */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Pattern 5: Interactive Region (<code>InteractiveModifier</code>)
              </h4>
              <p className="text-white/70 mb-3">For clickable/hoverable text regions:</p>
              <CodeBlock
                code={`[Serializable]
public class HashtagModifier : InteractiveModifier
{
    public override string RangeType => "hashtag";
    public override int Priority => 50;

    public event Action<string> HashtagClicked;

    protected override void OnApply(int start, int end, string parameter)
    {
        AddRange(start, end, parameter); // Register clickable region
    }

    protected override void HandleRangeClicked(InteractiveRange range, TextHitResult hit)
    {
        HashtagClicked?.Invoke(range.data);
    }

    protected override void HandleRangeEntered(InteractiveRange range, TextHitResult hit) { }
    protected override void HandleRangeExited(InteractiveRange range) { }
}`}
              />

              {/* Modifier Lifecycle */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">Modifier Lifecycle</h4>
              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-6">
                <div>
                  SetOwner(uniText) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  attached to component
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
                <div>
                  Prepare()
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  lazy init on first Apply (allocate buffers)
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
                <div>
                  PrepareForParallel() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr; cache main-thread-only
                  values before worker threads
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
                <div>
                  Apply(start, end, param) &nbsp;&larr; called per matched range (calls OnApply)
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
                <div>
                  OnDisable()
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  text changed, unsubscribe from events
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
                <div>
                  OnDestroy()
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  component destroyed, release all resources
                </div>
              </div>

              {/* Best Practices */}
              <h4 className="font-semibold text-white/90 mb-3">
                Best Practices for Custom Modifiers
              </h4>
              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <strong>
                    No <code>new T[]</code> at runtime
                  </strong>{' '}
                  — use <code>UniTextArrayPool&lt;T&gt;.Rent/Return</code> or{' '}
                  <code>buffers.GetOrCreateAttributeData&lt;T&gt;()</code>
                </li>
                <li>
                  <strong>Subscribe in OnEnable, unsubscribe in OnDisable</strong> — prevents stale
                  callbacks
                </li>
                <li>
                  <strong>
                    Use <code>PrepareForParallel()</code>
                  </strong>{' '}
                  for anything that calls a Unity API (<code>Material.GetFloat()</code>, transform
                  reads, etc.)
                </li>
                <li>
                  <strong>
                    Address the face quad via <code>gen.faceBaseIdx</code>
                  </strong>
                  , not <code>gen.vertexCount - 4</code>
                </li>
                <li>
                  <strong>Skip color (emoji) glyphs in effects</strong> —{' '}
                  <code>if (gen.font.IsColor) return;</code>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 4. Interactive Text                                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MousePointerClick className="w-6 h-6 text-[var(--color-accent)]" />
            4. Interactive Text
          </h2>

          <p className="text-white/70 mb-6">
            UniText provides built-in support for clickable regions, hover detection, and visual
            feedback. Everything in this section works for both <code>UniText</code> (Canvas) and{' '}
            <code>UniTextWorld</code> (world-space) — only the raycasting setup differs (see §4.4
            for world-space).
          </p>

          <div className="space-y-6">
            {/* 4.1 Click and Hover Events */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.1 Click and Hover Events</h3>
              <CodeBlock
                code={`// Any text click
uniText.TextClicked += hit => Debug.Log($"Clicked cluster: {hit.cluster}");

// Interactive range events (links, custom ranges)
uniText.RangeClicked += hit => Debug.Log($"Clicked: {hit.range.data}");
uniText.RangeEntered += hit => Debug.Log($"Hover enter: {hit.range.data}");
uniText.RangeExited += hit => Debug.Log($"Hover exit: {hit.range.data}");

// Continuous hover tracking
uniText.HoverChanged += hit => Debug.Log($"Hover at cluster: {hit.cluster}");`}
              />
            </div>

            {/* 4.2 Hit Testing */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.2 Hit Testing</h3>
              <p className="text-white/70 mb-3">For custom interaction logic:</p>
              <CodeBlock
                code={`// Local space
TextHitResult hit = uniText.HitTest(localPosition);

// Screen space
TextHitResult hit = uniText.HitTestScreen(screenPosition, eventCamera);

// Get visual bounds for a cluster range
var bounds = new List<Rect>();
uniText.GetRangeBounds(startCluster, endCluster, bounds);`}
              />
            </div>

            {/* 4.3 Text Highlighter */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.3 Text Highlighter</h3>
              <p className="text-white/70 mb-4">
                The <code>Highlighter</code> property controls visual feedback — clicks, hover, and
                programmatic selection. It lives on <code>UniTextBase</code>, so it works
                identically on Canvas and world-space text.
              </p>
              <p className="text-white/70 mb-4">
                The built-in <code>DefaultTextHighlighter</code> provides click flash (with
                fade-out), hover tint, and selection highlight:
              </p>
              <CodeBlock
                code={`if (uniText.Highlighter is DefaultTextHighlighter highlighter)
{
    highlighter.ClickColor = new Color(1, 0, 0, 0.5f);
    highlighter.HoverColor = new Color(0, 0, 1, 0.1f);
    highlighter.SelectionColor = new Color(0.3f, 0.6f, 1f, 0.3f);
    highlighter.FadeDuration = 0.5f;

    // Programmatic selection (e.g., for searching, cursor, etc.)
    highlighter.SetSelection(startCluster: 10, endCluster: 20);
    highlighter.ClearSelection();
}

// Disable highlighting entirely
uniText.Highlighter = null;`}
              />

              <h4 className="font-semibold text-white/90 mt-6 mb-3">Custom Highlighters</h4>
              <p className="text-white/70 mb-3">
                Extend <code>TextHighlighter</code> (or <code>DefaultTextHighlighter</code> to keep
                its click/hover/selection logic). The two <code>CreateHighlightRenderer</code>{' '}
                overloads — one taking <code>UniText</code>, one taking <code>UniTextWorld</code> —
                are the type-safe extension points: override either or both to plug a custom visual
                on the chosen backend. Inside event handlers, call{' '}
                <code>CreateHighlightRenderer(name, order)</code> (no owner argument) — it
                dispatches to the correct typed overload based on the actual owner.
              </p>
              <CodeBlock
                code={`public class MyHighlighter : TextHighlighter
{
    private TextHighlightRenderer myRenderer;

    protected override TextHighlightRenderer CreateHighlightRenderer(UniText owner, string name, HighlightOrder order)
        => new MyCanvasRenderer(owner, name, order);   // your custom Canvas-side visual

    protected override TextHighlightRenderer CreateHighlightRenderer(UniTextWorld owner, string name, HighlightOrder order)
        => new MyWorldRenderer(owner, name, order);    // your custom mesh-based visual

    public override void OnRangeClicked(InteractiveRange range, List<Rect> bounds)
    {
        myRenderer ??= CreateHighlightRenderer("MyHighlight", HighlightOrder.Behind);
        myRenderer.Color = Color.yellow;
        myRenderer.SetRects(bounds);   // rects are in text-local space
    }

    public override void Destroy()
    {
        myRenderer?.Destroy();
        myRenderer = null;
        base.Destroy();
    }
}`}
              />
              <p className="text-white/70 text-sm mt-3">
                To customize only the visual on one backend while keeping the default click flash /
                hover / selection logic, subclass <code>DefaultTextHighlighter</code> and override
                only the relevant <code>CreateHighlightRenderer</code> overload(s).
              </p>
              <p className="text-white/70 text-sm mt-3">
                <code>HighlightOrder.Behind</code> renders below the text (selection, hover glow),{' '}
                <code>HighlightOrder.Above</code> renders above it (click flash, cursor).
              </p>
            </div>

            {/* 4.4 World-Space Pointer Routing */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                4.4 World-Space Pointer Routing (<code>UniTextWorldRaycaster</code>)
              </h3>
              <p className="text-white/70 mb-4">
                Canvas text receives <code>EventSystem</code> pointer events automatically through
                the Canvas's <code>GraphicRaycaster</code>. For world-space text, add a{' '}
                <code>UniTextWorldRaycaster</code> component to the camera that should pick up
                pointer events:
              </p>
              <CodeBlock
                code={`var camera = Camera.main;
camera.gameObject.AddComponent<UniTextWorldRaycaster>();`}
              />
              <p className="text-white/70 mt-4 mb-4">
                The raycaster is <strong>not added automatically</strong> — pick the camera
                explicitly. If a <code>UniTextWorld</code> with <code>RaycastTarget = true</code>{' '}
                enters a play-mode scene without any <code>UniTextWorldRaycaster</code>, a one-time
                warning is logged with the same instruction.
              </p>

              <p className="text-white/70 mb-2">Properties:</p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <strong>BlockingObjects</strong> (<code>None</code> / <code>TwoD</code> /{' '}
                  <code>ThreeD</code> / <code>All</code>) — physical geometry that should occlude
                  clicks between the camera and the text. Leave as <code>None</code> if the scene
                  already has a <code>PhysicsRaycaster</code> / <code>Physics2DRaycaster</code> on
                  the same camera (Unity's <code>EventSystem</code> distance-sorts across
                  raycasters automatically).
                </li>
                <li>
                  <strong>BlockingMask</strong> — layer mask used when{' '}
                  <code>BlockingObjects</code> is non-None.
                </li>
              </ul>

              <p className="text-white/70 mb-4">
                Per-instance opt-out: <code>UniTextWorld.RaycastTarget</code> (default true). Set to
                false on purely decorative text — the raycaster skips it entirely, the same way
                Canvas <code>Graphic.raycastTarget = false</code> works for <code>UniText</code>.
              </p>

              <p className="text-white/70">
                Once the raycaster is on the camera, <code>UniTextWorld</code> receives the same
                events as <code>UniText</code>: <code>TextClicked</code>, <code>RangeClicked</code>,{' '}
                <code>RangeEntered</code>, <code>RangeExited</code>, <code>HoverChanged</code>,
                plus link / hashtag / custom interactive range events.
              </p>
            </div>

            {/* 4.5 Text Resolver */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">
                4.5 Text Resolver (<code>IUniTextResolver</code>)
              </h3>
              <AdvancedBadge />
              <p className="text-white/70 mb-4">
                The resolver hook substitutes a component's source text <em>before</em> parsing /
                shaping / layout, <strong>without writing to the serialized <code>text</code> field</strong>
                . Scenes and prefabs stay clean — ideal for editor-time localization preview,
                template expansion, or runtime key-to-string binding.
              </p>
              <CodeBlock
                code={`public class LocalizationResolver : IUniTextResolver
{
    private UniTextBase owner;
    private Action<string> onLanguageChanged;

    private Dictionary<string, string> table;

    public void OnAttached(UniTextBase owner)
    {
        this.owner = owner;
        onLanguageChanged = _ => owner.SetDirty(UniTextDirtyFlags.Text);
        LocalizationSignal.LanguageChanged += onLanguageChanged;
    }

    public void OnDetached(UniTextBase owner)
    {
        if (onLanguageChanged != null)
            LocalizationSignal.LanguageChanged -= onLanguageChanged;
        onLanguageChanged = null;
        this.owner = null;
        table = null;
    }

    public void PrepareForParallel()
    {
        // Cache main-thread-only values here — TryResolve below may run off-thread.
        table = LocalizationTables.GetTable(LocalizationSignal.CurrentLanguage);
    }

    public bool TryResolve(ReadOnlyMemory<char> source, out ReadOnlyMemory<char> result)
    {
        var key = source.ToString();
        if (table != null && table.TryGetValue(key, out var translated))
        {
            result = translated.AsMemory();
            return true;
        }
        result = default;
        return false;
    }
}

uniText.TextResolver = new LocalizationResolver();
uniText.Text = "greeting.hello";   // serialized key; rendered as the localized translation

// Later, to detach:
uniText.TextResolver = null;       // OnDetached is called automatically, signal is unsubscribed`}
              />
              <Notice type="warning" className="mt-4">
                Always implement <code>OnDetached</code> if you subscribe to anything in{' '}
                <code>OnAttached</code> — the resolver stays alive until GC collects it, and an
                orphan subscription keeps the owner reference around and fires{' '}
                <code>SetDirty</code> on a destroyed component.
              </Notice>
              <p className="text-white/70 text-sm mt-3">
                <code>TryResolve</code> may run on a worker thread — don't call Unity APIs directly
                inside it; populate caches in <code>PrepareForParallel</code> and read them from{' '}
                <code>TryResolve</code>. To know whether a resolver is currently active, inspect{' '}
                <code>uniText.TextOverride &amp; TextOverrideSource.Resolver</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 5. Language & Internationalization                                  */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[var(--color-accent)]" />
            5. Language &amp; Internationalization
          </h2>

          <p className="text-white/70 mb-4">
            UniText routes a BCP 47 language tag through the shaping pipeline. Three things depend
            on this tag:
          </p>

          <ol className="space-y-2 text-white/70 mb-6 list-decimal list-inside">
            <li>
              <strong>
                OpenType <code>locl</code> feature
              </strong>{' '}
              — pan-CJK fonts (Noto Sans CJK, Source Han Sans, etc.) render the correct regional
              form for Han ideographs depending on whether the text is tagged Simplified Chinese,
              Traditional Chinese, Japanese, or Korean.
            </li>
            <li>
              <strong>
                <code>FontFamily.preferredLanguage</code>
              </strong>{' '}
              — during codepoint-to-font resolution, families whose <code>preferredLanguage</code>{' '}
              matches the current tag are preferred over the normal fallback order. Useful for
              holding SC/TC/JP/KR cuts in one stack.
            </li>
            <li>
              <strong>Any custom modifier</strong> that reads per-codepoint language via{' '}
              <code>AttributeKeys.Language</code>.
            </li>
          </ol>

          <div className="space-y-6">
            {/* 5.1 Three places to set the language */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.1 Three places to set the language</h3>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Scope</th>
                      <th className="text-left py-2 pr-4 text-white/60">API</th>
                      <th className="text-left py-2 text-white/60">Wins over</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Per-range</td>
                      <td className="py-2 pr-4">
                        <code>LanguageModifier</code> via{' '}
                        <code>&lt;lang=...&gt;...&lt;/lang&gt;</code> or <code>Style.Tag</code> /{' '}
                        <code>Style.Range</code> / <code>Style.WholeText</code>
                      </td>
                      <td className="py-2">Everything below</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Per-component</td>
                      <td className="py-2 pr-4">
                        <code>uniText.Language = "zh-Hans"</code>
                      </td>
                      <td className="py-2">Project-wide default</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Project-wide</td>
                      <td className="py-2 pr-4">
                        <code>UniTextSettings.Language</code> (
                        <strong>
                          Project Settings &rarr; UniText &rarr; Localization &rarr; Language
                        </strong>
                        )
                      </td>
                      <td className="py-2">(base)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 mb-4">
                <code>UniText.Language</code> is a runtime shortcut: the setter finds or creates a
                whole-text <code>LanguageModifier</code> style in the component's local Styles
                list. There's no serialized inspector field — components that never set a language
                see nothing extra.
              </p>

              <CodeBlock
                code={`uniText.Language = "zh-Hant";   // whole text
uniText.Language = null;        // clear — back to component/project default`}
              />
            </div>

            {/* 5.2 Per-range language in markup */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.2 Per-range language in markup</h3>
              <CodeBlock
                code={`// Register the modifier once (either directly, via a preset, or on a Style Preset asset):
uniText.AddStyle(Style.Tag(new LanguageModifier(), "lang"));

// Then in text:
uniText.Text = "日本語: <lang=ja>骨</lang>, 中文简: <lang=zh-Hans>骨</lang>, 中文繁: <lang=zh-Hant>骨</lang>";`}
              />
              <p className="text-white/70 mt-3">
                Itemization splits runs on language boundaries, so each run shapes with its own
                OpenType language tag.
              </p>
            </div>

            {/* 5.3 Picking the right font family by language */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                5.3 Picking the right font family by language
              </h3>
              <p className="text-white/70 mb-3">
                Attach <code>preferredLanguage</code> to each region-specific family in one stack:
              </p>
              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>CJKStack.asset</div>
                <div className="ml-4">
                  ├── Family: NotoSansCJK-SC &nbsp;&nbsp;(preferredLanguage: "zh-Hans")
                </div>
                <div className="ml-4">
                  ├── Family: NotoSansCJK-TC &nbsp;&nbsp;(preferredLanguage: "zh-Hant")
                </div>
                <div className="ml-4">
                  ├── Family: NotoSansCJK-JP &nbsp;&nbsp;(preferredLanguage: "ja")
                </div>
                <div className="ml-4">
                  └── Family: NotoSansCJK-KR &nbsp;&nbsp;(preferredLanguage: "ko")
                </div>
              </div>
              <p className="text-white/70">
                With <code>UniText.Language = "zh-Hans"</code>, codepoints are resolved against the
                SC family first; unmatched codepoints fall through the normal chain as usual. A
                matching family wins over the default fallback order for that codepoint.
              </p>
            </div>

            {/* 5.4 Naming families */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                5.4 Naming families (<code>FontFamily.name</code> + <code>FontModifier</code>)
              </h3>
              <p className="text-white/70 mb-3">
                You can give each family a user-facing name and address it from markup or code:
              </p>
              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>UIStack.asset</div>
                <div className="ml-4">
                  ├── Family: name="body" &nbsp;&nbsp;primary: Inter-Regular
                </div>
                <div className="ml-4">
                  ├── Family: name="pixel" &nbsp;primary: PressStart2P
                </div>
                <div className="ml-4">
                  └── Family: name="icons" &nbsp;primary: MyIconFont
                </div>
              </div>
              <CodeBlock
                code={`uniText.AddStyle(Style.Tag(new FontModifier(), "font"));
uniText.Text = "Score: <font=pixel>100</font> <font=icons>♥</font>";`}
              />
              <p className="text-white/70 mt-3">
                A matched name wins over both <code>preferredLanguage</code> selection and the
                default fallback chain. If the chosen family doesn't have a glyph for a particular
                codepoint, the normal fallback chain still kicks in for that codepoint. Unknown
                names log a one-time warning.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 6. Custom Materials & Shaders                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-6 h-6 text-[var(--color-accent)]" />
            6. Custom Materials &amp; Shaders
          </h2>

          <p className="text-white/70 mb-6">
            <code>MaterialModifier</code> applies an arbitrary <code>Material</code> to a text
            range by emitting a dedicated sub-mesh. Use it for dissolve effects, hologram shaders,
            flame text, custom SDF looks, anything a shader can do.
          </p>

          <div className="space-y-6">
            {/* 6.1 Quick start */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.1 Quick start — use a ready material</h3>
              <p className="text-white/70 mb-4">
                UniText ships example materials in <code>UniText/Defaults/Materials/</code>:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Material</th>
                      <th className="text-left py-2 text-white/60">Effect</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>UniTextLit</code>
                      </td>
                      <td className="py-2">
                        World-space lit SDF (ambient + directional light + fog)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>UniTextEmojiLit</code>
                      </td>
                      <td className="py-2">World-space lit emoji</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>UniTextHologram</code>
                      </td>
                      <td className="py-2">Scanlines + flicker + edge glow</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>UniTextDisolve</code>
                      </td>
                      <td className="py-2">Noise-driven dissolve</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>UniTextRainbow</code>
                      </td>
                      <td className="py-2">Animated color cycle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/70 mb-3">
                Set up a <code>MaterialModifier</code> in the inspector — paired with a{' '}
                <code>TagRule</code> whose <code>tagName</code> you choose (<code>mat</code> is
                the convention used here) — and point its <code>Material</code> field at one of
                these. From code:
              </p>
              <CodeBlock
                code={`var mat = new MaterialModifier { Material = myDissolveMaterial };
uniText.AddStyle(Style.Tag(mat, "mat"));     // pick any name; "mat" is just the convention

uniText.Text = "Hello <mat>dissolving</mat> world!";`}
              />
              <p className="text-white/70 mt-3 text-sm">
                For <code>UniTextWorld</code>, you can also assign these materials as the
                component's base material instead of using <code>MaterialModifier</code> (useful
                for whole-text effects, no tag setup required).
              </p>
            </div>

            {/* 6.2 Authoring your own shader */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.2 Authoring your own shader</h3>
              <p className="text-white/70 mb-3">Use the asset creation menu:</p>
              <p className="text-white/70 mb-4">
                <strong>Assets &rarr; Create &rarr; UniText &rarr; Custom Material Shader</strong>
              </p>
              <p className="text-white/70 mb-4">
                This scaffolds a new <code>.shader</code> file pre-wired for{' '}
                <code>MaterialModifier</code> — includes <code>UniText_Custom.cginc</code>, binds{' '}
                <code>_MainTex</code> as the glyph atlas <code>Texture2DArray</code>, exposes the
                standard UV layout UniText writes. Rename it, tweak the fragment function, you're
                done.
              </p>
              <p className="text-white/70 mb-3">
                Three example shaders ship as starting points (in{' '}
                <code>UniText/Shaders/Templates/Examples/</code>):
              </p>
              <ul className="space-y-1 text-white/70 list-disc list-inside">
                <li>
                  <code>UniText/Custom/Dissolve</code>
                </li>
                <li>
                  <code>UniText/Custom/Hologram</code>
                </li>
                <li>
                  <code>UniText/Custom/Rainbow</code>
                </li>
              </ul>
            </div>

            {/* 6.3 Compose modes */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.3 Compose modes</h3>
              <p className="text-white/70 mb-3">
                <code>MaterialModifier.renderOrder</code> controls how the custom material
                composes with the base text pass on the range:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Mode</th>
                      <th className="text-left py-2 text-white/60">Effect</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Replace</code> (default)
                      </td>
                      <td className="py-2">
                        Base SDF pass is suppressed on the range (face alpha zeroed); only the
                        custom material renders
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>Over</code>
                      </td>
                      <td className="py-2">Custom material renders in front of the base text</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>Under</code>
                      </td>
                      <td className="py-2">Custom material renders behind the base text</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Notice type="warning">
                <strong>Ordering note (Replace mode):</strong> <code>Replace</code> zeroes the face
                alpha during the <code>onGlyph</code> callback. UniText invokes <code>onGlyph</code>{' '}
                subscribers in the order styles appear in the component's Styles list. If a{' '}
                <code>ColorModifier</code> / <code>GradientModifier</code> comes <em>after</em>{' '}
                <code>MaterialModifier</code>, it will overwrite the zeroed alpha and make the base
                face reappear. Place <code>MaterialModifier</code> <strong>after</strong> any
                color-writing modifiers.
              </Notice>
            </div>

            {/* 6.4 Per-text and per-glyph shader data */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.4 Per-text and per-glyph shader data</h3>
              <ul className="space-y-4 text-white/70 list-disc list-inside">
                <li>
                  <strong>Per-text constants</strong> — <code>ConstantUv2</code> /{' '}
                  <code>ConstantUv3</code> (<code>Vector4</code> each) are written into{' '}
                  <code>TEXCOORD2</code> / <code>TEXCOORD3</code> of every glyph vertex in this
                  modifier's sub-mesh. Animate them at runtime without touching{' '}
                  <code>Material.Set*</code> (which would affect every component sharing the cached
                  material clone):
                  <div className="mt-3">
                    <CodeBlock
                      code={`var mat = GetComponent<MyMaterialAnimator>().mod; // your MaterialModifier reference
mat.ConstantUv2 = new Vector4(Time.time, 0, 0, 0);`}
                    />
                  </div>
                </li>
                <li>
                  <strong>Per-glyph writer</strong> — set <code>glyphDataWriter</code> (a{' '}
                  <code>MaterialGlyphWriter</code> delegate) to compute <code>uv2</code> /{' '}
                  <code>uv3</code> per glyph at sub-mesh build time. Useful for staggered effects
                  (wave, cascade, per-character dissolve).
                </li>
                <li>
                  <strong>Emoji material slot</strong> — <code>emojiMaterial</code> accepts a
                  separate material for emoji glyphs in the range. Leave null and emoji render
                  through the base emoji pass (the modifier does nothing for them).
                </li>
              </ul>
            </div>

            {/* 6.5 Noise texture generator */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.5 Noise texture generator</h3>
              <p className="text-white/70">
                Many custom shaders need noise textures.{' '}
                <strong>Tools &rarr; UniText &rarr; Noise Generator</strong> produces seamless
                grayscale value-noise / FBM PNG assets (64–1024 px, configurable seed / frequency /
                octaves / lacunarity / gain / invert / tileable). The shipped Dissolve and
                Hologram examples use this.
              </p>
            </div>

            {/* 6.6 Lit shaders for world-space text */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">6.6 Lit shaders for world-space text</h3>
              <p className="text-white/70 mb-3">
                Two SDF/emoji shader variants with lighting are provided for 3D scenes:
              </p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-3">
                <li>
                  <code>UniText/Lit/SDF</code> — SDF text that picks up ambient + one directional
                  light + fog
                </li>
                <li>
                  <code>UniText/Lit/Emoji</code> — same but for emoji
                </li>
              </ul>
              <p className="text-white/70">
                Assign them via <code>UniTextWorld</code>'s material or through{' '}
                <code>MaterialModifier</code>. <code>_LightInfluence</code> controls the mix
                between unlit and fully lit.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 7. RTL and Bidirectional Text                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-[var(--color-accent)]" />
            7. RTL and Bidirectional Text
          </h2>

          <p className="text-white/70 mb-4">UniText automatically handles:</p>
          <ul className="space-y-2 text-white/70 list-disc list-inside mb-6">
            <li>
              <strong>RTL scripts</strong> (Arabic, Hebrew) — text flows right-to-left
            </li>
            <li>
              <strong>BiDi mixing</strong> — "Hello עולם World" renders correctly
            </li>
            <li>
              <strong>Complex shaping</strong> — Arabic ligatures, Indic conjuncts, etc. (via
              HarfBuzz)
            </li>
          </ul>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Direction Settings</h3>
            <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
              <li>
                <strong>Auto</strong> (default) — detects from first strong directional character
              </li>
              <li>
                <strong>LeftToRight</strong> — force left-to-right
              </li>
              <li>
                <strong>RightToLeft</strong> — force right-to-left
              </li>
            </ul>

            <CodeBlock
              code={`uniText.BaseDirection = TextDirection.Auto;
uniText.Text = "مرحبا بالعالم"; // Renders right-to-left`}
            />
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 8. Emoji                                                            */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Smile className="w-6 h-6 text-[var(--color-accent)]" />
            8. Emoji
          </h2>

          <p className="text-white/70 mb-6">
            Emoji work automatically — the system emoji font is detected and used:
          </p>

          <CodeBlock code={`uniText.Text = "Hello! \u{1F44B} Great job! \u{1F389}";`} />

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Platform</th>
                  <th className="text-left py-2 text-white/60">Emoji Font</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Windows</td>
                  <td className="py-2">Segoe UI Emoji</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">macOS</td>
                  <td className="py-2">Apple Color Emoji</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">iOS</td>
                  <td className="py-2">Core Text (native API)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Android</td>
                  <td className="py-2">NotoColorEmoji (via fonts.xml)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">Linux</td>
                  <td className="py-2">NotoColorEmoji / Symbola</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">WebGL</td>
                  <td className="py-2">Browser Canvas 2D</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 text-sm mt-4">
            Emoji are rendered as color bitmaps in a separate atlas. The emoji font is checked first
            for emoji-presentation codepoints, then falls back to the regular font stack.
          </p>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 9. Text Model                                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[var(--color-accent)]" />
            9. Text Model
          </h2>

          <p className="text-white/70 mb-6">
            When you read <code>uniText.Text</code>, you see the serialized authored value — what's
            stored on disk. What's actually drawn can be different. Five properties cover the full
            pipeline from authoring to rendering:
          </p>

          <TextPipeline />

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/60">Property</th>
                  <th className="text-left py-2 pr-4 text-white/60">Type</th>
                  <th className="text-left py-2 text-white/60">What it is</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>Text</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>string</code>
                  </td>
                  <td className="py-2">
                    Serialized authored value (setter persists into the scene/prefab)
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>RawText</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>ReadOnlyMemory&lt;char&gt;</code>
                  </td>
                  <td className="py-2">
                    Runtime source — <code>Text</code>, or the buffer passed to{' '}
                    <code>SetText</code>, before any resolver
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>ResolvedText</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>ReadOnlyMemory&lt;char&gt;</code>
                  </td>
                  <td className="py-2">
                    Resolver's substitute from the last rebuild, or empty if none
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>RenderedText</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>ReadOnlyMemory&lt;char&gt;</code>
                  </td>
                  <td className="py-2">
                    What actually goes through shaping/layout: resolver output if active, else{' '}
                    <code>RawText</code>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <code>CleanText</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>ReadOnlySpan&lt;char&gt;</code>
                  </td>
                  <td className="py-2">
                    <code>RenderedText</code> with markup stripped
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    <code>TextOverride</code>
                  </td>
                  <td className="py-2 pr-4">
                    <code>TextOverrideSource</code> flags
                  </td>
                  <td className="py-2">
                    Tells you which runtime source(s) currently diverge from <code>Text</code>:{' '}
                    <code>None</code>, <code>SetText</code>, <code>Resolver</code>, or a
                    combination
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 mb-6">
            Everything except <code>Text</code> is zero-allocation. <code>CleanText</code>'s
            backing buffer is pooled and may be rewritten on the next rebuild — copy to a string
            via <code>new string(span)</code> if you need to keep it.
          </p>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-4">9.1 Assigning text at runtime</h3>
            <p className="text-white/70 mb-3">Three ways:</p>
            <CodeBlock
              code={`// 1) Standard — writes to the serialized field (scene/prefab becomes dirty).
uniText.Text = "Hello";

// 2) Zero-alloc buffer assignment — does NOT touch the serialized field, no dirty flag.
char[] buffer = ...;
uniText.SetText(buffer, offset: 0, length: 5);

// 3) Zero-alloc memory assignment — same semantics as (2).
ReadOnlyMemory<char> mem = "Hello".AsMemory();
uniText.SetText(mem);
uniText.SetText("Hello");   // convenience overload (null → empty)`}
            />
            <p className="text-white/70 mt-4 text-sm">
              After a <code>SetText(buffer, ...)</code> call, the <code>Text</code> getter returns
              the <em>serialized</em> value, not the buffer. Read <code>RawText</code> (or{' '}
              <code>RenderedText</code>) to see what the component actually holds.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 10. Inspecting Text                                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ScanSearch className="w-6 h-6 text-[var(--color-accent)]" />
            10. Inspecting Text
          </h2>

          <p className="text-white/70 mb-6">
            UniText ships an in-scene inspection overlay that draws per-glyph, per-run, per-line,
            and per-modifier data over live text — for debugging shaping, BiDi, fallback, and
            layout. It works in the editor, in play mode, and in player builds (debug builds).
          </p>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              <strong>Editor:</strong> toggle{' '}
              <strong>Tools &rarr; UniText &rarr; Inspection Mode</strong> (
              <code>Ctrl+Shift+I</code>). Hover any <code>UniText</code> / <code>UniTextWorld</code>{' '}
              to inspect it; press <strong>P</strong> to pin the current card so you can move the
              cursor freely.
            </p>
            <p className="text-white/70 mb-4">
              <strong>Play mode / player builds:</strong> press <strong>F8</strong> to toggle,{' '}
              <strong>P</strong> to pin. Everything is also driven from code via the static{' '}
              <code>UniTextInspector</code>:
            </p>

            <CodeBlock
              code={`UniTextInspector.Enable();              // also Toggle() / Disable()
UniTextInspector.Layers = InspectionLayers.GlyphBox | InspectionLayers.RunBounds;  // [Flags]
UniTextInspector.Filter = InspectionFilter.Fallback;   // mark fallback glyphs (also Notdef, Rtl)
UniTextInspector.ShowBiDi = true;       // direction arrows on each visual run
UniTextInspector.ShowStats = true;      // whole-component card: chars, glyphs, runs, fonts, scripts
UniTextInspector.Target = myText;       // pin to one component; null = whatever is under the cursor`}
            />

            <p className="text-white/70 mt-4">
              Available layers: <code>GlyphBox</code>, <code>Baseline</code>, <code>Advance</code>,{' '}
              <code>RunBounds</code>, <code>LineBounds</code>, <code>ModifierRanges</code>.{' '}
              <code>ToggleKey</code> and <code>PinKey</code> are configurable.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 11. Common Properties                                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <List className="w-6 h-6 text-[var(--color-accent)]" />
            11. Common Properties
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/60">Property</th>
                  <th className="text-left py-3 pr-4 text-white/60">Type</th>
                  <th className="text-left py-3 pr-4 text-white/60">Default</th>
                  <th className="text-left py-3 text-white/60">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>Text</code>
                  </td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">
                    <code>""</code>
                  </td>
                  <td className="py-3">Text content with optional markup</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>Font</code>
                  </td>
                  <td className="py-3 pr-4">
                    <code>UniTextFont</code>
                  </td>
                  <td className="py-3 pr-4">—</td>
                  <td className="py-3">
                    Optional single primary font; overrides the stack's primary,{' '}
                    <code>FontStack</code> still serves as fallback (see §2 font table)
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>FontStack</code>
                  </td>
                  <td className="py-3 pr-4">
                    <code>UniTextFontStack</code>
                  </td>
                  <td className="py-3 pr-4">—</td>
                  <td className="py-3">
                    Font families + fallback chain. With no <code>Font</code> and no stack, the OS
                    default font is used (except WebGL)
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RenderMode</code>
                  </td>
                  <td className="py-3 pr-4">
                    <code>UniTextRenderMode</code>
                  </td>
                  <td className="py-3 pr-4">SDF</td>
                  <td className="py-3">SDF (single-channel) or MSDF (multi-channel)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>FontSize</code>
                  </td>
                  <td className="py-3 pr-4">float</td>
                  <td className="py-3 pr-4">36</td>
                  <td className="py-3">Base font size in points</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>color</code>
                  </td>
                  <td className="py-3 pr-4">Color</td>
                  <td className="py-3 pr-4">white</td>
                  <td className="py-3">Base text color</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>BaseDirection</code>
                  </td>
                  <td className="py-3 pr-4">TextDirection</td>
                  <td className="py-3 pr-4">Auto</td>
                  <td className="py-3">LTR, RTL, or Auto</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>WordWrap</code>
                  </td>
                  <td className="py-3 pr-4">bool</td>
                  <td className="py-3 pr-4">true</td>
                  <td className="py-3">Enable/disable word wrapping</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>HorizontalAlignment</code>
                  </td>
                  <td className="py-3 pr-4">HorizontalAlignment</td>
                  <td className="py-3 pr-4">Left</td>
                  <td className="py-3">Left, Center, Right</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>VerticalAlignment</code>
                  </td>
                  <td className="py-3 pr-4">VerticalAlignment</td>
                  <td className="py-3 pr-4">Top</td>
                  <td className="py-3">Top, Middle, Bottom</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>AutoSize</code>
                  </td>
                  <td className="py-3 pr-4">bool</td>
                  <td className="py-3 pr-4">false</td>
                  <td className="py-3">Auto-fit text to container</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>MinFontSize</code>
                  </td>
                  <td className="py-3 pr-4">float</td>
                  <td className="py-3 pr-4">10</td>
                  <td className="py-3">Auto-size minimum</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>MaxFontSize</code>
                  </td>
                  <td className="py-3 pr-4">float</td>
                  <td className="py-3 pr-4">72</td>
                  <td className="py-3">Auto-size maximum</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>Language</code>
                  </td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">null</td>
                  <td className="py-3">
                    Whole-text BCP 47 language tag (shortcut over <code>LanguageModifier</code>)
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>Highlighter</code>
                  </td>
                  <td className="py-3 pr-4">TextHighlighter</td>
                  <td className="py-3 pr-4">DefaultTextHighlighter</td>
                  <td className="py-3">Interaction visual feedback</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    <code>TextResolver</code>
                  </td>
                  <td className="py-3 pr-4">IUniTextResolver</td>
                  <td className="py-3 pr-4">null</td>
                  <td className="py-3">Hook that overrides source text before parsing</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* UniTextWorld additional properties */}
          <h3 className="font-semibold mb-4">
            Additional on <code>UniTextWorld</code>
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/60">Property</th>
                  <th className="text-left py-3 pr-4 text-white/60">Type</th>
                  <th className="text-left py-3 pr-4 text-white/60">Default</th>
                  <th className="text-left py-3 text-white/60">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>SortingOrder</code>
                  </td>
                  <td className="py-3 pr-4">int</td>
                  <td className="py-3 pr-4">0</td>
                  <td className="py-3">OrderInLayer for batching/sorting</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    <code>SortingLayerID</code>
                  </td>
                  <td className="py-3 pr-4">int</td>
                  <td className="py-3 pr-4">0 (Default)</td>
                  <td className="py-3">Sorting layer for batching/sorting</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Read-Only Properties */}
          <h3 className="font-semibold mb-4">Read-Only Properties</h3>
          <p className="text-white/70 mb-4 text-sm">
            Text pipeline stages (in order — each row reads its predecessor):
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/60">Property</th>
                  <th className="text-left py-3 pr-4 text-white/60">Type</th>
                  <th className="text-left py-3 text-white/60">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RawText</code>
                  </td>
                  <td className="py-3 pr-4">ReadOnlyMemory&lt;char&gt;</td>
                  <td className="py-3">
                    Runtime input — <code>Text</code> or the buffer passed to <code>SetText</code>,
                    before any resolver
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>ResolvedText</code>
                  </td>
                  <td className="py-3 pr-4">ReadOnlyMemory&lt;char&gt;</td>
                  <td className="py-3">
                    Resolver substitute from the last rebuild, or empty
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RenderedText</code>
                  </td>
                  <td className="py-3 pr-4">ReadOnlyMemory&lt;char&gt;</td>
                  <td className="py-3">
                    What goes through shaping/layout: resolver output if active, else{' '}
                    <code>RawText</code>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>CleanText</code>
                  </td>
                  <td className="py-3 pr-4">ReadOnlySpan&lt;char&gt;</td>
                  <td className="py-3">
                    <code>RenderedText</code> with markup stripped. Backing buffer is pooled —
                    don't store the span
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>TextOverride</code>
                  </td>
                  <td className="py-3 pr-4">TextOverrideSource [Flags]</td>
                  <td className="py-3">
                    <code>None</code>, <code>SetText</code>, <code>Resolver</code>, or a
                    combination — the runtime source(s) overriding <code>Text</code>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>CurrentFontSize</code>
                  </td>
                  <td className="py-3 pr-4">float</td>
                  <td className="py-3">Effective font size (after auto-sizing)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>ResultSize</code>
                  </td>
                  <td className="py-3 pr-4">Vector2</td>
                  <td className="py-3">Computed text dimensions</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    <code>ResultGlyphs</code>
                  </td>
                  <td className="py-3 pr-4">ReadOnlySpan&lt;PositionedGlyph&gt;</td>
                  <td className="py-3">All positioned glyphs after layout</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Events */}
          <h3 className="font-semibold mb-4">Events</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/60">Event</th>
                  <th className="text-left py-3 pr-4 text-white/60">Type</th>
                  <th className="text-left py-3 text-white/60">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>TextClicked</code>
                  </td>
                  <td className="py-3 pr-4">Action&lt;TextHitResult&gt;</td>
                  <td className="py-3">Any text click</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RangeClicked</code>
                  </td>
                  <td className="py-3 pr-4">Action&lt;InteractiveRangeHit&gt;</td>
                  <td className="py-3">Interactive range clicked</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RangeEntered</code>
                  </td>
                  <td className="py-3 pr-4">Action&lt;InteractiveRangeHit&gt;</td>
                  <td className="py-3">Pointer enters interactive range</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RangeExited</code>
                  </td>
                  <td className="py-3 pr-4">Action&lt;InteractiveRangeHit&gt;</td>
                  <td className="py-3">Pointer exits interactive range</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>HoverChanged</code>
                  </td>
                  <td className="py-3 pr-4">Action&lt;TextHitResult&gt;</td>
                  <td className="py-3">Pointer moved over text</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>Rebuilding</code>
                  </td>
                  <td className="py-3 pr-4">Action</td>
                  <td className="py-3">Before text rebuild</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    <code>RectHeightChanged</code>
                  </td>
                  <td className="py-3 pr-4">Action</td>
                  <td className="py-3">RectTransform height changed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 text-sm mt-4">
            <code>UniTextWorld</code> additionally raises <code>RenderDataAvailable</code> /{' '}
            <code>RenderDataCleared</code> / <code>SortingChanged</code> /{' '}
            <code>ParentChanged</code> (per-instance) and static <code>Activated</code> /{' '}
            <code>Deactivated</code>.
          </p>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 12. Code Examples                                                   */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[var(--color-accent)]" />
            12. Code Examples
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-white/40" />
                Basic Usage
              </h3>
              <CodeBlock
                code={`public class Example : MonoBehaviour
{
    [SerializeField] private UniText uniText;

    void Start()
    {
        uniText.Text = "Hello, World!";
        uniText.FontSize = 24;
        uniText.HorizontalAlignment = HorizontalAlignment.Center;
    }
}`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-white/40" />
                Clickable Links
              </h3>
              <CodeBlock
                code={`private LinkModifier linkModifier;

void Start()
{
    linkModifier = new LinkModifier();
    linkModifier.AutoOpenUrl = false;
    uniText.AddStyle(Style.Tag(linkModifier, "link"));

    uniText.Text = "Visit <link=https://example.com>our website</link> for more info.";

    linkModifier.LinkClicked += url => Application.OpenURL(url);
    linkModifier.LinkEntered += url => Debug.Log($"Hovering: {url}");
    linkModifier.LinkExited += () => Debug.Log("Left link");
}`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-white/40" />
                Markdown Links and Auto-URL Detection
              </h3>
              <CodeBlock
                code={`uniText.AddStyle(new Style { Modifier = new LinkModifier(), Rule = new MarkdownLinkParseRule() });
uniText.Text = "Visit [our website](https://example.com) for details.";

uniText.AddStyle(new Style { Modifier = new LinkModifier(), Rule = new RawUrlParseRule() });
uniText.Text = "Check https://example.com for updates.";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-4 h-4 text-white/40" />
                Inline Objects (Icons in Text)
              </h3>
              <CodeBlock
                code={`// Requires: ObjModifier + TagRule("obj") registered
// ObjModifier must have an InlineObject named "coin" with a RectTransform prefab
uniText.Text = "You earned <obj=coin/> 100 gold!";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <List className="w-4 h-4 text-white/40" />
                Lists
              </h3>
              <CodeBlock
                code={`// With MarkdownListParseRule + ListModifier registered:
uniText.Text = "Shopping list:\\n- Apples\\n- Bananas\\n- Oranges";

// Ordered list:
uniText.Text = "Steps:\\n1. Open app\\n2. Click button\\n3. Done";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-white/40" />
                Apply Color to Entire Text (<code>RangeRule</code>)
              </h3>
              <CodeBlock
                code={`uniText.AddStyle(Style.WholeText(new ColorModifier(), "#FF6600"));
uniText.Text = "This entire text is orange.";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-white/40" />
                Whole-text via component API
              </h3>
              <CodeBlock
                code={`uniText.SetWholeText<BoldModifier>();                // make everything bold
uniText.SetWholeText<ColorModifier>("#FF0000");      // everything red
bool isBold = uniText.ToggleWholeText<BoldModifier>();
uniText.ClearWholeText<ColorModifier>();`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/40" />
                Language and font switching
              </h3>
              <CodeBlock
                code={`// Project-wide default
UniTextSettings.Language = "zh-Hans";

// Per-component
uniText.Language = "ja";

// Per-range (requires LanguageModifier registered):
uniText.AddStyle(Style.Tag(new LanguageModifier(), "lang"));
uniText.Text = "日: <lang=ja>骨</lang>  中: <lang=zh-Hans>骨</lang>";

// Named font families (requires FontModifier registered):
uniText.AddStyle(Style.Tag(new FontModifier(), "font"));
uniText.Text = "Score: <font=pixel>100</font>";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Smile className="w-4 h-4 text-white/40" />
                Emoji
              </h3>
              <CodeBlock code={`uniText.Text = "Hello! \u{1F44B} Great job! \u{1F389}";`} />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Type className="w-4 h-4 text-white/40" />
                World-Space text
              </h3>
              <CodeBlock
                code={`public class WorldLabel : MonoBehaviour
{
    [SerializeField] private UniTextWorld label;

    void Start()
    {
        label.Text = "Target <color=red>acquired</color>";
        label.SortingOrder = 10;
        label.FontSize = 48;

        label.RangeClicked += hit => Debug.Log($"Clicked: {hit.range.data}");
    }
}
// Make sure Camera.main has a UniTextWorldRaycaster (added automatically by the menu).`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-white/40" />
                Custom Material via <code>MaterialModifier</code>
              </h3>
              <CodeBlock
                code={`var mat = new MaterialModifier { Material = myDissolveMaterial };
uniText.AddStyle(Style.Tag(mat, "mat"));

uniText.Text = "Attacked: <mat>*HIT*</mat>";

// Animate a shader parameter (e.g., dissolve progress) via the per-text UV:
void Update()
{
    mat.ConstantUv2 = new Vector4(Mathf.PingPong(Time.time, 1f), 0, 0, 0);
}`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/40" />
                System fonts (no bundled font)
              </h3>
              <CodeBlock
                code={`// No FontStack assigned — renders with the OS default font, gaps fill from OS fonts (§2.6).
// Works on desktop and mobile; on WebGL assign a regular UniTextFont instead.
uniText.Text = "Uses the operating system font 你好 مرحبا";

SystemFont.Disabled = true;   // opt out of OS fallback — uncovered codepoints show missing-glyph boxes`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ScanSearch className="w-4 h-4 text-white/40" />
                Text inspection (debug overlay)
              </h3>
              <CodeBlock
                code={`UniTextInspector.Filter = InspectionFilter.Fallback;   // mark glyphs drawn from a fallback font
UniTextInspector.ShowStats = true;
UniTextInspector.Enable(uniText);                      // F8 / Tools > UniText > Inspection Mode also toggle it`}
              />
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
              <Code className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Markup Modifiers</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=fonts`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Type className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Font Configuration</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
            <Link
              to={`${basePath}/api?category=unicode`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Languages className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Unicode Algorithms</span>
              <ArrowRight className="w-4 h-4 ml-auto text-white/40" />
            </Link>
          </div>
        </section>
      </div>
    </AutoLink>
  );
}
