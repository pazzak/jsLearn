package com.tasks.service;

import com.tasks.dao.EmployeeDao;
import com.tasks.model.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Aleksandr_Ishimtcev
 */

@Service("employeeService")
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeDao dao;

    public Employee findById(int id) {
        return dao.findById(id);
    }

    public void saveEmployee(Employee employee) {
        dao.saveEmployee(employee);
    }

    /*
     * Since the method is running with Transaction, No need to call hibernate update explicitly.
     * Just fetch the entity from db and update it with proper values within transaction.
     * It will be updated in db once transaction ends.
     */
    public void updateEmployee(Employee employee) {
        Employee entity = dao.findById(employee.getId());
        if(entity!=null){
            entity.setFirstName(employee.getFirstName());
            entity.setLastName(employee.getLastName());
            entity.setBirthDate(employee.getBirthDate());
            entity.setJoinDate(employee.getJoinDate());
            entity.setLinkToRm(employee.getLinkToRm());
            entity.setLinkToPm(employee.getLinkToPm());
            entity.setTechList(employee.getTechList());
        }
    }

    public void deleteEmployeeById(int id) {
        dao.deleteById(id);
    }

    public List<Employee> findAllEmployees() {
        return dao.findAllEmployees();
    }

}
