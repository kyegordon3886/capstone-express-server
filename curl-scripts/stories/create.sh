#!/bin/bash

API="http://localhost:4741"
URL_PATH="/stories"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "story": {
      "title": "'"${TITLE}"'",
      "author": "'"${AUTHOR}"'",
      "date": "'"${DATE}"'",
      "content": "'"${CONTENT}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
