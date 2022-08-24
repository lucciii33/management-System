const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: [],
			user: {},
			newEvent: [],
			staff: [],
			staffHours: []
		},
		actions: {
			createTask: (data, made_by) => {
				fetch(`${process.env.BACKEND_URL}/api/task`, {
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
				fetch(`${process.env.BACKEND_URL}/api/task`)
					.then(res => res.json())
					.then(info => setStore({ tasks: info }))
					.catch((error) => console.log(error))
			},

			changeTask: (data, id) => {
				fetch(`${process.env.BACKEND_URL}/api/task/${id}`, {
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
				fetch(`${process.env.BACKEND_URL}/api/task/${id}`, {
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
				fetch(`${process.env.BACKEND_URL}goog/api/calendar`, {
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
			//here staff names//
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

			// here start the in-out system //
			getStaffHours: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/hours_system`);
					if (response.ok) {
						const data = await response.json();
						setStore({ staffHours: data })
						console.log(data)
					}
				} catch (error) {
					throw Error(error);
				}
			},

			createStaffHours: (person_id, clock_in, start_time, name) => {
				fetch(`${process.env.BACKEND_URL}/api/hours_system`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						person_id, clock_in, start_time, name
					})
				})
					.then(res => res.json())
					.then(info => setStore({ staffHours: info }))
					.catch((error) => console.log(error))
			},

			editStaffHours: (hours) => {
				hours.clock_in = hours.clock_in;
				console.log(hours);
				fetch(
					"https://3000-lucciii33-todobackend-2sswhduf7yz.ws-us38.gitpod.io/todo/" +
					task.id,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(hours),
					}
				)
					.then(res => res.json())
					.then(info => setStore({ staffHours: info }))
					.catch((error) => console.log(error))
			}
			//here the hours system for the user




		}
	};
};

export default getState;
