export default function apiRequest(method, url = "", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  return fetch(`http://localhost:5005/tasks/${url}`, options).then((result) =>
    result.json()
  );
}