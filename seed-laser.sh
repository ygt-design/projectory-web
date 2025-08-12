DEV_HOST="http://localhost:5173"
PROXY_PATH="/api/laser-focus-form"
API_KEY="AIzaSyDu-iOefPc7fG3lMRWlyhCa_1i7hX7RG1o"

for i in $(seq 1 100); do
  table=$i
  r1=$((RANDOM % 101))
  impact=$(echo "scale=1; $r1/10" | bc)
  r2=$((RANDOM % 101))
  effort=$(echo "scale=1; $r2/10" | bc)
  idea="Random idea #$i"
  curl -s -X POST \
    -H "Content-Type: application/json" \
    -d "{\"table\": $table, \"idea\": \"$idea\", \"impact\": $impact, \"effort\": $effort}" \
    "${DEV_HOST}${PROXY_PATH}?key=${API_KEY}" \
  && echo "✔️  #$i → table=$table, impact=$impact, effort=$effort"
done