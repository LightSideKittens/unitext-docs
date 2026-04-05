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
} from 'lucide-react';
import { useDocs, CodeBlock, Notice, AutoLink } from '@lightside/docs-system';

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
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Unity Package Manager (Git URL)</h3>
              <ol className="space-y-2 text-white/70 list-decimal list-inside mb-4">
                <li>
                  Open <strong>Window &rarr; Package Manager</strong>
                </li>
                <li>
                  Click <strong>+</strong> &rarr; <strong>Add package from git URL...</strong>
                </li>
                <li>Enter:</li>
              </ol>
              <CodeBlock
                code={`https://github.com/LightSideMeowshop/unitext.git#${version.replace(/^v/, '')}`}
                language="plaintext"
              />
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
            Use the <strong>GameObject</strong> menu to create ready-to-use UniText objects:
          </p>

          <ul className="space-y-2 text-white/70 mb-6 list-disc list-inside">
            <li>
              <strong>GameObject &rarr; UI &rarr; UniText - Text</strong> — text with default font
              and size
            </li>
            <li>
              <strong>GameObject &rarr; UI &rarr; UniText - Button</strong> — button with UniText
              label (Image + Button + UniText child)
            </li>
          </ul>

          <Notice type="info" className="mb-6">
            <strong>Input Field</strong> is currently in development and will be available in a
            future release.
          </Notice>

          <p className="text-white/70 mb-4">
            Canvas and EventSystem are created automatically if not present. Default font stack from{' '}
            <strong>Project Settings &rarr; UniText</strong> is applied to all created components.
          </p>

          <p className="text-white/70 mb-4">
            You can also override default prefabs in{' '}
            <strong>Project Settings &rarr; UniText</strong> (Text Prefab, Button Prefab) — the menu
            will instantiate your prefab instead.
          </p>

          <CodeBlock
            code={`// Via code:
var uniText = gameObject.AddComponent<UniText>();
uniText.FontStack = myFontStack;
uniText.Text = "Hello, World!";`}
          />

          <Notice type="info" className="mt-4">
            Editor defaults (from Project Settings &rarr; UniText) are only applied when adding the
            component via the menu or Inspector.
          </Notice>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 2. Working with Fonts                                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Type className="w-6 h-6 text-[var(--color-accent)]" />
            2. Working with Fonts
          </h2>

          <p className="text-white/70 mb-6">
            UniText uses its own font format with two rendering modes:
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

              <p className="text-white/70 mb-6">
                <code>UniTextFontStack</code> organizes fonts into <strong>Font Families</strong>.
                Each family has a <strong>primary</strong> font and optional <strong>faces</strong>{' '}
                (bold, italic, light, etc.). Families are searched in order for glyph fallback.
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

              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>Inter+Noto-Sans-Variable.asset</div>
                <div className="ml-4">├── Family: Inter</div>
                <div className="ml-8">
                  ├── primary: Inter-Regular &nbsp;&nbsp;&nbsp;&nbsp;(weight 400)
                </div>
                <div className="ml-8">
                  ├── face: Inter-Bold
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(weight
                  700)
                </div>
                <div className="ml-8">
                  └── face: Inter-Italic
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(weight 400,
                  italic)
                </div>
                <div className="ml-4">├── Family: NotoSansArabic</div>
                <div className="ml-8">└── primary: NotoSansArabic-Regular</div>
                <div className="ml-4">└── Family: NotoSansHebrew</div>
                <div className="ml-8">
                  &nbsp;&nbsp;&nbsp;&nbsp;└── primary: NotoSansHebrew-Regular
                </div>
              </div>

              <p className="text-white/70 mb-2">When rendering "Hello مرحبا עולם":</p>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>"Hello" — Inter family has Latin glyphs, used directly</li>
                <li>"مرحبا" — Inter has no Arabic glyphs, falls back to NotoSansArabic family</li>
                <li>"עולם" — Falls back to NotoSansHebrew family</li>
              </ul>

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

              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>
                  Inter-Variable.asset
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  one file
                </div>
                <div className="ml-4">├── wght axis: 100–900 (weight)</div>
                <div className="ml-4">├── wdth axis: 75–100 (width)</div>
                <div className="ml-4">
                  └── replaces: Inter-Thin, Inter-Light, Inter-Regular, Inter-Medium,
                </div>
                <div className="ml-16">
                  Inter-SemiBold, Inter-Bold, Inter-ExtraBold, Inter-Black
                </div>
              </div>

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

              <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80 mb-4">
                <div>
                  LanguageSupportStack
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  create once
                </div>
                <div className="ml-4">├── Family: NotoSansArabic</div>
                <div className="ml-4">├── Family: NotoSansHebrew</div>
                <div className="ml-4">├── Family: NotoSansDevanagari</div>
                <div className="ml-4">└── Family: NotoSansCJK</div>
                <div className="mt-3">
                  HeadingStack
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  for headings
                </div>
                <div className="ml-4">├── Family: Montserrat (primary + bold/italic faces)</div>
                <div className="ml-4">└── fallbackStack &rarr; LanguageSupportStack</div>
                <div className="mt-2">
                  BodyStack
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&larr;
                  for body text
                </div>
                <div className="ml-4">├── Family: Inter (primary + faces)</div>
                <div className="ml-4">└── fallbackStack &rarr; LanguageSupportStack</div>
              </div>

              <p className="text-white/70">
                All stacks get full language support through one shared reference.
              </p>
            </div>

            {/* 2.4 Material Management */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--color-accent)]" />
                2.4 Material Management
              </h3>

              <p className="text-white/70 mb-4">
                Materials are managed automatically by <code>UniTextMaterialCache</code>. There is
                no manual material assignment — the system creates and caches shared materials for
                SDF Face, SDF Base, MSDF Face, and MSDF Base internally.
              </p>

              <p className="text-white/70">
                Effects like outlines and shadows use multi-pass rendering: the effect layer renders
                first (Base material), then the text face renders on top (Face material). This is
                handled automatically when you use <code>&lt;outline&gt;</code> or{' '}
                <code>&lt;shadow&gt;</code> tags.
              </p>
            </div>

            {/* 2.5 UniText Tools Window */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[var(--color-accent)]" />
                2.5 UniText Tools Window
              </h3>

              <p className="text-white/70 mb-6">
                Open via <strong>Tools &rarr; UniText Tools</strong>. Three tabs:
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
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60">Parse Rule</th>
                      <th className="text-left py-2 pr-4 text-white/60">Syntax</th>
                      <th className="text-left py-2 text-white/60">Modifier</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>TagRule</code> (tagName=&quot;b&quot;)
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
                        <code>TagRule</code> (tagName=&quot;strong&quot;)
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
                        <code>MarkdownWrapRule</code> (marker=&quot;**&quot;)
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
                        <code>RangeRule</code> (range=&quot;..&quot;)
                      </td>
                      <td className="py-2 pr-4">
                        <em>(entire text, no markup)</em>
                      </td>
                      <td className="py-2">
                        <code>BoldModifier</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

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
                        '<outline=#000>text</outline> or <outline=0.3,#FF0000>',
                      ],
                      [
                        '<shadow>',
                        'ShadowModifier',
                        '<shadow=#00000080>text</shadow> or <shadow=0.1,#000,2,2,0.5>',
                      ],
                      ['<var>', 'VariationModifier', '<var=700>weight</var> (direct axis control)'],
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
            </div>

            {/* 3.5 Parameter Formats Reference */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">3.5 Parameter Formats Reference</h3>

              <h4 className="font-semibold text-white/90 mb-2">Color</h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Hex: <code>#RGB</code>, <code>#RRGGBB</code>, <code>#RRGGBBAA</code>
                </li>
                <li>
                  Named (20 colors): white, black, red, green, blue, yellow, cyan, magenta, orange,
                  purple, gray, lime, brown, pink, navy, teal, olive, maroon, silver, gold
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">Size</h4>
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

              <h4 className="font-semibold text-white/90 mb-2">Gradient</h4>
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

              <h4 className="font-semibold text-white/90 mb-2">Letter Spacing</h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  Format: <code>&lt;cspace=spacing[,monospace]&gt;</code>
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

              <h4 className="font-semibold text-white/90 mb-2">Outline</h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
                <li>
                  <code>&lt;outline&gt;</code> — default (dilate=0.2, black)
                </li>
                <li>
                  <code>&lt;outline=0.3&gt;</code> — custom dilate
                </li>
                <li>
                  <code>&lt;outline=#FF0000&gt;</code> — custom color
                </li>
                <li>
                  <code>&lt;outline=0.3,#FF0000&gt;</code> — both
                </li>
              </ul>

              <h4 className="font-semibold text-white/90 mb-2">Shadow</h4>
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
                Variable Font Axes (<code>&lt;var&gt;</code>)
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

              <h4 className="font-semibold text-white/90 mb-2">Ellipsis (Text Truncation)</h4>
              <ul className="space-y-1 text-white/70 list-disc list-inside">
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
                  Click <strong>+</strong> — a searchable selector opens with ~30 predefined presets
                  (Bold, Italic, Outline, Shadow, Markdown variants, etc.)
                </li>
                <li>Select a preset — both the Rule and Modifier are configured automatically</li>
              </ol>
              <p className="text-white/70 mb-6 text-sm">
                Each entry is a Rule+Modifier pair. Tags from the Rule are parsed in text, and the
                Modifier applies the effect to matched ranges. You can also configure Rule and
                Modifier manually for custom combinations.
              </p>

              <h4 className="font-semibold text-white/90 mb-3">Via Code</h4>
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

// Or remove all:
uniText.ClearStyles();`}
              />
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
                code={`var rangeRule = new RangeRule();
rangeRule.data.Add(new RangeRule.Data
{
    range = "..",           // ".." means the full text range
    parameter = "#FF0000"  // parameter passed to the modifier
});

uniText.AddStyle(new Style
{
    Rule = rangeRule,
    Modifier = new ColorModifier()  // entire text becomes red
});`}
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

              <h4 className="font-semibold text-white/90 mb-3">Multiple Ranges</h4>
              <CodeBlock
                code={`var rangeRule = new RangeRule();
rangeRule.data.Add(new RangeRule.Data { range = "0..5", parameter = "#FF0000" });
rangeRule.data.Add(new RangeRule.Data { range = "10..20", parameter = "#00FF00" });

uniText.AddStyle(new Style
{
    Rule = rangeRule,
    Modifier = new ColorModifier()
});
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
              <h3 className="font-semibold mb-4">3.12 Creating Custom Parse Rules</h3>
              <p className="text-white/70 mb-4">
                Implement <code>IParseRule</code> to create your own markup syntax:
              </p>
              <CodeBlock
                code={`public interface IParseRule
{
    int Priority => 0;
    int TryMatch(string text, int index, PooledList<ParsedRange> results);
    void Finalize(string text, PooledList<ParsedRange> results) { }
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
              <h3 className="font-semibold mb-4">3.13 Creating Custom Modifiers</h3>
              <p className="text-white/70 mb-6">
                UniText has three modifier base classes for different use cases:
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
        var gen = UniTextMeshGenerator.Current;
        if (!attribute.buffer.data.HasFlag(gen.currentCluster))
            return;

        var colors = gen.Colors;
        var baseIdx = gen.vertexCount - 4;
        colors[baseIdx] = colors[baseIdx + 1] =
        colors[baseIdx + 2] = colors[baseIdx + 3] = highlightColor;
    }
}`}
              />

              {/* Pattern 3 */}
              <h4 className="font-semibold text-white/90 mt-6 mb-3">
                Pattern 3: Interactive Region (<code>InteractiveModifier</code>)
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
                  for anything that calls Unity API (<code>Material.GetFloat()</code>, etc.)
                </li>
                <li>
                  <strong>Modifiers are fully encapsulated</strong> — external code doesn't need to
                  know about them. If a modifier adds geometry, it calls{' '}
                  <code>UniTextMeshGenerator</code> methods internally
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
            feedback.
          </p>

          <div className="space-y-6">
            {/* Click and Hover Events */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Click and Hover Events</h3>
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

            {/* Hit Testing */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Hit Testing</h3>
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

            {/* Text Highlighter */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-4">Text Highlighter</h3>
              <p className="text-white/70 mb-4">
                The <code>Highlighter</code> property controls visual feedback. The built-in{' '}
                <code>DefaultTextHighlighter</code> provides click and hover animations:
              </p>
              <CodeBlock
                code={`if (uniText.Highlighter is DefaultTextHighlighter highlighter)
{
    highlighter.ClickColor = new Color(1, 0, 0, 0.5f);
    highlighter.HoverColor = new Color(0, 0, 1, 0.1f);
    highlighter.FadeDuration = 0.5f;
}

// Disable highlighting
uniText.Highlighter = null;`}
              />
              <p className="text-white/70 text-sm mt-3">
                Implement your own by extending <code>TextHighlighter</code> and overriding{' '}
                <code>OnRangeClicked</code>, <code>OnRangeEntered</code>, <code>OnRangeExited</code>
                , <code>Update</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 5. RTL and Bidirectional Text                                       */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-[var(--color-accent)]" />
            5. RTL and Bidirectional Text
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
        {/* 6. Emoji                                                            */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Smile className="w-6 h-6 text-[var(--color-accent)]" />
            6. Emoji
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
        {/* 7. Common Properties                                                */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <List className="w-6 h-6 text-[var(--color-accent)]" />
            7. Common Properties
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
                    <code>FontStack</code>
                  </td>
                  <td className="py-3 pr-4">
                    <code>UniTextFontStack</code>
                  </td>
                  <td className="py-3 pr-4">—</td>
                  <td className="py-3">Font collection with font families and fallback chain</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">
                    <code>RenderMode</code>
                  </td>
                  <td className="py-3 pr-4">
                    <code>RenderMode</code>
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
                <tr>
                  <td className="py-3 pr-4">
                    <code>Highlighter</code>
                  </td>
                  <td className="py-3 pr-4">TextHighlighter</td>
                  <td className="py-3 pr-4">DefaultTextHighlighter</td>
                  <td className="py-3">Interaction visual feedback</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Read-Only Properties */}
          <h3 className="font-semibold mb-4">Read-Only Properties</h3>
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
                    <code>CleanText</code>
                  </td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3">Text with all markup stripped</td>
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
        </section>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* 8. Code Examples                                                    */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[var(--color-accent)]" />
            8. Code Examples
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
    uniText.AddStyle(new Style
    {
        Modifier = linkModifier,
        Rule = new TagRule { tagName = "link" }
    });

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
                code={`// Markdown-style links
uniText.AddStyle(new Style
{
    Modifier = new LinkModifier(),
    Rule = new MarkdownLinkParseRule()
});
uniText.Text = "Visit [our website](https://example.com) for details.";

// Auto-detect raw URLs
uniText.AddStyle(new Style
{
    Modifier = new LinkModifier(),
    Rule = new RawUrlParseRule()
});
uniText.Text = "Check https://example.com for updates.";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-4 h-4 text-white/40" />
                Inline Objects (Icons in Text)
              </h3>
              <CodeBlock
                code={`// Requires: ObjModifier + ObjParseRule registered
// ObjModifier must have InlineObject named "coin" with RectTransform prefab

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
                code={`var rangeRule = new RangeRule();
rangeRule.data.Add(new RangeRule.Data { range = "..", parameter = "#FF6600" });

uniText.AddStyle(new Style
{
    Rule = rangeRule,
    Modifier = new ColorModifier()
});

uniText.Text = "This entire text is orange.";`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Smile className="w-4 h-4 text-white/40" />
                Emoji
              </h3>
              <CodeBlock code={`uniText.Text = "Hello! \u{1F44B} Great job! \u{1F389}";`} />
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
