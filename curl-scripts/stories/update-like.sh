#!/bin/bash

# RSVP=false ID="627041e860aa7b0f5abfb46d" USER_ID="62701f307cbe66f4855b5e1a" TOKEN="1db4beac05ce2f1197bddd9f6dceba6c" sh curl-scripts/events/update-rsvp.sh

API="http://localhost:4741"
URL_PATH="/like"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "likes": {
      "user": "'"${USER_ID}"'",
      "likeStatus": "'"${LIKE}"'"
    }
  }'

echo