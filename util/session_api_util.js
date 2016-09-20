import {AsyncStorage} from 'react-native';


export const login = function(user, success, error) {
	let path='http://www.takeupless.space/api/session';
	fetch(path, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({user: user})
	}).then((response) => response.json()).then(success).catch(error);
};

export const logout = function(success){
	let path = 'http://www.takeupless.space/api/session';
	fetch(path, {
		method: 'DESTROY',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(success).catch((error) => {
		console.log("Logout error");
	});
};
