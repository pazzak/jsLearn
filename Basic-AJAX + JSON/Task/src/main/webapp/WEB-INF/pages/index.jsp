<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <link rel="stylesheet" href="resources/css/style.css">
    <script src="resources/js/jquery-2.1.4.js"></script>
    <script src="resources/js/script.js"></script>
    <link rel="import" href="<c:url value="/unit"/>">
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
                            <td class="employees__unit-data first-name">${employee.firstName}</td>
                            <td class="employees__unit-data last-name">${employee.lastName}</td>
                            <td class="employees__unit-data birth-date">
                                <fmt:formatDate type="date" pattern="dd-MM-yyyy" value="${employee.birthDate}" />
                            </td>
                            <td class="employees__unit-data join-date">
                                <fmt:formatDate type="date" pattern="dd-MM-yyyy" value="${employee.joinDate}" />
                            </td>
                            <td class="employees__unit-data link-to-rm">${employee.linkToRm}</td>
                            <td class="employees__unit-data link-to-pm">${employee.linkToPm}</td>
                            <td class="employees__unit-data tech-list">${employee.techList}</td>
                            <td><a class="employees__unit-data edit-button" href="#">edit</a>
                                <a class="employees__unit-data delete-button" href="#">delete</a></td>
                        </tr>
                    </c:forEach>
                </table>
                <br/>
                <a class="employees__register-button" href="#">Add New Employee</a>

            </div>
        </div>

        <div class="registration-form__wrapper">
            <div class="modal-overlay"></div>
            <div class="registration-form">
                <button class="registration-form__close-btn">&#10006</button>
                <h2>Registration Form</h2>
                    <table>
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
                                <button class="register-btn">Register</button>
                                <button class="change-btn">Change</button>
                            </td>
                        </tr>
                    </table>
                <br/>
            </div>
        </div>

        <div class="employees__blueprint-for-rows" style="display: none">
            <table class="employees__blueprint-for-rows">
                <tr class="employees__unit" data-id="0">
                    <td class="employees__unit-data first-name"></td>
                    <td class="employees__unit-data last-name"></td>
                    <td class="employees__unit-data birth-date"></td>
                    <td class="employees__unit-data join-date"></td>
                    <td class="employees__unit-data link-to-rm"></td>
                    <td class="employees__unit-data link-to-pm"></td>
                    <td class="employees__unit-data tech-list"></td>
                    <td><a class="employees__unit-data edit-button" href="#">edit</a>
                        <a class="employees__unit-data delete-button" href="#">delete</a></td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
