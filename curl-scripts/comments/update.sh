curl "http://localhost:4741/comments/${COMMENTID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'",
      "storyId": "'"${STORYID}"'"
    }
  }'