package com.tasks.dao;

import com.tasks.model.Employee;

import java.util.List;

/**
 * @author Aleksandr_Ishimtcev
 */
public interface EmployeeDao {

    Employee findById(int id);

    void saveEmployee(Employee employee);

    void deleteById(int id);

    List<Employee> findAllEmployees();

}
