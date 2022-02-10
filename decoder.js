function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

parseJwt(
  eyJhbGciOiJIUzI1NiJ9
    .eyJfaWQiOiI2MjA1NGE0OWE4Yjk5MTBmODE0YjU0YWUiLCJ1c2VyIjoiaGVlZWxsb28iLCJleHAiOjE2NDQ1MjI4NjUxNzd9
    .eyGPS1_eOyGN6lRFqreO974NAqiSi2jlH8QDS5jNySk
);
