from __future__ import unicode_literals

import frappe
from email_reply_parser import EmailReplyParser
from markdown2 import markdown

@frappe.whitelist()
def get_data():
	array = []
	currentdate = frappe.utils.nowtime()
	plusdate = frappe.utils.add_days(frappe.utils.nowdate(), 10)

	present = frappe.get_list("Attendance", filters={"status": "Present", "docstatus": 1, "attendance_date": currentdate}, 
										fields=["employee"], 
										limit_page_length= 200)

	absent = frappe.get_list("Attendance", filters={"status": "Absent", "docstatus": 1, "attendance_date": currentdate}, 
										fields=["employee"], 
										limit_page_length= 200)

	leave = frappe.get_list("Attendance", filters={"status": "On Leave", "docstatus": 1, "attendance_date": currentdate}, 
										fields=["employee"], 
										limit_page_length= 200)

	leave_app = frappe.get_list("Leave Application", filters={"docstatus": 0}, 
										fields=["employee"], 
										limit_page_length= 200)

	expense_claim = frappe.get_list("Expense Claim", filters={"docstatus": 0}, 
										fields=["total_claimed_amount", "employee_name"], 
										limit_page_length= 200)

	holidays_list = frappe.get_list("Company", fields=["default_holiday_list"], 
										limit_page_length= 200)


	next_holidays = frappe.get_list("Holiday", filters={"parent": holidays_list[0].default_holiday_list,
														"holiday_date": ("between", [currentdate, plusdate])
														}, 
										fields=["holiday_date", "description"], 
										limit_page_length= 50,
										order_by= "holiday_date")

	# next_bdays = frappe.get_list("Employee", filters={"date_of_birth": ("between", [currentdate, plusbday])
	# 													}, 
	# 									fields=["full_name", "date_of_birth"], 
	# 									limit_page_length= 50,
	# 									order_by= "holiday_date")


	array.append({"present":len(present),"absent": len(absent),
				 "onleave": len(leave), "open_app": len(leave_app),
				 "expense_claims": expense_claim, "upcomeing_holidays":next_holidays})

	return array



