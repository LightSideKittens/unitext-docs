import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  BookOpen,
  Code2,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Layers,
  Globe,
  ArrowLeftRight,
  Smile,
  Zap,
  Type,
  Palette,
  Tag,
  MousePointer,
  ScanText,
  Box,
  Package,
  Wrench,
} from 'lucide-react';
import {
  useDocs,
  groupTypesByCategory,
  Notice,
} from '@lightside/docs-system';

const Code = ({ children }: { children: ReactNode }) => (
  <code className="px-1 py-0.5 rounded bg-white/10 text-[var(--color-accent)] text-[0.85em] font-mono">
    {children}
  </code>
);

interface Highlight {
  icon: typeof Globe;
  title: string;
  description: ReactNode;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Globe,
    title: '150+ Languages',
    description:
      'Arabic, Hebrew, Hindi, Thai, CJK, and every other Unicode script. One component, automatic font fallback',
  },
  {
    icon: ArrowLeftRight,
    title: 'Full BiDi',
    description: 'Mixed LTR/RTL with numbers and punctuation renders correctly (UAX #9)',
  },
  {
    icon: Smile,
    title: 'Native Color Emoji',
    description: 'ZWJ sequences, skin tones, flags via system fonts. Zero extra build size',
  },
  {
    icon: Zap,
    title: 'SDF & MSDF Rendering',
    description: (
      <>
        Curve-based Burst-compiled rasterization. Shared <Code>Texture2DArray</Code> atlas with
        adaptive tile sizes, reference counting, and LRU eviction
      </>
    ),
  },
  {
    icon: Type,
    title: 'Font Families',
    description:
      'CSS §5.2 weight matching, variable font axes (wght, wdth, ital, slnt, opsz), three-tier resolution: variable axes → static faces → synthesis',
  },
  {
    icon: Palette,
    title: 'Effects',
    description: (
      <>
        Outline and shadow via multi-pass SDF. <Code>&lt;outline&gt;</Code>{' '}
        <Code>&lt;shadow&gt;</Code> tags with color, dilate, offset, softness
      </>
    ),
  },
  {
    icon: Tag,
    title: 'Extensible Markup',
    description: (
      <>
        30+ modifier presets, Markdown (<Code>**bold**</Code>, <Code>*italic*</Code>), custom parse
        rules, shared configurations
      </>
    ),
  },
  {
    icon: MousePointer,
    title: 'Interactive Text',
    description: 'Clickable/hoverable regions with typed events and highlight system',
  },
  {
    icon: ScanText,
    title: 'Word Segmentation',
    description: 'Dictionary-based word breaking for Thai, Lao, Khmer, Myanmar',
  },
  {
    icon: Box,
    title: 'UniTextWorld',
    description: '3D text without Canvas — full pipeline via MeshRenderer',
  },
  {
    icon: Package,
    title: 'Zstd Compression',
    description: '~2.7x smaller builds for Latin/Arabic, ~1.3x for CJK',
  },
  {
    icon: Wrench,
    title: 'Editor UX',
    description: 'Style selector with ~30 presets, font family inspector, glyph picker, atlas preview',
  },
];

const QUICK_LINKS = [
  {
    id: 'quick-start',
    icon: BookOpen,
    title: 'Quick Start',
    description: 'Get up and running with UniText in 5 minutes',
    href: '/getting-started',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    id: 'api-reference',
    icon: Code2,
    title: 'API Reference',
    description: 'Complete API documentation for all public types',
    href: '/api',
    color: 'bg-blue-500/20 text-blue-400',
  },
];

export default function HomePage() {
  const { apiData, version, versionedBasePath, categoryInfo, config } = useDocs();

  if (!apiData) {
    return <div className="text-white/50">Loading...</div>;
  }

  const groupedTypes = groupTypesByCategory(apiData.types, apiData.categories, categoryInfo);
  const categoryIcons = config.categoryIcons || {};

  const quickLinks = QUICK_LINKS.map((link) => ({
    ...link,
    href: `${versionedBasePath}${link.href}`,
  }));

  return (
    <div className="space-y-12">
      <div className="text-center pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Version {version}
        </div>
        <h1 className="text-4xl font-bold mb-4">UniText Documentation</h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Industrial-grade Unicode text engine for Unity. Complete API reference, guides, and
          examples for building world-class text rendering.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--color-accent)]/50 transition"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition">
                  {link.title}
                </h3>
                <p className="text-sm text-white/50 mt-1">{link.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[var(--color-accent)] transition" />
            </Link>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/10 to-purple-500/10 border border-[var(--color-accent)]/20">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
          Key Features
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white/90 mb-1">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">API by Category</h2>
          <Link
            to={`${versionedBasePath}/api`}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            View all types
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(groupedTypes.entries()).map(([category, types]) => {
            const info = categoryInfo[category];
            const Icon = categoryIcons[category] || Layers;
            return (
              <Link
                key={category}
                to={`${versionedBasePath}/api?category=${category}`}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--color-accent)]/50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition flex items-center gap-2">
                    <Icon className="w-4 h-4 text-white/50 group-hover:text-[var(--color-accent)] transition" />
                    {info?.label || category}
                  </h3>
                  <span className="text-sm text-white/40">{types.length} types</span>
                </div>
                <p className="text-sm text-white/50">{info?.description || ''}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
