const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: [],
			user: {},
			newEvent: [],
			staff: [],
			staffHours: [],
			dishes: [],
			order: [],
		},
		actions: {
			/////login/////
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem('token');
				if (token && token != "" && token != undefined) {
					setStore({ user: JSON.parse(token) });
				}
			},

			registerUser: async (email, password) => {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/register`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				});

				if (!resp.ok) throw "Problem with the response";

				if (resp.status === 401) {
					throw "Invalid credentials";
				} else if (resp.status === 400) {
					throw "Invalid email or password format";
				}
			},


			loginToken: async (email, password) => {
				console.log("function called")
				const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				});
				console.log("after fetch")
				if (!resp.ok) throw "Problem with the response";

				if (resp.status === 401) {
					throw "Invalid credentials";
				} else if (resp.status === 400) {
					throw "Invalid email or password format";
				}

				const data = await resp.json();
				console.log("data", data)
				// save your token in the sessionStorage
				setStore({ user: data.access_token });
				sessionStorage.setItem("jwt-token", data.access_token);
				localStorage.setItem("jwt-token", data.access_token)
				// console.log(loggId)
				return data.access_token;
			},

			logout: () => {
				sessionStorage.removeItem('token');
				console.log("logout working")
				setStore({ user: null });
			},

			//////login finish//////
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

			createCalendar: (description, start_time, quantity, name, hour) => {
				fetch(`${process.env.BACKEND_URL}/api/calendar`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						description,
						start_time,
						quantity,
						name,
						hour,
					})
				})
					.then(res => res.json())
					.then(info => setStore({ newEvent: info }))
					.catch((error) => console.log(error))
			},

			getBookings: async () => {
				let store = getStore();
				let token = sessionStorage.getItem("jwt-token");
				console.log(token)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/calendar`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							// "Authorization": `Bearer ${token}`,
						}
					},)
						;
					if (response.ok) {
						const data = await response.json();
						setStore({ newEvent: data })
						console.log(data)
					}
				} catch (error) {
					throw Error(error);
				}
			},

			//here staff names//
			getStaffMembers: async () => {
				let store = getStore();
				let token = sessionStorage.getItem("jwt-token");
				console.log(token)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/staff_member`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						}
					},)
						;
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
				let store = getStore();
				let token = sessionStorage.getItem("jwt-token");
				console.log(token)
				fetch(`${process.env.BACKEND_URL}/api/staff_member`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
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
				let store = getStore();
				let token = sessionStorage.getItem("jwt-token");
				console.log(token)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/hours_system`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						}
					},);
					if (response.ok) {
						const data = await response.json();
						setStore({ staffHours: data })
						console.log(data)
					}
				} catch (error) {
					throw Error(error);
				}
			},

			createStaffHours: (person_id, clock_in, start_time, name, end_time) => {
				let store = getStore();
				let token = sessionStorage.getItem("jwt-token");
				console.log(token)
				fetch(`${process.env.BACKEND_URL}/api/hours_system`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
					body: JSON.stringify({
						person_id, clock_in, start_time, name, end_time
					})
				})
					.then(res => res.json())
					.then(info => setStore({ staffHours: info }))
					.catch((error) => console.log(error))
			},

			editStaffHours: (data) => {
				let store = getStore();
				let token = sessionStorage.getItem("jwt-token");
				console.log(token)
				data.clock_in = !data.clock_in;
				data.end_time = new Date()
				fetch(
					`${process.env.BACKEND_URL}/api/hours_system/${data.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
						body: JSON.stringify(data),
					}
				)
					.then(res => res.json())
					.then(info => setStore({ staffHours: info }))
					.catch((error) => console.log(error))
			},
			//here the hours system for the user

			//here the rest software

			// getDishes: async () => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/rest_system`);
			// 		if (response.ok) {
			// 			const data = await response.json();
			// 			setStore({ dishes: data })
			// 			console.log(data)
			// 		}
			// 	} catch (error) {
			// 		throw Error(error);
			// 	}
			// },

			getDishesTest: () => {
				fetch(`${process.env.BACKEND_URL}/api/rest_system`, {
				})
					.then(response => {
						return response.json();
					})
					.then(data => {
						console.log(data)
						return setStore({ dishes: data })
					})
					.catch(err => {
						console.error(err);
					});
			},

			createDishes: (name, price, description, item_type) => {
				fetch(`${process.env.BACKEND_URL}/api/rest_system`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name, price, description, item_type
					})
				})
					.then(res => res.json())
					.then(info => setStore({ dishes: info }))
					.catch((error) => console.log(error))
			},

			createOrder: (data) => {
				fetch(`${process.env.BACKEND_URL}/api/order_system`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						data
					})
				})
					.then(res => res.json())
					.then(info => setStore({ order: info }))
					.catch((error) => console.log(error))
			},

			getOrders: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/get_orders`);
					if (response.ok) {
						const data = await response.json();
						setStore({ order: data })
						console.log(data)
					}
				} catch (error) {
					throw Error(error);
				}
			},

			editOrderStatus: (status, id) => {
				fetch(
					`${process.env.BACKEND_URL}/api/order_system/${id}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							status: status
						}),
					}
				)
					.then(res => res.json())
					.then(info => setStore({ order: info }))
					.catch((error) => console.log(error))
			},




		}
	};
};

export default getState;
