const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: [],
			user: {},
			newEvent: [],
			staff: [],
		},
		actions: {
<<<<<<< HEAD
			createTask: (data) => {
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-eu61.gitpod.io/api/task", {
=======
			createTask: (data, made_by) => {
				console.log(data)
				console.log(made_by)
				fetch("https://3001-beige-catfish-r85jgy2ph5c.ws-us60.gitpod.io/api/task", {
>>>>>>> refs/remotes/origin/main
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						task: data,
						made_by: made_by
					})
				})
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},


			getTask: () => {
<<<<<<< HEAD
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-eu61.gitpod.io/api/task")
=======
				fetch("https://3001-beige-catfish-r85jgy2ph5c.ws-us60.gitpod.io/api/task")
>>>>>>> refs/remotes/origin/main
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			changeTask: (data, id) => {
<<<<<<< HEAD
				fetch(`https://3001-lucciii33-managementsys-nfd2qefwvai.ws-eu61.gitpod.io/api/task/${id}`, {
=======
				fetch(`https://3001-beige-catfish-r85jgy2ph5c.ws-us60.gitpod.io/api/task/${id}`, {
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
				fetch(`https://3001-lucciii33-managementsys-nfd2qefwvai.ws-eu61.gitpod.io/api/task/${id}`, {
=======
				fetch(`https://3001-beige-catfish-r85jgy2ph5c.ws-us60.gitpod.io/api/task/${id}`, {
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
				fetch("https://3001-lucciii33-managementsys-nfd2qefwvai.ws-eu61.gitpod.io/api/calendar", {
=======
				fetch("https://3001-beige-catfish-r85jgy2ph5c.ws-us60.gitpod.io/api/calendar", {
>>>>>>> refs/remotes/origin/main
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

			// here start the in-out system //
			getStaffMembers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/staff_member`);
					if (response.ok) {
						const data = await response.json();
						setStore({ staff: data })
						console.log(data)
					}
				} catch (error) {
					throw Error(error);
				}
			},

			createStaffMember: (full_name) => {
				fetch(`${process.env.BACKEND_URL}/api/staff_member`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name,
					})
				})
					.then(res => res.json())
					.then(info => setStore({ staff: info }))
					.catch((error) => console.log(error))
			},


		}
	};
};

export default getState;
