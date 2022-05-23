curl "http://localhost:4741/comments/${COMMENTID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "storyId": "'"${STORYID}"'"
    }
  }'