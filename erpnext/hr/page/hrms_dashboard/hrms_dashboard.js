frappe.pages['hrms-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		// title: 'Dashboard',
		single_column: true
	});


	frappe.call({
			method: "erpnext.hr.page.hrms_dashboard.hrms_dashboard.get_data",
			callback: function(r){
				console.log(r.message)
				page.main.html(frappe.render_template("ht", {data: r.message}));

				let data = { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" ], datasets: [{ title: "Present", values: [25, 40, 30, 35, 8, 52, 17, 4] }, { title: "Absent", values: [25, 50, 10, 15, 18, 32, 27, 14] }, { title: "Leave", values: [15, 20, 3, 15, 58, 12, 17, 37] } ] }; let chart = new Chart({ parent: "#chart", title: "Monthly Attendance Report", data: data, type: 'bar', height: 250, colors: ['#7cd6fd', 'violet', 'blue'] });
				// let data = { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" ], datasets: [{ title: "Student", values: [25, 40, 30, 35, 8, 52, 17, -4] }, { title: "Program", values: [25, 50, -10, 15, 18, 32, 27, 14] }, { title: "Student Group", values: [15, 20, -3, -15, 58, 12, -17, 37] } ] }; let chart = new Chart({ parent: "#chart1", title: "Monthly Expense Report", data: data, type: 'pie', height: 250, colors: ['#7cd6fd', 'violet', 'blue'] });




				let data1 = { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" ], datasets: [{ title: "Present",
				 values: [25, 40, 30, 35, 8, 52, 17, 4] }, { title: "Absent", values: [25, 50, 10, 15, 18, 32, 27, 14] },
				  { title: "Leave", values: [15, 20, 3, 15, 58, 12, 17, 37] } ] }; let chart1 = new Chart({ parent: "#chart1", title: "Monthly Attendance Report",
				 data: data1, type: 'pie', height: 250, colors: ['#7cd6fd', 'violet', 'blue'] });
			}	  
	})
	
}