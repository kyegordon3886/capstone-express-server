curl "http://localhost:4741/comments/${COMMENTID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "storyId": "'"${STORYID}"'"
    }
  }'