const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: [],
			user: {}
		},
		actions: {
			createTask: (data) => {
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us59.gitpod.io/api/task", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						task: data
					})
				})
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			getTask: () => {
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us59.gitpod.io/api/task")
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			changeTask: (data, id) => {
				fetch(`https://3001-lucciii33-managementsys-nfd2qefwvai.ws-us59.gitpod.io/api/task/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						answer_type: data
					})
				})
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			}

		}
	};
};

export default getState;
