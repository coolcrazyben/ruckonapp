---
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git add:*), Bash(git commit:*)
description: Create a smart conventional commit based on the actual diff
---

## Current changes
!`git diff HEAD`
## Staged status
!`git status`

Review the diff. Write one conventional commit message based on what actually changed, not our conversation. Format: type(scope): description under 72 chars.

Run: git add -A && git commit -m "[your message]"
