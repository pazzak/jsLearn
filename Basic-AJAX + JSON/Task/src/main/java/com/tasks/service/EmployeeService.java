package com.tasks.service;

import com.tasks.model.Employee;

import java.util.List;

/**
 * @author Aleksandr_Ishimtcev
 */
public interface EmployeeService {

    Employee findById(int id);

    void saveEmployee(Employee employee);

    void updateEmployee(Employee employee);

    void deleteEmployeeById(int id);

    List<Employee> findAllEmployees();

}
