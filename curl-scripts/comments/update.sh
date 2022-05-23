TITLE="A holy cow in an unholy land"
CONTENT="There's too much meat being consumed in this world, the BBQ pit is like hell"
RESTID="62508b938e935123b34d0c69"
REVIEWID="625093d5f598642d049d53b7"


curl "http://localhost:4741/comments/${COMMENTID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'",
      "storyId": "'"${STORYID}"'"
    }
  }'