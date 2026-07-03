#!/usr/bin/env node
/**
 * sync-codex.mjs — regenera .codex/ a partir de .claude/ (fuente única de verdad).
 *
 * Qué hace:
 *   1. skills/    → copia espejo exacta (borra lo que sobre en .codex).
 *   2. commands/  → copia espejo, respetando la lista CODEX_ONLY (comandos que
 *                   existen solo para Codex por decisión explícita).
 *   3. agents/    → convierte cada .claude/agents/<n>.md (frontmatter YAML) en
 *                   .codex/agents/<n>.toml (name, description, developer_instructions).
 *   4. AGENTS.md  → generado desde .claude/CLAUDE.md con transformaciones de texto
 *                   (título, rutas .claude→.codex, Claude→Codex) + sección de
 *                   slash commands generada desde .codex/commands/.
 *
 * Uso: npm run sync:codex   (o node scripts/sync-codex.mjs)
 * Con --check no escribe nada: sale con código 1 si .codex está desincronizado.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const CLAUDE = join(ROOT, '.claude');
const CODEX = join(ROOT, '.codex');
const CHECK = process.argv.includes('--check');

/** Archivos de .codex que NO existen en .claude y deben sobrevivir al espejo.
 *  Rutas relativas a .codex/. Motivo documentado junto a cada entrada. */
const CODEX_ONLY = [
  // Decisión en 4da7462: el workflow de merge de ramas vive solo en Codex.
  'commands/merge-develop-into-branches.md',
];

let dirty = false;
const log = (msg) => console.log(`  ${msg}`);

function mirrorDir(name) {
  const src = join(CLAUDE, name);
  const dst = join(CODEX, name);
  const keep = CODEX_ONLY.filter((p) => p.startsWith(`${name}/`)).map((p) => p.slice(name.length + 1));

  // Preserva los codex-only antes de borrar el destino.
  const preserved = new Map();
  for (const rel of keep) {
    const abs = join(dst, rel);
    if (existsSync(abs)) preserved.set(rel, readFileSync(abs));
  }

  rmSync(dst, { recursive: true, force: true });
  cpSync(src, dst, { recursive: true });
  for (const [rel, content] of preserved) {
    mkdirSync(join(dst, rel, '..'), { recursive: true });
    writeFileSync(join(dst, rel), content);
  }
  log(`${name}/ espejado${keep.length ? ` (conservados: ${keep.join(', ')})` : ''}`);
}

/** md con frontmatter YAML plano (key: value) → toml de agente Codex. */
function agentMdToToml(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('agente sin frontmatter');
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  const body = m[2].trim()
    .replaceAll('\\', '\\\\')
    .replaceAll('"""', '\\"""');
  const esc = (s) => s.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
  return `name = "${esc(fm.name)}"\ndescription = "${esc(fm.description)}"\ndeveloper_instructions = """\n${body}"""\n`;
}

function syncAgents() {
  const dst = join(CODEX, 'agents');
  rmSync(dst, { recursive: true, force: true });
  mkdirSync(dst, { recursive: true });
  for (const f of readdirSync(join(CLAUDE, 'agents')).filter((f) => f.endsWith('.md'))) {
    const toml = agentMdToToml(readFileSync(join(CLAUDE, 'agents', f), 'utf8'));
    writeFileSync(join(dst, f.replace(/\.md$/, '.toml')), toml);
  }
  log('agents/ convertidos md → toml');
}

function buildAgentsMd() {
  let s = readFileSync(join(CLAUDE, 'CLAUDE.md'), 'utf8');

  s = s.replace('# CLAUDE.md — festiVAL', '# AGENTS.md — festiVAL');
  s = s.replaceAll('humans and Claude alike', 'humans and Codex alike');
  // Referencias al contrato (no a la carpeta ni a "Claude Code").
  s = s.replaceAll('read `CLAUDE.md`', 'read `AGENTS.md`');
  s = s.replaceAll('review `CLAUDE.md`', 'review `AGENTS.md`');
  // Rutas: los agentes de Codex son .toml; el resto de rutas cambia de carpeta.
  // Se respeta la línea de routing que describe a Claude Code.
  s = s.replaceAll('.claude/agents/*.md', '.codex/agents/*.toml');
  s = s
    .split('\n')
    .map((line) => (line.includes('Claude Code') ? line : line.replaceAll('.claude/', '.codex/')))
    .join('\n');

  // Sección de slash commands (Codex no los descubre solo), tras el routing.
  const commands = readdirSync(join(CODEX, 'commands')).filter((f) => f.endsWith('.md')).sort();
  const cmdLines = commands
    .map((f) => `When the user writes \`/${f.replace(/\.md$/, '')}\`, load and follow \`.codex/commands/${f}\`.`)
    .join('\n');
  const slash = `\n## Slash commands\n\n${cmdLines}\nTreat slash commands as workflow instructions for the current turn, not as plain text to acknowledge.\n`;
  const anchor = 'When working as Codex, use the `.codex/` folder as the source of truth for agents, skills, and commands.\n';
  if (!s.includes(anchor)) throw new Error('ancla de routing no encontrada en CLAUDE.md');
  s = s.replace(anchor, anchor + slash);

  writeFileSync(join(CODEX, 'AGENTS.md'), s);
  log('AGENTS.md regenerado desde CLAUDE.md');
}

function run() {
  console.log('Sincronizando .codex/ desde .claude/ …');
  mirrorDir('skills');
  mirrorDir('commands');
  syncAgents();
  buildAgentsMd();
  console.log('Hecho.');
}

if (CHECK) {
  // Modo verificación: sincroniza sobre una copia y compara.
  const { execSync } = await import('node:child_process');
  const before = execSync('git status --porcelain .codex', { cwd: ROOT }).toString();
  run();
  const after = execSync('git status --porcelain .codex', { cwd: ROOT }).toString();
  if (after !== before) {
    console.error('✗ .codex/ estaba desincronizado respecto a .claude/ (ya regenerado).');
    dirty = true;
  } else {
    console.log('✓ .codex/ está en sincronía con .claude/.');
  }
  process.exit(dirty ? 1 : 0);
} else {
  run();
}
