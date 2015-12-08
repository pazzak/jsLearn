//var unitRow = $('#unit-row--blueprint');
//
//Unit.prototype = function() {
//    var firstName,
//        lastName,
//        birthDate,
//        joiningDate,
//        linkToRm,
//        linkToPm,
//        technicalList
//};
$(function() {

    var $registrationForm;
    var $blueprintRow;
    var selectorsArray;


    (function initialize() {
        $registrationForm = $('.registration-form__wrapper');
        $blueprintRow = $('.employees-card__blueprint-for-rows');
        selectorsArray = ['.id', '.first-name', '.last-name', '.birth-date', '.join-date', '.link-to-rm', '.link-to-pm', '.tech-list'];

        $('.employees-card__register-button').click(showRegistrationForm);
        $('.registration-form__close-btn').click(hideRegistrationForm);
        $blueprintRow.find('.employees-card__unit-edit-button').on('click', editEmployeeForm);
        $blueprintRow.find('.employees-card__unit-delete-button').on('click', deleteRow);
        $('.employees-card__add-unit-button').on('click', addNew);
    }());

    function postJSON(url, data, callback) {
        return jQuery.ajax({
           'type': 'POST',
           'url': url,
           'contentType': 'application/json;charset=UTF-8',
           'data': JSON.stringify(data),
           'success': callback
       });
    }

    function editEmployeeForm() {
        showRegistrationForm();
    }

    function getNewRow() {
        return $blueprintRow.find('.employees-card__unit')[0].cloneNode(true);
    }

    function addNew() {
        var unit = {firstName : 'John', lastName : 'Smith', birthDate : '12-10-2014', joinDate : '13-10-2014',
            linkToRm : 'http://rm.ru', linkToPm : 'http://pm.ru', techList : 'tech list'};
        var ajaxAddNewUnitUrl = '/ajaxNew';

        postJSON(ajaxAddNewUnitUrl, unit, showConsoleResult);
    }

    function showConsoleResult(dat) {
        console.log("id: " + dat.id || 'empty');
        console.log("firstName: " + dat.firstName || 'empty');
        console.log("lastName: " + dat.lastName || 'empty');
        console.log("birthDate: " + dat.birthDate || 'empty');
        console.log("joiningDate: " + dat.joinDate || 'empty');
        console.log("linkToRm: " + dat.linkToRm || 'empty');
        console.log("linkToPm: " + dat.linkToPm || 'empty');
        console.log("technicalList: " + dat.techList || 'empty');
    }

    function addRow(data) {

    }

    function deleteRow(element) {

    }

    function fillForm(data) {

    }

    function readForm() {
        var data = {};

        return data;
    }

    function showRegistrationForm() {
        $registrationForm.addClass('active');
    }

    function hideRegistrationForm() {
        $registrationForm.removeClass('active');
    }

});