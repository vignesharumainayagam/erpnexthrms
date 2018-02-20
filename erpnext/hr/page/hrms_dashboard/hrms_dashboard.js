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
			}	  
	})
	
}