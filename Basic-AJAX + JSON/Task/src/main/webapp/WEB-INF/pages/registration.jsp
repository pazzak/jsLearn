<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Employee Registration Form</title>

<style>

	.error {
		color: #ff0000;
	}
</style>

</head>

<body>

	<h2>Registration Form</h2>
 
	<form:form method="POST" modelAttribute="employee">
		<form:input type="hidden" path="id" id="id"/>
		<table>
			<tr>
				<td><label for="firstName">First Name: </label> </td>
				<td><form:input path="firstName" id="firstName"/></td>
				<td><form:errors path="firstName" cssClass="error"/></td>
		    </tr>

			<tr>
				<td><label for="lastName">Last Name: </label> </td>
				<td><form:input path="lastName" id="lastName"/></td>
				<td><form:errors path="lastName" cssClass="error"/></td>
		    </tr>
	    
			<tr>
				<td><label for="birthDate">Birth Date: </label> </td>
				<td><form:input path="birthDate" id="birthDate"/></td>
				<td><form:errors path="birthDate" cssClass="error"/></td>
		    </tr>

			<tr>
				<td><label for="joinDate">Joining Date: </label> </td>
				<td><form:input path="joinDate" id="joinDate"/></td>
				<td><form:errors path="joinDate" cssClass="error"/></td>
		    </tr>
	
			<tr>
				<td><label for="linkToRm">Link to RM: </label> </td>
				<td><form:input path="linkToRm" id="linkToRm"/></td>
				<td><form:errors path="linkToRm" cssClass="error"/></td>
		    </tr>

			<tr>
				<td><label for="linkToPm">Link to PM: </label> </td>
				<td><form:input path="linkToPm" id="linkToPm"/></td>
				<td><form:errors path="linkToPm" cssClass="error"/></td>
		    </tr>
	
			<tr>
				<td><label for="techList">Technical List: </label> </td>
				<td><form:input path="techList" id="techList"/></td>
				<td><form:errors path="techList" cssClass="error"/></td>
		    </tr>
	
			<tr>
				<td colspan="3">
					<c:choose>
						<c:when test="${edit}">
							<input type="submit" value="Update"/>
						</c:when>
						<c:otherwise>
							<input type="submit" value="Register"/>
						</c:otherwise>
					</c:choose>
				</td>
			</tr>
		</table>
	</form:form>
	<br/>
	<br/>
	Go back to <a href="<c:url value='/list' />">List of All Employees</a>
</body>
</html>