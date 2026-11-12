#!/bin/sh
# Regenerates src/data/activity.json from local git history (your commits only).
# Usage: sh scripts/activity.sh   — edit REPOS if a project moves.
set -e
AUTHOR="Ashok Reddy"
SINCE="6 months ago"
REPOS="$HOME/Documents/attendance-system
$HOME/Avison Technologies/PanditDesk
$HOME/smartliv-switchboard-designer
$HOME/abhee-smart-home-new
$HOME/abhee-car-shopee-tirupati
$HOME/ai-support-agent"
OUT="$(dirname "$0")/../src/data/activity.json"
days=$(echo "$REPOS" | while IFS= read -r r; do
  [ -d "$r/.git" ] && git -C "$r" log --all --author="$AUTHOR" --since="$SINCE" --format=%ad --date=short
done | sort | uniq -c | awk '{printf "%s\"%s\":%s", (NR>1?",":""), $2, $1}')
recent=$(git -C "$HOME/Documents/attendance-system" log --author="$AUTHOR" -8 --format='%ad%x09%s' --date=short |
  awk -F'\t' '{gsub(/"/,"\\\"",$2); printf "%s{\"date\":\"%s\",\"msg\":\"%s\"}", (NR>1?",":""), $1, $2}')
printf '{"generated":"%s","days":{%s},"emasRecent":[%s]}\n' "$(date +%F)" "$days" "$recent" > "$OUT"
echo "wrote $OUT"
