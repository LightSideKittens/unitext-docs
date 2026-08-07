/**
 * Getting Started guide page.
 * Task-ordered walkthrough of UniText: scene setup, fonts and markup first,
 * then the subsystems — paint, animation, effects, interaction, selection,
 * editing, clipboard and platform input.
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
    note: "always available, never configured",
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

/** §5.4 compositing order: layer-major (default) versus glyph-major. */
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

/** §7.1 phase-driven motion: visual state is a pure function of Phase. */
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
        The same phase always renders the same frame, so scrubbing, rewinding
        and deterministic tests all work. Feed the value from{" "}
        <code>UniTextPhaseDriver</code>, a tween library, Timeline, or an
        Animator.
      </p>
    </div>
  );
}

/** §8 the reactive chain: a signal reaches a modifier property without code. */
function RangeEffectChain() {
  const steps = [
    { name: "RangeSignal", value: "hover", note: "what the range emits" },
    {
      name: "RangeEffectSelector",
      value: "Interaction",
      note: "when it applies",
    },
    {
      name: "RangeEffectDriver",
      value: "120 ms · ease",
      note: "how it moves",
      accent: true,
    },
    { name: "ModifierProperty", value: "Glow.Color", note: "what it changes" },
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
        the link&rsquo;s own colour&rdquo; is four serialized objects. Setting
        an effect property changes only that playback — the serialized modifier
        field is never mutated.
      </p>
    </div>
  );
}

/** §13.1 paste ladder: the highest-priority adapter whose format is present wins. */
function ClipboardLadder() {
  const rungs = [
    {
      name: "UniTextSourceClipboardAdapter",
      format: "application/vnd.lightside.unitext",
      note: "visible text + markup spans",
      cls: "border-emerald-400/40 bg-emerald-400/10",
    },
    {
      name: "TagHtmlClipboardAdapter",
      format: "HTML",
      note: "styled text for other apps",
      cls: "border-sky-400/40 bg-sky-400/10",
    },
    {
      name: "MarkdownClipboardAdapter",
      format: "Markdown",
      note: "delimiters per modifier",
      cls: "border-amber-400/40 bg-amber-400/10",
    },
    {
      name: "PlainTextClipboardAdapter",
      format: "plain text",
      note: "floor — always registered",
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
        On copy the ladder runs the other way: every registered adapter
        contributes its format, so one copy carries all of them at once.
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
              threads, math, catalogs, the inspector toolkit and the
              asset-migration framework. Installing UniText pulls Core
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
                <strong>GameObject → UI → UniText → Text</strong>. The menu
                instantiates the prefab assigned in{" "}
                <code>UniTextSettings.textPrefab</code>, so a designer&rsquo;s
                configured prefab is what appears — not a code-built hierarchy.
                With no prefab assigned the component is created bare.
              </p>

              <p className="text-white/70 mb-4">
                <code>UniText</code> derives from <code>MaskableGraphic</code>,
                so it behaves like any uGUI graphic: masks, layout groups,{" "}
                <code>ContentSizeFitter</code>, <code>RectMask2D</code> and
                canvas batching all apply.
              </p>

              <CodeBlock
                code={`var text = gameObject.AddComponent<UniText>();
text.Text = "Hello <b>world</b>";
text.FontSize = 24;
text.Color = Color.white;`}
              />
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

              <p className="text-white/70">
                Pointer input for world text is routed by{" "}
                <code>UniTextWorldRaycaster</code> — add it to the camera that
                should see the text (see §9.4).
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
                <strong>
                  Tools → UniText → Tools Window → Create Font Asset
                </strong>
                , or right-click a <code>.ttf</code>/<code>.otf</code> →{" "}
                <strong>Create → UniText → Font</strong>.
              </p>

              <p className="text-white/70 mb-4">
                A <code>UniTextFont</code> wraps one font file. It carries the
                face metrics (<code>FaceInfo</code>), the glyph atlas
                configuration, and per-glyph overrides.
              </p>

              <p className="text-white/60 text-sm mb-3">
                Key inspector settings:
              </p>
              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <strong>Render mode</strong> — <code>UniTextRenderMode</code>.
                  <code>SDF</code> (rounded corners on effects) or{" "}
                  <code>MSDF</code> (sharp corners). MSDF costs more atlas
                  memory; use it for sharp-cornered display type.
                </li>
                <li>
                  <strong>Atlas</strong> — page size and glyph tile size. Larger
                  tiles mean crisper small text at higher memory cost.
                </li>
                <li>
                  <strong>Metrics normalization</strong> (
                  <code>FontNormalizeMetric</code>) — makes fonts of different
                  design sizes line up on the same baseline when mixed in one
                  stack.
                </li>
                <li>
                  <strong>Face override</strong> (<code>FaceInfoOverride</code>)
                  — corrects ascender/descender/line gap when a font ships bad
                  metrics.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                2.2 Font stacks and families
              </h3>

              <p className="text-white/70 mb-4">
                A <code>UniTextFontStack</code> is the asset you actually assign
                to a component. It holds <strong>families</strong>; a{" "}
                <code>FontFamily</code> groups faces that differ only by style
                (regular, bold, italic, bold-italic) and carries a{" "}
                <code>name</code> used by the <code>&lt;font&gt;</code> tag.
              </p>

              <p className="text-white/60 text-sm mb-3">
                Resolution is three-tier, in order:
              </p>

              <FontResolutionDiagram />

              <p className="text-white/60 text-sm mb-3">Two stack shapes:</p>
              <ul className="space-y-2 text-white/70 list-disc list-inside">
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
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.3 Variable fonts</h3>

              <p className="text-white/70 mb-4">
                A variable font exposes axes (<code>wght</code>,{" "}
                <code>wdth</code>, <code>ital</code>, <code>slnt</code>,{" "}
                <code>opsz</code>). UniText reads them and can instance any
                point in the design space. Set defaults per family (
                <code>AxisDefault</code>) and override per range with{" "}
                <code>&lt;var&gt;</code> (§4.1). <code>UniTextFontVariant</code>{" "}
                names a reusable axis combination.
              </p>

              <p className="text-white/70">
                Variable instancing is memory-aware —{" "}
                <code>FontVariationMemoryStats</code> reports what the variation
                cache holds.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.4 Tools window</h3>

              <p className="text-white/70 mb-4">
                <strong>Tools → UniText → Tools Window</strong>:
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <strong>Create Font Asset</strong> — batch-create{" "}
                  <code>UniTextFont</code> assets from font files.
                </li>
                <li>
                  <strong>Font Subsetter</strong> — strip unused glyphs from a
                  font to shrink the build. Give it the codepoints you ship (or
                  a text corpus) and it emits a reduced font file.
                </li>
                <li>
                  <strong>Dictionary Builder</strong> — builds the
                  word-segmentation dictionary used for line breaking in scripts
                  without spaces (Thai, Khmer, Lao, Burmese, Japanese) — see{" "}
                  <code>WordSegmentationDictionary</code>.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">2.5 System fonts</h3>

              <p className="text-white/70 mb-4">
                <strong>Automatic OS fallback</strong> is always on: any
                codepoint no family in the stack covers is rendered from the OS
                font. Nothing to configure — a project that ships only a Latin
                font still renders Japanese text pasted by a user.
              </p>

              <p className="text-white/70 mb-4">
                <strong>Explicit system font</strong> — create a{" "}
                <code>UniTextSystemFont</code> asset and put it in the stack to
                use the OS font as a named family, e.g. to match the
                platform&rsquo;s UI font.
              </p>

              <p className="text-white/70">
                <code>SystemFontMemoryStats</code> reports what the system-font
                cache holds.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">2.6 Color fonts</h3>
                <p className="text-white/70">
                  <code>UniTextColorFont</code> handles color glyph formats
                  (COLR/CPAL, CBDT, sbix, SVG-in-OT). Emoji are the common case
                  (§16), but the same path renders any color font.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">2.7 Materials</h3>
                <p className="text-white/70">
                  Each font asset owns a material per render mode. Custom
                  shaders are covered in §17; assigning a custom material to a
                  range is <code>MaterialModifier</code> (§4.1).
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
                    <code>MarkdownWrapRule(&quot;**&quot;)</code>
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
                opens with the built-in presets grouped by category (Common,
                Text Style, Decoration, Appearance, Layout, Interactive, Inline,
                Utility, Animation, Custom). Picking a preset configures both
                sides; you can then edit either independently.
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

              <p className="text-white/70">
                For multi-parameter modifiers the merge is per-slot: values
                present in the tag win, missing slots come from the default.{" "}
                <code>MarkdownWrapRule</code> supports the same field.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.3 Parse rule types</h3>

              <p className="text-white/70 mb-6">
                <strong>Tag rules.</strong> <code>TagRule</code> with a
                configurable name. Parameters are optional. Self-closing is
                syntax-driven: <code>&lt;tag/&gt;</code>,{" "}
                <code>&lt;tag=value/&gt;</code>. <code>InlineTagRule</code> is
                the self-closing variant used by inline media.
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
                        <code>MarkdownWrapRule(&quot;**&quot;)</code>
                      </td>
                      <td className="py-2">
                        <code>**bold**</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule(&quot;*&quot;)</code>
                      </td>
                      <td className="py-2">
                        <code>*italic*</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule(&quot;~~&quot;)</code>
                      </td>
                      <td className="py-2">
                        <code>~~strike~~</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>MarkdownWrapRule(&quot;++&quot;)</code>
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
                        <code>1. item</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>RawUrlParseRule</code>
                      </td>
                      <td className="py-2">
                        auto-detects bare <code>https://…</code>
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
                        ranges maintained at runtime that survive edits (§11.4)
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>StringParseRule</code>
                      </td>
                      <td className="py-2">
                        match, and optionally replace, a literal pattern
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
                        match words from a list — the usual driver for{" "}
                        <code>InteractiveModifier</code>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SeparatorParseRule</code>
                      </td>
                      <td className="py-2">structural separators</td>
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
                        explicit <code>&lt;br&gt;</code>
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

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">3.4 Priority</h3>
                <p className="text-white/70">
                  Ranges from different sources can overlap. Each{" "}
                  <code>Style</code> has a priority that decides which rule
                  claims a position when several match. Protection rules always
                  win over content rules.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">3.5 Style presets</h3>
                <p className="text-white/70 mb-3">
                  A <code>StylePreset</code> is a project asset holding a
                  configured style list. Assign presets to a component (
                  <code>StylePresets</code>) to share one markup vocabulary
                  across many components;{" "}
                  <code>UniTextSettings.GlobalStylePreset</code> applies
                  project-wide when <code>UseGlobalStylePreset</code> is on.
                  Local styles compose on top.
                </p>
                <p className="text-white/70">
                  Editing a preset asset rebuilds every live component using it.
                </p>
              </div>
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

          <p className="text-white/70 mb-6">
            Default tag names below are what the presets wire up; they are
            conventions, not constraints.
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
                        <code>&lt;b=700&gt;</code> picks a weight
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
                    <tr>
                      <td className="py-2 pr-4">
                        <code>&lt;mat&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>MaterialModifier</code>
                      </td>
                      <td className="py-2">custom material, optional tint</td>
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

              <div className="overflow-x-auto">
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
                        <code>5</code>, <code>0.1em</code>;{" "}
                        <code>&lt;cspace=0.5em,true&gt;</code> forces monospace
                        advance. On cursive scripts positive spacing renders
                        tatweel so joins survive
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
                      <td className="py-2">per-range base direction</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>&lt;arc&gt;</code>
                      </td>
                      <td className="py-2 pr-4">
                        <code>ArcModifier</code>
                      </td>
                      <td className="py-2">curves the baseline</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">4.3 Paint layers</h3>

              <Notice type="warning" className="mb-4">
                The 2.x <code>&lt;gradient&gt;</code> and{" "}
                <code>&lt;outline&gt;</code> tags are gone. Fills, strokes,
                shadows and glows are now <strong>paint layers</strong> over a
                shared paint system (§5).
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
                Every one of them accepts a colour, a gradient or a texture
                through the same <code>TextPaint</code> (§5).
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
                Decorations are range geometry, not glyph effects: they use{" "}
                <code>HighlightPresentation</code> for paint, corners (
                <code>RangeDecorationCorners</code>) and how a logical range
                splits into figures (<code>GeometryMapping</code>).
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
                <p className="text-white/70">
                  <code>&lt;reveal&gt;</code> drives <code>RevealModifier</code>
                  ; the phase-driven glyph modifiers (<code>WaveModifier</code>,{" "}
                  <code>ShakeModifier</code>, …) are added as styles. Both are
                  covered in §7.
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
        {/* 5. The Paint System                                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-6 h-6 text-[var(--color-accent)]" />
            5. The Paint System
          </h2>

          <p className="text-white/70 mb-6">
            One model drives every coloured surface: fills, strokes, shadows,
            glows, inner shadows, decorations and selection.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.1 What a paint is</h3>
              <p className="text-white/70 mb-3">
                A <code>TextPaint</code> is a solid colour, a gradient or a
                texture, plus how it projects and composites. A{" "}
                <code>PaintSwatch</code> is a named <code>TextPaint</code> in a
                catalogue.
              </p>
              <p className="text-white/70">
                A layer&rsquo;s authored choice is a <code>PaintRef</code>: an
                inline colour, a named swatch, or the layer default (
                <code>PaintRefKind</code>).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.2 Where swatches live</h3>

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
              <h3 className="font-semibold mb-4">5.3 Projection</h3>

              <p className="text-white/70 mb-4">
                Two settings decide how a gradient or texture spreads over text:
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>PaintMapping</code> — the frame the paint is measured
                  against: the glyph, the range, the line, the whole block.
                </li>
                <li>
                  <code>PaintFit</code> — how a texture fills that frame.
                </li>
                <li>
                  <code>GradientShape</code> — <code>Linear</code> (project onto
                  an axis), <code>Radial</code> (distance from centre),{" "}
                  <code>Angular</code> (conic sweep).
                </li>
              </ul>

              <p className="text-white/70">
                The frame choice is what makes a gradient run across a whole
                sentence instead of restarting per glyph.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">5.4 Compositing</h3>

              <PaintOrderDiagram />

              <p className="text-white/70">
                Layers composite in painter order. <code>PaintOrder</code>{" "}
                selects <strong>layer-major</strong> (each layer across all
                glyphs, then the next — the component default, cheapest) or{" "}
                <strong>glyph-major</strong> (every layer of one glyph, then the
                next glyph — correct when layers of adjacent glyphs overlap).{" "}
                <code>LayerBlendOverride</code> overrides the blend of a single
                resolved paint.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 6. Range Decorations                                                */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--color-accent)]" />
            6. Range Decorations
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-white/70">
              <code>BaseRangeDecorationModifier</code> is the base for
              modifier-authored geometry attached to visual ranges — underlines,
              strikethroughs, highlights, and your own. It owns range
              accumulation, paint resolution, renderer handles and rebuild
              timing; a subclass only turns one logical range into figures.
            </p>

            <p className="text-white/70">
              <code>GeometryMapping</code> chooses how a logical range becomes
              visual figures (one box per line, one per fragment, merged).{" "}
              <code>RangeDecorationCorners</code> masks which corners round.{" "}
              <code>RangeDecorationOrder</code> places decorations relative to
              glyphs.
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
        {/* 7. Animation                                                        */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-[var(--color-accent)]" />
            7. Animation
          </h2>

          <p className="text-white/70 mb-6">
            Two independent systems: continuous phase-driven motion, and
            one-shot reveal.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">7.1 Phase-driven modifiers</h3>

              <p className="text-white/70 mb-4">
                Every animated glyph modifier implements{" "}
                <code>IPhaseDriven</code>: its visual state is a pure function
                of <code>Phase</code>. The modifier never advances time itself.
              </p>

              <PhaseDrivenDiagram />

              <p className="text-white/60 text-sm mb-3">
                Feed Phase from whatever owns time:
              </p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-6">
                <li>
                  <code>UniTextPhaseDriver</code> — drop this component next to
                  the text for free-running motion. The &ldquo;just make it
                  move&rdquo; default.
                </li>
                <li>A tween library, Timeline, or your own code.</li>
                <li>
                  A Unity Animator through <code>UniTextAnimationBridge</code> +{" "}
                  <code>PhaseAnimationHandler</code>.
                </li>
              </ul>

              <p className="text-white/60 text-sm mb-3">
                Built-ins, all <code>GlyphParamModifier&lt;Params&gt;</code>:
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
                        characters roll on a cyclic glyph wheel
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>ScrambleModifier</code>
                      </td>
                      <td className="py-2">
                        decode effect settling left to right
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>spread</code> decorrelates neighbouring glyphs;{" "}
                <code>frequency</code> sets cycles per phase unit.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">7.2 Writing your own</h3>
              <p className="text-white/70">
                Subclass <code>GlyphParamModifier&lt;TParams&gt;</code>: parse
                the range&rsquo;s tag parameters into <code>TParams</code>, then
                transform each glyph in <code>OnGlyph</code> through{" "}
                <code>GlyphQuad</code> (four vertices, order BL-TL-TR-BR). Keep
                it a pure function of phase and worker-thread safe.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">7.3 Reveal</h3>

              <p className="text-white/70 mb-4">
                <code>RevealModifier</code> shows only the leading part of each
                covered range — the engine behind typewriter text.
              </p>

              <CodeBlock
                code={`text.GetModifier<RevealModifier>().Fill = elapsed / duration;`}
              />

              <ul className="space-y-2 text-white/70 list-disc list-inside mt-4 mb-6">
                <li>
                  <code>Fill</code> (0&ndash;1) — visible fraction.{" "}
                  <code>VisibleClusters</code> overrides it when &ge; 0.
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
              </ul>

              <p className="text-white/70 mb-4">
                <strong>Appearance</strong> is a separate concern: a{" "}
                <code>RevealHandler</code> decides how each glyph arrives.
                Built-ins include Fade, Slide, Scale, Spin, Flip, Skew, Stretch,
                Spiral, Pop, Drop, Rain, Burst, Domino, Swing, Wave, Shake,
                Glitch, Chaos and Tint. <code>CompositeRevealHandler</code> runs
                several in one slot; <code>EasedRevealHandler</code> is the base
                for handlers that remap <code>Progress</code> through an
                authored easing.
              </p>

              <p className="text-white/70 mb-4">
                Handlers are named entries in a catalogue (
                <code>RevealHandlerEntry</code>), resolved per range by the tag
                parameter, from <code>InlineRevealHandlerProvider</code> (edited
                on the modifier) or <code>AssetRevealHandlerProvider</code> /{" "}
                <code>UniTextRevealHandlers</code> (a shared project asset).
              </p>

              <Notice type="warning">
                A custom handler transforms only the quad handed to{" "}
                <code>Apply</code> (<code>RevealGlyphInfo</code>), must be
                worker-thread safe, and <strong>must</strong> resolve to
                identity at <code>Progress = 1</code>.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">7.4 Animator integration</h3>

              <p className="text-white/70 mb-4">
                A Unity Animator writes serialized fields directly, bypassing
                the property setters that raise <code>UniTextDirty</code>.{" "}
                <code>UniTextAnimationBridge</code> fixes that: each{" "}
                <code>AnimationHandler</code> on it diffs one unit after the
                Animator writes and converts changes into correct invalidation.
              </p>

              <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li>
                  <code>UniTextFieldsAnimationHandler</code> — the
                  component&rsquo;s own fields (size, colour, wrap, auto-size,
                  alignment). <code>UniTextWorldFieldsAnimationHandler</code>{" "}
                  adds sorting and shadow casting.
                </li>
                <li>
                  <code>ModifierAnimationHandler</code> — one live modifier.
                </li>
                <li>
                  <code>PhaseAnimationHandler</code> — the first{" "}
                  <code>IPhaseDriven</code> modifier&rsquo;s phase.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 8. Range State Effects                                              */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[var(--color-accent)]" />
            8. Range State Effects
          </h2>

          <p className="text-white/70 mb-6">
            A reactive layer that drives <strong>any modifier property</strong>{" "}
            from <strong>any signal</strong>, per range, without code.
          </p>

          <RangeEffectChain />

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/60 text-sm mb-3">The pieces:</p>
            <ul className="space-y-3 text-white/70 list-disc list-inside mb-4">
              <li>
                <code>RangeSignal</code> — a value a range emits: hover, press,
                focus, a scalar you publish (<code>BuiltInScalarSignal</code>,{" "}
                <code>RangeSignals</code>).
              </li>
              <li>
                <code>RangeEffectSelector</code> — when the effect applies.
                Compose with <code>AllRangeEffectSelector</code>,{" "}
                <code>AnyRangeEffectSelector</code>,{" "}
                <code>NotRangeEffectSelector</code>,{" "}
                <code>InteractionRangeEffectSelector</code>,{" "}
                <code>ScalarRangeEffectSelector</code>.
              </li>
              <li>
                <code>RangeEffectDriver</code> — how the contribution moves over
                time: <code>BuiltInPropertyDriver</code> (clock + easing),{" "}
                <code>InstantEffectDriver</code>,{" "}
                <code>ManualEffectDriver</code>,{" "}
                <code>SignalProgressEffectDriver</code>.
              </li>
              <li>
                <code>ModifierProperty</code> /{" "}
                <code>EffectProperty&lt;TValue&gt;</code> — the target. Setting
                an effect property changes only that playback; it never mutates
                the serialized modifier field.
              </li>
              <li>
                <code>RangeEffectValue</code> — typed targets:{" "}
                <code>ColorRangeEffectValue</code>,{" "}
                <code>FloatRangeEffectValue</code>,{" "}
                <code>UnitRangeEffectValue</code>,{" "}
                <code>Vector2RangeEffectValue</code>,{" "}
                <code>UnitVector2RangeEffectValue</code>.
              </li>
            </ul>

            <p className="text-white/70">
              <code>RangeStateEffect</code> wires them together;{" "}
              <code>ModifierEffect</code> and <code>PropertyEffect</code> are
              the concrete shapes. <code>UniTextEffects</code> is the shared
              catalogue asset.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 9. Interaction                                                      */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MousePointerClick className="w-6 h-6 text-[var(--color-accent)]" />
            9. Interaction
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">9.1 Interactive ranges</h3>
              <p className="text-white/70 mb-3">
                <code>InteractiveModifier</code> makes a range respond to
                pointer input. It self-subscribes to the pointer surface —
                overlapping ranges from different modifiers all dispatch, in
                registration order.
              </p>
              <p className="text-white/70">
                <code>RangeInteraction</code> describes one interaction;{" "}
                <code>RangeState</code> carries hover/press/focus state that §8
                selectors read.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">9.2 Actions</h3>

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
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SetActiveAction</code>
                      </td>
                      <td className="py-2">toggles a GameObject</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code>RangeActionEvents</code>
                      </td>
                      <td className="py-2">UnityEvents on the range</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>RangeAction</code> is the base — subclass it for your own.{" "}
                <code>RangeActionContext</code> carries the range, the component
                and the pointer data.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">9.3 Gestures</h3>
              <p className="text-white/70">
                <code>RangeGestureRecognizer</code> and{" "}
                <code>DragRangeGestureRecognizer</code> turn raw pointer streams
                into range gestures. <code>RangeGestureCompatibility</code>{" "}
                decides which recognizers may run together.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                9.4 Viewports and world text
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
                <h3 className="font-semibold mb-4">9.5 Links</h3>
                <p className="text-white/70">
                  <code>LinkModifier</code> + <code>MarkdownLinkParseRule</code>{" "}
                  + <code>RawUrlParseRule</code> cover the usual set: explicit{" "}
                  <code>&lt;link=url&gt;</code>, Markdown{" "}
                  <code>[text](url)</code>, and bare URLs. Pair with{" "}
                  <code>OpenUrlAction</code> for click-to-open, and a §8 effect
                  for hover feedback.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">9.6 Text resolver</h3>
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
        {/* 10. Inline Media                                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[var(--color-accent)]" />
            10. Inline Media
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              <code>&lt;obj=name/&gt;</code> and{" "}
              <code>&lt;sprite=name/&gt;</code> place an object or sprite in the
              text flow. The glyph advance, line breaking and baseline alignment
              treat it as a character.
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
                <code>InlineSpriteOverride</code> — per-range overrides of size,
                tint, baseline.
              </li>
            </ul>

            <p className="text-white/70">
              <code>InlineObjectPolicy</code> decides how inline objects behave
              with respect to interaction and wrapping.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 11. Selection                                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <TextCursor className="w-6 h-6 text-[var(--color-accent)]" />
            11. Selection
          </h2>

          <p className="text-white/70 mb-6">
            <code>UniTextSelectable</code> adds read-only selection to Canvas or
            world text.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">11.1 What the user gets</h3>
              <p className="text-white/70">
                Click places a caret; double-click selects a word (and a drag
                continuing from it extends by whole words); triple-click selects
                a paragraph; drag selects; Shift extends; right-click or
                long-press selects the word and opens the context menu; Copy and
                Select-All work from the keyboard while focused. One selection
                per document, with EventSystem-driven defocus.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">11.2 The selection model</h3>

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
              <h3 className="font-semibold mb-4">11.3 Code</h3>

              <CodeBlock
                code={`selectable.SetCaret(index);
selectable.SetSelection(anchor, focus);
selectable.SelectWord(index);
selectable.SelectLine(index);
selectable.SelectParagraph(index);
selectable.SelectAll();
selectable.ClearSelection();
var s = selectable.GetSelectedText();`}
              />

              <p className="text-white/70 mt-4 mb-4">
                Mutators return <code>bool</code> — <code>false</code> means the
                request was rejected (out of range, or vetoed).
              </p>

              <p className="text-white/60 text-sm mb-3">Events:</p>
              <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>SelectionChanging</code> — vetoable. Inspect{" "}
                  <code>Proposed</code>, set <code>Cancel</code> to block.
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
                navigation helpers the caret path uses.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                11.4 Ranges that survive edits
              </h3>
              <p className="text-white/70">
                <code>MutableRangeSource</code> maintains ranges at runtime and
                patches their indices through every edit, so a highlight stays
                on the word it marked even as the user types before it.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">11.5 Context menu</h3>

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
                <code>ActionContextMenuItem</code> (runtime callback) and{" "}
                <code>CommandContextMenuItem</code> /{" "}
                <code>ButtonContextMenuItem</code> as bases.{" "}
                <code>ContextMenuCapabilities</code> reports which standard
                actions apply right now.
              </p>

              <p className="text-white/70 mb-4">
                <code>PrefabTextContextMenu</code> presents the shipped Unity-UI
                menu from a prefab. Implement <code>ITextContextMenu</code>{" "}
                directly for a native or bespoke menu.
              </p>

              <Notice type="info">
                An item whose control is not assigned never counts as applicable
                — an unwired menu cannot open as an invisible input-blocking
                panel.
              </Notice>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">11.6 Touch affordances</h3>

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
                <code>PrefabMagnifier</code> present the shipped Unity-UI
                versions; <code>SelectableEntity</code> is the base for your
                own. Each capability is independent — an entity may implement
                either or both (<code>ITouchHandles</code>).
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 12. Editing                                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Pencil className="w-6 h-6 text-[var(--color-accent)]" />
            12. Editing
          </h2>

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
            or place it under a layout group. Field chrome — background,
            viewport, scrolling, placeholder, labels — is assembled from
            ordinary Unity layout components plus decorators, not a fixed
            component.
          </p>

          <Notice type="new" className="mb-6">
            All OS input arrives independently of Unity&rsquo;s input system, so
            editing works whatever the project&rsquo;s Active Input Handling is
            set to (§15).
          </Notice>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.1 Events</h3>

              <CodeBlock
                code={`editable.TextChanged      += () => { };
editable.ValueChanged     += value => { };
editable.DocumentChanged  += doc => { };
editable.Submitted        += value => { };
editable.Cancelled        += () => { };
editable.Focused          += () => { };
editable.Defocused        += () => { };
editable.SelectionChanged += (anchor, focus) => { };
editable.EditApplied      += shape => { };
editable.CompositionStateChanged     += composing => { };
editable.TouchKeyboardVisibilityChanged += visible => { };`}
              />

              <p className="text-white/70 mt-4">
                <code>EditShape</code> describes one mutation — removed
                codepoints replaced by inserted codepoints at a start index — so
                consumers patch derived state instead of recomputing it.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.2 Behaviors</h3>

              <p className="text-white/70 mb-4">
                Policy lives in <code>InputBehavior</code> objects, not in the
                component. A behavior subscribes to the hooks it needs in{" "}
                <code>OnEnable</code> and unsubscribes in <code>OnDisable</code>
                . The base carries no policy; every specific lives in a
                subclass. This mirrors <code>BaseModifier</code>, adapted to the
                editing pipeline.
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
                      <td className="py-2">masks the value</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>SingleLineBehavior</code>
                      </td>
                      <td className="py-2">
                        Return submits instead of inserting
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
                        bold/italic/… commands over the selection
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
                        re-runs validators on a schedule (
                        <code>AutoValidateMode</code>)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70">
                <code>InputBehaviorPreset</code> is a project asset holding a
                behavior list — one asset defines a field archetype (chat
                composer, password field, form field) reused across scenes. Each
                editor instantiates a runtime copy, so per-instance state never
                leaks back into the asset.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">12.3 Filters vs validators</h3>

              <p className="text-white/70 mb-4">Two different jobs:</p>

              <ul className="space-y-3 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>InputFilterBase</code> rejects characters{" "}
                  <em>as they are typed</em>. Built-ins:{" "}
                  <code>AlphanumericFilter</code>, <code>IntegerFilter</code>,{" "}
                  <code>DecimalFilter</code>, <code>EmailFilter</code>,{" "}
                  <code>NameFilter</code>. A filter judges the post-state of an{" "}
                  <code>EditProposal</code>: replacing a selection is legal
                  whenever the result is legal.
                </li>
                <li>
                  <code>InputValidatorBase</code> lets input through and judges
                  the <em>whole value</em>, returning a{" "}
                  <code>ValidationState</code> (status + message) that{" "}
                  <code>AutoValidateBehavior</code> publishes for decorators to
                  show.
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
              <h3 className="font-semibold mb-4">12.4 Decorators</h3>

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
                includes markup characters.
              </p>

              <p className="text-white/70">
                Decorators are <code>InputBehavior</code>s, so they appear in
                the same picker and follow the same lifecycle.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">12.5 Caret</h3>
                <p className="text-white/70">
                  <code>InputCaretRenderer</code> draws the caret as a filled
                  rectangle. It is the extension point: subclass it, override{" "}
                  <code>OnPopulateMesh</code> reading <code>CaretRect</code> and{" "}
                  <code>BlinkVisible</code> for a block cursor, an underline or
                  a gradient, then assign it as the caret renderer.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">12.6 Caret context</h3>
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
              <h3 className="font-semibold mb-4">12.7 Soft keyboard</h3>

              <p className="text-white/70 mb-4">
                <code>NativeKeyboardConfig</code> carries the portable traits:{" "}
                <code>KeyboardType</code>, <code>ReturnKeyType</code>,{" "}
                <code>AutoCapitalization</code>, <code>AutoCorrection</code>,{" "}
                <code>SpellChecking</code>, <code>SmartFeatureMode</code>,{" "}
                <code>KeyboardAppearance</code> (iOS),{" "}
                <code>AndroidImeFlags</code> (Android),{" "}
                <code>AutofillHint</code>.
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
        {/* 13. Clipboard                                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Clipboard className="w-6 h-6 text-[var(--color-accent)]" />
            13. Clipboard
          </h2>

          <p className="text-white/70 mb-6">
            Copy and paste are multi-format and lossless within UniText.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">13.1 Adapters</h3>

              <p className="text-white/70 mb-4">
                An <code>IClipboardAdapter</code> is one format stage. On copy,
                every registered adapter contributes its format; on paste, the
                highest-<code>Priority</code> adapter whose format is present
                wins.
              </p>

              <ClipboardLadder />

              <p className="text-white/70">
                Copying a styled selection into an email keeps the formatting;
                copying it back into UniText restores the exact modifiers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                13.2 Teaching a modifier to travel
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
                parameter is the URL). Built-ins are pre-registered.
              </p>

              <Notice type="info">
                Registration is explicit — no assembly scan, nothing for IL2CPP
                stripping to break, and the first paste costs nothing.
              </Notice>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">13.3 Plain text</h3>
                <p className="text-white/70">
                  Plain text is the one channel whose intent is unknown: a
                  pasted <code>&lt;b&gt;</code> might be markup or literal.{" "}
                  <code>PlainTextPastePolicy</code> decides.{" "}
                  <code>TypingMarkupPolicy</code> does the same for typed text.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">13.4 Media</h3>
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
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 14. Language and Internationalization                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-[var(--color-accent)]" />
            14. Language and Internationalization
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                14.1 Three places to set the language
              </h3>

              <ol className="space-y-2 text-white/70 list-decimal list-inside mb-4">
                <li>
                  <strong>Component</strong> — the default language for all text
                  in it.
                </li>
                <li>
                  <code>&lt;lang=…&gt;</code> — per range, BCP 47:{" "}
                  <code>&lt;lang=zh-Hans&gt;汉字&lt;/lang&gt;</code>.
                </li>
                <li>
                  <strong>Font family</strong> — a family may declare the
                  languages it serves (<code>LanguageMatching</code>).
                </li>
              </ol>

              <p className="text-white/70">
                Language matters beyond fallback: it selects the correct forms
                for Han unification (Chinese vs Japanese vs Korean shapes of the
                same codepoint), locale-aware casing (Turkish dotted i), and
                script-specific line breaking.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">
                  14.2 Picking fonts by language
                </h3>
                <p className="text-white/70">
                  Put language-specific families in the stack and name them;{" "}
                  <code>&lt;font=…&gt;</code> selects one explicitly, and
                  automatic fallback selects one implicitly for characters the
                  primary family lacks.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">14.3 Localization</h3>
                <p className="text-white/70">
                  <code>IUniTextResolver</code> (§9.6) substitutes text at
                  render time. Combined with <code>&lt;lang&gt;</code> and a
                  per-language font stack, one component serves every locale
                  without scene changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 15. RTL, BiDi and Platform Input                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[var(--color-accent)]" />
            15. RTL, BiDi and Platform Input
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">15.1 Bidirectional text</h3>

              <p className="text-white/70 mb-4">
                The full Unicode Bidirectional Algorithm runs on every
                paragraph: Arabic, Hebrew, Syriac and Thaana, mixed with Latin,
                resolve correctly including nested embeddings, mirrored brackets
                and neutral runs.
              </p>

              <p className="text-white/70 mb-4">
                <code>TextDirection</code> sets the base direction.{" "}
                <code>DirectionModifier</code> overrides it per range. Caret
                movement, selection and hit-testing are all BiDi-aware — this is
                why <code>CaretAffinity</code> exists (§11.2).
              </p>

              <p className="text-white/70">
                Cursive joining is handled by the shaper, so{" "}
                <code>LetterSpacingModifier</code> renders tatweel rather than
                breaking joins.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">15.2 Native input</h3>

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
              <h3 className="font-semibold mb-4">15.3 IME</h3>
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
        {/* 16. Emoji                                                           */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Smile className="w-6 h-6 text-[var(--color-accent)]" />
            16. Emoji
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              Colour emoji render from the OS emoji font by default — nothing to
              configure. Flags, ZWJ sequences (family, profession) and skin-tone
              modifiers form single glyph clusters as the Unicode spec requires.
            </p>

            <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
              <li>
                <code>EmojiFont</code> — a bundled emoji font asset.
              </li>
              <li>
                <code>SystemEmojiFont</code> — the OS emoji font.
              </li>
              <li>
                <code>ColorFontCore</code> — the shared colour-glyph decoder.
              </li>
            </ul>

            <p className="text-white/70">
              Emoji participate in line breaking, selection and editing as
              single clusters: one arrow-key press crosses a whole family emoji,
              and one backspace deletes it.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 17. Custom Materials and Shaders                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
            17. Custom Materials and Shaders
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">
                17.1 Using a ready material
              </h3>
              <p className="text-white/70">
                Assign a material to <code>MaterialModifier</code> and tag a
                range with <code>&lt;mat&gt;</code>. An optional parameter tints
                it: <code>&lt;mat=#FF8800&gt;</code>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">17.2 Authoring a shader</h3>

              <p className="text-white/70 mb-4">
                UniText ships shader includes so one source compiles for Canvas,
                world-space, Built-in <strong>and</strong> URP. Effects read the
                shared coverage and paint channels rather than reimplementing
                SDF sampling.
              </p>

              <Notice type="warning" className="mb-4">
                Vertex channels are a contract: decorations own TEXCOORD2 and
                TEXCOORD3 (<code>CoverageMode</code>, the paint contract written
                by <code>CoverageQuadOps</code>
                ). Custom effects use the free prelude meta channel.
              </Notice>

              <p className="text-white/70">
                <code>SubMeshModifier</code> gives a range its own sub-mesh with
                its own material — the escape hatch when a range needs a
                genuinely different shader.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">17.3 Noise</h3>
              <p className="text-white/70">
                <strong>Tools → LightSide → Noise Generator</strong> produces
                noise textures for shader effects.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 18. Text Model and Runtime API                                      */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[var(--color-accent)]" />
            18. Text Model and Runtime API
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.1 Assigning text</h3>

              <CodeBlock
                code={`text.Text = "value";                 // serialized field
text.SetText(stringBuilder);         // no allocation from a builder
text.SetText(charSpan);              // from a span`}
              />

              <p className="text-white/70 mt-4">
                <code>TextOverrideSource</code> reports why the rendered text
                differs from the serialized field (a runtime buffer, a resolver,
                or both).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.2 Measuring</h3>

              <CodeBlock
                code={`var size = text.MeasureText(new TextMeasureOptions { maxWidth = 300f });`}
              />

              <p className="text-white/70 mt-4">
                Every null field in <code>TextMeasureOptions</code> falls back
                to the component&rsquo;s current value, so a default measure is
                &ldquo;the current text, as configured, at its natural
                size&rdquo;. Dimensions are outer — padding included.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.3 Hit testing</h3>
              <p className="text-white/70">
                <code>TextHitResult</code> maps a point to a codepoint index and
                back. <code>TextLine</code>, <code>TextRun</code> and{" "}
                <code>PositionedGlyph</code> expose the laid-out structure;{" "}
                <code>TextRange</code> addresses a span.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.4 Invalidation</h3>
              <p className="text-white/70">
                <code>UniTextDirty</code> names the coarsest pipeline stage a
                change invalidates; higher stages subsume the cheaper ones.{" "}
                <code>SetDirty</code> re-enters at the flag you pass, so pass
                the least expensive stage that captures your change.{" "}
                <code>UniTextCommitChanges</code> reports what one completed
                pass actually changed.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">18.5 Inspecting</h3>
              <p className="text-white/70">
                The debug overlay visualizes glyph boxes, line boxes, run
                bounds, BiDi levels and pipeline statistics — the first tool to
                reach for when layout does something unexpected.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 19. Accessibility                                                   */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Accessibility className="w-6 h-6 text-[var(--color-accent)]" />
            19. Accessibility
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 mb-4">
              <code>UniTextSemantics</code> exposes the document as a semantic
              tree: <code>TextSemanticNode</code> with a{" "}
              <code>TextSemanticRole</code>, states (
              <code>TextSemanticStates</code>) and actions (
              <code>TextSemanticActions</code>). <code>SemanticModifier</code>{" "}
              annotates a range with a role.
            </p>

            <p className="text-white/70">
              Screen readers and automated tests consume the tree; a link range
              reports as a link, a heading as a heading, an editable as a text
              field.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 20. Recipes                                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-[var(--color-accent)]" />
            20. Recipes
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Clickable links</h3>
              <CodeBlock
                code={`text.Styles.Add(Style.Tag(new LinkModifier(), "link"));
text.AddRule(new RawUrlParseRule());
text.Text = "See <link=https://example.com>the docs</link> or https://example.com";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Typewriter</h3>
              <CodeBlock
                code={`var reveal = text.GetModifier<RevealModifier>();
reveal.Collapse = false;
for (float t = 0; t < duration; t += Time.deltaTime)
{
    reveal.Fill = t / duration;
    yield return null;
}`}
              />
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
                  <code>SingleLineBehavior</code> (Return submits),{" "}
                  <code>MediaInputBehavior</code> (pasted images become
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
                  <code>UniTextSystemFont</code> in it. Automatic OS fallback
                  covers everything else.
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
              <Code className="w-5 h-5 text-[var(--color-accent)]" />
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
