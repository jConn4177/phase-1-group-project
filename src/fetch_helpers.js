const getJSON = (url) => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw response.statusText;
    }
    return response.json();
  });
};

const postJSON = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw response.statusText;
    }
    return response.json();
  });
};

const patchJSON = (url, data) => {
  return fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw response.statusText;
    }
    return response.json();
  });
};
