/**
 * Getting Started guide page.
 * Comprehensive guide for UniText setup and usage.
 */

import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Plus,
  Type,
  Palette,
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
} from 'lucide-react';
import { useDocs, CodeBlock, Notice } from '@lightside/docs-system';

export default function GettingStartedPage() {
  const { versionedBasePath } = useDocs();
  const basePath = versionedBasePath;

  return (
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

      {/* 1. Adding UniText to a Scene */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-6 h-6 text-[var(--color-accent)]" />
          1. Adding UniText to a Scene
        </h2>

        <p className="text-white/70 mb-4">Add the UniText component to any UI GameObject:</p>

        <ol className="space-y-2 text-white/70 mb-6 list-decimal list-inside">
          <li>
            Select any GameObject with <strong>RectTransform</strong> (or create via{' '}
            <strong>GameObject → UI → Image</strong>)
          </li>
          <li>
            Add component: <strong>Add Component → UniText</strong>
          </li>
          <li>
            Enter text in the <strong>Text</strong> field
          </li>
        </ol>

        <p className="text-white/70 mb-4">
          Default fonts and appearance from Project Settings are applied automatically.
        </p>

        <CodeBlock
          code={`// Via code — you must assign Fonts and Appearance manually:
var uniText = gameObject.AddComponent<UniText>();
uniText.Fonts = myFontsAsset;        // Required
uniText.Appearance = myAppearance;   // Required
uniText.Text = "Hello, World!";`}
        />

        <Notice type="info" className="mt-4">
          Editor defaults (from Project Settings → UniText) are only applied when adding the
          component via Inspector.
        </Notice>
      </section>

      {/* 2. Creating Font Assets */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Type className="w-6 h-6 text-[var(--color-accent)]" />
          2. Creating Font Assets
        </h2>

        <p className="text-white/70 mb-6">
          UniText uses its own font format optimized for SDF rendering.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">From TTF/OTF:</h3>
            <ol className="space-y-2 text-white/70 list-decimal list-inside">
              <li>
                Import your font file (<code>.ttf</code> or <code>.otf</code>) into Unity
              </li>
              <li>
                Right-click the font → <strong>Create → UniText → Font Asset</strong>
              </li>
              <li>
                Assign the created asset to UniText's <strong>Fonts</strong> field
              </li>
            </ol>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Font Collection (UniTextFonts)</h3>
            <p className="text-white/70 mb-4">
              For fallback support (e.g., Arabic alongside Latin):
            </p>
            <ol className="space-y-2 text-white/70 list-decimal list-inside mb-4">
              <li>
                <strong>Assets → Create → UniText → Fonts</strong>
              </li>
              <li>Add fonts in priority order:</li>
            </ol>
            <ul className="space-y-1 text-white/70 list-disc list-inside ml-4 mb-4">
              <li>First font = main font</li>
              <li>Subsequent fonts = fallbacks for missing glyphs</li>
            </ul>

            <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80">
              <div>UniTextFonts</div>
              <div className="ml-4">├── Inter-Regular ← Main (Latin, Cyrillic)</div>
              <div className="ml-4">├── NotoSansArabic ← Fallback for Arabic</div>
              <div className="ml-4">└── NotoSansHebrew ← Fallback for Hebrew</div>
            </div>

            <p className="text-white/70 mt-4">
              UniText automatically selects the appropriate font for each character.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Understanding UniTextAppearance */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-6 h-6 text-[var(--color-accent)]" />
          3. Understanding UniTextAppearance
        </h2>

        <p className="text-white/70 mb-4">
          <strong>UniTextAppearance</strong> separates <em>what fonts to use</em> from{' '}
          <em>how to render them</em>.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Why This Architecture?</h3>
            <p className="text-white/70 mb-4">
              UniText supports multiple fonts via fallback chains (e.g., Latin + Arabic + Hebrew).
              Different fonts may need different materials:
            </p>
            <ul className="space-y-3 text-white/70">
              <li>
                <strong>Connected scripts (Arabic, Persian, Urdu):</strong> Letters connect into
                words. Single-pass outline/shadow/glow creates visible seams at glyph boundaries.
                Solution: use 2-pass shader that renders effect layer first, then text layer on top
              </li>
              <li>
                <strong>Different SDF spread:</strong> Fonts generated with different SDF spread
                values need matching shader settings for correct edge rendering
              </li>
            </ul>
            <p className="text-white/70 mt-4">
              UniTextAppearance stores this <strong>font-to-material mapping</strong> in one
              reusable asset.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Benefits:</h3>
            <ul className="space-y-2 text-white/70 list-disc list-inside">
              <li>Define the mapping once, share across all UniText components</li>
              <li>Change a material → all components using that appearance update</li>
              <li>Different appearance assets for different visual styles (outline, glow, etc.)</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Creating an Appearance</h3>
            <ol className="space-y-2 text-white/70 list-decimal list-inside">
              <li>
                <strong>Assets → Create → UniText → Appearance</strong>
              </li>
              <li>
                Set <strong>Default Material</strong> — used for all fonts unless overridden
              </li>
              <li>
                Optionally add <strong>Font Materials</strong> — per-font material overrides
              </li>
            </ol>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Per-Font Materials</h3>
            <p className="text-white/70 mb-3">Use cases for per-font material overrides:</p>
            <ul className="space-y-1 text-white/70 list-disc list-inside mb-4">
              <li>Different outline colors for different fonts</li>
              <li>Glow effect only for headers font</li>
              <li>Different softness/sharpness settings</li>
            </ul>

            <div className="p-4 rounded-lg bg-black/30 font-mono text-sm text-white/80">
              <div>UniTextAppearance</div>
              <div className="ml-4">├── Default Material: UniText-SDF (standard)</div>
              <div className="ml-4">└── Font Materials:</div>
              <div className="ml-8">└── HeaderFont → UniText-SDF-Outline (with glow)</div>
            </div>

            <Notice type="info" className="mt-4">
              Emoji fonts use their own built-in material automatically.
            </Notice>
          </div>
        </div>
      </section>

      {/* 4. Markup System */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-[var(--color-accent)]" />
          4. Markup System
        </h2>

        <p className="text-white/70 mb-6">
          UniText features an extensible markup system based on <strong>Modifiers</strong> and{' '}
          <strong>Parse Rules</strong>.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Architecture: Rule + Modifier</h3>
            <p className="text-white/70 mb-4">
              The system separates <strong>what to parse</strong> from <strong>what to do</strong>:
            </p>
            <ul className="space-y-2 text-white/70 list-disc list-inside mb-4">
              <li>
                <strong>Parse Rule</strong> — finds patterns in text (e.g.,{' '}
                <code>&lt;b&gt;...&lt;/b&gt;</code>, <code>**...**</code>, <code>[text](url)</code>)
              </li>
              <li>
                <strong>Modifier</strong> — applies visual effect (e.g., bold weight, underline,
                color)
              </li>
            </ul>
            <p className="text-white/70 mb-4">This separation means:</p>
            <ul className="space-y-1 text-white/70 list-disc list-inside">
              <li>One modifier can work with multiple parse rules</li>
              <li>One parse rule can trigger different modifiers</li>
              <li>You can create custom rules and modifiers</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Example: BoldModifier with Different Rules</h3>
            <div className="overflow-x-auto">
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
                    <td className="py-2 pr-4">BoldParseRule (built-in)</td>
                    <td className="py-2 pr-4">
                      <code>&lt;b&gt;bold&lt;/b&gt;</code>
                    </td>
                    <td className="py-2">BoldModifier</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Your MarkdownBoldRule</td>
                    <td className="py-2 pr-4">
                      <code>**bold**</code>
                    </td>
                    <td className="py-2">BoldModifier</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Your BBCodeRule</td>
                    <td className="py-2 pr-4">
                      <code>[b]bold[/b]</code>
                    </td>
                    <td className="py-2">BoldModifier</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/60 text-sm mt-3">
              Create your own parse rule by implementing <code>IParseRule</code>, then pair it with
              any existing or custom modifier.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Built-in Tags</h3>
            <p className="text-white/70 mb-4">Add modifiers to enable markup parsing:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-white/60">Tag</th>
                    <th className="text-left py-2 pr-4 text-white/60">Modifier</th>
                    <th className="text-left py-2 text-white/60">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;b&gt;</code>
                    </td>
                    <td className="py-2 pr-4">BoldModifier</td>
                    <td className="py-2">
                      <code>&lt;b&gt;bold&lt;/b&gt;</code>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;i&gt;</code>
                    </td>
                    <td className="py-2 pr-4">ItalicModifier</td>
                    <td className="py-2">
                      <code>&lt;i&gt;italic&lt;/i&gt;</code>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;u&gt;</code>
                    </td>
                    <td className="py-2 pr-4">UnderlineModifier</td>
                    <td className="py-2">
                      <code>&lt;u&gt;underline&lt;/u&gt;</code>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;s&gt;</code>
                    </td>
                    <td className="py-2 pr-4">StrikethroughModifier</td>
                    <td className="py-2">
                      <code>&lt;s&gt;strike&lt;/s&gt;</code>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;color&gt;</code>
                    </td>
                    <td className="py-2 pr-4">ColorModifier</td>
                    <td className="py-2">
                      <code>&lt;color=#FF0000&gt;red&lt;/color&gt;</code>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;size&gt;</code>
                    </td>
                    <td className="py-2 pr-4">SizeModifier</td>
                    <td className="py-2">
                      <code>&lt;size=1.5&gt;big&lt;/size&gt;</code>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">
                      <code>&lt;link&gt;</code>
                    </td>
                    <td className="py-2 pr-4">LinkModifier</td>
                    <td className="py-2">
                      <code>&lt;link=url&gt;click&lt;/link&gt;</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <code>&lt;obj&gt;</code>
                    </td>
                    <td className="py-2 pr-4">ObjModifier</td>
                    <td className="py-2">
                      <code>&lt;obj=icon/&gt;</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Adding Modifiers</h3>
            <p className="text-white/70 mb-3">
              <strong>In the Inspector:</strong>
            </p>
            <ol className="space-y-1 text-white/70 list-decimal list-inside mb-4">
              <li>
                Expand <strong>Mod Registers</strong> list
              </li>
              <li>
                Click <strong>+</strong> to add entry
              </li>
              <li>
                Select <strong>Rule</strong> (e.g., ColorParseRule)
              </li>
              <li>
                Select <strong>Modifier</strong> (e.g., ColorModifier)
              </li>
            </ol>

            <p className="text-white/70 mb-3">
              <strong>Via code:</strong>
            </p>
            <CodeBlock
              code={`var modRegister = new ModRegister
{
    Rule = new ColorParseRule(),
    Modifier = new ColorModifier()
};
uniText.RegisterModifier(modRegister);`}
            />
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Shared Modifier Configs</h3>
            <p className="text-white/70 mb-3">
              For consistent markup across multiple UniText components:
            </p>
            <ol className="space-y-1 text-white/70 list-decimal list-inside">
              <li>
                <strong>Assets → Create → UniText → Mod Register Config</strong>
              </li>
              <li>Configure your modifiers once</li>
              <li>
                Assign to <strong>Mod Register Configs</strong> list on each UniText
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 5. RTL and Bidirectional Text */}
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

      {/* 6. Common Properties */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <List className="w-6 h-6 text-[var(--color-accent)]" />
          6. Common Properties
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white/60">Property</th>
                <th className="text-left py-3 text-white/60">Description</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>Text</code>
                </td>
                <td className="py-3">Text content with optional markup</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>Fonts</code>
                </td>
                <td className="py-3">Font collection (UniTextFonts)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>Appearance</code>
                </td>
                <td className="py-3">Material configuration (UniTextAppearance)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>FontSize</code>
                </td>
                <td className="py-3">Base font size in points</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>WordWrap</code>
                </td>
                <td className="py-3">Enable/disable word wrapping</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>HorizontalAlignment</code>
                </td>
                <td className="py-3">Left, Center, Right</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>VerticalAlignment</code>
                </td>
                <td className="py-3">Top, Middle, Bottom</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <code>AutoSize</code>
                </td>
                <td className="py-3">Auto-fit text to container</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <code>MinFontSize</code> / <code>MaxFontSize</code>
                </td>
                <td className="py-3">Auto-size bounds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Code Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FileCode className="w-6 h-6 text-[var(--color-accent)]" />
          7. Code Examples
        </h2>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-white/40" />
              Basic Usage
            </h3>
            <CodeBlock
              code={`using LightSide;

public class Example : MonoBehaviour
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
              code={`// Requires: LinkModifier + LinkTagParseRule registered
void Start()
{
    uniText.Text = "Visit <link=https://example.com>our website</link> for more info.";
    uniText.OnLinkClick += url => Application.OpenURL(url);
    uniText.OnLinkEnter += url => Debug.Log($"Hovering: {url}");
    uniText.OnLinkExit += () => Debug.Log("Left link");
}`}
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

uniText.Text = "You earned <obj=coin/> 100 gold!";
// The <obj=coin/> is replaced with the prefab instance, inline with text`}
            />
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Smile className="w-4 h-4 text-white/40" />
              Emoji
            </h3>
            <CodeBlock
              code={`// Emoji work automatically — system emoji font is used when available
uniText.Text = "Hello! 👋 Great job! 🎉";
// To disable: EmojiFont.Disabled = true;`}
            />
          </div>
        </div>
      </section>

      {/* Next Steps */}
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
  );
}
