<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" href="resources/css/style.css">
    <script src="resources/js/jquery-2.1.4.js"></script>
    <script src="resources/js/script.js"></script>
    <title>Employees Card</title>
</head>
<body>
    <div class="employees">
        <div class="employees__list__wrapper">
            <div class="employees__list__content-wrapper">
                <h2>List of Employees</h2>
                <table class="employees__list__table" border="1" cellspacing="0">
                    <tr class="employees__table__header">
                        <td>First Name</td><td>Last Name</td><td>Birth Date</td><td>Joining Date</td><td>Link to RM</td><td>Link to PM</td><td>Technical List</td><td></td>
                    </tr>
                    <c:forEach items="${employees}" var="employee">
                        <tr class="employees__unit" data-id="${employee.id}">
                            <td class="employees__unit first-name">${employee.firstName}</td>
                            <td class="employees__unit last-name">${employee.lastName}</td>
                            <td class="employees__unit birth-date">${employee.birthDate}</td>
                            <td class="employees__unit join-date">${employee.joinDate}</td>
                            <td class="employees__unit link-to-rm">${employee.linkToRm}</td>
                            <td class="employees__unit link-to-pm">${employee.linkToPm}</td>
                            <td class="employees__unit tech-list">${employee.techList}</td>
                            <td><a class="employees__unit edit-button" href="#">edit</a>
                                <a class="employees__unit delete-button" href="#">delete</a></td>
                        </tr>
                    </c:forEach>
                </table>
                <br/>
                <a class="employees__register-button" href="#">Add New Employee</a>
                <a class="employees__add-unit-button" href="#">Send</a>

            </div>
        </div>

        <div class="registration-form__wrapper">
            <div class="modal-overlay"></div>
            <div class="registration-form">
                <button class="registration-form__close-btn">&#10006</button>
                <h2>Registration Form</h2>
                    <table data-id="id">
                        <tr>
                            <td><label for="firstName">First Name: </label> </td>
                            <td><input type="text" class="first-name" id="firstName"/></td>
                        </tr>
                        <tr>
                            <td><label for="lastName">Last Name: </label> </td>
                            <td><input type="text" class="last-name" id="lastName"/></td>
                        </tr>
                        <tr>
                            <td><label for="birthDate">Birth Date: </label> </td>
                            <td><input type="text" class="birth-date" id="birthDate"/></td>
                        </tr>
                        <tr>
                            <td><label for="joinDate">Joining Date: </label> </td>
                            <td><input type="text" class="join-date" id="joinDate"/></td>
                        </tr>
                        <tr>
                            <td><label for="linkToRm">Link to RM: </label> </td>
                            <td><input type="text" class="link-to-rm" id="linkToRm"/></td>
                        </tr>
                        <tr>
                            <td><label for="linkToPm">Link to PM: </label> </td>
                            <td><input type="text" class="link-to-pm" id="linkToPm"/></td>
                        </tr>
                        <tr>
                            <td><label for="techList">Technical List: </label> </td>
                            <td><input type="text" class="tech-list" id="techList"/></td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <button>Register</button>
                            </td>
                        </tr>
                    </table>
                <br/>
                Go back to <a href="#">List of All Employees</a>
            </div>
        </div>

        <div class="employees__blueprint-for-rows" style="display: none">
            <c:import url="unit.html"/>
        </div>
    </div>
</body>
</html>
