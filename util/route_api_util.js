export const createRoute = function(route, success, error) {
  let path='http://localhost:3000/api/routes';
  fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({route: route})
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("error");
    }
  }).then(success);
};


// 'http://www.takeupless.space/api/routes'
