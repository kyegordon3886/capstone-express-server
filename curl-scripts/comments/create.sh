curl "http://localhost:4741/comments" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'",
      "storyId": "'"${STORYID}"'"
    }
  }'