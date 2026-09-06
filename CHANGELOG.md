# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), wersjonowanie: [SemVer](https://semver.org/).
Kazdy PR dopisuje zmiany do [Unreleased]; przy release przenosimy pod numer wersji z data.

## [Unreleased]
### Added
- Pipeline jakosci: CI (build/lint/typecheck/test/semgrep/audit/licencje), Claude review na PR, szablony dokumentacji

### Changed
- Repo marked as an unmaintained prototype in README (status line + honest summary from code);
  removed CI workflows (Quality Gate, Claude Review, Release) — a stale/red badge on an
  unmaintained prototype does more harm than no badge; added LICENSE (all rights reserved).
- Restored `.github/workflows/quality.yml` (build/lint/typecheck/audit/gitleaks/semgrep) after
  a clean local run; added `docs/ARCHITECTURE.md`, `docs/GLOSSARY.md` and
  `.github/pull_request_template.md` so an outside reader can orient in the repo.

### Fixed
- `npm audit fix`: bumped transitive `fast-uri` — resolved 1 high (SSRF / host-confusion
  advisories) and 1 moderate finding.
-
