package com.tasks.controller;

import com.tasks.model.Employee;
import com.tasks.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import javax.validation.Valid;

/**
 * @author Aleksandr_Ishimtcev
 */

@Controller
@RequestMapping("/")
public class AppController {

    @Autowired
    EmployeeService service;

    @Autowired
    MessageSource messageSource;

    /*
     * This method add new employee.
     */
    @RequestMapping(value = { "/ajaxNew" }, method = RequestMethod.POST)
    public @ResponseBody Employee newEmployee(@RequestBody Employee employee, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }
        service.saveEmployee(employee);
        return employee;
    }

    /*
     * This method will change data of existing employees.
     */
    @RequestMapping(value = { "/ajaxChange" }, method = RequestMethod.POST)
    public @ResponseBody boolean changeEmployee(@RequestBody Employee employee, BindingResult result) {
        if (result.hasErrors()) {
            return false;
        }
        service.updateEmployee(employee);
        return true;
    }

    /*
     * This method will delete existing employee.
     */
    @RequestMapping(value = { "/ajaxDelete" }, method = RequestMethod.POST)
    public @ResponseBody boolean deleteEmployee(@RequestBody Employee employee, BindingResult result) {
        if (result.hasErrors()) {
            return false;
        }
        service.deleteEmployeeById(employee.getId());
        return true;
    }

    /*
     * This method will list all existing employees.
     */
    @RequestMapping(value = { "/" , "/list" }, method = RequestMethod.GET)
    public String listEmployees(ModelMap model) {

        List<Employee> employees = service.findAllEmployees();
        model.addAttribute("employees", employees);
        return "index";
    }

    /*
     * This method will provide the medium to add a new employee.
     */
    @RequestMapping(value = { "/new" }, method = RequestMethod.GET)
    public String newEmployee(ModelMap model) {
        Employee employee = new Employee();
        model.addAttribute("employee", employee);
        model.addAttribute("edit", false);
        return "registration";
    }

    /*
     * This method will be called on form submission, handling POST request for
     * saving employee in database. It also validates the user input
     */
    @RequestMapping(value = { "/new" }, method = RequestMethod.POST)
    public String saveEmployee(@Valid Employee employee, BindingResult result, ModelMap model) {

        if (result.hasErrors()) {
            return "registration";
        }

        service.saveEmployee(employee);

        model.addAttribute("success", "Employee " + employee.getFirstName() + " " + employee.getLastName() + " registered successfully");
        return "success";
    }


    /*
     * This method will provide the medium to update an existing employee.
     */
    @RequestMapping(value = { "/edit-{id}-employee" }, method = RequestMethod.GET)
    public String editEmployee(@PathVariable int id, ModelMap model) {
        Employee employee = service.findById(id);
        model.addAttribute("employee", employee);
        model.addAttribute("edit", true);
        return "registration";
    }

    /*
     * This method will be called on form submission, handling POST request for
     * updating employee in database. It also validates the user input
     */
    @RequestMapping(value = { "/edit-{id}-employee" }, method = RequestMethod.POST)
    public String updateEmployee(@Valid Employee employee, BindingResult result,
                                 ModelMap model) {

        if (result.hasErrors()) {
            return "registration";
        }

        service.updateEmployee(employee);

        model.addAttribute("success", "Employee " + employee.getFirstName() + " " + employee.getLastName() + " updated successfully");
        return "success";
    }


    /*
     * This method will delete an employee by it's SSN value.
     */
    @RequestMapping(value = { "/delete-{id}-employee" }, method = RequestMethod.GET)
    public String deleteEmployee(@PathVariable int id) {
        service.deleteEmployeeById(id);
        return "redirect:/list";
    }

    /*
     * Returns an html blueprint for one unit in a table.
     */
    @RequestMapping(value = { "/unit" }, method = RequestMethod.GET)
    public String newUnit() {
        return "unit";
    }

}
