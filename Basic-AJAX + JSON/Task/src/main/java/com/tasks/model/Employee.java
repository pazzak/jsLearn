package com.tasks.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.tasks.serializer.DateTypeDeserializer;
import com.tasks.serializer.DateTypeSerializer;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.net.URL;
import java.util.Date;

/**
 * @author Aleksandr_Ishimtcev
 */

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(min=2, max=50)
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Size(min=2, max=50)
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @JsonSerialize(using = DateTypeSerializer.class)
    @JsonDeserialize(using = DateTypeDeserializer.class)
    @Column(name = "birth_date", nullable = false)
    @Type(type="java.util.Date")
    private Date birthDate;

    @NotNull
    @JsonSerialize(using = DateTypeSerializer.class)
    @JsonDeserialize(using = DateTypeDeserializer.class)
    @Column(name = "join_date", nullable = false)
    @Type(type="java.util.Date")
    private Date joinDate;

    @NotNull
    @Column(name = "link_to_rm", nullable = false)
    @Type(type = "org.hibernate.type.UrlType")
    private URL linkToRm;

    @NotNull
    @Column(name = "link_to_pm", nullable = false)
    @Type(type = "org.hibernate.type.UrlType")
    private URL linkToPm;

    @NotNull
    @Column(name = "tech_list", nullable = false)
    private String techList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public URL getLinkToRm() {
        return linkToRm;
    }

    public void setLinkToRm(URL linkToRm) {
        this.linkToRm = linkToRm;
    }

    public URL getLinkToPm() {
        return linkToPm;
    }

    public void setLinkToPm(URL linkToPm) {
        this.linkToPm = linkToPm;
    }

    public String getTechList() {
        return techList;
    }

    public void setTechList(String techList) {
        this.techList = techList;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((linkToRm == null) ? 0 : linkToRm.hashCode());
        result = prime * result + ((linkToPm == null) ? 0 : linkToPm.hashCode());
        result = prime * result + ((techList == null) ? 0 : techList.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof Employee))
            return false;
        Employee other = (Employee) obj;
        return id == other.id;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", birthDate=" + birthDate
               + ", joinDate=" + joinDate + ", linkToRm=" + linkToRm + ", linkToPm=" + linkToPm + ", techList=" + techList + "]";
    }

    @Override
    public Employee clone() {
        Employee employee = new Employee();
        employee.setId(id);
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setBirthDate(birthDate);
        employee.setJoinDate(joinDate);
        employee.setLinkToRm(linkToRm);
        employee.setLinkToPm(linkToPm);
        employee.setTechList(techList);
        return employee;
    }

}
