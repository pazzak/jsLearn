<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>University Enrollments</title>

	<style>
		tr:first-child{
			font-weight: bold;
			background-color: #C6C9C4;
		}
	</style>

</head>


<body>
	<h2>List of Employees</h2>	
	<table>
		<tr>
			<td>First Name</td><td>Last Name</td><td>Birth Date</td><td>Joining Date</td><td>Link to RM</td><td>Link to PM</td><td>Technical List</td><td></td>
		</tr>
		<c:forEach items="${employees}" var="employee">
			<tr>
			<td>${employee.firstName}</td>
			<td>${employee.lastName}</td>
			<td>${employee.birthDate}</td>
			<td>${employee.joinDate}</td>
			<td>${employee.linkToRm}</td>
			<td>${employee.linkToPm}</td>
			<td>${employee.techList}</td>
			<td><a href="<c:url value='/edit-${employee.id}-employee' />">edit</a></td>
			<td><a href="<c:url value='/delete-${employee.id}-employee' />">delete</a></td>
			</tr>
		</c:forEach>
	</table>
	<br/>
	<a href="<c:url value='/new' />">Add New Employee</a>
</body>
</html>