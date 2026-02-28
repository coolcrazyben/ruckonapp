---
allowed-tools: Read, Glob, Grep, Bash(git diff:*)
description: Trigger a full code review of recent changes
---

## Recent changes
!`git diff HEAD~1`

Delegate to code-reviewer agent. After results, summarize CRITICAL issues and ask if I want to fix them now. Do not fix automatically.
