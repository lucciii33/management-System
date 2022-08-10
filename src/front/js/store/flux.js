const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: [],
			user: {},
			newEvent: []
		},
		actions: {
			createTask: (data) => {
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us60.gitpod.io/api/task", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						task: data,
					})
				})
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			getTask: () => {
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us60.gitpod.io/api/task")
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			changeTask: (data, id) => {
				fetch(`https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us60.gitpod.io/api/task/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						answer_type: data
					})
				})
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			deleteTask: (id) => {
				fetch(`https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us60.gitpod.io/api/task/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((res) => res.json())
					.then((info) => setStore({ tasks: info }))
					.catch((err) => console.log(err));
			},

			createCalendar: (description, start_time, end_time) => {
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us60.gitpod.io/api/calendar", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						description,
						start_time,
						end_time
					})
				})
					.then(res => res.json())
					.then(info => setStore({ newEvent: info }))
					.catch((error) => console.log(error))
			},





		}
	};
};

export default getState;
