# Claude Code Notifications

This guide walks through setting up remote notifications for Claude Code. When running Claude Code on a remote server via SSH, you can receive native macOS notifications on your local machine whenever Claude finishes a task. This uses SSH port forwarding and Claude Code's hook system to send notifications back to your Mac.

## 1) Install notifier (Mac)

```
brew install terminal-notifier
```

Test:

```
terminal-notifier -title "Test" -message "Notifications working"
```

---

## 2) Create local notification listener (Mac)

Open the file:

```
vim ~/.local/bin/claude-listener
```

Paste this content:

```
#!/usr/bin/env bash
PORT=33333
echo "Claude listener running on port $PORT..."
while true; do
  msg=$(nc -l "$PORT")
  terminal-notifier \
    -title "Claude Code" \
    -message "${msg:-Claude finished}" \
    -sound default
done
```

Make it executable:

```
chmod +x ~/.local/bin/claude-listener
```

Run it:

```
~/.local/bin/claude-listener
```

Leave this running in a terminal, or start as a background process by adding `&` at the end.

You may also try adding this to your `.bashrc`:

```bash
# --- Claude Code notification listener ---
CLAUDE_LISTENER="$HOME/.local/bin/claude-listener"
CLAUDE_LOCK="$HOME/.cache/claude-listener.lock"
CLAUDE_LOG="$HOME/.cache/claude-listener.log"

mkdir -p "$HOME/.cache"

# Remove stale lockfile
if [ -f "$CLAUDE_LOCK" ] && ! kill -0 "$(cat "$CLAUDE_LOCK")" 2>/dev/null; then
  rm -f "$CLAUDE_LOCK"
fi

if [ -x "$CLAUDE_LISTENER" ] && [ ! -f "$CLAUDE_LOCK" ]; then
  (
    echo $$ > "$CLAUDE_LOCK"
    nohup "$CLAUDE_LISTENER" >> "$CLAUDE_LOG" 2>&1 &
  ) >/dev/null 2>&1
fi
# --- end Claude Code listener ---

```

---

## 3) Ensure ~/.local/bin is on PATH (bash-only)

Check if it's already on PATH; if not, add it to `~/.bashrc`:

```
export PATH="$HOME/.local/bin:$PATH"
```

Re-source:

```
source ~/.bashrc
```

Verify:

```
which claude-listener
```

---

## 4) SSH with port forwarding (Mac to Server)

```
ssh -L 33333:localhost:33333 user@server
```

This forwards server `localhost:33333` to Mac `localhost:33333`.

Alternatively, define an ssh host config:

```bash
vim ~/.ssh/config
```

```bash
Host <alias>
    HostName <ip address>
    User animcogn
    ForwardAgent yes
    RemoteForward 33333 127.0.0.1:33333
```

---

## 5) Create Claude hook (Server)

Open the file:

```
mkdir -p ~/.claude/hooks
vim ~/.claude/hooks/notify.sh

```

Paste this content:

```
#!/usr/bin/env bash
set -euo pipefail
echo "Claude finished on $(hostname)" | nc localhost 33333
```

Make it executable:

```
chmod +x ~/.claude/hooks/notify.sh
```

---

## 6) Register hook (Server)

Edit:

```
vim ~/.claude/settings.json
```

Paste/update to include:

```
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/notify.sh",
            "timeout": 2
          }
        ]
      }
    ]
  }
}
```

Restart Claude Code after editing.

---

## 7) Test

1. Listener running on Mac: `~/.local/bin/claude-listener`
2. SSH session with port forwarding active
3. Claude Code running on server
4. When Claude finishes a response, macOS notification appears

---

## Optional: include Claude's message text (Server)

Requires `jq` on the server.

Open the file:

```
vim ~/.claude/hooks/notify.sh
```

Paste this content:

```
#!/usr/bin/env bash
set -euo pipefail
msg=$(jq -r '.message // "Claude finished"' 2>/dev/null || echo "Claude finished")
echo "$msg" | nc localhost 33333
```

Then:

```
chmod +x ~/.claude/hooks/notify.sh
```
